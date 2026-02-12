import { useState, useEffect } from "react";
import { loadDayFromCloud, saveDayToCloud } from "../cloudSync";

export default function useLocalState(key) {
    const [state, setState] = useState({});

    useEffect(() => {
        let active = true;

        async function load() {
            // 1️⃣ Try local cache first (fast)
            const local = JSON.parse(localStorage.getItem(key));
            if (local && active) {
                setState(local);
            }

            // 2️⃣ Fetch cloud data (source of truth)
            const cloud = await loadDayFromCloud(key);
            if (!active) return;

            if (cloud && cloud.tasks) {
                setState(cloud.tasks);
                localStorage.setItem(key, JSON.stringify(cloud.tasks));
            } else {
                // If neither exists → empty day
                if (!local) setState({});
            }
        }

        load();

        return () => {
            active = false;
        };
    }, [key]);

    const toggle = (id) => {
        setState((prev) => {
            const updated = { ...prev, [id]: !prev[id] };

            // Save locally immediately
            localStorage.setItem(key, JSON.stringify(updated));

            // Save FULL state to cloud (critical)
            saveDayToCloud(key, {
                date: key,
                tasks: updated,
                updatedAt: Date.now(),
            });

            return updated;
        });
    };

    return { state, toggle };
}

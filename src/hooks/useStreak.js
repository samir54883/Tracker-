import { useEffect, useState } from "react";
import { loadDayFromCloud } from "../cloudSync";

/* YYYY-MM-DD from today */
function getLocalDateKey(offset = 0) {
    const d = new Date();
    d.setDate(d.getDate() + offset);

    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${y}-${m}-${day}`;
}

/* Local history fast read */
function getLocalProgress(key) {
    try {
        const history = JSON.parse(localStorage.getItem("routine_history") || "{}");
        return history?.[key]?.progress ?? null;
    } catch {
        return null;
    }
}

export default function useStreak(progress) {
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        let active = true;

        async function calc() {
            let s = 0;

            for (let i = 0; i > -365; i--) {
                const key = getLocalDateKey(i);

                // 1️⃣ Local first
                let p = getLocalProgress(key);

                // 2️⃣ Cloud fallback
                if (p === null) {
                    const cloud = await loadDayFromCloud(key);
                    p = cloud?.progress ?? null;
                }

                if (!active) return;

                if (p === null) break;
                if (p < 60) break;

                s++;
            }

            if (active) setStreak(s);
        }

        // 🔴 RUN ON MOUNT + PROGRESS CHANGE
        calc();

        // 🔴 ALSO RE-RUN AFTER SHORT DELAY (ensures async progress load finished)
        const t = setTimeout(calc, 250);

        return () => {
            active = false;
            clearTimeout(t);
        };
    }, [progress]);

    return streak;
}

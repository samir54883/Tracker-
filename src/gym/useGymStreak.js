import { useEffect, useState } from "react";
import { loadDayFromCloud } from "../cloudSync";

/* gym_YYYY-MM-DD */
function getKey(offset = 0) {
    const d = new Date();
    d.setDate(d.getDate() + offset);

    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `gym_${y}-${m}-${day}`;
}

/* Local fast cache */
function getLocalProgress(key) {
    try {
        const history = JSON.parse(localStorage.getItem("gym_history") || "{}");
        return history?.[key]?.progress ?? null;
    } catch {
        return null;
    }
}

export default function useGymStreak(progress) {
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        let active = true;

        async function getProgressForKey(key) {
            let p = getLocalProgress(key);
            if (p === null) {
                const cloud = await loadDayFromCloud(key);
                p = cloud?.progress ?? null;
            }
            return p;
        }

        async function calc() {
            let s = 0;

            /* ===== Decide starting day ===== */
            let startOffset = 0;

            const today = new Date();
            const todayKey = getKey(0);
            const todayProgress = await getProgressForKey(todayKey);

            const isMonday = today.getDay() === 1;

            if (isMonday || todayProgress === null || todayProgress < 60) {
                startOffset = -1;   // start from yesterday
            }

            /* ===== Walk backward ===== */
            for (let i = startOffset; i > startOffset - 365; i--) {
                const d = new Date();
                d.setDate(d.getDate() + i);

                if (d.getDay() === 1) continue; // skip Monday

                const key = getKey(i);
                const p = await getProgressForKey(key);

                if (!active) return;

                if (p === null) break;
                if (p < 60) break;

                s++;
            }

            if (active) setStreak(s);
        }

        calc();

        const t = setTimeout(calc, 300);

        return () => {
            active = false;
            clearTimeout(t);
        };
    }, [progress]);

    return streak;
}

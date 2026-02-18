import { useState, useEffect } from "react";

export default function useGymState(key) {
    const [state, setState] = useState({
        checks: {},
        weights: {},
        warmup: {}
    });

    const [locked, setLocked] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(key);
        if (saved) setState(JSON.parse(saved));
    }, [key]);

    function toggle(id) {
        if (locked) return;

        setState(prev => {
            const checks = prev?.checks || {};   // ← SAFE GUARD

            const next = {
                ...prev,
                checks: {
                    ...checks,
                    [id]: !checks[id]
                }
            };

            localStorage.setItem(key, JSON.stringify(next));
            return next;
        });
    }


    function setWeight(exercise, setIndex, value) {
        setState(prev => {
            const weights = prev?.weights || {};
            const arr = [...(weights[exercise] || [])];

            arr[setIndex] = value;

            const next = {
                ...prev,
                weights: {
                    ...weights,
                    [exercise]: arr
                }
            };

            localStorage.setItem(key, JSON.stringify(next));
            return next;
        });
    }


    function setWarmup(field, value) {
        setState(prev => {
            const warmup = prev?.warmup || {};

            const next = {
                ...prev,
                warmup: {
                    ...warmup,
                    [field]: value
                }
            };

            localStorage.setItem(key, JSON.stringify(next));
            return next;
        });
    }


    return { state, toggle, setWeight, setWarmup, locked };
}

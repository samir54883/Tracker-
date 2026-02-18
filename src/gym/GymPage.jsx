import React, { useEffect } from "react";
import GymBlock from "./GymBlock";
import useGymState from "./useGymState";
import useGymProgress from "./useGymProgress";
import { getGymDateKey } from "./gymKey";
import { gymRoutine } from "./gymRoutine";
import ProgressCard from "../components/ProgressCard";
import { Grid } from "../components/UI";
import { saveDayToCloud } from "../cloudSync";

/* NEW */
import GymHeatmap from "./GymHeatmap";
import useGymStreak from "./useGymStreak";

export default function GymPage({ date, offset }) {
    const key = getGymDateKey(offset);

    const dayName = date.toLocaleDateString("en-US", {
        weekday: "long",
    });

    const routine = gymRoutine[dayName];

    const { state, toggle, setWeight, setWarmup } = useGymState(key);
    const { progress } = useGymProgress(routine, state, key);

    /* ===== GYM STREAK (cloud-synced) ===== */
    const streak = useGymStreak(progress);

    /* ===== CLOUD SAVE ===== */
    useEffect(() => {
        if (!state) return;

        saveDayToCloud(key, {
            date: key,
            checks: state.checks || {},
            weights: state.weights || {},
            warmup: state.warmup || {},
            progress,
            updatedAt: Date.now(),
        });
    }, [state, progress, key]);

    /* ===== MONDAY REST ===== */
    if (!routine) {
        return (
            <>
                <div style={{ opacity: 0.6 }}>Rest Day</div>
                <GymHeatmap />
            </>
        );
    }

    return (
        <>
            {/* ===== WORKOUT ===== */}
            <Grid>
                {routine.segments.map((seg, i) => (
                    <GymBlock
                        key={i}
                        segment={seg}
                        state={state}
                        toggle={toggle}
                        setWeight={setWeight}
                        setWarmup={setWarmup}
                        dateKey={key}
                    />
                ))}
            </Grid>

            {/* ===== PROGRESS ===== */}
            <ProgressCard progress={progress} streak={streak} />

            {/* ===== GYM HEATMAP ===== */}
            <GymHeatmap />
        </>
    );
}

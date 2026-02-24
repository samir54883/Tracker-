import React, { useState } from "react";
import { Block, BlockHeader, Category, TaskRow } from "../components/UI";
import GymRestTimer from "./GymRestTimer";
import { gymRestTimes } from "./gymRestTimes";

/* ── CALORIE CALCULATOR ── */
// ACSM treadmill formula, weight fixed at 80kg, incline assumed 0%
const WEIGHT_KG = 80;
const INCLINE   = 0; // flat treadmill, grade = 0

function calcCalories(speedKmh, timeMin) {
    const s = parseFloat(speedKmh);
    const t = parseFloat(timeMin);
    if (!s || !t || s <= 0 || t <= 0) return null;

    const S = s * (1000 / 60);           // km/h → m/min
    const G = INCLINE;

    // ACSM VO₂ formula
    const vo2 = s <= 6.5
        ? (0.1 * S) + (1.8 * S * G) + 3.5   // walking
        : (0.2 * S) + (0.9 * S * G) + 3.5;  // running

    const calories = (vo2 * WEIGHT_KG * t) / 200;
    return Math.round(calories);
}

function CalorieOutput({ speed, time }) {
    const cal = calcCalories(speed, time);
    return (
        <div style={calBoxStyle}>
            <span style={calValueStyle}>{cal !== null ? cal : "—"}</span>
            <span style={calLabelStyle}>kcal</span>
        </div>
    );
}

/* ── MAIN COMPONENT ── */

export default function GymBlock({
                                     segment,
                                     state,
                                     toggle,
                                     setWeight,
                                     setWarmup,
                                     dateKey
                                 }) {
    const [focused, setFocused] = useState(null);

    function getRestSeconds(item) {
        if (!item?.name) return 0;
        if (item.name === "MID BREAK") return gymRestTimes.MID_BREAK;
        return gymRestTimes[item.name] ?? 60;
    }

    return (
        <Block>
            <BlockHeader>{segment.header}</BlockHeader>

            <Category>
                {segment.items.map((item, index) => {
                    const id = `${dateKey}_${segment.header}_${index}`;
                    const checked = !!state.checks?.[id];

                    return (
                        <div key={id} style={{ marginBottom: 20 }}>
                            {/* CHECKBOX ROW */}
                            <TaskRow>
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => toggle(id)}
                                />
                                <span className="box"></span>

                                {/* Exercise name */}
                                <span>{item.name}</span>

                                {/* Sets x Reps badge — exercises */}
                                {item.type === "exercise" && item.reps && (
                                    <span style={setsRepsStyle}>
                                        {item.sets} x {item.reps}
                                    </span>
                                )}

                                {/* Duration badge — warmup */}
                                {item.type === "warmup" && item.duration && (
                                    <span style={setsRepsStyle}>
                                        {item.duration}
                                    </span>
                                )}
                            </TaskRow>

                            {/* WARMUP INPUTS */}
                            {item.type === "warmup" && (
                                <div style={rowStyle}>
                                    <input
                                        placeholder="Speed (km/h)"
                                        value={state.warmup?.speed || ""}
                                        onChange={(e) => setWarmup("speed", e.target.value)}
                                        style={inputStyle}
                                    />
                                    <input
                                        placeholder="Time (min)"
                                        value={state.warmup?.time || ""}
                                        onChange={(e) => setWarmup("time", e.target.value)}
                                        style={inputStyle}
                                    />
                                    <CalorieOutput
                                        speed={state.warmup?.speed}
                                        time={state.warmup?.time}
                                    />
                                </div>
                            )}

                            {/* EXERCISE SET INPUTS */}
                            {item.type === "exercise" && (
                                <div style={rowStyle}>
                                    {Array.from({ length: item.sets }).map((_, i) => {
                                        const rest     = getRestSeconds(item);
                                        const value    = state.weights?.[item.name]?.[i] || "";
                                        const focusKey = `${item.name}_${i}`;

                                        return (
                                            <React.Fragment key={i}>
                                                <input
                                                    placeholder={`Set ${i + 1}`}
                                                    value={value}
                                                    onFocus={() => setFocused(focusKey)}
                                                    onBlur={() => setFocused(null)}
                                                    onChange={(e) =>
                                                        setWeight(item.name, i, e.target.value)
                                                    }
                                                    style={inputStyle}
                                                />

                                                {focused === focusKey &&
                                                    i < item.sets - 1 &&
                                                    rest > 0 && (
                                                        <div style={{ width: 40, display: "flex", justifyContent: "center" }}>
                                                            <GymRestTimer seconds={rest} trigger={focusKey} />
                                                        </div>
                                                    )}
                                            </React.Fragment>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </Category>
        </Block>
    );
}

/* ── STYLES ── */

const rowStyle = {
    marginLeft: 22,
    marginTop: 12,
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    alignItems: "center"
};

const inputStyle = {
    width: 95,
    padding: "6px 8px",
    fontSize: 12,
    borderRadius: 6,
    border: "1px solid #333",
    background: "#000",
    color: "#fff"
};

/* Calorie output box — inline: "181 KCAL" */
const calBoxStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: "6px 10px",
    borderRadius: 6,
    border: "1px solid #333",
    background: "#000",
    userSelect: "none"
};

/* Both value and label share the same gradient */
const gradientText = {
    background: "linear-gradient(to top, rgba(253,207,88,1) 0%, rgba(255,0,0,1) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
};

const calValueStyle = {
    fontSize: 13,
    fontWeight: 700,
    ...gradientText
};

const calLabelStyle = {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#fff"
};

/* Gradient sets x reps label */
const setsRepsStyle = {
    marginLeft: 4,  // reduced from 10
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.02em",
    background: "linear-gradient(to top, rgba(253,207,88,1) 0%, rgba(255,0,0,1) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    whiteSpace: "nowrap",
    userSelect: "none"
};
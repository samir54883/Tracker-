import React from "react";
import { Block, BlockHeader, Category, TaskRow } from "../components/UI";

export default function GymBlock({
                                     segment,
                                     state,
                                     toggle,
                                     setWeight,
                                     setWarmup,
                                     dateKey
                                 }) {
    return (
        <Block>
            <BlockHeader>{segment.header}</BlockHeader>

            <Category>
                {segment.items.map((item, index) => {
                    const id = `${dateKey}_${segment.header}_${index}`;

                    const checked = !!state.checks?.[id];

                    return (
                        <div key={id} style={{ marginBottom: 10 }}>
                            {/* MAIN CHECKBOX */}
                            <TaskRow>
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => toggle(id)}
                                />
                                <span className="box"></span>
                                {item.name}
                            </TaskRow>

                            {/* ===== WARMUP INPUTS ===== */}
                            {checked && item.type === "warmup" && (
                                <div style={rowStyle}>
                                    <input
                                        placeholder="Speed"
                                        value={state.warmup?.speed || ""}
                                        onChange={(e) =>
                                            setWarmup("speed", e.target.value)
                                        }
                                        style={inputStyle}
                                    />
                                    <input
                                        placeholder="Time"
                                        value={state.warmup?.time || ""}
                                        onChange={(e) =>
                                            setWarmup("time", e.target.value)
                                        }
                                        style={inputStyle}
                                    />
                                </div>
                            )}

                            {/* ===== EXERCISE WEIGHTS ===== */}
                            {checked && item.type === "exercise" && (
                                <div style={rowStyle}>
                                    {Array.from({ length: item.sets }).map((_, i) => (
                                        <input
                                            key={i}
                                            placeholder={`Set ${i + 1}`}
                                            value={
                                                state.weights?.[item.name]?.[i] || ""
                                            }
                                            onChange={(e) =>
                                                setWeight(
                                                    item.name,
                                                    i,
                                                    e.target.value
                                                )
                                            }
                                            style={inputStyle}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </Category>
        </Block>
    );
}

/* ===== Layout for input row ===== */
const rowStyle = {
    marginLeft: 22,
    marginTop: 6,
    display: "flex",
    gap: 10,
    flexWrap: "wrap"
};

/* ===== Input style ===== */
const inputStyle = {
    width: 95,
    padding: "5px 7px",
    fontSize: 12,
    borderRadius: 6,
    border: "1px solid #333",
    background: "#000",
    color: "#fff"
};

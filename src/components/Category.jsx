import React from "react";
import WaitTimer from "./WaitTimer";
import { waitTimes } from "../data/waitTimes";
import { TaskRow } from "./UI";   // 🔥 IMPORTANT: use styled checkbox

export default function Category({
                                     block,
                                     name,
                                     tasks,
                                     state,
                                     toggle,
                                     dateKey,
                                 }) {
    if (!tasks) return null;

    return (
        <div style={{ padding: "10px 14px" }}>
            <div
                style={{
                    fontSize: 13,
                    opacity: 0.7,
                    marginBottom: 4,
                }}
            >
                {name}
            </div>

            {tasks.map((task, index) => {
                // 🔒 UNIQUE ID PER DAY + BLOCK + CATEGORY + POSITION
                const id = `${dateKey}_${block}_${name}_${index}`;

                /* ===== TIMER RULE LOGIC ===== */

                let timer = waitTimes?.[block]?.[name]?.[task] ?? null;

                // Special rule:
                // Show Face Wash timer ONLY if Retinol exists in Night routine
                if (
                    block === "Night" &&
                    name === "Skin" &&
                    task === "Face Wash"
                ) {
                    if (!tasks.includes("Retinol")) {
                        timer = null;
                    }
                }

                return (
                    <React.Fragment key={id}>
                        {/* 🔥 Styled checkbox replaces native blue checkbox */}
                        <TaskRow>
                            <input
                                type="checkbox"
                                checked={!!state[id]}
                                onChange={() => toggle(id)}
                            />
                            <span className="box"></span>
                            {task}
                        </TaskRow>




                        {timer && <WaitTimer seconds={timer} />}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

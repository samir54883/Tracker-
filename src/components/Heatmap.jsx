import React, { useMemo, useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { listenDayRealtime } from "../cloudSync";

/* ================= LAYOUT ================= */

const Wrapper = styled.div`
    margin-top: 18px;
    width: 100%;
    display: flex;
    justify-content: center;
    overflow-x: auto;
`;

const Inner = styled.div`
    display: flex;
    gap: 6px;
    width: max-content;
`;

const Weekdays = styled.div`
    display: grid;
    grid-template-rows: repeat(7, 14px);
    gap: 4px;
    font-size: 11px;
    opacity: 0.6;
    padding-top: 18px;
`;

const Right = styled.div``;

const MonthRow = styled.div`
    display: grid;
    grid-template-columns: repeat(${({ cols }) => cols}, 14px);
    gap: 4px;
    margin-bottom: 6px;
    font-size: 11px;
    opacity: 0.6;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(${({ cols }) => cols}, 14px);
    grid-template-rows: repeat(7, 14px);
    gap: 4px;
`;

const Cell = styled.div`
    width: 14px;
    height: 14px;
    border-radius: 3px;
    background: ${({ shade, theme }) =>
            shade === 0
                    ? theme.border
                    : `rgba(74,222,128, ${0.22 + shade * 0.18})`};
    cursor: pointer;

    &:hover {
        transform: scale(1.15);
    }
`;

const Tooltip = styled.div`
    position: fixed;
    pointer-events: none;
    background: ${({ theme }) => theme.card};
    border: 1px solid ${({ theme }) => theme.border};
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 12px;
    transform: translate(-50%, -120%);
    white-space: nowrap;
    z-index: 999;
`;

/* ================= HELPERS ================= */

function localMidnight(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function formatKey(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
}

function getShade(progress) {
    if (!progress) return 0;
    if (progress < 25) return 1;
    if (progress < 50) return 2;
    if (progress < 75) return 3;
    return 4;
}

/* ================= COMPONENT ================= */

export default function Heatmap({ onJump }) {
    const containerRef = useRef(null);
    const tooltipRef = useRef(null);
    const listenersRef = useRef([]);

    const [history, setHistory] = useState({});

    const today = localMidnight(new Date());

    /* ===== Load local cache instantly ===== */

    useEffect(() => {
        const local =
            JSON.parse(localStorage.getItem("routine_history")) || {};
        setHistory(local);
    }, []);

    /* ===== Build calendar grid ===== */

    const { grid, cols, months } = useMemo(() => {
        const start = new Date(today);
        start.setDate(start.getDate() - 225);

        const startDay = (start.getDay() + 6) % 7;
        start.setDate(start.getDate() - startDay);

        const end = new Date(today);
        end.setDate(end.getDate() + 225);

        const endDay = (end.getDay() + 6) % 7;
        end.setDate(end.getDate() + (6 - endDay));

        const days = [];
        const cursor = new Date(start);

        while (cursor <= end) {
            days.push(new Date(cursor));
            cursor.setDate(cursor.getDate() + 1);
        }

        const weeks = Math.ceil(days.length / 7);

        const g = Array.from({ length: 7 }, () =>
            Array(weeks).fill(null)
        );

        days.forEach((d, i) => {
            const col = Math.floor(i / 7);
            const row = (d.getDay() + 6) % 7;
            g[row][col] = d;
        });

        /* Month labels */
        const monthLabels = [];
        let lastMonth = -1;

        for (let col = 0; col < weeks; col++) {
            for (let row = 0; row < 7; row++) {
                const d = g[row][col];
                if (!d) continue;

                const m = d.getMonth();
                if (m !== lastMonth) {
                    monthLabels.push({
                        col,
                        label: d.toLocaleDateString("en-US", {
                            month: "short",
                        }),
                    });
                    lastMonth = m;
                }
                break;
            }
        }

        return { grid: g, cols: weeks, months: monthLabels };
    }, [today]);

    /* ===== REALTIME CLOUD SYNC ===== */

    useEffect(() => {
        if (!grid) return;

        // remove old listeners
        listenersRef.current.forEach((u) => u());
        listenersRef.current = [];

        const updated = { ...history };

        grid.forEach((row) => {
            row.forEach((date) => {
                if (!date) return;

                const key = formatKey(date);

                const unsubscribe = listenDayRealtime(key, (data) => {
                    if (!data) return;

                    updated[key] = data;
                    setHistory({ ...updated });

                    // keep local cache synced
                    const local =
                        JSON.parse(
                            localStorage.getItem("routine_history")
                        ) || {};
                    local[key] = data;
                    localStorage.setItem(
                        "routine_history",
                        JSON.stringify(local)
                    );
                });

                listenersRef.current.push(unsubscribe);
            });
        });

        return () => {
            listenersRef.current.forEach((u) => u());
            listenersRef.current = [];
        };
    }, [grid]);

    /* ===== Tooltip ===== */

    function showTip(e, text) {
        const tip = tooltipRef.current;
        if (!tip) return;
        tip.style.display = "block";
        tip.textContent = text;
        tip.style.left = e.clientX + "px";
        tip.style.top = e.clientY + "px";
    }

    function hideTip() {
        if (tooltipRef.current)
            tooltipRef.current.style.display = "none";
    }

    /* ===== Center today ===== */

    useEffect(() => {
        if (!containerRef.current) return;
        containerRef.current.scrollLeft =
            containerRef.current.scrollWidth / 2 -
            containerRef.current.clientWidth / 2;
    }, []);

    /* ================= RENDER ================= */

    return (
        <Wrapper ref={containerRef}>
            <Inner>
                <Weekdays>
                    <div>Mon</div>
                    <div></div>
                    <div>Wed</div>
                    <div></div>
                    <div>Fri</div>
                    <div></div>
                    <div>Sun</div>
                </Weekdays>

                <Right>
                    <MonthRow cols={cols}>
                        {Array.from({ length: cols }).map((_, col) => {
                            const m = months.find((x) => x.col === col);
                            return <div key={col}>{m ? m.label : ""}</div>;
                        })}
                    </MonthRow>

                    <Grid cols={cols}>
                        {grid.map((row) =>
                            row.map((date) => {
                                if (!date) return <div key={Math.random()} />;

                                const key = formatKey(date);
                                const progress =
                                    history?.[key]?.progress || 0;
                                const shade = getShade(progress);

                                return (
                                    <Cell
                                        key={key}
                                        shade={shade}
                                        onMouseMove={(e) =>
                                            showTip(
                                                e,
                                                `${key} • ${progress}%`
                                            )
                                        }
                                        onMouseLeave={hideTip}
                                        onClick={() => onJump?.(key)}
                                    />
                                );
                            })
                        )}
                    </Grid>
                </Right>

                <Tooltip ref={tooltipRef} style={{ display: "none" }} />
            </Inner>
        </Wrapper>
    );
}

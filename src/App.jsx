import React, { useState, useEffect } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { darkTheme, lightTheme } from "./styles/theme";
import { weeklyRoutine } from "./data/weeklyRoutine";

import Header from "./components/Header";
import RoutineBlock from "./components/RoutineBlock";
import ProgressCard from "./components/ProgressCard";
import Heatmap from "./components/Heatmap";

import { Container, Grid } from "./components/UI";

import useLocalState from "./hooks/useLocalState";
import useProgress from "./hooks/useProgress";
import useStreak from "./hooks/useStreak";
import { saveDayToCloud, loadDayFromCloud } from "./cloudSync";

/* ================= GLOBAL THEME ================= */

const Global = createGlobalStyle`
    html, body, #root {
        height: 100%;
    }

    body {
        margin: 0;
        background: ${({ theme }) => theme.bg};
        color: ${({ theme }) => theme.text};
        transition: background 0.25s ease, color 0.25s ease;
    }
`;

/* ================= DATE ENGINE ================= */

function getLocalDateKey(offset = 0) {
    const now = new Date();
    now.setDate(now.getDate() + offset);

    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");

    return `${y}-${m}-${d}`;
}

export default function App() {
    const [offset, setOffset] = useState(0);
    const [themeMode, setThemeMode] = useState("dark");

    const theme = themeMode === "dark" ? darkTheme : lightTheme;

    /* ---------- DATE ENGINE ---------- */

    const [todayKey, setTodayKey] = useState(getLocalDateKey(0));
    const key = getLocalDateKey(offset);

    useEffect(() => {
        const interval = setInterval(() => {
            const newKey = getLocalDateKey(0);
            if (newKey !== todayKey) {
                setTodayKey(newKey);
                setOffset(0);
            }
        }, 20000);

        return () => clearInterval(interval);
    }, [todayKey]);

    const dateObj = new Date(key);
    const dayName = dateObj.toLocaleDateString("en-US", {
        weekday: "long",
    });

    const routine = weeklyRoutine[dayName];

    /* ---------- STORAGE ---------- */

    const { state, toggle, locked } = useLocalState(key);
    const { progress } = useProgress(routine, state, key);
    const streak = useStreak(progress, key);

    /* ---------- HEATMAP JUMP ---------- */

    function jumpToDate(targetKey) {
        const today = new Date(getLocalDateKey(0));
        const target = new Date(targetKey);

        const diff = Math.floor(
            (target - today) / (1000 * 60 * 60 * 24)
        );

        setOffset(diff);
    }

    /* ---------- CLOUD SAVE ---------- */

    useEffect(() => {
        saveDayToCloud(key, {
            date: key,
            progress,
            streak,
            updatedAt: Date.now(),
        });
    }, [progress, streak, key]);

    /* ---------- AUTO LOCK YESTERDAY ---------- */

    useEffect(() => {
        const yesterdayKey = getLocalDateKey(-1);

        async function lockYesterday() {
            const data = await loadDayFromCloud(yesterdayKey);
            if (data && !data.locked) {
                await saveDayToCloud(yesterdayKey, {
                    ...data,
                    locked: true,
                    lockedAt: Date.now(),
                });
            }
        }

        lockYesterday();
    }, []);

    /* ---------- OFFLINE HISTORY + STREAK CACHE ---------- */

    useEffect(() => {
        const historyKey = "routine_history";
        const streakCacheKey = "streak_cache";

        const history = JSON.parse(localStorage.getItem(historyKey) || "{}");
        const streakCache = JSON.parse(localStorage.getItem(streakCacheKey) || "{}");

        history[key] = {
            progress,
            updatedAt: Date.now(),
        };

        // store streak snapshot per day (for instant streak)
        streakCache[key] = {
            progress,
            updatedAt: Date.now(),
        };

        localStorage.setItem(historyKey, JSON.stringify(history));
        localStorage.setItem(streakCacheKey, JSON.stringify(streakCache));
    }, [key, progress]);

    /* ================= UI ================= */

    return (
        <ThemeProvider theme={theme}>
            <Global />

            <Container>
                <Header
                    date={dateObj}
                    offset={offset}
                    setOffset={setOffset}
                    themeMode={themeMode}
                    setThemeMode={setThemeMode}
                />

                <Grid>
                    {/* Morning */}
                    <RoutineBlock
                        title="Morning"
                        block={routine.morning}
                        state={state}
                        toggle={toggle}
                        locked={locked}
                        dateKey={key}
                    />

                    {/* Oil */}
                    {routine.oil && (
                        <RoutineBlock
                            title="Oil"
                            block={{
                                time: routine.oil.time,
                                hair: routine.oil.tasks,
                            }}
                            state={state}
                            toggle={toggle}
                            locked={locked}
                            dateKey={key}
                        />
                    )}

                    {/* Shower */}
                    {routine.shower && (
                        <RoutineBlock
                            title="Shower"
                            block={{
                                time: routine.shower.time,
                                hair: routine.shower.tasks,
                            }}
                            state={state}
                            toggle={toggle}
                            locked={locked}
                            dateKey={key}
                        />
                    )}

                    {/* Afternoon */}
                    {routine.afternoon && (
                        <RoutineBlock
                            title="Afternoon"
                            block={routine.afternoon}
                            state={state}
                            toggle={toggle}
                            locked={locked}
                            dateKey={key}
                        />
                    )}

                    {/* Night */}
                    <RoutineBlock
                        title="Night"
                        block={routine.night}
                        state={state}
                        toggle={toggle}
                        locked={locked}
                        dateKey={key}
                    />
                </Grid>

                {/* Progress */}
                <ProgressCard progress={progress} streak={streak} />

                {/* Heatmap */}
                <Heatmap onJump={jumpToDate} />

                <div style={{ height: 36 }} />
            </Container>
        </ThemeProvider>
    );
}

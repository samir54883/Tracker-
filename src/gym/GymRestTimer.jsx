import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Time = styled.div`
    font-size: 11px;
    font-family: "SFMono", monospace;
    opacity: 0.9;
    min-width: 34px;
    text-align: center;
`;

/* 🔔 Beep */
function playBeep() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    const beep = (delay = 0) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.value = 880;
        gain.gain.value = 0.18;

        osc.connect(gain);
        gain.connect(ctx.destination);

        const startTime = ctx.currentTime + delay;
        osc.start(startTime);
        osc.stop(startTime + 0.18);
    };

    beep(0);
    beep(0.28);
}

export default function GymRestTimer({ seconds, trigger }) {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const timerRef = useRef(null);

    /* START ONLY WHEN TRIGGER CHANGES */
    useEffect(() => {
        if (!trigger || seconds <= 0) return;

        clearInterval(timerRef.current);
        setTime(seconds);
        setRunning(true);
    }, [trigger, seconds]);

    /* COUNTDOWN */
    useEffect(() => {
        if (!running) return;

        if (time <= 0) {
            playBeep();
            clearInterval(timerRef.current);
            timerRef.current = null;
            setRunning(false);
            return;
        }

        timerRef.current = setInterval(() => {
            setTime((t) => Math.max(0, t - 1));
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [time, running]);

    if (!running) return null;

    const m = Math.floor(time / 60);
    const s = time % 60;
    const formatted = `${m}:${s.toString().padStart(2, "0")}`;

    return <Time>{formatted}</Time>;
}

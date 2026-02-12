import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 6px 0;
`;

const Line = styled.div`
    flex: 1;
    border-bottom: 2px dotted ${({ theme }) => theme.border};
`;

const Play = styled.button`
    border: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text};
    border-radius: 8px;
    padding: 2px 8px;
    cursor: pointer;
`;

/* 🔔 WebAudio Beep (no file needed) */
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
        osc.stop(startTime + 0.18); // beep length
    };

    beep(0);      // first beep
    beep(0.28);   // second beep after short gap
}


export default function WaitTimer({ seconds }) {
    const [time, setTime] = useState(0);
    const timerRef = useRef(null);

    useEffect(() => {
        if (time <= 0) {
            if (time === 0 && timerRef.current) {
                playBeep(); // 🔔 play sound when finished
            }
            clearInterval(timerRef.current);
            timerRef.current = null;
            return;
        }

        timerRef.current = setInterval(() => {
            setTime((t) => Math.max(0, t - 1));
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [time]);

    const start = () => {
        clearInterval(timerRef.current);
        setTime(seconds);
    };

    const format = (s) => {
        const m = Math.floor(s / 60);
        const r = s % 60;
        return `${m}:${r.toString().padStart(2, "0")}`;
    };

    return (
        <Row>
            <Line />
            <Play onClick={start}>
                {time > 0 ? format(time) : "▶"}
            </Play>
            <Line />
        </Row>
    );
}

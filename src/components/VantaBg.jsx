// src/components/VantaBg.jsx
// Drop-in Vanta CELLS background with red/black palette, bright side bottom-right.
// Usage: render <VantaBg /> as the first child inside your root layout/App wrapper.

import { useEffect, useRef } from "react";

const VANTA_CDN = {
    three: "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js",
    cells: "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.cells.min.js",
};

function loadScript(src) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
        }
        const s = document.createElement("script");
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
    });
}

export default function VantaBg() {
    const containerRef = useRef(null);
    const vantaRef = useRef(null);

    useEffect(() => {
        let cancelled = false;

        async function init() {
            try {
                await loadScript(VANTA_CDN.three);
                await loadScript(VANTA_CDN.cells);

                if (cancelled || !containerRef.current) return;

                vantaRef.current = window.VANTA.CELLS({
                    el: containerRef.current,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.0,
                    minWidth: 200.0,
                    scale: 1.0,

                    // Red/black palette matching your dark theme:
                    // color1 = the "dark cell" color → near-black red
                    // color2 = the "bright glow" color → deep crimson
                    color1: 0x0d0000,   // near-black red (matches your #0b0000–#170000 range)
                    color2: 0x7a0000,   // deep crimson  (matches your #650000–#8a0000 range)

                    size: 0.9,
                    speed: 1.0,
                });
            } catch (err) {
                console.warn("Vanta failed to load, falling back to CSS gradient.", err);
            }
        }

        init();

        return () => {
            cancelled = true;
            if (vantaRef.current) {
                vantaRef.current.destroy();
                vantaRef.current = null;
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: -1,
                width: "100vw",
                height: "100vh",
                // Flip 180° so the brighter/warmer clusters sit bottom-right
                transform: "scale(1, -1)",
                // Keep it behind everything
                pointerEvents: "none",
            }}
        />
    );
}
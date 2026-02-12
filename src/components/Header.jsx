import React from "react";
import { Button } from "./UI";
import styled from "styled-components";

/* ---------- LAYOUT ---------- */

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr auto auto;
    align-items: center;
    gap: 14px;
    margin-bottom: 20px;
`;

const NavGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;        /* space between arrows & Today */
`;

/* ---------- HEADER ---------- */

export default function Header({
                                   date,
                                   offset,
                                   setOffset,
                                   themeMode,
                                   setThemeMode,
                               }) {
    return (
        <Wrapper>
            <div>
                <b>Routine Tracker</b>
                <div style={{ fontSize: 13, opacity: 0.6 }}>
                    {date.toDateString()}
                </div>
            </div>

            <NavGroup>
                <Button onClick={() => setOffset(offset - 1)}>⬅</Button>
                <Button onClick={() => setOffset(0)}>Today</Button>
                <Button onClick={() => setOffset(offset + 1)}>➡</Button>
            </NavGroup>

            <Button
                onClick={() =>
                    setThemeMode(themeMode === "dark" ? "light" : "dark")
                }
            >
                Theme
            </Button>
        </Wrapper>
    );
}

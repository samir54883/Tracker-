import React from "react";
import { Button } from "./UI";
import styled from "styled-components";

/* ---------- LAYOUT ---------- */

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;   /* removed third column */
    align-items: center;
    gap: 14px;
    margin-bottom: 20px;
`;

const Title = styled.div`
    font-family: "Abocat", system-ui, sans-serif;
    font-size: 24px;
    letter-spacing: 0.5px;
`;

const NavGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

/* ---------- HEADER ---------- */

export default function Header({
                                   date,
                                   offset,
                                   setOffset,
                               }) {
    return (
        <Wrapper>
            {/* Left: Title + Date */}
            <div>
                <Title>Tracker</Title>
                <div style={{ fontSize: 13, opacity: 0.6 }}>
                    {date.toDateString()}
                </div>
            </div>

            {/* Right: Navigation */}
            <NavGroup>
                <Button onClick={() => setOffset(offset - 1)}>⬅</Button>
                <Button onClick={() => setOffset(0)}>Today</Button>
                <Button onClick={() => setOffset(offset + 1)}>➡</Button>
            </NavGroup>
        </Wrapper>
    );
}

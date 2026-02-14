import React from "react";
import styled from "styled-components";

const Card = styled.div`
    margin-top: 18px;
    margin-bottom: 24px;   /* GAP AFTER BAR */
    padding: 12px;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.card};

    /* ALL TEXT → SFMono-Semi */
    font-family: "SFMono-Semi", monospace;
    font-size: 14.4px;

`;



const Bar = styled.div`
    height: 8px;
    background: ${({ theme }) => theme.border};
    border-radius: 6px;
    overflow: hidden;
`;

const Fill = styled.div`
    height: 100%;
    width: ${({ v }) => v}%;
    background: ${({ theme }) => theme.accent};
`;

export default function ProgressCard({ progress, streak }) {
    return (
        <Card>
            <Bar>
                <Fill v={progress} />
            </Bar>

            <div style={{ marginTop: 6 }}>
                {progress}% completed • 🔥 {streak} day streak
            </div>
        </Card>
    );
}

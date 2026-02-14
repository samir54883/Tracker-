import React from "react";
import { Button } from "./UI";
import styled from "styled-components";
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";

/* ---------- LAYOUT ---------- */

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 14px;
    margin-bottom: 20px;
`;

const ArrowButton = styled(Button)`
    padding: 6px 5px;   /* smaller horizontal padding */
`;

const TodayButton = styled(Button)`
    font-family: "Runtime", system-ui, sans-serif;
    font-size: 14px;
    letter-spacing: 0.3px;
`;

const DateText = styled.div`
    font-family: "SFMono", monospace;
    font-size: 12px;   /* SAME */
    opacity: 0.6;        /* SAME */
    letter-spacing: -0.7px;   /* tighten monospace spacing */
    word-spacing: -3px;

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
                <DateText>
                    {date.toDateString()}
                </DateText>

            </div>

            {/* Right: Navigation */}
            <NavGroup>
                <ArrowButton onClick={() => setOffset(offset - 1)}>
                    <GoTriangleLeft size={20} />
                </ArrowButton>

                <TodayButton onClick={() => setOffset(0)}>
                    Today
                </TodayButton>


                <ArrowButton onClick={() => setOffset(offset + 1)}>
                    <GoTriangleRight size={20} />
                </ArrowButton>


                {/* 🏋️ Dumbbell Button */}
                <Button onClick={() => console.log("Gym clicked")}>
                    <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADH0lEQVR4nO2by2oUQRSGKwq6EAJuBCOCC2/4AOKFuNCoW1/AjQ+gO+PCZ3DvJeDWreAuXoKC7lSISZyN9KT+v2IcI0QRomhJQSdgMj3dNVWdLmbOD2czdNV89XFqhpmuVkoikUgkEolEIpFIJElHa32B5H0AcwBWAfwgOU/yntZ6YjsYAFx0DCQX3PvnHHPuNWPMedVEtNbHADwlaXsVgBeLi4tHamI4CmCmjIHktLu2DoYisNMkVyqArdcKgPGYDCTPeTJ8XVpaOqXqiLV2xG0lAA8BfADw2wNsA7Ddbh+OweO6wVPOejf/IvmO5AMAZ2Pt7+MV29hWAHweiSkWz4wx5lAIyDjJbzFgmJfrxAgfyNF43Pq01me8Qdx28JCzBuBmlmVjrgBMutcKrr0bIij/tgpl2Fwd96XjC/LKo1UnN4/PAbtdPx8oaCECQ7fxn5aXl/dXggBwyadNsywb2zyHe60AZDVEkBsfytCj3nY6ndFSCPcp79PGqnieriAhgnzn7GPrTc/Ozu4qg2j5tLGKtJgq8Z2zz6031RMCwHefNlaRFlMlvnP2u/UAXI4GURTP/R9UNbA99h48ZIK+iCD23GJ/RRD7nFMEUQQxZUEqICKoJCKoJCKoJCKoJCKoJEMhiDWUCKIIsiKIIui/iKBhFZSf0NgyoNvfl+12+0DKgoqYQzvI50/7WykLKmIOFTRVMGjNvWHobZ/tFFTEHCQoPxRVGS6Lc9MuqOpgKBSUm39ZdSIEtHGsqoOh9PBC0f0xbq2+2zhiRWdQZdFaX9vmRdqUqlRQ3qaPmgZlyoKyLNtLst00LFMVlG+1CQB/mgZmqoLyrXanaWCmLKjVau3OT4jaYSnlG5InSP5sGjxZQS4AbjQNnrQga+0IgCdNwycryMUYsw/A56YXkKwgFwBXml5A0oJKTsMORKnQGGP2kPzY9ELqqNDz3BsxxpzMn6IZNEFvVKyQvD2Agq5HE2St3elOqDe9qIj13v1yUDHT6XRGATwbBDla64Oqjlhrd5C86h6cc48YJbDYSpU/CPzabavonSORSCQSiUop/wBNN+xx7v4NUAAAAABJRU5ErkJggg=="
                        alt="gym"
                        width={20}
                        height={20}
                        style={{
                            display: "block",
                            imageRendering: "pixelated",   // 🔥 sharpest for small icons
                        }}
                    />
                </Button>


            </NavGroup>
        </Wrapper>
    );
}

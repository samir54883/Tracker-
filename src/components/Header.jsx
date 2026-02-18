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
    font-family: "Cavilenny", system-ui, sans-serif;
    font-size: 14px;
    font-weight: 800;
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
                                   setMode,
                                   mode,            // ← ADD
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
                <Button onClick={() => setMode(mode === "gym" ? "care" : "gym")}>
                    <img
                        src={
                            mode === "gym"
                                ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEyUlEQVR4nO2cv49UVRTHj4DUgImoCWwoEAyNdGioQJZEWDpKoUM6pFKpCJTSGLRAqPwDlMTCbIm7HXSEhGaByKAzLEtjghGED7nhLk7W2cm7792599wfn2STLXbefO/7vv3Om3vOOyKVSiUiwBHgD/szE1NL8QDrgD7/YX5fF1tXsQDT/J8DsXUVC3B5hCE/xNZVclw9HGHIoxpbeuKqxpayuKqxpSyuamwpjKsaW8riqsaWsriqsaUwrmpsKYurGlvK4qrGlsK4qrGlLK6WqbE1CYD1wGILQ8xr1k9EVGkAa4G9wLcr6h6uPAZ+NAWsak48E6o5ik2o5jS8hZ22H9Tm9jQ2j6yWad+3ymrr/gpNmLg5auv+9ioZkB4D4HCHde8bccz9fs9uO2Hm3zVVeh3W/d2I433v9+y2E/aAwgwB1qyybnNxrvF/lt3EzSQaWX3gUMs1fzTmuB/7P8vp3N66sjR0O/xmh/VeGPMeF0QTCs1Z8mHCijUujHm/u8AbopGI5iz5NmFoTbsbvP9u0U4Ac5YmZcKKdZxvoOW8pIRHc4KYMAxwq4GuW5IqKW2/Azsc9O2UVDHFphaGXIqg84yDvjOSKqYc28KQTyLovOGg74YU1OSwGHojD5gCXjheNNukkNiKEVencee0FBJbMeJqroUhc1JAbMWIq83Avy0MeQ68K5nHVoy4Okl7TkrmsRUjrmY7GDIrGcdWjLjaAPzTwZCnwCbJNLZixNVxunNcMo2tGHF11YMhVyXx2FpUElcbgSceDHmSY2xdCviZcdTuIv+FP/4GfgFOAG9LBrE1sbgC3gKO2RPW5QO8KeY7zTxwCnhPtBOiCQ3YCnwB/Ga/wMXiudVgtEyJVkwTm2216bXtDlmlnvE1cL3FRmEIXlhtRuMOyRFgF3DWcetcCwu2qrpXbeOEowm3yYd7Q+bEbcZzrNH3yJ/F0L0Ers3efcql36Vp3DuJN3tHbxr3TuLN3lkaMlMjy8/XAm9Q3of6Q7Uf6qOg3vbqhfrFUC/ANruhN6906wTbO2wuoA+kJIAtdivc7PA+i7y5aC6QL4HtMU+Imme8edXm87ltZjA18Enz1L6XuSA2x1y77me85XWV8Jgt3fqoFi5jjvWzPfZGSaAApW7+FbDJYwlXlwmpznbHT5PDT6KV1Ga746cN6DPRSmqz3fHTKJdcXGmPrdkOhvwqWkl1tjvdmq1PiFaAgw0WMC3KoNvjCO+IVoArDRZxWRRCuwd2rolWUp/tTrtH2k5J4nGlObamHDckzd9uFW2YAoo1w2ygNWXevkZV8QW3LfzrorSCN8hluihugwO+ii02+7m8wPsOesO3gpY4l5dmw2duhtSkbbTfIGQ9peF4pnOh9Gjth+oFXHeTAWYfhtIzLExTu839wGu/M0bLQkgtw6IOKWlQ6wOfBl77uCGY34TUkv1MxSaYUbBjtO0RDeQyU7HjIOWeyv6plGcqNsWMFR+h96Jox24qHnDcLZ2zr1G3ybiMGbw/Qvc+yXQelrpS7ioX2kBjK1PXCQ3RJza0xUbpA/uj65GAlOdhFYvWeVjFMiJ3k42rbNA2D6t4tM3DKp4xsVXjqsR5WBUF87Aq7g/s/FnjKjK2nnIf+D10PaNSqUhhvAQbC5m8EzmgPwAAAABJRU5ErkJggg=="
                                : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADH0lEQVR4nO2by2oUQRSGKwq6EAJuBCOCC2/4AOKFuNCoW1/AjQ+gO+PCZ3DvJeDWreAuXoKC7lSISZyN9KT+v2IcI0QRomhJQSdgMj3dNVWdLmbOD2czdNV89XFqhpmuVkoikUgkEolEIpFIJElHa32B5H0AcwBWAfwgOU/yntZ6YjsYAFx0DCQX3PvnHHPuNWPMedVEtNbHADwlaXsVgBeLi4tHamI4CmCmjIHktLu2DoYisNMkVyqArdcKgPGYDCTPeTJ8XVpaOqXqiLV2xG0lAA8BfADw2wNsA7Ddbh+OweO6wVPOejf/IvmO5AMAZ2Pt7+MV29hWAHweiSkWz4wx5lAIyDjJbzFgmJfrxAgfyNF43Pq01me8Qdx28JCzBuBmlmVjrgBMutcKrr0bIij/tgpl2Fwd96XjC/LKo1UnN4/PAbtdPx8oaCECQ7fxn5aXl/dXggBwyadNsywb2zyHe60AZDVEkBsfytCj3nY6ndFSCPcp79PGqnieriAhgnzn7GPrTc/Ozu4qg2j5tLGKtJgq8Z2zz6031RMCwHefNlaRFlMlvnP2u/UAXI4GURTP/R9UNbA99h48ZIK+iCD23GJ/RRD7nFMEUQQxZUEqICKoJCKoJCKoJCKoJCKoJEMhiDWUCKIIsiKIIui/iKBhFZSf0NgyoNvfl+12+0DKgoqYQzvI50/7WykLKmIOFTRVMGjNvWHobZ/tFFTEHCQoPxRVGS6Lc9MuqOpgKBSUm39ZdSIEtHGsqoOh9PBC0f0xbq2+2zhiRWdQZdFaX9vmRdqUqlRQ3qaPmgZlyoKyLNtLst00LFMVlG+1CQB/mgZmqoLyrXanaWCmLKjVau3OT4jaYSnlG5InSP5sGjxZQS4AbjQNnrQga+0IgCdNwycryMUYsw/A56YXkKwgFwBXml5A0oJKTsMORKnQGGP2kPzY9ELqqNDz3BsxxpzMn6IZNEFvVKyQvD2Agq5HE2St3elOqDe9qIj13v1yUDHT6XRGATwbBDla64Oqjlhrd5C86h6cc48YJbDYSpU/CPzabavonSORSCQSiUop/wBNN+xx7v4NUAAAAABJRU5ErkJggg=="
                        }
                        alt="mode"
                        width={20}
                        height={20}
                        style={{ display: "block", imageRendering: "pixelated" }}
                    />
                </Button>



            </NavGroup>
        </Wrapper>
    );
}

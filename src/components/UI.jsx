import styled from "styled-components";

/* ================= PAGE ================= */

export const Container = styled.div`
    min-height: 100vh;
    width: 100%;

    /* IMPORTANT — do NOT paint gradient twice */
    background: transparent;

    color: ${({ theme }) => theme.text};
    padding: 20px 26px 40px;
`;


/* ================= BUTTON ================= */

export const Button = styled.button`
    border: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text};

    padding: 8px 12px;   /* slightly tighter for icon buttons */
    height: 40px;
    border-radius: 10px;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: 0.15s ease;

    /* Ensures icons render perfectly centered */
    svg {
        display: block;
    }

    &:hover {
        opacity: 0.9;
        transform: translateY(-1px);
    }
`;


/* ================= GRID ================= */

export const Grid = styled.div`
    display: grid;
    gap: 18px;

    @media (min-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

/* ================= BLOCK ================= */

export const Block = styled.div`
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 14px;
    background: ${({ theme }) => theme.card};
`;

export const BlockHeader = styled.div`
    padding: 10px 14px;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    font-weight: 600;
`;

/* ================= CATEGORY ================= */
/* Used for Teeth / Hair / Skin / Chores */

export const Category = styled.div`
    padding: 10px 14px;
`;

export const CategoryTitle = styled.div`
    font-size: 13px;
    opacity: 0.7;
    margin-bottom: 6px;
`;

/* ================= TASK ROW ================= */

export const TaskRow = styled.label`
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 4px 0;
    cursor: pointer;
    position: relative;

    /* Hide native checkbox but keep logic */
    input[type="checkbox"] {
        position: absolute;
        opacity: 0;
        width: 14px;
        height: 14px;
        margin: 0;
        cursor: pointer;
    }

    /* Box */
    span.box {
        width: 14px;
        height: 14px;
        border-radius: 3px;
        border: 1px solid ${({ theme }) => theme.border};
        background: #000;
        position: relative;
        display: inline-block;
        box-sizing: border-box;
    }

    /* Fire gradient when checked */
    input[type="checkbox"]:checked + span.box {
        background: linear-gradient(
                to top,
                #FDCF58 0%,
                #FF0000 100%
        );
        border: none;
    }

    /* SVG Tick */
    /* SVG Tick */
    input[type="checkbox"]:checked + span.box::after {
        content: "";
        position: absolute;
        inset: 0;

        background-image: url("data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTSAyMSA1IEwgOSAxNyBMIDQgMTIgTCAwLjUgMTUuNSBMIDkgMjMuNSBMIDI2IDYuNSBaIi8+PC9zdmc+");
        background-repeat: no-repeat;

        /* move slightly right + down */
        background-position: 30% 40%;
        /* keep size */
        background-size: 75%;

        /* small rotation */
        transform: rotate(-9deg);

        pointer-events: none;
    }

`;





/* ================= CHORES STYLE ================= */
/* Slight visual difference so chores feel separate */

export const ChoreRow = styled(TaskRow)`
    opacity: 0.95;

    &:before {
        content: "🧺";
        margin-right: 2px;
        opacity: 0.8;
    }
`;

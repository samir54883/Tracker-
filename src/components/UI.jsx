import styled from "styled-components";

/* ================= PAGE ================= */

export const Container = styled.div`
    min-height: 100vh;
    width: 100%;
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};

    padding: 20px 26px 40px;   /* bottom breathing space */
`;

/* ================= BUTTON ================= */

export const Button = styled.button`
    border: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text};

    padding: 8px 14px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: 0.15s ease;

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

    input {
        cursor: pointer;
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

/* Gym uses separate namespace so it never mixes with care */

export function getGymDateKey(offset = 0) {
    const now = new Date();
    now.setDate(now.getDate() + offset);

    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");

    return `gym_${y}-${m}-${d}`;
}

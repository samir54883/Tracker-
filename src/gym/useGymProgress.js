export default function useGymProgress(routine, state, dateKey) {
    if (!routine || !state) return { progress: 0 };

    let total = 0;
    let done = 0;

    routine.segments.forEach((seg) => {
        seg.items.forEach((item, i) => {
            total++;

            const id = `${dateKey}_${seg.header}_${i}`;

            if (state.checks?.[id]) done++;
        });
    });

    const progress =
        total === 0 ? 0 : Math.round((done / total) * 100);

    return { progress };
}

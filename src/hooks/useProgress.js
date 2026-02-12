import { useMemo } from "react";

export default function useProgress(routine, state, dateKey) {

    const progress = useMemo(() => {
        if (!routine) return 0;

        let total = 0;
        let done = 0;

        function countTasks(blockName, sectionName, tasks) {
            if (!tasks) return;

            tasks.forEach((_, index) => {
                const id = `${dateKey}_${blockName}_${sectionName}_${index}`;
                total++;
                if (state[id]) done++;
            });
        }

        function processBlock(blockName, block) {
            if (!block) return;

            countTasks(blockName, "Teeth", block.teeth);
            countTasks(blockName, "Hair", block.hair);
            countTasks(blockName, "Skin", block.skin);
            countTasks(blockName, "Chores", block.chores);
        }

        processBlock("Morning", routine.morning);
        processBlock("Oil", routine.oil && { hair: routine.oil.tasks });
        processBlock("Shower", routine.shower && { hair: routine.shower.tasks });
        processBlock("Afternoon", routine.afternoon);
        processBlock("Night", routine.night);

        if (total === 0) return 0;

        return Math.round((done / total) * 100);
    }, [routine, state, dateKey]);

    return { progress };
}

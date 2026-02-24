const EXTRA_CARDIO = {
    header: "Extra Cardio",
    items: [
        { type: "warmup", name: "Treadmill", duration: "(optional)" }
    ]
};

export const gymRoutine = {
    Monday: null,

    Tuesday: {
        title: "DAY 1 — PUSH (STRENGTH)",
        segments: [
            {
                header: "Day 1 — Push (Strength)",
                items: [
                    { type: "warmup",   name: "Treadmill Warm-up", duration: "10 min" },

                    { type: "exercise", name: "Smith Incline Press",       sets: 4, reps: "5 – 8"         },
                    { type: "exercise", name: "Incline Plate Chest Press", sets: 3, reps: "6 – 8"         },
                    { type: "exercise", name: "Pec Deck Fly",              sets: 3, reps: "10 – 12"       },
                    { type: "exercise", name: "Cable Crunch",              sets: 2, reps: "15"            },
                    { type: "exercise", name: "Side Plank",                sets: 2, reps: "30 – 40s/side" }
                ]
            },
            {
                header: "Intra-Workout Break",
                items: [
                    { type: "checkbox", name: "Drank electrolyte drink" }
                ]
            },
            {
                header: "Final Segment",
                items: [
                    { type: "exercise", name: "Lever Shoulder Press",  sets: 4, reps: "5 – 8"   },
                    { type: "exercise", name: "Cable Lateral Raise",   sets: 3, reps: "12 – 15" },
                    { type: "exercise", name: "Rope Pushdown",         sets: 3, reps: "8 – 10"  },
                    { type: "exercise", name: "Assisted Tricep Dips",  sets: 3, reps: "6 – 8"   },
                    { type: "exercise", name: "Crunch Machine",        sets: 2, reps: "12 – 15" },
                    { type: "exercise", name: "Seated Calf Raise",     sets: 2, reps: "12 – 15" }
                ]
            },
            EXTRA_CARDIO
        ]
    },

    Wednesday: {
        title: "DAY 2 — PULL (STRENGTH)",
        segments: [
            {
                header: "Day 2 — Pull (Strength)",
                items: [
                    { type: "warmup",   name: "Treadmill Warm-up", duration: "10 min" },

                    { type: "exercise", name: "Wide-Grip Pulldown",  sets: 3, reps: "5"      },
                    { type: "exercise", name: "Close-Grip Pulldown", sets: 2, reps: "5"      },
                    { type: "exercise", name: "Assisted Pull-Ups",   sets: 3, reps: "6 – 8"  },
                    { type: "exercise", name: "Chin-Ups",            sets: 3, reps: "6 – 8"  },
                    { type: "exercise", name: "Cable Crunch",        sets: 2, reps: "15"     },
                    { type: "exercise", name: "Machine T-Bar Row",   sets: 4, reps: "5 – 6"  }
                ]
            },
            {
                header: "Intra-Workout Break",
                items: [
                    { type: "checkbox", name: "Drank electrolyte drink" }
                ]
            },
            {
                header: "Final Segment",
                items: [
                    { type: "exercise", name: "Seated Cable Row",  sets: 4, reps: "6 – 8"   },
                    { type: "exercise", name: "Reverse Pec Deck",  sets: 4, reps: "10 – 12" },
                    { type: "exercise", name: "Hyperextensions",   sets: 3, reps: "10 – 12" },
                    { type: "exercise", name: "Crunch Machine",    sets: 3, reps: "12 – 15" },
                    { type: "exercise", name: "Preacher Curl",     sets: 4, reps: "6 – 8"   }
                ]
            },
            EXTRA_CARDIO
        ]
    },

    Thursday: {
        title: "DAY 3 — LEGS (STRENGTH)",
        segments: [
            {
                header: "Day 3 — Legs (Strength)",
                items: [
                    { type: "warmup",   name: "Treadmill Warm-up", duration: "10 min" },

                    { type: "exercise", name: "Hack Squat",    sets: 5, reps: "5"       },
                    { type: "exercise", name: "Smith Squat",   sets: 4, reps: "6 – 8"   },
                    { type: "exercise", name: "Leg Extension", sets: 4, reps: "8 – 10"  }
                ]
            },
            {
                header: "Intra-Workout Break",
                items: [
                    { type: "checkbox", name: "Drank electrolyte drink" }
                ]
            },
            {
                header: "Final Segment",
                items: [
                    { type: "exercise", name: "Cable Crunch",      sets: 2, reps: "15"      },
                    { type: "exercise", name: "Lying Leg Curl",    sets: 4, reps: "6 – 8"   },
                    { type: "exercise", name: "Hip Abductor",      sets: 3, reps: "15 – 20" },
                    { type: "exercise", name: "Crunch Machine",    sets: 3, reps: "12 – 15" },
                    { type: "exercise", name: "Seated Calf Raise", sets: 4, reps: "10 – 12" }
                ]
            },
            EXTRA_CARDIO
        ]
    },

    Friday: {
        title: "DAY 4 — PUSH (HYPERTROPHY)",
        segments: [
            {
                header: "Day 4 — Push (Hypertrophy)",
                items: [
                    { type: "warmup",   name: "Treadmill Warm-up", duration: "8 – 10 min" },

                    { type: "exercise", name: "Incline Chest Press",    sets: 4, reps: "10 – 12"      },
                    { type: "exercise", name: "Flat Chest Press",       sets: 3, reps: "10 – 12"      },
                    { type: "exercise", name: "Pec Deck Fly",           sets: 3, reps: "12 – 15"      },
                    { type: "exercise", name: "Cable Fly (Low → High)", sets: 2, reps: "15"           },
                    { type: "exercise", name: "Seated Shoulder Press",  sets: 3, reps: "10 – 12"      }
                ]
            },
            {
                header: "Intra-Workout Break",
                items: [
                    { type: "checkbox", name: "Drank electrolyte drink" }
                ]
            },
            {
                header: "Final Segment",
                items: [
                    { type: "exercise", name: "Cable Lateral Raise",  sets: 5, reps: "12 – 15"      },
                    { type: "exercise", name: "Rope Pushdown",        sets: 3, reps: "12 – 15"      },
                    { type: "exercise", name: "Assisted Tricep Dips", sets: 3, reps: "8 – 12"       },
                    { type: "exercise", name: "Crunch Machine",       sets: 3, reps: "12 – 15"      },
                    { type: "exercise", name: "Cable Woodchopper",    sets: 1, reps: "12/side"      },
                    { type: "exercise", name: "Side Plank",           sets: 2, reps: "30 – 40s/side"}
                ]
            },
            EXTRA_CARDIO
        ]
    },

    Saturday: {
        title: "DAY 5 — PULL (HYPERTROPHY + FOREARMS)",
        segments: [
            {
                header: "Day 5 — Pull (Hypertrophy)",
                items: [
                    { type: "warmup",   name: "Treadmill Warm-up", duration: "8 – 10 min" },

                    { type: "exercise", name: "Wide-Grip Pulldown",    sets: 4, reps: "10 – 12" },
                    { type: "exercise", name: "Close-Grip Pulldown",   sets: 3, reps: "10 – 12" },
                    { type: "exercise", name: "Seated Cable Row",      sets: 3, reps: "12"      },
                    { type: "exercise", name: "Machine Row",           sets: 2, reps: "10 – 12" },
                    { type: "exercise", name: "Straight-Arm Pulldown", sets: 3, reps: "12 – 15" }
                ]
            },
            {
                header: "Intra-Workout Break",
                items: [
                    { type: "checkbox", name: "Drank electrolyte drink" }
                ]
            },
            {
                header: "Final Segment",
                items: [
                    { type: "exercise", name: "Reverse Pec Deck",    sets: 3, reps: "12 – 15" },
                    { type: "exercise", name: "Cable Lateral Raise", sets: 2, reps: "15 – 20" },
                    { type: "exercise", name: "Hyperextensions",     sets: 3, reps: "12 – 15" },
                    { type: "exercise", name: "Preacher Curl",       sets: 3, reps: "10 – 12" },
                    { type: "exercise", name: "Cable Curl",          sets: 3, reps: "12 – 15" },
                    { type: "exercise", name: "Hammer Curl",         sets: 1, reps: "12"      },
                    { type: "exercise", name: "Wrist Curl",          sets: 3, reps: "20"      },
                    { type: "exercise", name: "Reverse Wrist Curl",  sets: 3, reps: "20"      },
                    { type: "exercise", name: "Dead Hang",           sets: 2, reps: "max"     }
                ]
            },
            EXTRA_CARDIO
        ]
    },

    Sunday: {
        title: "DAY 6 — LEGS (HYPERTROPHY)",
        segments: [
            {
                header: "Day 6 — Legs (Hypertrophy)",
                items: [
                    { type: "warmup",   name: "Treadmill Warm-up", duration: "8 – 10 min" },

                    { type: "exercise", name: "Romanian Deadlift", sets: 3, reps: "6 – 8"   },
                    { type: "exercise", name: "Hack Squat",        sets: 4, reps: "10 – 12" },
                    { type: "exercise", name: "Smith Squat",       sets: 3, reps: "10 – 12" },
                    { type: "exercise", name: "Leg Extension",     sets: 3, reps: "15"      },
                    { type: "exercise", name: "Lying Leg Curl",    sets: 4, reps: "10 – 12" }
                ]
            },
            {
                header: "Intra-Workout Break",
                items: [
                    { type: "checkbox", name: "Drank electrolyte drink" }
                ]
            },
            {
                header: "Final Segment",
                items: [
                    { type: "exercise", name: "Hip Abductor",      sets: 3, reps: "15 – 20" },
                    { type: "exercise", name: "Seated Calf Raise", sets: 4, reps: "12 – 15" },
                    { type: "exercise", name: "Cable Crunch",      sets: 3, reps: "15"      }
                ]
            },
            EXTRA_CARDIO
        ]
    }
};

export const darkTheme = {
    bg: `
      linear-gradient(
        155deg,
        #000000 0%,
        #0b0000 18%,
        #170000 35%,
        #2b0000 52%,
        #480000 68%,
        #650000 82%,
        #8a0000 100%
      ),
      linear-gradient(
        165deg,
        rgba(255, 0, 0, 0) 58%,
        rgba(138, 0, 0, 0.18) 72%,
        rgba(255, 0, 0, 0) 86%
      ),
      radial-gradient(
        circle at 85% 40%,
        rgba(138, 0, 0, 0.10),
        rgba(0, 0, 0, 0.92) 60%,
        #000000 100%
      )
    `,
    bgSolid: "#000000",

    card: "#000000",
    text: "#e6e6e6",

    /* 🔥 FIRE ACCENT GRADIENT */
    accent: `
      linear-gradient(
        to top,
        #FDCF58 0%,   /* Golden Tainoi */
        #FF0000 100%  /* Fire Red */
      )
    `,

    /* fallback when gradient can't be used */
    accentSolid: "#ff3b00",

    border: "#2a2f38"
};

export const lightTheme = {
    bg: "#f5f7fa",
    card: "#ffffff",
    text: "#111",

    accent: `
      linear-gradient(
        to top,
        #FDCF58 0%,
        #FF0000 100%
      )
    `,
    accentSolid: "#ff3b00",

    border: "#ddd"
};

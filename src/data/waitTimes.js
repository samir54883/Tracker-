export const waitTimes = {
    Morning: {
        Skin: {
            "Vitamin C": 60,
            "Niacinamide": 60,
            "Moisturizer": 90
        }
    },

    Night: {
        Skin: {
            "Niacinamide": 60,
            "Face Wash": 300,   // Only used when Retinol present (handled in Category.jsx)
            "Retinol": 90
        }
    },

    Shower: {
        Hair: {
            "Ketoconazole shampoo": 240,   // 4 min leave-in
            "Conditioner": 150             // 2.5 min leave-in
        }
    }
};

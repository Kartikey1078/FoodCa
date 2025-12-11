/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },

    fontFamily: {
      blackHanSans: ["Black Han Sans", "sans-serif"],
      redHatDisplay: ["Red Hat Display", "sans-serif"],
      inter: ["Inter", "sans-serif"], // smooth modern body font
      poppins: ["Poppins", "sans-serif"], // optional premium font
      jakarta: ["Plus Jakarta Sans", "sans-serif"], // ultra premium option
    },

    extend: {
      fontSize: {
        heading1: ["2.5rem", { lineHeight: "3rem", fontWeight: "700" }],
        heading2: ["2rem", { lineHeight: "2.5rem", fontWeight: "600" }],
        subHeading: ["1rem", { lineHeight: "1.5rem", fontWeight: "500" }],
        body1: ["1.25rem", { lineHeight: "1.75rem", fontWeight: "400" }],
        body2: ["1rem", { lineHeight: "1.5rem", fontWeight: "400" }],
      },

      colors: {
        BM_Green: "#38754E",
        BM_Orange: "#F2790F",
        BM_Black: "#303030",
        BM_background: "#FDEFE2",
        BM_AboutLine: "#D9D9D9",
        BM_Bars: "#FFFFFF",
        BM_GreenLight: "#56a55a",
        BM_OrangeLight: "#f5a55c",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      boxShadow: {
        premium: "0 10px 25px rgba(0,0,0,0.1)",
        premiumMd: "0 6px 15px rgba(0,0,0,0.08)",
      },

      backgroundImage: {
        'gradient-green': 'linear-gradient(135deg, #38754E, #56a55a)',
        'gradient-orange': 'linear-gradient(135deg, #F2790F, #f5a55c)',
      },

      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
      },

      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
        colors: 'background-color, border-color, color, fill, stroke',
      },
      transitionTimingFunction: {
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },

  plugins: [require("tailwind-scrollbar-hide")],
};

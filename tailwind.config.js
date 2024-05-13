/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "ecx-colors-dart" : "#2699E3",
        "ecx-colors-swift" : "#FAB12D",
        "ecx-colors-ruby" : "#F2443F",
        "ecx-colors-secondary-blue" : "#272E4B",
        "ecx-colors-not-yellow" : "#F4E1CE",
        "ecx-colors-secondary-red" : "#802507",
        "ecx-colors-third-blue" : "#6259CD",
        "ecx-colors-ls-green" : "#00B29A",
        "ecx-colors-third-red" : "#FC8A7A",
        "ecx-colors-black" : "#000000",
        "ecx-colors-grey" : "#424242",
        "ecx-colors-white" : "#FFFFFF",
      },
      fontFamily: {
        "varela-round": ["var(--font-varela-round)"],
        "inter": ["var(--font-inter)"],
        "poppins": ["var(--font-poppins)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

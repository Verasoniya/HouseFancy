/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "split-white-black": "linear-gradient(to right, #4285F4 32% , #F6F6F6 10%);",
        "auth-image": "url('./assets/background-register-login.jpg')",
      },
      fontFamily: {
        "dancing-script": ["Dancing Script", "cursive"],
      },
    },
  },
  plugins: [],
};

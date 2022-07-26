/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "split-white-black":
          "linear-gradient(to right, #4285F4 32% , #F6F6F6 10%);",
        "auth-image": "url('./assets/background-register-login.jpg')",
        "banner-image":
          "linear-gradient(to right, rgba(66, 133, 244, .8) , rgba(255,255,255, .2)), url('./assets/background-banner.jpg')",
      },
      fontFamily: {
        "dancing-script": ["Dancing Script", "cursive"],
      },
    },
  },
  plugins: [],
};

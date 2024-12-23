const getCurrentTheme = () => {
  return window.localStorage.getItem("theme");
};

const setCurrentTheme = (isDarkMode) => {
  window.localStorage.setItem("theme", isDarkMode);
};

export { getCurrentTheme, setCurrentTheme };

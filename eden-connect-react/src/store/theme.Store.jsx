// ThemeStore.js
import { makeAutoObservable } from "mobx";
import { createTheme } from "@mui/material/styles";
import { setCurrentTheme, getCurrentTheme } from "../utils";

class ThemeStore {
  isDarkMode = getCurrentTheme() === "true"; // 默认夜间模式

  constructor() {
    makeAutoObservable(this);
    if (getCurrentTheme() === undefined || getCurrentTheme() === null) {
      this.isDarkMode = true;
    }
  }

  // 切换主题模式
  toggleTheme = () => {
    this.isDarkMode = !this.isDarkMode;
    setCurrentTheme(this.isDarkMode);
  };

  // 获取 MUI 主题配置
  get theme() {
    return createTheme({
      // palette: {
      //   mode: this.isDarkMode ? "dark" : "light",
      // },
      palette: {
        // mode: this.isDarkMode ? "dark" : "light",
        primary: {
          main: "#202745",
        },
        secondary: {
          main: "#182039",
        },
        background: {
          default: "#182039",
          paper: "#202745",
        },
        text: {
          primary: "#ffffff",
          secondary: "#aaaaaa",
          disabled: "#eeeeee",
        },
      },
      components: {
        MuiSvgIcon: {
          styleOverrides: {
            root: {
              color: "#1976d2", // 设置默认图标颜色
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              color: "#fff", // 默认文本色
              textTransform: "none", // 禁用大写
            },
          },
        },
        MuiPagination: {
          styleOverrides: {
            root: {
              color: "#fff", // 根节点颜色
            },
            ul: {
              "& .MuiPaginationItem-root": {
                color: "#fff", // 按钮的默认颜色
                "&:hover": {
                  backgroundColor: "#7694ba", // 普通按钮悬停背景颜色
                },
              },
              "& .Mui-selected": {
                backgroundColor: "#4c77af", // 选中按钮的背景颜色
                color: "#fff", // 选中按钮的文本颜色
                "&:hover": {
                  backgroundColor: "#ce93d8",
                },
              },
            },
          },
        },
      },
    });
  }
}

export default ThemeStore;

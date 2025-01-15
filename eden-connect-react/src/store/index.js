import ThemeStore from "./theme.Store";
import userStore from "./user.Store";
import { createContext, useContext } from "react";

class RootStore {
  constructor() {
    this.themeStore = new ThemeStore();
    this.userStore = new userStore();
  }
}

const rootStore = new RootStore();
const context = createContext(rootStore);
const useStore = () => useContext(context);
export { useStore };


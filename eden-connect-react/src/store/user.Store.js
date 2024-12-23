import { makeAutoObservable } from "mobx";
import { getUser, removeToken, setUser } from "../utils";

class userStore {
  userInfo = null;
  isLogin = false;

  constructor() {
    makeAutoObservable(this);
    this.loadUserInfo();
  }

  loadUserInfo() {
    const storedUserInfo = getUser();
    if (storedUserInfo) {
      this.userInfo = storedUserInfo;
    }
  }

  getUser() {
    // console.log("获取用户信息");
    return this.userInfo;
  }

  setUser(userInfo) {
    this.userInfo = userInfo;
    this.isLogin = true;
    setUser(userInfo);
    console.log("更新用户信息");
  }
  clearUser() {
    this.userInfo = null;
    this.isLogin = false;
    removeToken();
  }
}

export default userStore;

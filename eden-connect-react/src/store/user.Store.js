import { makeAutoObservable } from "mobx";
import { getUser, setUser } from "../utils";

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
    return this.userInfo;
  }

  setUser(userInfo) {
    this.userInfo = userInfo;
    this.isLogin = true;
    setUser(userInfo);
    console.log("User Info updated");
  }
  clearUser() {
    this.userInfo = null;
    this.isLogin = false;
    // removeToken();
  }
}

export default userStore;

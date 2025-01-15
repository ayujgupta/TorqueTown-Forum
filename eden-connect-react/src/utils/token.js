const key = "token-key";
const key_user = "current-user";

// 本地存储token
const setToken = (token) => {
  window.localStorage.setItem(key, token);
};

// 获取本地的token
const getToken = () => {
  return window.localStorage.getItem(key);
};
// 移除本地的token
const removeToken = () => {
  window.localStorage.removeItem(key);
  removeUser();
};

const setUser = (user) => {
  window.localStorage.setItem(key_user, JSON.stringify(user));
};

const getUser = () => {
  return JSON.parse(window.localStorage.getItem(key_user));
};

const removeUser = () => {
  window.localStorage.removeItem(key_user);
};

export { setToken, getToken, removeToken, setUser, getUser, removeUser };

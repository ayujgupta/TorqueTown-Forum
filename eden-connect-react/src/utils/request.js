import axios from "axios";
import { getToken, removeToken, removeUser } from "./token";

const request = axios.create({
  baseURL: "http://localhost:7777",
  timeout: 5000,
});
// 添加请求拦截器
request.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.token = token;
  }
  return config;
});

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response) {
      console.log(error.response);

      // 使用 status 而不是 code
      if (error.response.status === 401) {
        alert("用户未认证");
        removeToken();
        removeUser();
        // window.location.href = "/login"; // 重定向到登录页面
        history.push("/login");
      }
    } else {
      console.log("无响应");
    }
    return Promise.reject(error);
  }
);

export { request };

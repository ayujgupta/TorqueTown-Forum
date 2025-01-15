import axios from "axios";
import { useAuth } from "./TokenContext";

// import { useNavigate } from 'react-router-dom';
export const useAxios = () => {
  const { token ,setToken } = useAuth();
  
  const request = axios.create({
    baseURL: "http://localhost:7777",
    timeout: 30000,
  });
  
  
  request.interceptors.request.use((config) => {  
    if (token) {
      config.headers.token = token;
    }
    return config;
  });
  
  request.interceptors.response.use(
    (response) => {
      
      const tokenError = response.headers['token-error'];
      if (token!=null && tokenError) {
        setToken(null);
      }
      return response;
    },
    (error) => {
      if (error.response) {
        
        if (token!=null  && error.response.status === 401) {
          setToken(null);
          throw new Error(error.response.data.message);
        }
      } else {
        console.log("No Response");
      }
      return Promise.reject(error);
    }
  );
  return request;
};
// export { request };

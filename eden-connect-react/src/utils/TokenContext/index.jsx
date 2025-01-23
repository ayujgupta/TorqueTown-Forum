import React, { createContext, useState, useEffect, useContext } from "react";
import { getToken as fetchToken, removeToken as clearToken, setToken as saveToken } from "../token";
import { useStore } from "../../store";
// import { getToken } from "../token"; 

const AuthContext = createContext();

export const TokenProvider = ({ children }) => {
    const { userStore } = useStore();
    const [token, setTokenState] = useState(() => {
        return fetchToken() || null; // Ensure getToken is called as a function
    });
    
    // Update localStorage whenever the token changes
    useEffect(() => {
        if (token) {
            saveToken(token); // Save token to localStorage or backend
        } else {
            clearToken(); // Clear token from storage
            userStore.clearUser();
        }
    }, [token]);
    
    return (
        <AuthContext.Provider value={{ token, setToken: setTokenState }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);   
    if (!context) {
        throw new Error("useAuth must be used within an TokenProvider");
    }
    
    return context;
};

import React, { createContext, useContext, useState } from 'react'
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [register, setRegister] = useState(() => {
        return JSON.parse(localStorage.getItem("registry")) || false;
    })
    const [profile, setProfile] = useState(() => {
        return JSON.parse(localStorage.getItem("profile")) || false;
    })


    return (
        <AuthContext.Provider value={{ register, setRegister, profile, setProfile }}>
            {children}
        </AuthContext.Provider>
    );


};
export const useAuth = () => {
    return useContext(AuthContext)
}
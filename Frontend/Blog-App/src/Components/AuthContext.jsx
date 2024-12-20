import React, { createContext, useContext, useState } from 'react'
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [register, setRegister] = useState(() => {
        return JSON.parse(localStorage.getItem("registry")) || false;
    })
    const [profile, setProfile] = useState(() => {
        return JSON.parse(localStorage.getItem("profile")) || false;
    })
    const [blogs, setBlogs] = useState(() => {
        return JSON.parse(localStorage.getItem("blogs")) || [];
    });
    const [myblogs, setMyblogs] = useState(() => {
        return JSON.parse(localStorage.getItem("myblogs")) || [];
    });

    return (
        <AuthContext.Provider value={{ register, setRegister, profile, setProfile ,blogs,setBlogs,myblogs,setMyblogs}}>
            {children}
        </AuthContext.Provider>
    );


};
export const useAuth = () => {
    return useContext(AuthContext)
}
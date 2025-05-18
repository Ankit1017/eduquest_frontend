import React, { createContext, useState } from 'react';
// import jwtDecode from 'jwt-decode'; // Correct import
// import * as jwt_decode from "jwt-decode";

// export const verifyToken = (token) => { return (jwt_decode(token)); };

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    });

    const login = (user) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = "http://hatched.site";
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

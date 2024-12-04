import axios from "axios";

const SIGNIN_URL = "http://localhost:8082/auth/login";

interface LoginDetails {
    userName: string;
    password: string;
}

export async function signin(loginDetails :LoginDetails) {
    const response = await axios.post(SIGNIN_URL, loginDetails, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    localStorage.setItem("userType", response.data.userType);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userId", response.data.userId);    
    return response.data;
}

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
}

export const isSuperAdmin = () => {
    const role = localStorage.getItem('userType');
    return role === 'superAdmin';
}

export const isAdmin = () => {
    const role = localStorage.getItem('userType');
    return role === 'admin';
}

export const isRegularUser = () => {
    const role = localStorage.getItem('userType');
    return role === 'regularUser';
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
}
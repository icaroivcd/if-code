import type { LoginRequest } from "@/types";
import axios from "axios";
// import Cookies from "js-cookie";

export async function login({ email, password }: LoginRequest): Promise<void>{

    await axios.get(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, {
        withCredentials: true
    });

    await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        email,
        password
    }, {
        withCredentials: true,
    })
}
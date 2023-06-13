import { API_ENDPOINT } from "../constants/endpoints";

class AuthService {
    async login(email: string, password: string) {
        const res = await fetch(`${API_ENDPOINT}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        return await res.json();
    }

    async register(email: string, password: string) {
        const res = await fetch(`${API_ENDPOINT}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        return await res.json();
    }
}

export default new AuthService();

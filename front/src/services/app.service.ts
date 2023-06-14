import { API_ENDPOINT } from "../constants/endpoints";
import authHeader from "./auth.header";

class AppService {
    async getApps() {
        const res = await fetch(`${API_ENDPOINT}/apps/self`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...authHeader(),
            },
        });

        if (res.status !== 200) throw new Error("Failed to fetch apps");
        return await res.json();
    }

    async getApp(id: string) {
        const res = await fetch(`${API_ENDPOINT}/apps/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...authHeader(),
            },
        });

        if (res.status !== 200) throw new Error("Failed to fetch app");
        return await res.json();
    }

    async create(name: string) {
        const res = await fetch(`${API_ENDPOINT}/apps`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...authHeader(),
            },
            body: JSON.stringify({
                name,
            }),
        });

        if (res.status !== 201) throw new Error("Failed to create app");
        return await res.json();
    }
}

export default new AppService();

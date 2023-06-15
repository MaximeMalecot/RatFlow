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

    async getAppsWhitelistedOn() {
        const res = await fetch(`${API_ENDPOINT}/apps/whitelisted`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...authHeader(),
            },
        });

        if (res.status !== 200) throw new Error("Failed to fetch apps");
        return await res.json();
    }

    async updateAppName(appId: string, name: string) {
        const res = await fetch(`${API_ENDPOINT}/apps/${appId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...authHeader(),
            },
            body: JSON.stringify({
                name,
            }),
        });

        const status = res.status;
        const resJson = await res.json();
        if (status !== 200) {
            if (resJson.message) throw new Error(resJson.message);
            throw new Error("Failed to update app name");
        }
        return resJson;
    }

    async updateAppOrigins(appId: string, origins: string[]) {
        const res = await fetch(`${API_ENDPOINT}/apps/${appId}/origins`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...authHeader(),
            },
            body: JSON.stringify({
                origins,
            }),
        });

        if (res.status !== 200) throw new Error("Failed to update app origins");
        return await res.json();
    }

    async addUserOnApp(appId: string, email: string) {
        const res = await fetch(`${API_ENDPOINT}/apps/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...authHeader(),
            },
            body: JSON.stringify({
                appId,
                email,
            }),
        });

        if (res.status !== 200) throw new Error("Failed to update app origins");
        return await res.json();
    }

    async removeUserFromApp(appId: string, email: string) {
        const res = await fetch(`${API_ENDPOINT}/apps/users`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                ...authHeader(),
            },
            body: JSON.stringify({
                appId,
                email,
            }),
        });

        if (res.status !== 200)
            throw new Error("Failed to remove user from app");
        return true;
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

    async delete(id: string) {
        const res = await fetch(`${API_ENDPOINT}/apps/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                ...authHeader(),
            },
        });

        if (res.status !== 200) throw new Error("Failed to delete app");
    }
}

export default new AppService();

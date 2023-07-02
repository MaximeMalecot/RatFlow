import { API_ENDPOINT } from "../constants/endpoints";
import authHeader from "./auth.header";

class TagService {
    async getTagsOfApp(appId: string) {
        const res = await fetch(`${API_ENDPOINT}/tags?appId=${appId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...authHeader(),
            },
        });

        if (res.status !== 200) throw new Error("Failed to fetch tags");
        return await res.json();
    }

    async create(name: string, appId: string) {
        const res = await fetch(`${API_ENDPOINT}/tags`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...authHeader(),
            },
            body: JSON.stringify({
                name,
                appId,
            }),
        });

        if (res.status !== 201) throw new Error("Failed to create tag");
        return await res.json();
    }

    async delete(id: string) {
        const res = await fetch(`${API_ENDPOINT}/tags/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                ...authHeader(),
            },
        });

        if (res.status !== 200) throw new Error("Failed to delete tag");
    }
}

export default new TagService();

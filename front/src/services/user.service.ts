import { API_ENDPOINT } from "../constants/endpoints";
import authHeader from "./auth.header";

class UserService {
    async getSelf() {
        const res = await fetch(`${API_ENDPOINT}/users/self`, {
            method: "GET",
            headers: {
                ...authHeader(),
            },
        });
        if (res.status !== 200) return false;
        return await res.json();
    }

    async getUsers() {
        const res = await fetch(`${API_ENDPOINT}/users`, {
            method: "GET",
            headers: {
                ...authHeader(),
            },
        });
        return await res.json();
    }

    async getUser(id: string){
        const res = await fetch(`${API_ENDPOINT}/users/${id}`, {
            method: "GET",
            headers: {
                ...authHeader(),
            },
        });
        return await res.json();
    }
}

export default new UserService();

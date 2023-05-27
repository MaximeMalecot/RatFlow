import { Injectable } from "@nestjs/common";

@Injectable()
export class AppsService {
    async getApps() {
        return [];
    }

    async getSelfApps() {
        return [];
    }

    async getApp(id: string) {
        return {};
    }

    async createApp() {
        return {};
    }

    async addUserToApp(id: string) {
        return {};
    }

    async updateApp(id: string) {
        return {};
    }

    async deleteApp(id: string) {
        return {};
    }
}

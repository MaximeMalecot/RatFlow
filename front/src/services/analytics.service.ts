import { API_ENDPOINT } from "../constants/endpoints";
import authHeader from "./auth.header";

export type StatsOfCurrentYear = Array<{ value: number; date: Date }>;

export interface PageView {
    url: string;
    value: number;
    unit: string;
}

export interface GetAllStatsFilters {
    limit?: number;
    date?: Date;
    tagId?: string;
    eventName?: string;
}

class AnalyticsService {
    async getAllStats(id: string, filters: GetAllStatsFilters) {
        const filterQueryParams = new URLSearchParams(filters as any);
        const res = await fetch(
            `${API_ENDPOINT}/analytics/${id}/filter?${filterQueryParams}`,
            {
                method: "GET",
                headers: {
                    ...authHeader(),
                },
            }
        );
        if (res.status !== 200) throw new Error("Failed to fetch stats");
        return await res.json();
    }

    async getStatsOfCurrentYear(id: string): Promise<StatsOfCurrentYear> {
        const res = await fetch(
            `${API_ENDPOINT}/analytics/${id}/getStatsOfCurrentYear`,
            {
                method: "GET",
                headers: {
                    ...authHeader(),
                },
            }
        );
        if (res.status !== 200) throw new Error("Failed to fetch stats");
        return await res.json();
    }

    async getStatsForMonth(id: string) {
        const res = await fetch(
            `${API_ENDPOINT}/analytics/${id}/getStatsOfCurrentYear`,
            {
                method: "GET",
                headers: {
                    ...authHeader(),
                },
            }
        );
        if (res.status !== 200) return false;
        return await res.json();
    }

    async getPageView(appId: string, pageUrl: string): Promise<PageView> {
        const res = await fetch(
            `${API_ENDPOINT}/analytics/${appId}/getPageView?=url=${pageUrl}`,
            {
                method: "GET",
                headers: {
                    ...authHeader(),
                },
            }
        );
        if (res.status !== 200) throw new Error("Failed to fetch stats");
        return await res.json();
    }
}

export default new AnalyticsService();

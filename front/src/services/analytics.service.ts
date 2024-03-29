import { API_ENDPOINT } from "../constants/endpoints";
import authHeader from "./auth.header";

export type StatsOfCurrentYear = Array<{ value: number; date: Date }>;

export interface PageView {
    url: string;
    value: number;
    unit: string;
}

export interface GetAllStatsFilters {
    clientId?: string | null;
    service?: string | null;
    url?: string | null;
    skip?: number | null;
    eventName?: string | null;
    limit?: number | null;
    date?: Date | null;
    tagId?: string | null;
}

export interface BoucingRate {
    value: number;
    unit: string;
    frequentlyBouncedUrl: {
        count: number;
        url: string;
    }[];
}

export interface AvgSessionDuration {
    value: number;
    unit: string;
}

export interface AvgPagePerSession {
    value: number;
    unit: string;
}

export interface ClickRate {
    value: number;
    unit: string;
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

    async getSessionStatsForMonth(id: string, date: string) {
        const res = await fetch(
            `${API_ENDPOINT}/analytics/${id}/sessionStatsForMonth?date=${date}`,
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
            `${API_ENDPOINT}/analytics/${appId}/getPageView?url=${pageUrl}`,
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

    async getPages(appId: string): Promise<string[]> {
        const res = await fetch(`${API_ENDPOINT}/analytics/${appId}/pages`, {
            method: "GET",
            headers: {
                ...authHeader(),
            },
        });
        if (res.status !== 200) throw new Error("Failed to fetch pages");
        return await res.json();
    }

    async getBoucingRate(appId: string): Promise<BoucingRate> {
        const res = await fetch(
            `${API_ENDPOINT}/analytics/${appId}/bounceRate`,
            {
                method: "GET",
                headers: {
                    ...authHeader(),
                },
            }
        );
        if (res.status !== 200) throw new Error("Failed to fetch data");
        return await res.json();
    }

    async getAvgSessionDuration(appId: string): Promise<AvgSessionDuration> {
        const res = await fetch(
            `${API_ENDPOINT}/analytics/${appId}/sessionDurationAvg`,
            {
                method: "GET",
                headers: {
                    ...authHeader(),
                },
            }
        );
        if (res.status !== 200) throw new Error("Failed to fetch data");
        return await res.json();
    }

    async getAvgPagePerSession(appId: string): Promise<AvgPagePerSession> {
        const res = await fetch(
            `${API_ENDPOINT}/analytics/${appId}/pagePerSessionAvg`,
            {
                method: "GET",
                headers: {
                    ...authHeader(),
                },
            }
        );
        if (res.status !== 200) throw new Error("Failed to fetch data");
        return await res.json();
    }

    async getTagClickThroughRate(
        appId: string,
        tagId: string
    ): Promise<ClickRate> {
        const res = await fetch(
            `${API_ENDPOINT}/analytics/${appId}/getClickThroughRate/${tagId}`,
            {
                method: "GET",
                headers: {
                    ...authHeader(),
                },
            }
        );
        if (res.status !== 200) throw new Error("Failed to fetch data");
        return await res.json();
    }
}

export default new AnalyticsService();

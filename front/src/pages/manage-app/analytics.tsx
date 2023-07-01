import { useEffect, useState } from "react";
import AnalyticItemRow from "../../components/analytic-item-row";
import AnalyticsFiltersSelector from "../../components/analytics-filters-selector";
import { useAppContext } from "../../contexts/manage-app.context";
import { AnalyticsI } from "../../interfaces/analytics";
import analyticsService, {
    GetAllStatsFilters,
} from "../../services/analytics.service";
import { displayMsg } from "../../utils/toast";

export default function Analytics() {
    const { app } = useAppContext();
    const [analytics, setAnalytics] = useState<AnalyticsI[]>([]);
    const [filters, setFilters] = useState<GetAllStatsFilters>({
        clientId: null,
        service: null,
        url: null,
        eventName: null,
        date: null,
        tagId: null,
    });

    const [pagination, setPagination] = useState({
        skip: 0,
        limit: 10,
        canLoadMore: true,
    });

    const fetchAnalytics = async (
        data: GetAllStatsFilters,
        pagination: any,
        initial?: boolean
    ) => {
        try {
            const params: GetAllStatsFilters = Object.entries(data).reduce(
                (acc, [key, value]) => {
                    if (value) {
                        acc[key as keyof GetAllStatsFilters] = value;
                    }
                    return acc;
                },
                {} as GetAllStatsFilters
            );
            const res = await analyticsService.getAllStats(app._id, {
                ...params,
                ...pagination,
            });

            if (res.length === 0) {
                setPagination((prev) => ({ ...prev, canLoadMore: false }));
            }
            if (initial) {
                setAnalytics(res);
            } else {
                setAnalytics((prev) => [...prev, ...res]);
            }
        } catch (e: any) {
            console.error(e.message);
            displayMsg("error", e.message);
        }
    };

    const fetchMoreAnalytics = async () => {
        const tmpPagination = {
            ...pagination,
            skip: pagination.skip + pagination.limit,
        };
        setPagination(tmpPagination);
        fetchAnalytics(filters, tmpPagination);
    };

    const handleSelectField = (key: string, value: string) => {
        if (Object.keys(filters).includes(key)) {
            // fetchAnalytics({ ...filters, [key]: value });
            setFilters({ ...filters, [key]: value });
        }
    };

    useEffect(() => {
        fetchAnalytics(filters, pagination, true);
    }, [app]);

    return (
        <div
            className="w-full h-fit flex flex-col gap-3"
            style={{ width: "100%" }}
        >
            <h1 className="text-2xl">Collected analytics</h1>
            <div className="divider my-0"></div>
            <div
                className="flex flex-col gap-3 border-2 border-slate-200 p-3 rounded rounded-xl"
                style={{ width: "100%" }}
            >
                <AnalyticsFiltersSelector
                    filters={filters}
                    setFilters={setFilters}
                    onSubmit={fetchMoreAnalytics}
                />
                <div className="divider my-0"></div>
                <div>
                    {analytics.length === 0 && <p>There is no analytics</p>}
                    {analytics.length > 0 && (
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>EventName</th>
                                        <th>ClientId</th>
                                        <th>SessionId</th>
                                        <th>Service</th>
                                        <th>Url</th>
                                        <th>UserAgent</th>
                                        <th>Date</th>
                                        <th>Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {analytics.map((analytics, index) => (
                                        <AnalyticItemRow
                                            selectField={handleSelectField}
                                            key={index}
                                            analytic={analytics}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {pagination.canLoadMore && (
                        <button
                            className="btn w-fit"
                            onClick={fetchMoreAnalytics}
                        >
                            More
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

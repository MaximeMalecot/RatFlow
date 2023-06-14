import { useEffect, useMemo, useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import AppStats from "../../components/app-stats";
import { useAppContext } from "../../contexts/manage-app.context";
import analyticsService, {
    StatsOfCurrentYear,
} from "../../services/analytics.service";

export default function ManageApp() {
    const { app } = useAppContext();
    const [yearStats, setYearStats] = useState<StatsOfCurrentYear>([]);

    const mappedYearStats = useMemo(
        () =>
            yearStats.map((stat) => ({
                date: new Date(stat.date).toISOString().split("T")[0],
                averageNumberOfVisitors: stat.value,
            })),
        [yearStats]
    );

    const fetchYearStats = async () => {
        const stats = await analyticsService.getStatsOfCurrentYear(app._id);
        setYearStats(stats);
    };

    useEffect(() => {
        fetchYearStats();
    }, []);

    return (
        <div className="w-full flex flex-col gap-3" style={{ width: "100%" }}>
            <h1 className="text-2xl">Home</h1>
            <div className="divider"></div>
            <div className="flex flex-col gap-3 border-2 border-slate-200 p-3 rounded rounded-xl">
                <AppStats appId={app._id} />
            </div>
            <div
                className="flex flex-col gap-3 border-2 border-slate-200 p-3 rounded rounded-xl"
                style={{ width: "100%", height: "30vh" }}
            >
                <h3 className="text-xl ">Yearly stats</h3>
                <ResponsiveContainer width="100%" height={"100%"}>
                    <BarChart
                        data={mappedYearStats}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        barSize={20}
                    >
                        <XAxis
                            dataKey="date"
                            scale="point"
                            padding={{ left: 10, right: 10 }}
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar
                            dataKey="averageNumberOfVisitors"
                            fill="#8884d8"
                            background={{ fill: "#eee" }}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div
                className="flex flex-col gap-3 border-2 border-slate-200 p-3 rounded rounded-xl"
                style={{ width: "100%", height: "30vh" }}
            >
                <h3 className="text-xl ">Monthly sessions stats</h3>
            </div>
        </div>
    );
}

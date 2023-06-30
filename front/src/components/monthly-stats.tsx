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
import { useAppContext } from "../contexts/manage-app.context";
import analyticsService from "../services/analytics.service";

interface Props {
    date: Date;
}

interface StatForMonthI {
    desiredMonth: {
        value: number;
        unit: string;
    };
    previousMonth: {
        value: number;
        unit: string;
    };
    growth: {
        value: number;
        unit: string;
    };
}

export default function MonthlyStats({ date }: Props) {
    const { app } = useAppContext();
    const [stats, setStats] = useState<StatForMonthI | null>(null);
    const data = useMemo(() => {
        if (stats) {
            return [
                {
                    date: "Previous month",
                    sessions: stats.previousMonth.value,
                },
                {
                    date: "Current month",
                    sessions: stats.desiredMonth.value,
                },
            ];
        }
        return [];
    }, [stats]);

    const fetchStats = async () => {
        try {
            const res = await analyticsService.getSessionStatsForMonth(
                app._id,
                date.toDateString()
            );
            console.log(res);
            setStats(res);
        } catch (e: any) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        fetchStats();
    }, [date]);

    return (
        <div
            className="flex flex-col gap-3 border-2 border-slate-200 p-3 rounded rounded-xl"
            style={{ width: "100%", height: "30vh" }}
        >
            <h3 className="text-xl ">Monthly sessions stats</h3>
            {stats?.growth && (
                <h4>
                    {" "}
                    Growth: {stats.growth.value} {stats.growth.unit}
                </h4>
            )}
            <ResponsiveContainer width="100%" height={"100%"}>
                <BarChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    barSize={40}
                >
                    <XAxis
                        dataKey="date"
                        scale="point"
                        padding={{ left: 120, right: 120 }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar
                        dataKey={"sessions"}
                        fill="#8884d8"
                        background={{ fill: "#eee" }}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

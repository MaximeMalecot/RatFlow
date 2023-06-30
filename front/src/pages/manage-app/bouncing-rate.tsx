import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useAppContext } from "../../contexts/manage-app.context";
import analyticsService, {
    BoucingRate as BoucingRateI,
} from "../../services/analytics.service";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#ff0000"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    name,
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="#2e2e2e"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {name}
        </text>
    );
};

export default function BoucingRate() {
    const [boucingRate, setBoucingRate] = useState<BoucingRateI>({
        value: 0,
        unit: "%",
        frequentlyBouncedUrl: [],
    });
    const { app } = useAppContext();
    const data =
        boucingRate?.frequentlyBouncedUrl.length > 0
            ? boucingRate?.frequentlyBouncedUrl.map((url: any) => ({
                  name: url.url,
                  value: url.count,
              }))
            : [{ name: "No data", value: 1 }];

    const fetchBounceRate = async () => {
        try {
            const res = await analyticsService.getBoucingRate(app._id);
            setBoucingRate(res);
        } catch (e: any) {
            console.error(e.message);
        }
    };

    useEffect(() => {
        fetchBounceRate();
    }, []);

    return (
        <div className="w-full flex flex-col gap-3" style={{ width: "100%" }}>
            <h1 className="text-2xl">Boucing</h1>
            <div className="divider my-0"></div>
            <div
                className="flex flex gap-3 justify-between w-full border-2 border-slate-200 p-3 rounded rounded-xl"
                style={{ width: "100%", height: "30vh" }}
            >
                <ResponsiveContainer width="50%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            cx={"40%"}
                            cy={"50%"}
                            labelLine={false}
                            innerRadius={70}
                            outerRadius={"80%"}
                            fill="#007aff"
                            label={renderCustomizedLabel}
                            // label
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <div
                    style={{ width: "30%" }}
                    className="flex flex-col gap-3 border border-1 p-5"
                >
                    <h3 className="text-xl">Worst urls</h3>
                    <div className="divider my-0"></div>
                    <ul>
                        {data.length === 0 && <p>There is no url</p>}
                        {data.length > 0 &&
                            data.map((url: any, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between"
                                >
                                    <p
                                        className={"font-medium"}
                                        style={{
                                            color: COLORS[
                                                index % COLORS.length
                                            ],
                                        }}
                                    >
                                        {url.name}
                                    </p>
                                    <p className="font-bold">{url.value}</p>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

import { useEffect, useState } from "react";

const SCALES = {
    DAY: "DAY",
    MONTH: "MONTH",
    YEAR: "YEAR",
};

export default function Sessions() {
    const [scale, setScale] = useState(SCALES.MONTH);

    const fetchSessions = async () => {
        try {
        } catch (e: any) {
            console.error(e.message);
        }
    };

    useEffect(() => {
        fetchSessions();
    }, []);

    return (
        <div className="w-full flex flex-col gap-3" style={{ width: "100%" }}>
            <h1 className="text-2xl">Sessions</h1>
            <div className="divider my-0"></div>
            <div
                className="flex flex-col gap-3 border-2 border-slate-200 p-3 rounded rounded-xl"
                style={{ width: "100%", height: "30vh" }}
            >
                <h3 className="text-xl ">Yearly stats</h3>
            </div>
        </div>
    );
}

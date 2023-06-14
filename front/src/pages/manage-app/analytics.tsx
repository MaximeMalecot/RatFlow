export default function Analytics() {
    return (
        <div className="w-full flex flex-col" style={{ width: "100%" }}>
            <h1 className="text-2xl">Analytics</h1>
            <div className="divider"></div>
            <div
                className="flex flex-col gap-3 border-2 border-slate-200 p-3 rounded rounded-xl"
                style={{ width: "100%", height: "30vh" }}
            >
                <h3 className="text-xl ">Yearly stats</h3>
            </div>
        </div>
    );
}

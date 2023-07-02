import { useCallback, useEffect, useState } from "react";
import AppItem from "../components/app-item";
import NewAppModal from "../components/new-app-modal";
import { YellowBtn } from "../components/yellow-btn";
import { AppInList } from "../interfaces/app";
import AppService from "../services/app.service";
import { displayMsg } from "../utils/toast";

export default function Dashboard() {
    const [apps, setApps] = useState<AppInList[]>([]);
    const [whiteListedApps, setWhiteListedApps] = useState<AppInList[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchApps = useCallback(async () => {
        try {
            const res = await AppService.getApps();
            setApps(res);
        } catch (e: any) {
            console.error(e.message);
        }
    }, []);

    const fetchAppsWhitelistedOn = useCallback(async () => {
        try {
            const res = await AppService.getAppsWhitelistedOn();
            setWhiteListedApps(res);
        } catch (e: any) {
            console.error(e.message);
        }
    }, []);

    const createApp = useCallback(async (name: string) => {
        try {
            const res = await AppService.create(name);
            setApps((apps) => [...apps, res]);
            displayMsg("App created successfully");
        } catch (e: any) {
            console.error(e.message);
        }
    }, []);

    useEffect(() => {
        fetchApps();
        fetchAppsWhitelistedOn();
    }, []);

    return (
        <div className="px-10 md:px-20">
            <h1 className="text-2xl mb-5">Dashboard</h1>
            <div className="flex flex-col">
                <div className="flex justify-between">
                    <h2 className="text-lg">My apps ({apps.length})</h2>
                    <YellowBtn
                        onClick={() => setIsModalOpen(true)}
                        className="w-fit"
                    >
                        Create an app
                    </YellowBtn>
                </div>
                {apps.length === 0 ? (
                    <div className="flex flex-col gap-1 my-5">
                        <p className="italic">You have no app yet</p>
                    </div>
                ) : (
                    <div className="w-full my-5 grid grid-col-1 md:grid-cols-3 xl:grid-cols-5 gap-5">
                        {apps.map((app, idx) => (
                            <AppItem key={idx} app={app} />
                        ))}
                    </div>
                )}
            </div>
            <div className="flex flex-col">
                <div className="flex justify-between">
                    <h2 className="text-lg">
                        Apps whitelisted on ({whiteListedApps.length})
                    </h2>
                </div>
                {whiteListedApps.length === 0 ? (
                    <div className="flex flex-col gap-1 my-5">
                        <p className="italic">You have no app yet</p>
                    </div>
                ) : (
                    <div className="w-full my-5 grid grid-col-1 md:grid-cols-3 xl:grid-cols-5 gap-5">
                        {whiteListedApps.map((app, idx) => (
                            <AppItem key={idx} app={app} />
                        ))}
                    </div>
                )}
            </div>
            <NewAppModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                create={createApp}
            />
        </div>
    );
}

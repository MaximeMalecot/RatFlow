import { useCallback, useEffect, useState } from "react";
import AppItem from "../components/app-item";
import NewAppModal from "../components/new-app-modal";
import { YellowBtn } from "../components/yellow-btn";
import { AppInList } from "../interfaces/app";
import AppService from "../services/app.service";

export default function Dashboard() {
    const [apps, setApps] = useState<AppInList[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchApps = useCallback(async () => {
        try {
            const res = await AppService.getApps();
            setApps(res);
        } catch (e: any) {
            console.error(e.message);
        }
    }, []);

    const createApp = useCallback(async (name: string) => {
        try {
            const res = await AppService.create(name);
            setApps((apps) => [...apps, res]);
        } catch (e: any) {
            console.error(e.message);
        }
    }, []);

    useEffect(() => {
        fetchApps();
    }, []);

    return (
        <div className="px-20">
            <h1 className="text-2xl mb-5">Dashboard</h1>
            <div className="flex flex-col">
                <div className="flex justify-between">
                    <h2 className="text-lg">My apps</h2>
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
                    <div className="w-full flex flex-wrap my-5 gap-5">
                        {apps.map((app, idx) => (
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

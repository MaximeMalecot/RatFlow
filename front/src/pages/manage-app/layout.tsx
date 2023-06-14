import { useCallback, useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { AppContextProvider } from "../../contexts/manage-app.context";
import { AppInterface } from "../../interfaces/app";
import appService from "../../services/app.service";

function SideMenu({ baseUrl }: { baseUrl: string }) {
    return (
        <ul
            className="menu bg-base-200 rounded-box capitalize"
            style={{ width: "10%" }}
        >
            <li>
                <Link to={baseUrl}>Home</Link>
            </li>
            <li>
                <details open>
                    <summary>Stats</summary>
                    <ul>
                        <li>
                            <Link to={`${baseUrl}/stat1`}>stat 1</Link>
                        </li>
                        <li>
                            <Link to={`${baseUrl}/stat2`}>stat2</Link>
                        </li>
                    </ul>
                </details>
            </li>
            <li>
                <Link to={`${baseUrl}/tags`}>Tags</Link>
            </li>
        </ul>
    );
}
export default function ManageAppLayout() {
    const { id } = useParams<{ id: string }>();
    const [app, setApp] = useState<AppInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const baseUrl = app ? `/manage/app/${app._id}` : "";

    const fetchApp = useCallback(async () => {
        try {
            console.log("here");
            if (!id) throw new Error("Invalid app id");
            const res = await appService.getApp(id);
            setApp(res);
        } catch (e: any) {
            console.error(e.message);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchApp();
    }, [id]);

    if (loading) return <div className="px-20">Loading...</div>;

    if (!id || !app) return <div className="px-20">Invalid app id</div>;

    return (
        <div className="px-20 flex flex-col gap-2 py-5 ">
            <div className="flex justify-between">
                <div className="text-sm breadcrumbs text-blue">
                    <ul>
                        <li>
                            <Link to={"/dashboard"}>Apps</Link>
                        </li>
                        <li>
                            <Link to={`/manage/app/${app._id}`}>{app._id}</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex w-full gap-3">
                <SideMenu baseUrl={baseUrl} />
                <AppContextProvider app={app}>
                    <Outlet />
                </AppContextProvider>
            </div>
        </div>
    );
}

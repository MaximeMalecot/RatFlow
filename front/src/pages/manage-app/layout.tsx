import { useCallback, useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { AppContextProvider } from "../../contexts/manage-app.context";
import { AppInterface } from "../../interfaces/app";
import appService from "../../services/app.service";

function SideMenu({ baseUrl }: { baseUrl: string }) {
    return (
        <ul
            id="side-menu"
            className="menu menu-horizontal md:menu-vertical bg-base-200 rounded-box capitalize w-full lg:!w-1/5"
        >
            <li>
                <Link to={baseUrl}>Home</Link>
            </li>
            <li>
                <details open>
                    <summary>Stats</summary>
                    <ul>
                        <li>
                            <Link to={`${baseUrl}/pages`}>Pages</Link>
                        </li>
                        <li>
                            <Link to={`${baseUrl}/sessions`}>Sessions</Link>
                        </li>
                        <li>
                            <Link to={`${baseUrl}/analytics`}>Analytics</Link>
                        </li>
                        <li>
                            <Link to={`${baseUrl}/boucing-rate`}>
                                Boucing rate
                            </Link>
                        </li>
                    </ul>
                </details>
            </li>
            <li>
                <Link to={`${baseUrl}/tags`}>Tags</Link>
            </li>
            <li>
                <Link to={`${baseUrl}/settings`}>Settings</Link>
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

    if (loading) return <div className="px-10 md:px-20">Loading...</div>;

    if (!id || !app)
        return <div className="px-10 md:px-20">Invalid app id</div>;

    return (
        <div className="px-10 md:px-20 flex flex-col gap-2 py-5 ">
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
            <div className="flex flex-col md:flex-row w-full gap-3">
                <SideMenu baseUrl={baseUrl} />
                <AppContextProvider app={app} reload={fetchApp}>
                    <Outlet />
                </AppContextProvider>
            </div>
        </div>
    );
}

import { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/manage-app.context";
import analyticsService, { PageView } from "../../services/analytics.service";
import { displayMsg } from "../../utils/toast";

export default function Pages() {
    const { app } = useAppContext();
    const [pages, setPages] = useState<string[]>([]);

    const fetchPages = async () => {
        try {
            const res = await analyticsService.getPages(app._id);
            setPages(res);
        } catch (e: any) {
            console.error(e.message);
            displayMsg("error", e.message);
        }
    };

    useEffect(() => {
        fetchPages();
    }, [app]);

    return (
        <div className="w-full flex flex-col gap-3" style={{ width: "100%" }}>
            <h1 className="text-2xl">Pages</h1>
            <div className="divider my-0"></div>
            <div>
                {pages.length === 0 && (
                    <p>There is no page registered for your application.</p>
                )}
                {pages.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Url</th>
                                    <th>Stats</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pages.map((page, index) => (
                                    <PageStatsRow
                                        appId={app._id}
                                        page={page}
                                        key={index}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

interface Props {
    appId: string;
    page: string;
}

function PageStatsRow({ appId, page }: Props) {
    const [stats, setStats] = useState<PageView | null>(null);
    const [_, setLoading] = useState<boolean>(false);

    const fetchStats = async () => {
        try {
            const res = await analyticsService.getPageView(appId, page);
            setStats(res);
        } catch (e: any) {
            console.error(e.message);
            displayMsg("error", e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, [page]);

    return (
        <tr className="bg-base-200">
            <th>{page}</th>
            <td>
                {stats ? (
                    <>
                        {stats.value} {stats.unit}{" "}
                    </>
                ) : (
                    <></>
                )}
            </td>
        </tr>
    );
}

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { EVENTS } from "../constants/enums";
import { useAppContext } from "../contexts/manage-app.context";
import analyticsService, {
    GetAllStatsFilters,
} from "../services/analytics.service";
import { displayMsg } from "../utils/toast";

interface Props {
    filters: GetAllStatsFilters;
    setFilters: React.Dispatch<React.SetStateAction<GetAllStatsFilters>>;
    onSubmit: (data: GetAllStatsFilters) => void;
}

export default function AnalyticsFiltersSelector({
    filters,
    setFilters,
    onSubmit: search,
}: Props) {
    const { app } = useAppContext();
    const [urls, setUrls] = useState<string[]>([]);
    const {
        register: registerField,
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: filters,
    });

    const fetchUrls = async () => {
        try {
            const res = await analyticsService.getPages(app._id);
            setUrls(res);
        } catch (e: any) {
            console.error(e.message);
            displayMsg("error", e.message);
        }
    };

    const onSubmit = useCallback(async (data: GetAllStatsFilters) => {
        setFilters(data);
        search(data);
    }, []);

    useEffect(() => {
        fetchUrls();
    }, [app]);

    useEffect(() => {
        reset(filters);
    }, [filters]);

    return (
        <form
            id="filters"
            className="flex flex-col gap-2 flex-wrap md:flex-row overflow-hidden rounded round-xl w-full"
            onSubmit={handleSubmit(onSubmit)}
        >
            <select
                {...registerField("eventName", {
                    value: filters.eventName,
                    required: false,
                })}
                defaultValue={filters.eventName ?? ""}
                className="select w-full md:max-w-xs border border-1 border-slate-300 !outline-none p-2 rounded-md capitalize"
            >
                <option value="">All events</option>
                {Object.entries(EVENTS).map(([k, v], index) => (
                    <option key={index} value={v}>
                        {k}
                    </option>
                ))}
            </select>
            {urls.length > 0 && (
                <select
                    {...registerField("url", {
                        value: filters.url,
                        required: false,
                    })}
                    defaultValue={filters.url ?? ""}
                    className="select w-full md:max-w-xs border border-1 border-slate-300 !outline-none p-2 rounded-md capitalize"
                >
                    <option value="">All urls</option>
                    {urls.map((url, index) => (
                        <option key={index} value={url}>
                            {url}
                        </option>
                    ))}
                </select>
            )}
            <input
                className="w-full md:max-w-xs border border-1 border-slate-300 !outline-none p-2 rounded-md capitalize"
                placeholder="Service"
                {...registerField("service", {
                    value: filters.service,
                    required: false,
                })}
            />
            <input
                className="w-full md:max-w-xs border border-1 border-slate-300 !outline-none p-2 rounded-md capitalize"
                placeholder="Client Id"
                {...registerField("clientId", {
                    value: filters.clientId,
                    required: false,
                })}
            />
            <button className="btn btn-primary w-fit" type="submit">
                Search
            </button>
        </form>
    );
}

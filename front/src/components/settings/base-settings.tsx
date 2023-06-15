import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppContext } from "../../contexts/manage-app.context";
import appService from "../../services/app.service";
import { displayMsg, notify } from "../../utils/toast";

export default function BaseSettings() {
    const { app } = useAppContext();
    const [loading, setLoading] = useState(false);

    const {
        register: registerField,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const updateAppName = async (data: any) => {
        try {
            setLoading(true);
            await appService.updateAppName(app._id, data.name);
            notify("App name changed");
        } catch (e: any) {
            displayMsg(e.message, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex flex-col gap-1">
            <h3 className="text-xl ml-1">About your app</h3>
            <div className="flex flex-col gap-3 border-2 border-slate-200 p-3 rounded rounded-xl">
                <form
                    className="flex flex-col gap-3"
                    onSubmit={handleSubmit(updateAppName)}
                >
                    <div className="w-full">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            className={
                                "input input-bordered w-full !outline-none outline-0 !border-1 !border-slate-300 "
                            }
                            {...registerField("name", {
                                required: true,
                                value: app.name,
                            })}
                        />
                    </div>
                    {!loading ? (
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                        >
                            Apply
                        </button>
                    ) : (
                        <button disabled className="btn btn-primary w-full">
                            Processing
                        </button>
                    )}
                </form>
                <div className="divider my-0" />
                <div>
                    <label className="label">
                        <span className="label-text">Origin(s) allowed</span>
                    </label>
                    {app.origins.length == 0 ? (
                        <p>There is no origin specified for your app</p>
                    ) : (
                        app.origins.map((origin, key) => (
                            <div
                                key={key}
                                className="badge badge-secondary badge-outline"
                            >
                                {origin}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

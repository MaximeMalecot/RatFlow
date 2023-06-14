import { useForm } from "react-hook-form";
import { useAppContext } from "../../contexts/manage-app.context";

export default function BaseSettings() {
    const { app } = useAppContext();
    const {
        register: registerField,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <section className="flex flex-col gap-1">
            <h3 className="text-xl ml-1">About your app</h3>
            <form className="flex flex-col gap-3 border-2 border-slate-200 p-3 rounded rounded-xl">
                <div className="w-full">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        className={
                            "input input-bordered w-full !outline-none outline-0 !border-1 !border-slate-300 "
                        }
                        {...registerField("name", { required: true })}
                        disabled
                        value={app.name}
                    />
                </div>
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
                <button className="btn btn-primary w-full">Apply</button>
            </form>
        </section>
    );
}

import { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/manage-app.context";
import appService from "../../services/app.service";

export default function WhiteListSettings() {
    const { app } = useAppContext();
    const [typedEmail, setTypedEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const [allowedUsers, setAllowedUsers] = useState<string[]>([]);

    const fetchAllowedUsers = async () => {
        try {
            setLoading(true);
            const res = await appService.getWhitelistedUsers(app._id);
            setAllowedUsers(res);
        } catch (e: any) {
            console.log(e.message);
        } finally {
            setLoading(false);
        }
    };

    const addUser = async () => {
        try {
            setLoading(true);
            await appService.addUserOnApp(app._id, typedEmail);
            setTypedEmail("");
            fetchAllowedUsers();
        } catch (e: any) {
            console.log(e.message);
        } finally {
            setLoading(false);
        }
    };

    const removeUser = async (email: string) => {
        try {
            setLoading(true);
            await appService.removeUserFromApp(app._id, email);
            fetchAllowedUsers();
        } catch (e: any) {
            console.log(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllowedUsers();
    }, []);

    return (
        <section className="flex flex-col gap-1">
            <h3 className="text-xl ml-1">Whitelist</h3>
            <div className="flex flex-col gap-3 border-2 border-slate-200 p-3 rounded rounded-xl">
                <div className="flex flex-col gap-3">
                    <label className="label">
                        <span className="label-text">
                            User(s) allowed to manage your app
                        </span>
                    </label>
                    {allowedUsers.length == 0 ? (
                        <p>There is no user whitelisted on your app</p>
                    ) : (
                        <div className="flex gap-5">
                            {allowedUsers.map((user: any, key) => (
                                <div
                                    key={key}
                                    onClick={() => removeUser(user.email)}
                                    className="badge badge-secondary badge-outline cursor-pointer"
                                >
                                    {user.email}
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex flex-col gap-5">
                        <div className="flex items-center gap-3">
                            <input
                                type="mail"
                                className={
                                    "input input-bordered w-4/5 !outline-none outline-0 !border-1 !border-slate-300 "
                                }
                                placeholder="User email"
                                value={typedEmail}
                                onChange={(e) =>
                                    setTypedEmail(e.currentTarget.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.key == "Enter") {
                                        addUser();
                                    }
                                }}
                            />
                            {loading ? (
                                <button
                                    disabled={true}
                                    onClick={addUser}
                                    className="btn btn-primary w-1/5"
                                >
                                    Processing
                                </button>
                            ) : (
                                <button
                                    onClick={addUser}
                                    className="btn btn-primary w-1/5"
                                >
                                    Add user
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

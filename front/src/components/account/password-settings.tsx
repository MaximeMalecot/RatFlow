import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../contexts/auth.context";
import userService from "../../services/user.service";
import { displayMsg, notify } from "../../utils/toast";

export default function PasswordSettings() {
    const { data } = useAuthContext();

    const {
        register: registerField,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
    } = useForm();

    const onSubmit = useCallback(
        async (receivedData: any) => {
            const { newPassword, newPasswordBis, password } = receivedData;

            if (newPassword !== newPasswordBis) {
                setError("newPassword", {
                    message: "The passwords don't match",
                });
                setError("newPasswordBis", {
                    message: "The passwords don't match",
                });
                return;
            }
            try {
                const res = await userService.updatePassword(
                    data!._id,
                    password,
                    newPassword
                );
                if (res) {
                    notify("Password updated");
                }
            } catch (e: any) {
                console.error(e.message);
                displayMsg(e.message, "error");
            }
            reset();
        },
        [data]
    );

    return (
        <section className="flex flex-col gap-1">
            <h3 className="text-xl ml-1">Password</h3>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3 border-2 border-slate-200 p-3 rounded rounded-xl"
            >
                <div className="w-full">
                    <label className="label">
                        <span className="label-text">Current password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Current password"
                        className={
                            "input input-bordered w-full !outline-none outline-0 !border-1 !border-slate-300 "
                        }
                        {...registerField("password", {
                            required: true,
                        })}
                    />
                    {errors.password && (
                        <p>{errors.password.message as string}</p>
                    )}
                </div>
                <div className="w-full">
                    <label className="label">
                        <span className="label-text">New password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="New password"
                        className={
                            "input input-bordered w-full !outline-none outline-0 !border-1 !border-slate-300 "
                        }
                        {...registerField("newPassword", {
                            required: true,
                        })}
                    />
                    {errors.newPassword && (
                        <p>{errors.newPassword.message as string}</p>
                    )}
                </div>
                <div className="w-full">
                    <label className="label">
                        <span className="label-text">
                            New password confirmation
                        </span>
                    </label>
                    <input
                        type="password"
                        placeholder="New password confirmation"
                        className={
                            "input input-bordered w-full !outline-none outline-0 !border-1 !border-slate-300 "
                        }
                        {...registerField("newPasswordBis", {
                            required: true,
                        })}
                    />
                    {errors.newPasswordBis && (
                        <p>{errors.newPasswordBis.message as string}</p>
                    )}
                </div>
                <input
                    type="submit"
                    className="btn btn-primary w-full"
                    value={"Change password"}
                />
            </form>
        </section>
    );
}

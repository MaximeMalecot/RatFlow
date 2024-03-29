import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth.context";
import { displayMsg } from "../utils/toast";

export default function Login() {
    const { login, isConnected } = useAuthContext();

    const {
        register: registerField,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = useCallback(async (data: any) => {
        try {
            await login(data.email, data.password);
        } catch (e: any) {
            displayMsg(e.message, "error");
        }
    }, []);

    if (isConnected) {
        return <Navigate to="/"></Navigate>;
    }

    return (
        <div className="px-10 md:px-20 bg-dark-blue py-10 flex justify-center">
            <div className="bg-white w-fit p-10 rounded rounded-xl flex flex-col gap-3">
                <h1 className="uppercase text-xl font-bold text-center mb-3">
                    Sign in to Ratflow
                </h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col justify-center items-center gap-3"
                >
                    <div className="form-control w-full max-w-xs">
                        <input
                            className="input input-bordered w-full max-w-xs border-1 border-slate-500 !outline-none outline-0"
                            type="mail"
                            placeholder="Type your e-mail"
                            {...registerField("email", { required: true })}
                        />
                        {errors.mail && <span>This field is required</span>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <input
                            className="input input-bordered w-full max-w-xs border-1 border-slate-500 !outline-none outline-0"
                            placeholder="Type your password"
                            type="password"
                            {...registerField("password", { required: true })}
                        />
                        {errors.password && <span>This field is required</span>}
                    </div>
                    <input
                        className="btn btn-primary w-full"
                        type="submit"
                        value="Let's go!"
                    ></input>
                </form>
                <p>
                    Not yet registered ?
                    <Link className="text-blue" to="/register">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}

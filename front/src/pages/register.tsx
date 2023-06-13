import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = useCallback((data: any) => {
        console.log(data);
    }, []);

    return (
        <div className="px-20 bg-dark-blue py-10 flex justify-center">
            <div className="bg-white w-fit p-10 rounded rounded-xl flex flex-col gap-3">
                <h1 className="uppercase text-xl font-bold text-center mb-3">
                    Welcome on Ratflow
                </h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col justify-center items-center gap-3"
                >
                    <div className="form-control w-full max-w-xs">
                        <input
                            className="input input-bordered w-full max-w-xs border-1 border-slate-500 !outline-none outline-0	"
                            type="mail"
                            placeholder="Type your e-mail"
                            {...register("email", { required: true })}
                        />
                        {errors.mail && <span>This field is required</span>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <input
                            className="input input-bordered w-full max-w-xs border-1 border-slate-500 !outline-none outline-0	"
                            placeholder="Type your password"
                            type="password"
                            {...register("password", { required: true })}
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
                    Already a user ?{" "}
                    <Link className="text-blue" to="/login">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}

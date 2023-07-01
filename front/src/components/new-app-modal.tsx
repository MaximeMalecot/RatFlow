import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

interface NewAppModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    create: (name: string) => void;
}

export default function NewAppModal({
    isOpen,
    setIsOpen,
    create,
}: NewAppModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const openDialog = () => {
        if (!dialogRef.current) return;
        dialogRef.current.removeAttribute("open");
        dialogRef.current?.showModal();
    };

    const closeDialog = () => {
        if (!dialogRef.current) return;
        dialogRef.current?.close();
    };

    const {
        register: registerField,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (isOpen && dialogRef?.current?.close) {
            openDialog();
        } else if (dialogRef?.current?.open) {
            closeDialog();
        }
    }, [isOpen]);

    const onSubmit = useCallback((data: any) => {
        create(data.name);
        reset();
        setIsOpen(false);
    }, []);

    return (
        <>
            <dialog
                ref={dialogRef}
                onClose={() => setIsOpen(false)}
                className="modal"
            >
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Create a new app</h3>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-3"
                    >
                        <input
                            className="input input-bordered w-full w-full border-1 border-slate-500 !outline-none outline-0	"
                            type="text"
                            placeholder="Type your app name"
                            {...registerField("name", { required: true })}
                        />
                        {errors.name && <span>This field is required</span>}

                        <input
                            onClick={(e) => e.stopPropagation()}
                            className="btn btn-primary w-full"
                            type="submit"
                            value="Let's go!"
                        ></input>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}

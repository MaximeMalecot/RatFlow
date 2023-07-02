import { useEffect, useRef } from "react";
import TagFrontUsageSample from "../../assets/tutorials/tags/front-usage.png";

interface HowToUseTagsModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function HowToUseTagsModal({
    isOpen,
    setIsOpen,
}: HowToUseTagsModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const openDialog = () => {
        if (!dialogRef.current) return;
        dialogRef.current.removeAttribute("open");
        dialogRef.current?.showModal();
    };

    const closeDialog = () => {
        if (!dialogRef.current) return;
        setIsOpen(false);
        dialogRef.current?.close();
    };

    useEffect(() => {
        if (isOpen && dialogRef?.current?.close) {
            openDialog();
        } else if (dialogRef?.current?.open) {
            closeDialog();
        }
    }, [isOpen]);

    return (
        <dialog ref={dialogRef} className="modal">
            <form method="dialog" className="modal-box">
                <h3 className="font-bold text-lg">How tags work?</h3>
                <p>
                    The ratflow-react-sdk library provides a set of hooks to
                    allow you to track any meaningful event happening on your
                    app.
                </p>
                <p className="py-4">
                    Each hook follows the same pattern with a ref that you just
                    have to assign to your tracked element, and provide your tag
                    identifier:
                </p>
                <div className="w-full h-3/5">
                    <img
                        className="object-contain w-full h-full"
                        src={TagFrontUsageSample}
                        alt="Tag front usage sample"
                    />
                </div>

                <div className="modal-action" onClick={closeDialog}>
                    <button className="btn">Close</button>
                </div>
            </form>
        </dialog>
    );
}

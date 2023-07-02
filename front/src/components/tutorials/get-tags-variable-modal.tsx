import { useEffect, useRef } from "react";
import { Tag } from "../../interfaces/tag";

interface GetTagsVariableModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    tags: Tag[];
}

export default function GetTagsVariableModal({
    isOpen,
    setIsOpen,
    tags,
}: GetTagsVariableModalProps) {
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
                <h3 className="font-bold text-lg">Get your variables</h3>
                <div className="mockup-code p-3 mt-5">
                    export const tags = {"{"}
                    {tags.map((tag: Tag, index) => (
                        <pre key={index}>
                            <code>
                                {tag.name.toLowerCase().split(" ").join("_")}: "
                                {tag._id}",
                            </code>
                        </pre>
                    ))}
                    {"}"}
                </div>

                <div className="modal-action" onClick={closeDialog}>
                    <button className="btn">Close</button>
                </div>
            </form>
        </dialog>
    );
}

import { useState } from "react";
import { useAppContext } from "../../contexts/manage-app.context";
import appService from "../../services/app.service";
import PromptDeleteModal from "./prompt-delete-modal";

interface DangerSettingsProps {
    onDeletion: () => void;
}

export default function DangerSettings({ onDeletion }: DangerSettingsProps) {
    const { app } = useAppContext();
    const [showModal, setShowModal] = useState(false);

    const deleteApp = async () => {
        try {
            await appService.delete(app._id);
            onDeletion();
        } catch (e: any) {
            console.error(e.message);
        }
    };

    return (
        <section className="flex flex-col gap-1">
            <h3 className="text-xl ml-1">Dangerous zone</h3>
            <div className="flex flex-col gap-3 border-2 border-red-200 p-3 rounded rounded-xl">
                <button
                    className="btn btn-error w-fit"
                    onClick={() => setShowModal(true)}
                >
                    Delete this app
                </button>
            </div>
            <PromptDeleteModal
                isOpen={showModal}
                setIsOpen={setShowModal}
                confirm={deleteApp}
                appName={app.name}
            />
        </section>
    );
}

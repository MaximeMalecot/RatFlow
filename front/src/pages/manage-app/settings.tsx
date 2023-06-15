import { useNavigate } from "react-router-dom";
import BaseSettings from "../../components/settings/base-settings";
import DangerSettings from "../../components/settings/danger-settings";
import KeysSettings from "../../components/settings/keys-settings";
import WhiteListSettings from "../../components/settings/whitelist-settings";
import { useAppContext } from "../../contexts/manage-app.context";

export default function Settings() {
    const { app } = useAppContext();
    const navigate = useNavigate();

    return (
        <div className="w-full flex flex-col gap-3" style={{ width: "100%" }}>
            <h1 className="text-2xl">App settings</h1>
            <div className="divider my-0"></div>
            <BaseSettings />
            <WhiteListSettings />
            <KeysSettings />
            <DangerSettings onDeletion={() => navigate("/dashboard")} />
        </div>
    );
}

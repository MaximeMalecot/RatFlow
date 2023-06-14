import { useAppContext } from "../../contexts/manage-app.context";

export default function ManageApp() {
    const { app } = useAppContext();

    return (
        <div className="w-full flex flex-col gap-2">
            <h1 className="text-2xl ">Home</h1>
        </div>
    );
}

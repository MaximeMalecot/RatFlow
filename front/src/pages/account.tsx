import PasswordSettings from "../components/account/password-settings";

export default function Account() {
    return (
        <div className="px-10 md:px-20 flex flex-col gap-2 py-5 ">
            <h1 className="text-2xl">Account settings</h1>
            <div className="divider my-0"></div>
            <PasswordSettings />
        </div>
    );
}

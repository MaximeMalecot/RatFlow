import Login from "../pages/login";
import Footer from "./footer";

export default function AppLayout() {
    return (
        <div className="h-screen w-screen">
            <main className="w-full height-main-container">
                <Login />
            </main>
            <Footer />
        </div>
    );
}

import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./contexts/auth.context";
import AppLayout from "./layout/app-layout";
import Home from "./pages/home";
import NotFound from "./pages/not-found";

const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const ManageAppLayout = lazy(() => import("./pages/manage-app/layout"));
const ManageAppHome = lazy(() => import("./pages/manage-app"));

function App() {
    const { isConnected } = useAuthContext();

    return (
        <div className="">
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route
                            path="/manage/app/:id"
                            element={
                                isConnected ? (
                                    <ManageAppLayout />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        >
                            <Route path="" element={<ManageAppHome />} />
                        </Route>
                        <Route
                            path="/dashboard"
                            element={
                                isConnected ? (
                                    <Dashboard />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;

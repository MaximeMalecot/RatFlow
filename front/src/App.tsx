import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuthContext } from "./contexts/auth.context";
import AppLayout from "./layout/app-layout";
import Home from "./pages/home";
import BoucingRate from "./pages/manage-app/bouncing-rate";
import Pages from "./pages/manage-app/pages";
import NotFound from "./pages/not-found";

const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const ManageAppLayout = lazy(() => import("./pages/manage-app/layout"));
const ManageAppHome = lazy(() => import("./pages/manage-app"));
const Tags = lazy(() => import("./pages/manage-app/tags"));
const Sessions = lazy(() => import("./pages/manage-app/sessions"));
const Analytics = lazy(() => import("./pages/manage-app/analytics"));
const Settings = lazy(() => import("./pages/manage-app/settings"));
const Account = lazy(() => import("./pages/account"));

function App() {
    const { isConnected } = useAuthContext();

    return (
        <div className="">
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route element={<AppLayout />}>
                        {isConnected && (
                            <>
                                <Route
                                    path="/manage/app/:id"
                                    element={<ManageAppLayout />}
                                >
                                    <Route
                                        path=""
                                        element={<ManageAppHome />}
                                    />
                                    <Route path="tags" element={<Tags />} />
                                    <Route
                                        path="sessions"
                                        element={<Sessions />}
                                    />
                                    <Route
                                        path="settings"
                                        element={<Settings />}
                                    />
                                    <Route
                                        path="analytics"
                                        element={<Analytics />}
                                    />
                                    <Route
                                        path="boucing-rate"
                                        element={<BoucingRate />}
                                    />
                                    <Route path="pages" element={<Pages />} />
                                </Route>
                                <Route
                                    path="/dashboard"
                                    element={<Dashboard />}
                                />
                                <Route path="/account" element={<Account />} />
                            </>
                        )}
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

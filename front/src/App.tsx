import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/app-layout";
import Home from "./pages/home";
import NotFound from "./pages/not-found";

const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const ManageApp = lazy(() => import("./pages/manage-app"));

function App() {
    return (
        <div className="">
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route path="/manage/app/:id" element={<ManageApp />} />
                        <Route path="/dashboard" element={<Dashboard />} />
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

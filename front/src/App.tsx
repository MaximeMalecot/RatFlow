import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/app-layout";
import Home from "./pages/home";
import NotFound from "./pages/not-found";

function App() {
    return (
        <div className="">
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;

import {Suspense, lazy} from "react";
import {Routes, Route} from "react-router-dom"
import {Application, Dashboard, Device, ProfileUser} from "../../pages/main";
import TamplateDashboard from "../../tamplates/TamplateDashboard/TamplateDashboard";
import {LoaderSection} from "../../component";

const NotFound = lazy(() => import("../../pages/404/NotFound"));

const DashboardRoute = () => {
    return (
        <TamplateDashboard>
            <Routes>
                <Route path="*" element={
                    <Suspense fallback={<LoaderSection/>}>
                        <NotFound/>
                    </Suspense>
                }/>

                <Route path="/" element={
                    <Suspense fallback={<LoaderSection/>}>
                        <Dashboard/>
                    </Suspense>
                }/>

                <Route path="/profile" element={
                    <Suspense fallback={<LoaderSection/>}>
                        <ProfileUser/>
                    </Suspense>
                }/>

                <Route path="/application" element={
                    <Suspense fallback={<LoaderSection/>}>
                        <Application/>
                    </Suspense>
                }/>

                <Route path="/application/*" element={
                    <Suspense fallback={<LoaderSection/>}>
                        <Device/>
                    </Suspense>
                }/>

            </Routes>
        </TamplateDashboard>
    )
}

export default DashboardRoute;
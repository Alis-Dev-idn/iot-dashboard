import {Routes, Route} from "react-router-dom"
import {Application, Dashboard, Device, ProfileUser} from "../../pages/main";
import TamplateDashboard from "../../tamplates/TamplateDashboard/TamplateDashboard";
import NotFound from "../../pages/404/NotFound";


const DashboardRoute = () => {
    return (
        <TamplateDashboard>
            <Routes>
                <Route path="*" element={<NotFound/>}/>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/profile" element={<ProfileUser/>}/>
                <Route path="/application" element={<Application/>}/>
                <Route path="/application/device/*" element={<Device/>}/>
            </Routes>
        </TamplateDashboard>
    )
}

export default DashboardRoute;
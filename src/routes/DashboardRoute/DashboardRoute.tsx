import {Routes, Route} from "react-router-dom"
import {Dashboard} from "../../pages/main";
import TamplateDashboard from "../../tamplates/TamplateDashboard/TamplateDashboard";
import NotFound from "../../pages/404/NotFound";


const DashboardRoute = () => {
    return (
        <TamplateDashboard>
            <Routes>
                <Route path="*" element={<NotFound/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
        </TamplateDashboard>
    )
}

export default DashboardRoute;
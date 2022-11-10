import {Routes, Route} from "react-router-dom"
import {Dashboard, ProfileUser} from "../../pages/main";
import TamplateDashboard from "../../tamplates/TamplateDashboard/TamplateDashboard";
import NotFound from "../../pages/404/NotFound";


const DashboardRoute = () => {
    return (
        <TamplateDashboard>
            <Routes>
                <Route path="/not" element={<NotFound/>}/>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/profile" element={<ProfileUser/>}/>
            </Routes>
        </TamplateDashboard>
    )
}

export default DashboardRoute;
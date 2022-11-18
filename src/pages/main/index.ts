import {lazy} from "react";

const Dashboard = lazy(() => import("./Dashboard/Dashboard"));
const ProfileUser = lazy(() => import("./Profile/Profile"));
const Application = lazy(() => import("./Application/Application"));
const Device = lazy(() => import("./Device/Device"));

export {
    Device,
    Dashboard,
    ProfileUser,
    Application
}
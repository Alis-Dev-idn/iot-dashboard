import {Navigate, Outlet} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context";
import {useCookies} from "react-cookie";
import {IUser, sleep} from "../../utils/Utils";


const ProtectedRoute= () => {
    const authContext = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [cookies] = useCookies(["component"]);

    const VerifyData = async () => {
        setLoading(true);
        if(authContext?.IUser.isLogin){
            return;
        }

        if(cookies.component){
            authContext?.SetIUser(cookies.component as IUser);
        }
        await sleep(1000);
        setLoading(false);
    }

    useEffect(() => {
        VerifyData();
        if(authContext?.IUser.isLogin) setLoading(false);
        // eslint-disable-next-line
    }, []);
    if(loading) return <>Loading ...</>
    return authContext?.IUser.isLogin? <Outlet/> : <Navigate to={"/login"}/>
}

export default ProtectedRoute;
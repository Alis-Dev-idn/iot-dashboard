import {Navigate, Outlet} from "react-router-dom";
import {useContext, useEffect} from "react";
import {AuthContext} from "../../context";
import {useCookies} from "react-cookie";
import {IUser} from "../../utils/Utils";


const ProtectedRoute= () => {
    const authContext = useContext(AuthContext);
    const [cookies] = useCookies(["component"]);



    const VerifyData = () => {
        if(authContext?.IUser.isLogin){
            return;
        }

        if(cookies.component){
            authContext?.SetIUser(cookies.component as IUser);
        }
    }

    useEffect(() => {
        VerifyData();

        // eslint-disable-next-line
    }, []);

    return authContext?.IUser.isLogin? <Outlet/> : <Navigate to={"/login"}/>
}

export default ProtectedRoute;
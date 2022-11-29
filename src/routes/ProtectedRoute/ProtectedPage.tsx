import {Navigate, Outlet} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context";
import {useCookies} from "react-cookie";
import {decryptData, sleep} from "../../utils/Utils";
import {Loader} from "../../component";

interface USER {
    id: string;
    name: string;
    username: string;
    email: string;
    role: string;
    token: string;
}

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
            const result = await decryptData(cookies.component.data) as USER;
            authContext?.SetIUser({
                id: result.id,
                name: result.name,
                username: result.username,
                email: result.email,
                role: result.role,
                token: result.token,
                isLogin: true
            });
        }
        await sleep(1000);
        setLoading(false);
    }

    useEffect(() => {
        VerifyData();
        if(authContext?.IUser.isLogin) setLoading(false);
        // eslint-disable-next-line
    }, []);
    if(loading) return <Loader show={loading} isBlock={true}/>
    return authContext?.IUser.isLogin? <Outlet/> : <Navigate to={"/login"}/>
}

export default ProtectedRoute;
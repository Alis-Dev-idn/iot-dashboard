import {createContext, ReactNode, useState} from "react";
import {IUser, sleep} from "../../utils/Utils";
import Cookies from "universal-cookie";
import UserServices from "../../services/UserServices/UserServices";
const cookies = new Cookies();


interface PropTypes {
    children: ReactNode;
}

export const AuthContext = createContext<{
    IUser: IUser;
    SetIUser: (data: IUser) => void;
    Logout: Function;
    SetImageProfile: Function;
} | null>(null);


export const AuthContextProvider = (props: PropTypes) => {
    const [IUser, setUser] = useState<IUser>({
        username: "",
        email: "",
        role: "",
        token: "",
        isLogin: false,
    });

    const SetIUser = async (data: IUser) => {
        setUser(data);
        await sleep(1000);
        await SetImageProfile(data.username);
    }

    const Logout = async () => {
        await cookies.remove("component");
    }

    const SetImageProfile = async (username?: string) => {
        setUser((prev) => ({...prev, image: undefined}));
        const data = await UserServices.GetProfile(username || "");
        setUser((prev) => ({...prev, image: data}));
    }

    return (
        <AuthContext.Provider value={{IUser, SetIUser, Logout, SetImageProfile}}>
            {props.children}
        </AuthContext.Provider>
    )
}
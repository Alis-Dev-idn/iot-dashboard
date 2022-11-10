import {createContext, ReactNode, useState} from "react";
import { IUser } from "../../utils/Utils";
import Cookies from "universal-cookie";
const cookies = new Cookies();


interface PropTypes {
    children: ReactNode;
}

export const AuthContext = createContext<{
    IUser: IUser;
    SetIUser: (data: IUser) => void;
    Logout: Function;
} | null>(null);


export const AuthContextProvider = (props: PropTypes) => {
    const [IUser, setUser] = useState<IUser>({
        username: "",
        email: "",
        role: "",
        token: "",
        isLogin: false,
    });

    const SetIUser = (data: IUser) => {
        setUser(data);
    }

    const Logout = async () => {
        await cookies.remove("component");
    }

    return (
        <AuthContext.Provider value={{IUser, SetIUser, Logout}}>
            {props.children}
        </AuthContext.Provider>
    )
}
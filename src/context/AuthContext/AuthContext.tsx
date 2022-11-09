import {createContext, ReactNode, useState} from "react";
import { IUser } from "../../utils/Utils";

interface PropTypes {
    children: ReactNode;
}

export const AuthContext = createContext<{
    IUser: IUser;
    SetIUser: (data: IUser) => void;
} | null>(null);


export const AuthContextProvider = (props: PropTypes) => {
    const [IUser, setUser] = useState<IUser>({
        data: "",
        isLogin: false,
    });

    const SetIUser = (data: IUser) => {
        setUser(data);
    }

    return (
        <AuthContext.Provider value={{IUser, SetIUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}
import {createContext, ReactNode, useState} from "react";

interface PropTypes {
    children: ReactNode;
}

interface IAlert {
    show: boolean;
    message: string;
    type?: "warning" | "success";
}

interface ILoading {
    show: boolean;
    isBlock: boolean;
}

export const UiContext = createContext<{
    loading: ILoading;
    alert: IAlert;
    handleAlert: (data: IAlert) => void;
    handleLoading: (data: ILoading) => void;
} | null>(null);


export const UiContextProvider = (props: PropTypes) => {
    const [alert, setAlert] = useState<IAlert>({
        show: false,
        message: "",
        type: "warning"
    });
    const [loading, setLoading] = useState<ILoading>({
        show: false,
        isBlock: false
    });

    const handleAlert = (data: IAlert) => {
        setAlert(data)
    }

    const handleLoading = (data: ILoading) => {
        setLoading(data);
    }

    return (
        <UiContext.Provider value={{alert, handleAlert, loading, handleLoading}}>
            {props.children}
        </UiContext.Provider>
    )
}
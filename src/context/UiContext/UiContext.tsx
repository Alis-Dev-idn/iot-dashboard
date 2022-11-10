import {createContext, ReactEventHandler, ReactNode, useState} from "react";

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

interface IConfirm {
    show: boolean;
    message: string;
    callback?: ReactEventHandler
}

export const UiContext = createContext<{
    loading: ILoading;
    handleLoading: (data: ILoading) => void;

    alert: IAlert;
    handleAlert: (data: IAlert) => void;

    confirm: IConfirm;
    handleConfirm: (data: IConfirm) => void;

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

    const [confirm, setConfirm] = useState<IAlert>({
        show: false,
        message: "",
        type: "warning"
    });

    const handleAlert = (data: IAlert) => {
        setAlert(data)
    }

    const handleLoading = (data: ILoading) => {
        setLoading(data);
    }

    const handleConfirm = (data: IConfirm) => {
        setConfirm((prev) => ({...prev, ...data}));
    }

    return (
        <UiContext.Provider value={{alert, handleAlert, loading, handleLoading, confirm, handleConfirm}}>
            {props.children}
        </UiContext.Provider>
    )
}
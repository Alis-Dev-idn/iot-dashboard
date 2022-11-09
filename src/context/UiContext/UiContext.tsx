import {createContext, ReactNode, useState} from "react";

interface PropTypes {
    children: ReactNode;
}

interface IAlert {
    show: boolean;
    message: string;
    type?: "warning" | "success";
}

export const UiContext = createContext<{
    alert: IAlert
    handleAlert: (data: IAlert) => void
} | null>(null);


export const UiContextProvider = (props: PropTypes) => {
    const [alert, setAlert] = useState<IAlert>({
        show: false,
        message: "",
        type: "warning"
    });

    const handleAlert = (data: IAlert) => {
        setAlert(data)
    }

    return (
        <UiContext.Provider value={{alert, handleAlert}}>
            {props.children}
        </UiContext.Provider>
    )
}
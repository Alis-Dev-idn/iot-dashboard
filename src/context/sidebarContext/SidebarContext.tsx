import {createContext, ReactNode, useState} from "react";

interface PropTypes {
    children: ReactNode;
}

export const SidebarContext = createContext<{
    show: boolean;
    showSidebar: (data: boolean) => void;
} | null>(null);

export const SidebarContextProvider = (props: PropTypes) => {
    const [show, serShow] = useState(false);

    const showSidebar = (data: boolean) => serShow(data);

    return(
        <SidebarContext.Provider value={{show, showSidebar}}>
            {props.children}
        </SidebarContext.Provider>
    )
}
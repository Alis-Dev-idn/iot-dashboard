import {ReactNode, useContext, useEffect, useState} from "react";
import {Alert, BoxFormulir, Confirm, Loader, Navbar, ScrollBars, Sidebar, SidebarMobile} from "../../component";
import {FormulirContext, SidebarContext, UiContext} from "../../context";
import {useLocation} from "react-router-dom";

interface PropTypes {
    children: ReactNode
}

const TamplateDashboard = (props: PropTypes) => {
    const [name, setName] = useState("")
    const sidebarContext = useContext(SidebarContext);
    const uiContext = useContext(UiContext);
    const formulirContext = useContext(FormulirContext);
    const locate = useLocation();

    useEffect(() => {
        const path = locate.pathname.split("/");
        let pathname = "";
        for (let i = 0; i < path.length; i++) {
            if(path[i] !== "") pathname = `${pathname} / ${path[i]}`
        }
        setName(pathname);
    }, [locate.pathname]);


    return (
        <div className="w-screen h-screen bg-primary-blue overflow-hidden">

            <Confirm
                show={uiContext?.confirm.show || false}
                message={uiContext?.confirm.message || ""}
                callback={uiContext?.confirm.callback}
            />

            <Loader
                show={uiContext?.loading.show || false}
                isBlock={uiContext?.loading.isBlock || false}
            />

            <Alert
                show={uiContext?.alert.show || false}
                message={uiContext?.alert.message || ""}
                type={uiContext?.alert.type}
                callback={() => uiContext?.handleAlert({show: false, message: ""})}
            />

            <BoxFormulir
                className={formulirContext?.formulir.className}
                show={formulirContext?.formulir.show || false}
                label={formulirContext?.formulir.label || ""}
                children={formulirContext?.formulir.children || <></>}
            />

            <SidebarMobile show={sidebarContext?.show || false}/>

            <div className={`flex flex-row h-full md:space-x-3 py-2 px-3`}>
                <div className="hidden md:block">
                    <Sidebar/>
                </div>
                <div className="flex flex-col justify-center w-full h-full space-y-3">
                    <Navbar/>
                    <div className="text-white font-font1 ml-2 text-[14px]">Home {name}</div>
                    <div className="w-full h-full overflow-hidden">
                        <ScrollBars type="top" update={0}>
                            <section>
                                {props.children}
                            </section>
                        </ScrollBars>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TamplateDashboard;
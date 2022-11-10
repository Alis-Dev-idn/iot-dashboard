import {ReactNode, useContext} from "react";
import {Confirm, Loader, Navbar, ScrollBars, Sidebar, SidebarMobile} from "../../component";
import {SidebarContext, UiContext} from "../../context";

interface PropTypes {
    children: ReactNode
}

const TamplateDashboard = (props: PropTypes) => {
    const sidebarContext = useContext(SidebarContext);
    const uiContext = useContext(UiContext);

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

            <SidebarMobile show={sidebarContext?.show || false}/>

            <div className={`flex flex-row h-full md:space-x-3 py-2 px-3 ${sidebarContext?.show? "bg-white md:bg-transparent opacity-30 md:opacity-100" : ""}`}>
                <div className="hidden md:block">
                    <Sidebar/>
                </div>
                <div className="flex flex-col justify-center w-full h-full space-y-3">
                    <Navbar/>
                    <div className="w-full h-full bg-blue-2 rounded-xl overflow-hidden">
                        <ScrollBars>
                            <section>
                                <div className="px-3 py-3">
                                    {props.children}
                                </div>
                            </section>
                        </ScrollBars>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TamplateDashboard;
import {ReactComponent as Close} from "../../../assets/icon/x-mark.svg";
import {ReactComponent as Home} from "../../../assets/icon/home.svg";
import {ReactComponent as Layer} from "../../../assets/icon/layer.svg";
import {ReactComponent as Widget} from "../../../assets/icon/cubes.svg";
import {useContext, useEffect, useState} from "react";
import {SidebarContext} from "../../../context";
import {Link, useLocation} from "react-router-dom";


interface PropTypes {
    show: boolean;
}

const SidebarMobile = (props: PropTypes) => {
    const locate = useLocation();
    const sidebarContext = useContext(SidebarContext);
    const [active, setActive] = useState("");

    const getLocationPath = () => {
        const pathName = locate.pathname.split("/");
        setActive(pathName[1]);
    }

    useEffect(() => {
        getLocationPath();

        // eslint-disable-next-line
    }, [locate.pathname]);

    return(
        <>
            <div
                className={`absolute w-full h-full bg-white bg-opacity-50 ${props.show? "z-10" : "-z-20"}`}
                onClick={() => sidebarContext?.showSidebar(false)}
            ></div>
            <div className={`md:w-0 md:-ml-10 z-30 absolute overflow-hidden transition-all duration-500 h-full border border-blue-2 border-opacity-50 rounded-r-xl ${props.show? "w-[250px]" : "w-0 -ml-10"}`}>
                <div className="flex flex-col bg-primary-blue h-full w-full px-3 py-2 space-y-2">
                    <div className="flex flex-row items-center">
                        <div className="w-full flex flex-row space-x-2">
                            <p className="text-white font-font1 font-bold">IoT</p>
                            <p className="text-white font-font1 font-bold">Panel</p>
                        </div>

                        <div className="flex justify-end items-center w-[50px]">
                            <Close
                                className="w-5 h-5 fill-white cursor-pointer"
                                onClick={() => sidebarContext?.showSidebar(false)}
                            />
                        </div>
                    </div>
                    <div className="w-full h-[2px] bg-white"></div>
                    <div className="flex flex-col h-full w-full">
                        {/*Element Link*/}
                        <Link
                            onClick={() => sidebarContext?.showSidebar(false)}
                            to={"/"}
                            className={`flex flex-row items-center space-x-2 w-full py-2 px-1 rounded-xl ${active === ""? "bg-sky-700" : null}`}
                        >
                            <Home className="w-7 h-7 fill-white"/>
                            <p className="text-white font-font1">Home</p>
                        </Link>

                        <Link
                            onClick={() => sidebarContext?.showSidebar(false)}
                            to={"/application"}
                            className={`flex flex-row items-center space-x-2 w-full py-2 px-1 rounded-xl ${active === "application"? "bg-sky-700" : null}`}
                        >
                            <Layer className="w-7 h-7 fill-white"/>
                            <p className="text-white font-font1">Application</p>
                        </Link>

                        <Link
                            onClick={() => sidebarContext?.showSidebar(false)}
                            to={"/widget"}
                            className={`flex flex-row items-center space-x-2 w-full py-2 px-1 rounded-xl ${active === "widget"? "bg-sky-700" : null}`}
                        >
                            <Widget className="w-7 h-7 fill-white"/>
                            <p className="text-white font-font1">Widget</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>

    )
}

export default SidebarMobile;
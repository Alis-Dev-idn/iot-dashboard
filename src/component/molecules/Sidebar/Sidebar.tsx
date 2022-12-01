import {ReactComponent as Angles} from "../../../assets/icon/angles-right.svg";
import {ReactComponent as Layer} from "../../../assets/icon/layer.svg";
import {ReactComponent as Home} from "../../../assets/icon/home.svg";
import {ReactComponent as Widget} from "../../../assets/icon/cubes.svg";
import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";

const Sidebar = () => {
    const locate = useLocation();
    const [show, setShow] = useState(false);
    const [stay, setStay] = useState(false);
    const [active, setActive] = useState("");

    const handleMouseEnter = () => {
        if(stay) return;
        setShow(true);
    }
    const handleMouseLeave = () => {
        if(stay) return;
        setShow(false);
    }

    const getLocationPath = () => {
        const pathName = locate.pathname.split("/");
        setActive(pathName[1]);
    }

    useEffect(() => {
        getLocationPath();

        // eslint-disable-next-line
    }, [locate.pathname]);
    return(
        <div
            className={`flex flex-col transition-all duration-500 overflow-hidden ${show? "w-[200px]" : "w-[50px]"} h-full bg-blue-2 px-2 py-2 rounded-xl`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex flex-row items-center">
                <div className="w-full flex flex-row w-full space-x-2">
                    {show?
                        <>
                            <p className={`text-white font-bold font-font1 transition-all duration-500 text-[25px]`}>IoT</p>
                            <p className={`text-white font-bold font-font1 transition-all duration-500 text-[25px]`}>Panel</p>
                        </>
                        :
                        <p className={`text-white font-bold font-font1 transition-all duration-500 text-[20px]`}>IoT</p>
                    }

                </div>
                <div className={`flex justify-end w-[50px] ${show? "" : "hidden"}`}>
                    <Angles className={`h-6 w-6 fill-white cursor-pointer transition-all duration-500 ${stay? "rotate-0" : "rotate-180"}`} onClick={() => setStay(!stay)}/>
                </div>
            </div>
            <div className="py-3">
                <div className="w-full h-[2px] bg-white "></div>
            </div>

            <div className="flex flex-col items-center h-full w-full">
                {/*Element Link*/}
                <Link to={"/"} className={`flex flex-row items-center space-x-2 w-full py-2 px-1 rounded-xl hover:bg-sky-700 ${active === ""? "bg-sky-700" : null}`}>
                    <Home className="w-7 h-7 fill-white"/>
                    {show? <p className="text-white font-font1">Home</p> : null}
                </Link>

                <Link to={"/application"} className={`flex flex-row items-center space-x-2 w-full py-2 px-1 rounded-xl hover:bg-sky-700 ${active === "application"? "bg-sky-700" : null}`}>
                    <Layer className="w-7 h-7 fill-white"/>
                    {show? <p className="text-white font-font1">Application</p> : null}
                </Link>

                <Link to={"/widget"} className={`flex flex-row items-center space-x-2 w-full py-2 px-1 rounded-xl hover:bg-sky-700 ${active === "widget"? "bg-sky-700" : null}`}>
                    <Widget className="w-7 h-7 fill-white"/>
                    {show? <p className="text-white font-font1">Widget</p> : null}
                </Link>
            </div>
        </div>
    )
}

export default Sidebar;
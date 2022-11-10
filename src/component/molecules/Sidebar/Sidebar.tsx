import {ReactComponent as Angles} from "../../../assets/icon/angles-right.svg";
import {ReactComponent as Logout} from "../../../assets/icon/logout.svg";
import {useContext, useState} from "react";
import {AuthContext, UiContext} from "../../../context";
import {useNavigate} from "react-router-dom";
import {sleep} from "../../../utils/Utils";

const Sidebar = () => {
    const authContext = useContext(AuthContext);
    const uiContext = useContext(UiContext);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [stay, setStay] = useState(false);

    const handleMouseEnter = () => {
        if(stay) return;
        setShow(true);
    }

    const handleMouseLeave = () => {
        if(stay) return;
        setShow(false);
    }

    const handleLogout = async () => {
        await authContext?.Logout();
        uiContext?.handleLoading({show: true, isBlock: false});
        await sleep(2000);
        uiContext?.handleLoading({show: false, isBlock: false});
        navigate("/login");
    }

    return(
        <div
            className={`flex flex-col transition-all duration-500 overflow-hidden ${show? "w-[200px]" : "w-[90px]"} h-full bg-blue-2 px-2 py-2 rounded-xl`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex flex-row items-center">
                <div className="w-full flex flex-row w-full space-x-2">
                    <p className={`text-white font-bold font-font1 transition-all duration-500 ${show? "text-[25px]" : "text-[15px]"}`}>IoT</p>
                    <p className={`text-white font-bold font-font1 transition-all duration-500 ${show? "text-[25px]" : "text-[15px]"}`}>Panel</p>
                </div>
                <div className={`flex justify-end w-[50px] ${show? "" : "hidden"}`}>
                    <Angles className={`h-6 w-6 fill-white cursor-pointer transition-all duration-500 ${stay? "rotate-0" : "rotate-180"}`} onClick={() => setStay(!stay)}/>
                </div>
            </div>
            <div className="w-full h-[2px] bg-white"></div>
            <div className="flex flex-col h-full">

            </div>
            <div className="flex flex-col items-start justify-end h-full w-full">
                <div className={`flex justify-center items-center w-full`}>
                    <div
                        className="flex flex-row items-center space-x-2 -mt-20 cursor-pointer"
                        onClick={handleLogout}
                    >
                        <Logout className="w-8 h-8 fill-white"/>
                        {show?
                            <p className="text-white font-bold ">Logout</p>
                            : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
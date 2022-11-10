import {ReactComponent as Angles} from "../../../assets/icon/angles-right.svg";
import {useState} from "react";

const Sidebar = () => {
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

    return(
        <div
            className={`transition-all duration-500 overflow-y-hidden ${show? "w-[200px]" : "w-[90px]"} h-full bg-blue-2 px-2 py-2 rounded-xl`}
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
        </div>
    )
}

export default Sidebar;
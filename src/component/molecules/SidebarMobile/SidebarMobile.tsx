import {ReactComponent as Close} from "../../../assets/icon/x-mark.svg";
import {useContext} from "react";
import {AuthContext, SidebarContext, UiContext} from "../../../context";
import {ReactComponent as Logout} from "../../../assets/icon/logout.svg";
import {useNavigate} from "react-router-dom";
import {sleep} from "../../../utils/Utils";


interface PropTypes {
    show: boolean;
}

const SidebarMobile = (props: PropTypes) => {
    const sidebarContext = useContext(SidebarContext);
    const authContext = useContext(AuthContext);
    const uiContext = useContext(UiContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await authContext?.Logout();
        sidebarContext?.showSidebar(false)
        uiContext?.handleLoading({show: true, isBlock: false});
        await sleep(2000);
        uiContext?.handleLoading({show: false, isBlock: false});
        navigate("/login");
    }

    return(
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

                </div>
                <div className="flex flex-col items-start justify-end h-full w-full">
                    {/*element*/}
                    <div className={`flex w-full`}>
                        <div
                            className="flex flex-row items-center space-x-2 -mt-16 w-full cursor-pointer"
                            onClick={handleLogout}
                        >
                            <Logout className="w-7 h-7 fill-white"/>
                            <p className="text-white font-bold ">Logout</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SidebarMobile;
import {ReactComponent as Menu} from "../../../assets/icon/dot-menu.svg";
import {ReactComponent as Profile} from "../../../assets/icon/user-solid.svg";
import {ReactComponent as Logout} from "../../../assets/icon/logout.svg";
import {useContext, useState} from "react";
import {AuthContext, SidebarContext, UiContext} from "../../../context";
import {sleep} from "../../../utils/Utils";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const [show, setShow] = useState(false);
    const sidebarContext = useContext(SidebarContext);
    const uiContext = useContext(UiContext);
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const handleClickIcon = () => {
        setShow(!show);
    }

    const handleClickLogout = () => {
        setShow(false);
        uiContext?.handleConfirm({
            show: true,
            message: "Ingin Keluar?",
            callback: handleConfirmLogout
        });
    }

    const handleClickProfile = () => {
        setShow(false);
        navigate("/profile");
    }

    const handleConfirmLogout = async () => {
        uiContext?.handleConfirm({
            show: false,
            message: "",
        });
        await authContext?.Logout();
        uiContext?.handleLoading({show: true, isBlock: false});
        await sleep(2000);
        uiContext?.handleLoading({show: false, isBlock: false});
        navigate("/login");
    }

    return(
        <div className="w-full bg-blue-2 h-[50px] rounded-xl px-3 py-1">
            <div className="flex flex-row items-center h-full">
                <div className="md:hidden flex justify-start items-center h-full w-full">
                    <Menu className="w-6 h-6 fill-white cursor-pointer" onClick={() => sidebarContext?.showSidebar(true)}/>
                </div>
                <div className="w-full">
                    <div className="flex flex-row justify-end h-full w-full">
                        <div
                            className={`w-[25px] h-full bg-white rounded-xl cursor-pointer w-full ${show? "z-20" : ""}`} title="Account"
                            onClick={handleClickIcon}
                        >
                            <div className="flex justify-center items-center">
                                <img src={`${process.env.REACT_APP_BACKEND_URL}/profile/${authContext?.IUser.username}`} alt={"user"} loading={"eager"}/>
                            </div>
                        </div>
                        <div className="z-10 absolute" onMouseLeave={() => setShow(false)}>
                            <div className={`flex flex-col bg-sky-800 rounded-b-md rounded-tl-md space-y-1 px-2 py-2 -ml-[90px] transition-all duration-500 overflow-hidden w-[120px] ${show? "mt-8 opacity-100" : "-mt-36 opacity-0"}`}>
                                <div className="flex flex-col justify-center items-center">
                                    <p className="text-white font-font1 text-[14px]">Hi {authContext?.IUser.username}</p>
                                    <div className="py-2 w-full">
                                        <div className="bg-white w-full h-[1px]"></div>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-2 z-30">
                                    <div
                                        className="flex flex-row space-x-2 items-center cursor-pointer hover:bg-sky-700 w-full"
                                        onClick={handleClickProfile}
                                    >
                                        <Profile className="w-4 h-4 fill-white ml-3"/>
                                        <p className="text-white font-font1 text-[13px]">Profile</p>
                                    </div>
                                    <div
                                        className="flex flex-row items-center space-x-2 cursor-pointer hover:bg-sky-700 w-full"
                                        onClick={handleClickLogout}
                                    >
                                        <Logout className="w-5 h-5 fill-white ml-3"/>
                                        <p className="text-white font-font1 text-[13px]">Logout</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Navbar;
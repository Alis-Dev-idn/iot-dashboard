import {ReactComponent as Menu} from "../../../assets/icon/dot-menu.svg";
import {useContext} from "react";
import {SidebarContext} from "../../../context";

const Navbar = () => {
    const sidebarContext = useContext(SidebarContext);

    return(
        <div className="w-full bg-blue-2 h-[50px] rounded-xl px-3 py-1">
            <div className="flex flex-row items-center h-full">
                <div className="md:hidden flex justify-start items-center h-full w-full">
                    <Menu className="w-6 h-6 fill-white cursor-pointer" onClick={() => sidebarContext?.showSidebar(true)}/>
                </div>
                <div className="w-full">
                    <div className="flex flex-row justify-end h-full">
                        <div className="w-[25px] h-full bg-white rounded-xl cursor-pointer" title="Account">
                            <div className="flex justify-center items-center">
                                <p className="">A</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
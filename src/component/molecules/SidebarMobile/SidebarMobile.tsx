import {ReactComponent as Close} from "../../../assets/icon/x-mark.svg";
import {useContext} from "react";
import {SidebarContext} from "../../../context";


interface PropTypes {
    show: boolean;
}

const SidebarMobile = (props: PropTypes) => {
    const sidebarContext = useContext(SidebarContext);

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

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SidebarMobile;
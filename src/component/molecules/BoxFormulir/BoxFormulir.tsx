import {ReactComponent as Close} from "../../../assets/icon/x-mark.svg";
import {ReactNode, useContext} from "react";
import {FormulirContext} from "../../../context";

interface Proptypes {
    show: boolean;
    label: string;
    className?: string;
    children: ReactNode;
}

const BoxFormulir = (props: Proptypes) => {
    const formulitContext = useContext(FormulirContext);
    const handleClose = () => {
        formulitContext?.setIFormulir({
            className: props.className,
            show: false,
            label: props.label,
            children: props.children
        });
    }

    return(
        <div className={`fixed w-full h-full z-10 transition-all duration-500 overflow-hidden ${props.show? "opacity-100" : "-mt-20 opacity-0 h-0"} px-5 py-5`}>
            <div className="flex items-center justify-center h-full">
                <div className={`${props.className} w-[600px] bg-blue-2 border border-white border-opacity-50 shadow shadow-md rounded-md px-3 py-2`}>
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-end w-full">
                            <p className="text-white font-font1 w-full">{props.label}</p>
                            <Close
                                className="w-5 h-5 fill-white cursor-pointer hover:fill-red-500"
                                onClick={handleClose}
                            />
                        </div>
                        <div className="w-full h-[1px] bg-gray-300"></div>
                    </div>
                    <div className="flex flex-col w-full mt-3">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BoxFormulir
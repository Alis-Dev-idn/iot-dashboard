import {ReactComponent as Info} from "../../../assets/icon/circle-info.svg";
import {ReactComponent as Close} from "../../../assets/icon/x-mark.svg";
import {ReactEventHandler, useContext} from "react";
import {UiContext} from "../../../context";
import {Button} from "../../index";

interface PropTypes {
    show: boolean;
    message: string;
    callback?: ReactEventHandler
}

const Confirm = (props: PropTypes) => {
    const uiContext = useContext(UiContext);

    const handleClose = () => {
        uiContext?.handleConfirm({
            show: false,
            message: ""
        });
    }

    return(
        <div className={`fixed w-screen h-screen z-20 transition-all duration-300 ${props.show? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
            <div className="flex flex-col justify-center items-center h-full">
                <div className="w-[300px] h-[150px] bg-primary-blue rounded-xl border border-white border-opacity-10 shadow-md px-3 py-2">
                    <div className="flex flex-col">
                        <div className="flex justify-end">
                            <Close
                                className="w-4 h-4 fill-white cursor-pointer"
                                onClick={handleClose}
                            />
                        </div>
                        <div className="flex flex-col items-center space-y-4">
                            <Info className="w-10 h-10 fill-white"/>
                            <p className="text-white font-font1 text-[12px]">{props.message}</p>
                        </div>
                        <div className="flex flex-row items-center justify-center space-x-10 -mt-3">
                            <Button className="text-[13px] py-1" label="Ok" name="ok" onClick={props.callback as ReactEventHandler}/>
                            <Button className="text-[13px] py-1 bg-red-700 hover:bg-red-500" label="No" name="no" onClick={handleClose}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Confirm;
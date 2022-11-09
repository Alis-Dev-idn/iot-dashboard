import {ReactComponent as Warning} from "../../../assets/icon/warning-triangle.svg";
import {ReactComponent as Exit} from "../../../assets/icon/x-mark.svg";
import {ReactComponent as Success} from "../../../assets/icon/success-circle.svg";


interface PropTypes {
    show: boolean;
    message: string;
    type?: "warning" | "success";
    callback: Function;
}

const Alert = (props: PropTypes) => {
    return (
        <div className={`fixed z-20 w-full h-full transition-all duration-300 ease-out ${props.show? "scale-100" : "scale-0"}`}>
            <div className="flex justify-center items-center w-full h-full">
                <div className="flex flex-col w-[450px] h-[160px] bg-sky-700 rounded-md shadow shadow-md px-2 py-2">
                    <div className="flex justify-end">
                        <Exit className="w-5 h-5 fill-white cursor-pointer" onClick={() => props.callback(false)}/>
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2 h-full">
                        <div className="flex flex-col items-center -mt-6">
                            {props.type === "success"?
                               <Success className="w-10 h-10 fill-white"/> : <Warning className="w-10 h-10 fill-white"/>
                            }

                            <p className="text-white font-font1 font-bold">{props.type === "warning"? "Warning" : "Success"}</p>
                        </div>
                        <p className="text-white">{props.message}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Alert;
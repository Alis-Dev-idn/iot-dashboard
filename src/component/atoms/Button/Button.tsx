import {Oval} from "react-loader-spinner";
import React, {ReactNode} from "react";


interface PropType {
    label: string;
    name: string;
    className?: string;
    loading?: boolean;
    isDisable?: boolean;
    icon?: ReactNode;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: PropType) => {

    return (
        <button
            className={`bg-sky-700 px-3 py-1.5 rounded-md cursor-pointer hover:bg-sky-500 mt-5 disabled:cursor-not-allowed ${props.className}`}
            name={props.name}
            onClick={props.onClick}
            disabled={props.isDisable}
        >
            <div className="flex flex-row items-center space-x-2">
                {props.icon? props.icon : null}
                <p className="text-white font-font1">{props.label}</p>
                {props.loading?
                    <Oval
                        color="blue"
                        height={25}
                        width={20}
                        strokeWidth={10}
                    />
                    : null}
            </div>
        </button>
    )
}

export default Button;
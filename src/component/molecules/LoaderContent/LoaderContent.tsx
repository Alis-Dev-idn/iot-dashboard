import {CirclesWithBar} from "react-loader-spinner";
import {ReactNode} from "react";

interface PropTypes {
    loading: boolean;
    children: ReactNode;
}

const LoaderContent = (props: PropTypes) => {
    return (
        (props.loading?
                <div className="flex justify-center items-center h-full">
                    <CirclesWithBar
                        height="50"
                        width="50"
                        color="blue"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        outerCircleColor=""
                        innerCircleColor=""
                        barColor=""
                        ariaLabel='circles-with-bar-loading'
                    />
                </div>
            :
                <>
                    {props.children}
                </>
        )
    )
}

export default LoaderContent;
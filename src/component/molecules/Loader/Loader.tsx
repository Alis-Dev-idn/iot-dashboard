import {Grid} from "react-loader-spinner";

interface PropTypes {
    show: boolean;
    isBlock: boolean;
}

const Loader = (props: PropTypes) => {
    return(
        <div className={`absolute w-screen h-screen bg-primary-blue ${props.show? (props.isBlock? "" : "z-50 bg-opacity-50") : "hidden"}`}>
            <div className="flex flex-col justify-center items-center h-full">
                <Grid
                    height="70"
                    width="70"
                    color="#a7d8de"
                    ariaLabel="grid-loading"
                    radius="13"
                    visible={true}
                />
            </div>
        </div>
    )
}

export default Loader;

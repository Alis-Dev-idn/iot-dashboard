import {Grid} from "react-loader-spinner";


const LoaderSection = () => {
    return(
        <div className="flex justify-center items-center h-[200px]">
            <Grid
                height="70"
                width="70"
                color="#a7d8de"
                ariaLabel="grid-loading"
                radius="13"
                visible={true}
            />
        </div>
    )
}

export default LoaderSection;
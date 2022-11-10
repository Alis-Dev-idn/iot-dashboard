import {ReactNode} from "react";
import Scrollbars from "react-custom-scrollbars-2";

interface Proptypes {
    children: ReactNode
}

const ScrollBars = (props: Proptypes) => {
    return(
        <Scrollbars
            autoHide={true}
            autoHideTimeout={1000}
            autoHideDuration={200}
            universal
            renderTrackVertical={(p) => (<div className="track-vertical" {...p}/>)}
            renderThumbVertical={(p) => (<div className="bg-primary-blue rounded-xl hover:bg-sky-700" {...p}/>)}
            renderThumbHorizontal={(p) => (<div className="bg-primary-blue rounded-xl hover:bg-sky-700" {...p}/>)}
        >
            {props.children}
        </Scrollbars>
    )
}

export default ScrollBars;
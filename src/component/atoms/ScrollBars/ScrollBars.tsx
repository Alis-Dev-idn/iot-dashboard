import {ReactNode, useEffect, useRef} from "react";
import Scrollbars from "react-custom-scrollbars-2";

interface Proptypes {
    children: ReactNode;
    type: "top" | "bottom";
    update: number;
}

const ScrollBars = (props: Proptypes) => {
    const scrollRef = useRef<any>();

    useEffect(() => {
        if(props.type === "top") scrollRef.current?.scrollToTop();
        if(props.type === "bottom") scrollRef.current?.scrollToBottom();

        // eslint-disable-next-line
    }, [props.update]);
    return(
        <Scrollbars
            ref={scrollRef}
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
import {ReactNode, useEffect, useRef} from "react";
import Scrollbars from "react-custom-scrollbars-2";

interface Proptypes {
    id?: string;
    children: ReactNode;
    type: "top" | "bottom";
    update: number;
    toButtom?: boolean;
    callback: Function;
}

let lastScroll = 0;
const ScrollBars = (props: Proptypes) => {
    const scrollRef = useRef<any>();

    useEffect(() => {
        // eslint-disable-next-line
        if(scrollRef.current?.getScrollTop() === 0){
            if(props.type === "top") scrollRef.current?.scrollToTop();
            if(props.type === "bottom") scrollRef.current?.scrollToBottom();
        }else{
            // eslint-disable-next-line
            if(scrollRef.current?.getScrollTop() > lastScroll){
                // eslint-disable-next-line
                lastScroll = scrollRef.current?.getScrollTop();
                if(props.type === "top") scrollRef.current?.scrollToTop();
                if(props.type === "bottom") scrollRef.current?.scrollToBottom();
                props.callback(false);
            }else{
                props.callback(true);
            }
        }
        console.log(scrollRef.current?.getScrollTop(), lastScroll);
        // eslint-disable-next-line
    }, [props.update]);

    useEffect(() => {
        // lastScroll = scrollRef.current?. getScrollTop();
        if(props.type === "top") scrollRef.current?.scrollToTop();
        if(props.type === "bottom") scrollRef.current?.scrollToBottom();

        lastScroll=0;
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        scrollRef.current?.scrollToBottom();
    }, [props.toButtom]);

    return(
        <Scrollbars
            id={props.id}
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
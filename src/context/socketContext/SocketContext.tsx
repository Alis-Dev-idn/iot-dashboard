import {createContext, ReactNode, useState} from "react";

interface PropTypes {
    children: ReactNode;
}

interface INode {
    name: string;
    data: any;
}

export const SocketContext = createContext<{
    node: INode;
} | null>(null);


export const SocketContextProvider = (props: PropTypes) => {
    const [node, setNode] = useState<INode>({
        name: "",
        data: {}
    });
}
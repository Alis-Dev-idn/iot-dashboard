import {io} from "socket.io-client";

const host = `${process.env.REACT_APP_BACKEND_URL}`;
const socket = io(host).connect();


export const listenBrodcast = async (topic: string) => {
    return new Promise(async (resolve, reject) => {
        socket.on(topic, data => resolve(data));
    })
}
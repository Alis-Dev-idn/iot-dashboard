import axios, { AxiosRequestConfig} from "axios";
import {Cookies} from "react-cookie";
import {decryptData, IUser} from "../../utils/Utils";
import {IUserData} from "../UserServices/User";
const cookies = new Cookies();


interface PropTypes {
    type: "json" | "from-data";
    respond: "json" | "blob";
}

// interface CommonHeaderProperties extends HeadersDefaults {
//     Authorization: string;
//     "content-type": string;
// }


export interface AxiosResponse<T = never> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: AxiosRequestConfig<T>;
    request?: any;
}

export interface ObjectError {
    message?: string;
}


export const AxiosServices = (props: PropTypes) => {
    let token: string = "";
    const secret = process.env.REACT_APP_SECRET_KEY;
    const dataCookies = cookies.get("component");
    if(dataCookies && secret){
        const decrypt = decryptData(dataCookies.data);
        token = decrypt.token;
    }

    return axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL,
        headers: {
            Authorization: `token ${token}`,
            "Content-Type": "application/json",
            Accept: props.type === "json"? "application/json" : "multipart/form-data"
        },
        responseType: props.respond === "json"? "json" : "blob"
    });
}
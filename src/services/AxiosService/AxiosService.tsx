import axios, { AxiosRequestConfig} from "axios";

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
    error?: string;
}


export const AxiosServices = (props: PropTypes) => {
    return axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL,
        headers: {
            Authorization: "token awdascdecasdcve",
            "Content-Type": "application/json",
            Accept: props.type === "json"? "application/json" : "multipart/form-data"
        },
        responseType: props.respond === "json"? "json" : "blob"
    });
}
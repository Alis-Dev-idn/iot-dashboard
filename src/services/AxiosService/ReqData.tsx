import {AxiosResponse, ObjectError, AxiosServices} from "./AxiosService"
import axios from "axios";

const AxiosReqData = (type: "json" | "from-data", accept: "json" | "blob", path: string, params?: string) => {
    return new Promise(async (resolve, reject) => {
        try{
            path = params? `${path}?${params}` : path;
            const response: AxiosResponse = await AxiosServices({type: type, respond: accept}).get(path);
            resolve(response.data);
        }catch (error){
            let message: Error;
            if(axios.isAxiosError(error) && error.response?.data){
                const responseData = error.response?.data as ObjectError;
                message = responseData["message"]? new Error(responseData.message) : new Error(error.message);
            }else{
                message = error as Error;
            }
            reject(message);
        }
    });
}

export default AxiosReqData;
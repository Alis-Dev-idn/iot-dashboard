import {AxiosResponse, AxiosServices, ObjectError} from "./AxiosService";
import axios from "axios";


const AxiosPostData = (type: "json" | "from-data", accept: "json" | "blob", path: string, body?: any) => {
    return new Promise(async (resolve, reject) => {
        try{
            const response: AxiosResponse = await AxiosServices({type: type, respond: accept}).post(path, body);
            resolve(response.data);
        }catch (error){
            let message: Error;
            if(axios.isAxiosError(error) && error.response?.data){
                const responseData = error.response?.data as ObjectError;
                message = responseData["error"]? new Error(responseData.error) : new Error(error.message);
            }else{
                message = error as Error;
            }
            reject(message);
        }
    });
}

export default AxiosPostData;
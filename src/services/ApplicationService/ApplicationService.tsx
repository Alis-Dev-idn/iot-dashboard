import {AxiosPostData, AxiosReqData} from "../AxiosService";
import {IApplication} from "./Application";


class ApplicationService {
    static path = "/app";

    public static async GetApplication(update?: boolean): Promise<IApplication> {
        let response: IApplication = {data: []};
        const localData = sessionStorage.getItem("application");
        if(localData) response = JSON.parse(localData);
        if(!localData) {
            response = await AxiosReqData("json", "json", this.path) as IApplication;
            sessionStorage.setItem("application", JSON.stringify(response));
        }
        if(update){
            response = await AxiosReqData("json", "json", this.path) as IApplication;
            sessionStorage.setItem("application", JSON.stringify(response));
        }
        return response;
    }

    public static async AddApplication(body: {application: string}): Promise<any> {
        return await AxiosPostData("json", "json", this.path, body);
    }
}

export default ApplicationService;
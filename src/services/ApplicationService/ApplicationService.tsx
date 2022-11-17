import {AxiosPostData, AxiosReqData} from "../AxiosService";
import {IApplication} from "./Application";


class ApplicationService {
    static path = "/app";

    public static async GetApplication(): Promise<IApplication> {
        return await AxiosReqData("json", "json", this.path) as IApplication;
    }

    public static async AddApplication(body: {application: string}): Promise<any> {
        return await AxiosPostData("json", "json", this.path, body);
    }
}

export default ApplicationService;
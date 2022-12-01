import {AxiosReqData} from "../AxiosService";
import {IWidgetResponse} from "./Widget";


class WidgetService {
    static path = "/widget";

    public static async getListWidget(): Promise<IWidgetResponse> {
        return await AxiosReqData("json", "json", `${this.path}/list`) as IWidgetResponse;
    }
}

export default WidgetService;
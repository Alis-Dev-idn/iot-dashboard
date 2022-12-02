import {AxiosDeleteData, AxiosPostData, AxiosReqData} from "../AxiosService";
import {IWidgetGraph, IWidgetResponse} from "./Widget";

interface WidgetBody {
    data: string;
    application: string;
    device: string;
    widget_type: string;
}

class WidgetService {
    static path = "/widget";

    public static async getListWidget(): Promise<IWidgetResponse> {
        return await AxiosReqData("json", "json", `${this.path}/list`) as IWidgetResponse;
    }

    public static async createWidget(body: WidgetBody): Promise<any> {
        return await AxiosPostData("json", "json", `${this.path}/create`, body);
    }

    public static async deleteWidget(query: WidgetBody): Promise<any> {
        type QueryKey = "data" | "application" | "device" | "widget_type";
        const queryString = Object.keys(query)
            .filter((key) => query[key as QueryKey] !== "")
            .map((item) => `${item}=${query[item as QueryKey]}`)
            .join("&");
        return await AxiosDeleteData("json", "json", `${this.path}/graph?${queryString}`);
    }

    public static async getWidgetGraphData(query: WidgetBody): Promise<IWidgetGraph> {
        type QueryKey = "data" | "application" | "device" | "widget_type";
        const queryString = Object.keys(query)
            .filter((key) => query[key as QueryKey] !== "")
            .map((item) => `${item}=${query[item as QueryKey]}`)
            .join("&");
        return await AxiosReqData("json", "json", `${this.path}/graph?${queryString}`) as IWidgetGraph;
    }

}

export default WidgetService;
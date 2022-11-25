import {AxiosDeleteData, AxiosPostData, AxiosReqData} from "../AxiosService";

class DeviceService {
    static path = "/device";

    public static async getCountDevice(update?: boolean): Promise<{count: number}> {
        let response: {count: number} = {count: 0};
        const getData = sessionStorage.getItem("device_count");
        if(getData) response = JSON.parse(getData);
        if(!getData || update){
            response = await AxiosReqData("json", "json", `${this.path}/count`) as {count: number};
            sessionStorage.setItem("device_count", JSON.stringify(response));
        }
        return response;
    }

    public static async getListDevice(application: string): Promise<{data: string[]}> {
        return await AxiosReqData("json", "json", `${this.path}/list?application=${application}`) as {data: string[]};
    }

    public static async addNewDevice(body: {application: string, name: string}): Promise<any> {
        return await AxiosPostData("json", "json", `/app${this.path}`, body);
    }

    public static async deleteDevice(query: {application: string, device: string}): Promise<any> {
        return await AxiosDeleteData("json", "json", `/app${this.path}?application=${query.application}&name=${query.device}`);
    }
}

export default DeviceService;
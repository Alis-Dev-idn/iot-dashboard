import {AxiosPostData, AxiosReqData} from "../AxiosService"

class UserServices {
    static path = "/user";

    public static async GetUsers(): Promise<any> {
        return await AxiosReqData("json", "json", this.path);
    }

    public static async UserLogin(body: {data: string}): Promise<any> {
        return await AxiosPostData("json", "json", `${this.path}/login`, body);
    }

    public static async UserRegister(body: {data: string}): Promise<any> {
        return await AxiosPostData("json", "json", `${this.path}`, body);
    }

    public static async ActiveUser(query: {username?: string, code?: string}): Promise<any> {
        type queryKey = "username" | "code";
        const queryString = Object.keys(query)
            .filter((key) => query[key as queryKey] !== "")
            .map((key) => `${key}=${query[key as queryKey]}`)
            .join("&");
        return await AxiosReqData("json", "json", `/active?${queryString}`);
    }
}

export default UserServices;
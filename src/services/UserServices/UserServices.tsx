import {AxiosPostData, AxiosPutData, AxiosReqData} from "../AxiosService"
import {IUserData} from "./User";

class UserServices {
    static path = "/user";

    public static async GetUsers(): Promise<any> {
        return await AxiosReqData("json", "json", this.path);
    }

    public static async UserLogin(body: {data: string}): Promise<IUserData> {
        return await AxiosPostData("json", "json", `${this.path}/login`, body) as IUserData;
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

    public static async GetProfile(username: string): Promise<any> {
        let profile = await AxiosReqData("json", "blob", `/profile/${username}`) as any;
        return URL.createObjectURL(new Blob([profile]));
    }

    public static async UploadImg(body: {username: string, file?: File}): Promise<any> {
        return await AxiosPutData("from-data", "json", `profile/${body.username}`, body);
    }

    public static async UpdateData(body: {username: string, name: string, email: string}): Promise<any> {
        return await AxiosPutData("json", "json", this.path, body);
    }

    public static async UpdatePassword(body: {password: string, new_password: string, confirm_password: string;}): Promise<any> {
        return await AxiosPutData("json", "json", `${this.path}/password`, body);
    }
}

export default UserServices;
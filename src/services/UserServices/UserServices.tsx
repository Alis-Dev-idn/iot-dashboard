import {AxiosPostData, AxiosReqData} from "../AxiosService"

class UserServices {
    static path = "/user"

    public static async GetUsers(): Promise<any> {
        return await AxiosReqData("json", "json", this.path);
    }

    public static async UserLogin(body: {data: string}): Promise<any> {
        return await AxiosPostData("json", "json", `${this.path}/login`, body);
    }

    public static async UserRegister(body: {data: string}): Promise<any> {
        return await AxiosPostData("json", "json", `${this.path}`, body);
    }
}

export default UserServices;
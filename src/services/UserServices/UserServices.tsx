import {AxiosPostData, AxiosReqData} from "../AxiosService"

class UserServices {
    static path = "/user"

    public static async GetUsers(): Promise<any> {
        return await AxiosReqData("json", "json", this.path);
    }

    public static async UserLogin(body: {email: string, password: string}): Promise<any> {
        return await AxiosPostData("json", "json", `${this.path}/login`, body);
    }
}

export default UserServices;
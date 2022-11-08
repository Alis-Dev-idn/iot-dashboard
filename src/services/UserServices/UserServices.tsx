import {AxiosReqData} from "../AxiosService"

class UserServices {
    static path = "/user"

    public static async GetUsers(): Promise<any> {
        return await AxiosReqData("json", "json", this.path);
    }
}

export default UserServices;
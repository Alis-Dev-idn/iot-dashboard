import UserServices from "../../services/UserServices/UserServices";
import {useEffect} from "react";

const Login = () => {
    const GetUsers = async () => {
        return await UserServices.GetUsers();
    }

    useEffect(() => {
        GetUsers().then(async (data) => {
            console.log(data);
        });
    }, []);

    return (
        <div className="text-white">Login Page</div>
    )
}

export default Login;
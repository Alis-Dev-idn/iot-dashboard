import {Alert, Button, TextInput} from "../../component";
import {useState} from "react";
import UserServices from "../../services/UserServices/UserServices";
import {Link} from "react-router-dom";
import {generateEncrypt} from "../../utils/Utils";


const Login = () => {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");

    const [data, setData] = useState({
        email: "",
        password: ""
    })


    const OnchangeTextInput = (event: any) => {
        const {name, value} = event.target;
        setData((prev) => ({...prev, [name]: value}));
    }

    const isValidEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    const handleLogin = async () => {
        if(!data.email && !data.password) {
            setShow(true);
            setMessage("email dan password dibutuhkan");
            return;
        }
        if(data.email && !data.password) {
            setShow(true);
            setMessage("password dibutuhkan");
            return;
        }
        if(!data.email && data.password) {
            setShow(true);
            setMessage("email dibutuhkan");
            return;
        }
        if(!isValidEmail(data.email)) {
            setShow(true);
            setMessage("email not valid");
            return;
        }
        try{
            setLoading(true);
            const dataEncrypt = generateEncrypt(data);
            const response = await UserServices.UserLogin({data: dataEncrypt});
            console.log(response);
            setLoading(false);
        }catch (error){
            setMessage((error as Error).message)
            setShow(true);
            setLoading(false);
        }
    }

    return (
        <>
            <Alert
                show={show}
                type={"warning"}
                message={message}
                callback={(e: boolean) => setShow(e)}
            />
            <div className="w-screen min-h-screen bg-primary-blue">
                <div className="flex justify-center items-center h-screen px-2">
                    <div className="border border-white border-opacity-50 h-[500px] w-[400px] rounded-md px-3 py-3">
                        <div className="flex flex-col space-y-7 h-full">
                            <div className="py-0">
                                <p className="text-white text-[35px] font-font1 opacity-70">Login</p>
                                <p className="text-white text-sm font-font1 opacity-70">Masukkan Email dan Password untuk Login</p>
                            </div>
                            <div className="flex flex-col justify-center space-y-2 h-full">
                                <div className="">
                                    <p className="text-white text-sm font-font1 opacity-70">Email</p>
                                    <TextInput
                                        name="email"
                                        type="email"
                                        value={data.email}
                                        placeholder="Email"
                                        onChange={OnchangeTextInput}
                                    />
                                </div>
                                <div className="">
                                    <p className="text-white text-sm font-font1 opacity-70">Password</p>
                                    <TextInput
                                        name="password"
                                        type="password"
                                        value={data.password}
                                        placeholder="Password"
                                        onChange={OnchangeTextInput}
                                    />
                                </div>
                                <div className="flex justify-end items-center">
                                    <Button
                                        name="login"
                                        label="Login"
                                        loading={loading}
                                        isDisable={loading}
                                        onClick={handleLogin}
                                    />
                                </div>
                                <div className="flex flex-row justify-center items-center space-x-2 w-full">
                                    <p className="text-sm font-font1 text-white">don't have account?</p>
                                    <Link to={"/register"}>
                                        <p className="text-white hover:text-blue-500">Register</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
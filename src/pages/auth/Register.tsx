import {Alert, Button, TextInput} from "../../component";
import {useState} from "react";
import {Link} from "react-router-dom";
import UserServices from "../../services/UserServices/UserServices";


const Register = () => {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState<"warning" | "success">("warning");
    const [data, setData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const OnchangeTextInput = (event: any) => {
        const {name, value} = event.target;
        setData((prev) => ({...prev, [name]: value}));
    }

    const createAlert = (message: string, type: "warning" | "success") => {
        setShow(true);
        setMessage(message);
        setLoading(false);
        setType(type);
    }

    const isValidEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    const handleRegister = async () => {
        setLoading(true);
        if(!data.username && !data.email && !data.password) return createAlert("Username, Email, Password dibutuhkan", "warning");
        if(data.username && !data.email && !data.password) return createAlert("Email, Password dibutuhkan", "warning");
        if(data.username && data.email && !data.password) return createAlert("Password dibutuhkan", "warning");
        if(! isValidEmail(data.email)) return createAlert("Email not valid", "warning");
        try{
            const response = await UserServices.UserRegister(data);
            console.log(response);
            createAlert("berhasil membuat akun, silakan periksa email untuk aktifasi akun", "success");
        }catch (error){
            setLoading(false);
            createAlert((error as Error).message, "warning");
        }
    }

    return (
        <>
            <Alert
                show={show}
                type={type}
                message={message}
                callback={(e: boolean) => setShow(e)}
            />
            <div className="w-screen min-h-screen bg-primary-blue">
                <div className="flex justify-center items-center h-screen px-2">
                    <div className="border border-white border-opacity-50 h-[500px] w-[400px] rounded-md px-3 py-3">
                        <div className="flex flex-col space-y-7 h-full">
                            <div className="py-0">
                                <p className="text-white text-[35px] font-font1 opacity-70">Register</p>
                                <p className="text-white text-sm font-font1 opacity-70">Masukkan Username, Email dan Password untuk Login</p>
                            </div>
                            <div className="flex flex-col justify-center space-y-2 h-full">
                                <div className="">
                                    <p className="text-white text-sm font-font1 opacity-70">Username</p>
                                    <TextInput
                                        name="username"
                                        type="text"
                                        value={data.username}
                                        placeholder="Username"
                                        onChange={OnchangeTextInput}
                                    />
                                </div>
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
                                        name="register"
                                        label="Register"
                                        loading={loading}
                                        isDisable={loading}
                                        onClick={handleRegister}
                                    />
                                </div>
                                <div className="flex flex-row justify-center items-center space-x-2 w-full">
                                    <p className="text-sm font-font1 text-white">have account?</p>
                                    <Link to={"/login"}>
                                        <p className="text-white hover:text-blue-500">Login</p>
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

export default Register;
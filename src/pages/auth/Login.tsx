import {TextInput} from "../../component";
import {useState} from "react";


const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    })


    const OnchangeTextInput = (event: any) => {
        const {name, value} = event.target;
        setData((prev) => ({...prev, [name]: value}));
    }

    return (
        <div className="w-screen h-screen bg-primary-blue">
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
                                <div className="bg-sky-700 px-2 py-1 rounded-md cursor-pointer hover:bg-sky-500 mt-5">
                                    <p className="text-white">Login</p>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
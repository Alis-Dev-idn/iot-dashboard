import {Suspense, lazy} from "react";
import {Button, TextInput} from "../../../component";
import {useContext, useEffect, useState} from "react";
import {AuthContext, FormulirContext, UiContext} from "../../../context";
import {LineWave} from "react-loader-spinner";
import UserServices from "../../../services/UserServices/UserServices";
import {generateEncrypt} from "../../../utils/Utils";
import Cookies from "universal-cookie"
const cookies = new Cookies();

const FormulirChangeImage = lazy(() => import("./component/FormulirChangeImage"));
const FormulirChangePassword = lazy(() => import("./component/FormulirChangePassword"));

const ProfileUser = () => {
    const authContext = useContext(AuthContext);
    const uiContext = useContext(UiContext);
    const formulirContext = useContext(FormulirContext);

    const [data, setData] = useState({
        name: "",
        username: "",
        email: ""
    });

    const OnChangeTextInput = (event: any) => {
        const {name, value} = event.target;
        setData((prev) => ({...prev, [name]: value}));
    }

    const handleSaveProfile = () => {
        uiContext?.handleConfirm({
            show: true,
            message: "Save Profile?",
            callback: confirmSave
        });
    }

    const confirmSave = async () => {
        uiContext?.handleConfirm({
            show: false,
            message: "Save Profile?",
        });
        try{
            uiContext?.handleLoading({show: true, isBlock: false});
            await UserServices.UpdateData(data);
            uiContext?.handleLoading({show: false, isBlock: false});
            uiContext?.handleAlert({
                show: true,
                type: "success",
                message: "Berhasil Menyimpan Data"
            });
            if(authContext?.IUser) {
                const user_data = {
                    name: data.name,
                    email: data.email,
                    username: data.username,
                    token: authContext?.IUser.token,
                    role: authContext?.IUser.role,
                    isLogin: true
                }
                authContext?.SetIUser(user_data);
                const encryptRespond = generateEncrypt(user_data);
                cookies.set("component", {data: encryptRespond, isLogin: true});
            }
        }catch (err){
            uiContext?.handleLoading({show: false, isBlock: false});
            uiContext?.handleAlert({
                show: true,
                type: "warning",
                message: (err as Error).message
            });
        }
    }

    const handleChangePassword = () => {
        formulirContext?.setIFormulir({
            className: "",
            show: true,
            label: "Change Password",
            children: <Suspense fallback={<div>Loading ...</div>}>
                <FormulirChangePassword callback={handleCloseForm}/>
            </Suspense>
        })
    }

    const handleChangeImage = () => {
        formulirContext?.setIFormulir({
            className: "",
            show: true,
            label: "Change Image Profile",
            children: <Suspense fallback={<div>Loading ...</div>}>
                <FormulirChangeImage callback={handleCloseForm} username={authContext?.IUser.username || ""}/>
            </Suspense>
        })
    }

    const handleCloseForm = () => {
        formulirContext?.setIFormulir({
            className: "",
            show: false,
            label: "",
            children: <></>
        });
        authContext?.SetImageProfile(authContext?.IUser.username);
    }

    useEffect(() => {
        if(authContext?.IUser) setData({
            name: authContext?.IUser.name,
            username: authContext?.IUser.username,
            email: authContext?.IUser.email
        })
    }, [authContext?.IUser]);

    return(
        <div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-7">
                <div className="sm:w-[250px] w-full h-[300px] bg-blue-2 rounded-xl px-3 py-3">
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="flex items-center justify-center bg-white h-[150px] w-[150px] rounded-full overflow-hidden">
                          {/*take image*/}
                            {authContext?.IUser.image?
                                <img src={authContext?.IUser.image} alt={""} loading={"eager"}/>
                                :
                                <div className="ml-14 -mt-10">
                                    <LineWave
                                        width={150}
                                        height={150}
                                        color={"blue"}
                                    />
                                </div>
                            }
                        </div>

                        <div>
                            <Button
                                className="text-sm"
                                label="Ubah Foto"
                                name="foto"
                                onClick={handleChangeImage}
                            />
                        </div>
                    </div>

                </div>
                <div className="flex flex-col w-full bg-blue-2 rounded-xl px-3 py-3 space-y-2">
                    <div className="flex flex-col py-1">
                        <p className="font-font1 font-bold text-gray-300">Profile Data</p>
                        <div className="w-full h-[1px] bg-white"></div>
                    </div>
                    <div className="">
                        <p className="text-gray-300 font-font1 text-sm">Name</p>
                        <TextInput
                            name="name"
                            value={data.name}
                            placeholder="Name"
                            onChange={OnChangeTextInput}
                        />
                    </div>
                    <div className="">
                        <p className="text-gray-300 font-font1 text-sm">Username</p>
                        <TextInput
                            name="username"
                            value={data.username}
                            placeholder="Username"
                            onChange={OnChangeTextInput}
                        />
                    </div>
                    <div className="">
                        <p className="text-gray-300 font-font1 text-sm">Email</p>
                        <TextInput
                            name="email"
                            value={data.email}
                            placeholder="Email"
                            onChange={OnChangeTextInput}
                        />
                    </div>
                    <div className="flex flex-row">
                        <div className="flex w-full">
                            <Button
                                className="text-sm"
                                label="Change Password"
                                name="save"
                                onClick={handleChangePassword}
                            />
                        </div>
                        <div className="flex justify-end w-full">
                            <Button
                                className="text-sm"
                                label="Save"
                                name="save"
                                onClick={handleSaveProfile}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileUser;
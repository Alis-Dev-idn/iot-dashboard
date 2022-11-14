import {Button, TextInput} from "../../../component";
import {useContext, useEffect, useState} from "react";
import {AuthContext, FormulirContext, UiContext} from "../../../context";
import {sleep} from "../../../utils/Utils";
import FormulirChangePassword from "./component/FormulirChangePassword";
import FormulirChangeImage from "./component/FormulirChangeImage";
import {LineWave} from "react-loader-spinner";

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
        uiContext?.handleLoading({show: true, isBlock: false});
        await sleep(2000);
        uiContext?.handleLoading({show: false, isBlock: false});
        uiContext?.handleAlert({
            show: true,
            type: "warning",
            message: "Ops Something Wrong, Please Try Again Later"
        });
    }

    const handleChangePassword = () => {
        formulirContext?.setIFormulir({
            className: "",
            show: true,
            label: "Change Password",
            children: <FormulirChangePassword callback={handleCloseForm}/>
        })
    }

    const handleChangeImage = () => {
        formulirContext?.setIFormulir({
            className: "",
            show: true,
            label: "Change Image Profile",
            children: <FormulirChangeImage callback={handleCloseForm} username={authContext?.IUser.username || ""}/>
        })
    }

    const handleCloseForm = () => {
        formulirContext?.setIFormulir({
            className: "",
            show: false,
            label: "",
            children: <></>
        });
        authContext?.SetImageProfile();
    }

    useEffect(() => {
        if(authContext?.IUser) setData({
            name: "",
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
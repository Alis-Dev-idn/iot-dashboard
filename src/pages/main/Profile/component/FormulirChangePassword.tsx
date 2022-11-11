import {Button, TextInput} from "../../../../component";
import {useContext, useState} from "react";
import {UiContext} from "../../../../context";
import {sleep} from "../../../../utils/Utils";

interface PropTypes {
    callback: Function;
}

const FormulirChangePassword = (props: PropTypes) => {
    const uiContext = useContext(UiContext);

    const [data, setData] = useState({
        last_password: "",
        new_password: "",
        confirm_password: ""
    })

    const OnChangeTextInput = (event: any) => {
        const {name, value} = event.target;
        setData((prev) => ({...prev, [name]: value}));
    }

    const createError = (value: string) => {
        uiContext?.handleAlert({
            show: true,
            type: "warning",
            message: value
        });
    }

    const handleClickSave = () => {
        if(!data.last_password && !data.new_password && !data.confirm_password) return createError("Password Lama, Baru dan Komfirmasi diperlukan");
        if(!data.last_password && data.new_password && !data.confirm_password) return createError("Password Lama, Komfirmasi diperlukan");
        if(data.last_password && !data.new_password && !data.confirm_password) return createError("Password Baru dan Komfirmasi diperlukan");
        if(!data.last_password && !data.new_password && data.confirm_password) return createError("Password Lama, Baru diperlukan");
        if(data.last_password && data.new_password && !data.confirm_password) return createError("Password Konfirmasi diperlukan");
        if(data.last_password && !data.new_password && data.confirm_password) return createError("Password Baru diperlukan");
        if(!data.last_password && data.new_password && data.confirm_password) return createError("Password Lama diperlukan");

        uiContext?.handleConfirm({
            show: true,
            message: "Simpan Perubahan?",
            callback: handleConfirmSave
        });
    }

    const handleConfirmSave = async () => {
        uiContext?.handleConfirm({
            show: false,
            message: "Simpan Perubahan?",
        });
        uiContext?.handleLoading({show: true, isBlock: false});
        await sleep(2000);
        uiContext?.handleLoading({show: false, isBlock: false});
        props.callback();
        uiContext?.handleAlert({
            show: true,
            type: "warning",
            message: "Ops Something Wrong, Please Try Again Later"
        });
        setData({last_password: "", new_password: "", confirm_password: ""});
    }

    return (
        <div className="flex flex-col w-full mt-3">
            <div className="flex flex-col w-full space-y-2">
                <div className="">
                    <p className="text-gray-300 text-sm font-font1">Password Lama</p>
                    <TextInput
                        name="last_password"
                        value={data.last_password}
                        type={"password"}
                        placeholder="Password Lama"
                        onChange={OnChangeTextInput}
                    />
                </div>
                <div className="">
                    <p className="text-gray-300 text-sm font-font1">Password Lama</p>
                    <TextInput
                        name="new_password"
                        value={data.new_password}
                        type={"password"}
                        placeholder="Password Baru"
                        onChange={OnChangeTextInput}
                    />
                </div>
                <div className="">
                    <p className="text-gray-300 text-sm font-font1">Password Lama</p>
                    <TextInput
                        name="confirm_password"
                        value={data.confirm_password}
                        type={"password"}
                        placeholder="Konfirmasi Password"
                        onChange={OnChangeTextInput}
                    />
                </div>
            </div>
            <div className="flex flex-row justify-end w-full">
                <Button
                    className="text-sm"
                    label="Simpan"
                    name="save"
                    onClick={handleClickSave}
                />
            </div>
        </div>
    )
}

export default FormulirChangePassword;
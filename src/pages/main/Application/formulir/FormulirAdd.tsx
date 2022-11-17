import {Button, TextInput} from "../../../../component";
import {useContext, useState} from "react";
import {UiContext} from "../../../../context";
import ApplicationService from "../../../../services/ApplicationService/ApplicationService";

interface PropType {
    callback: Function;
}

const FormulirAdd = (props: PropType) => {
    const uiContext = useContext(UiContext);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        application: ""
    });

    const OnChangeText = (event: any) => {
        const {name, value} = event.target;
        setData((prev) => ({...prev, [name]: value}));
    }

    const OnClickButton = async () => {
        if(data.application === "") {
            uiContext?.handleAlert({
                type: "warning",
                show: true,
                message: "Name Device Tidak Bileh Kosong"
            });
            return;
        }
        try{
            setLoading(true);
            await ApplicationService.AddApplication(data);
            setLoading(false);
            props.callback();
        }catch (error){
            setLoading(false);
            uiContext?.handleAlert({
                type: "warning",
                show: true,
                message: (error as Error).message
            });
        }
    }

    return(
        <div className="flex flex-col space-y-1">
            <div className="flex flex-col space-y-0.5">
                <p className="text-sm text-gray-300 font-font1">Name Device</p>
                <TextInput
                    className="py-1.5"
                    name="application"
                    value={data.application}
                    placeholder="Name Device"
                    onChange={OnChangeText}
                />
            </div>
            <div className="flex justify-end">
                <Button
                    className="text-sm"
                    label="Simpan"
                    name="simpan"
                    loading={loading}
                    isDisable={loading}
                    onClick={OnClickButton}
                />
            </div>
        </div>
    )
}

export default FormulirAdd;
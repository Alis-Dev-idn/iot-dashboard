import ApplicationService from "../../../../services/ApplicationService/ApplicationService";
import {ReactComponent as Plus} from "../../../../assets/icon/square-plus.svg";
import {useContext, useEffect, useState} from "react";
import SelectOptions from "../../../../component/molecules/SelectOptions/SelectOptions";
import DeviceService from "../../../../services/DeviceService/DeviceService";
import {Button, TextInput, Toastify} from "../../../../component";
import {FormulirContext, UiContext} from "../../../../context";
import WidgetService from "../../../../services/WidgetService/WidgetService";


interface PropTypes {
    callback: Function;
}

const TYPE_WIDGET = [
    {label: "graph", value: "graph|0"}
]

const CreateNewWidget = (props: PropTypes) => {
    const uiContext = useContext(UiContext);
    const formContext = useContext(FormulirContext);

    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [appOps, setAppOps] = useState<{label: string, value: string}[]>([]);
    const [deviceOps, setDeviceOps] = useState<{label: string, value: string}[]>([]);
    const [valueApp, setValueApp] = useState<{label: string, value: string}>({label: "Pilih Application ...", value: ""});
    const [valueDevice, setValueDevice] = useState<{label: string, value: string}>({label: "Pilih Device ...", value: ""});
    const [valueType, setValueType] = useState<{label: string, value: string}>({label: "Pilih Type Widget ...", value: ""});

    const handleGetAppOptions = async () => {
        const {data} = await ApplicationService.GetAppOptions();
        setAppOps(data);
    }

    const OnChangeTextInput = (event: any) => {
        const {value} = event.target;
        setText(value);
    }

    /* Select Options */
    const handleSelectApp = async (event: any) => {
        setValueApp({label: "Pilih Application", value: ""});
        setValueDevice({label: "Pilih Device ...", value: ""});
        setValueType({label: "Pilih Type Widget ...", value: ""});
        setText("");
        if(event) {
            setValueApp(event);
            const {data} = await DeviceService.getOptionsDevice(event.label);
            setDeviceOps(data);
        }
    }

    const handleSelectDevice = (event: any) => {
        setValueDevice({label: "Pilih Device ...", value: ""});
        setValueType({label: "Pilih Type Widget ...", value: ""});
        setText("");
        if(event){
            setValueDevice(event);
        }
    }

    const handleSelectType = (event: any) => {
        setValueType({label: "Pilih Type Widget ...", value: ""});
        setText("");
        if(event) {
            setValueType(event);
        }
    }
    /* End Select Options */

    const handleClickButton = () => {
        uiContext?.handleConfirm({
            show: true,
            message: `Create Widget Now?`,
            callback: handleClickConfirm
        });
    }

    const handleClickConfirm = async () => {
        uiContext?.handleConfirm({
            show: false,
            message: `Create Widget Now?`,
        });
        try{
            setLoading(true);
            const body = {
                data: text,
                application: valueApp.label,
                device: valueDevice.label,
                widget_type: valueType.label
            }

            await WidgetService.createWidget(body);

            props.callback();
            Toastify({type: "success", message: "Success Create New Widget"});

            setLoading(false);
        }catch (error){
            setLoading(false);
            Toastify({type: "warning", message: (error as Error).message});
        }
    }

    useEffect(() => {
        handleGetAppOptions().then();
    }, [props.callback]);

    useEffect(() => {
        if(!formContext?.formulir.show) {
            setValueApp({label: "Pilih Application", value: ""});
            setValueDevice({label: "Pilih Device ...", value: ""});
            setValueType({label: "Pilih Type Widget ...", value: ""});
            setText("");
        }
    }, [formContext?.formulir.show])

    return(
        <div className="flex flex-col space-y-2 mb-2">
            <div className="flex flex-col space-y-1">
                <p className="text-white font-font1 text-sm">Name Application</p>
                <SelectOptions
                    data={appOps}
                    value={valueApp}
                    callback={handleSelectApp}
                    disable={false}
                />
            </div>
            <div className="flex flex-col space-y-1">
                <p className="text-white font-font1 text-sm">Name Device</p>
                <SelectOptions
                    data={deviceOps}
                    value={valueDevice}
                    callback={handleSelectDevice}
                    disable={valueApp.value === ""}
                />
            </div>
            <div className="flex flex-col space-y-1">
                <p className="text-white font-font1 text-sm">Type Widget</p>
                <SelectOptions
                    data={TYPE_WIDGET}
                    value={valueType}
                    callback={handleSelectType}
                    disable={valueDevice.value === ""}
                />
            </div>
            <div className="flex flex-col space-y-1">
                <p className="text-white font-font1 text-sm">Name Data</p>
                <TextInput
                    name="name"
                    value={text}
                    placeholder="Name of Data Sensor"
                    onChange={OnChangeTextInput}
                />
            </div>
            <div className="flex justify-end items-center">
                <Button
                    icon={<Plus className="w-5 h-5 fill-white"/>}
                    label="Create"
                    name="new"
                    loading={loading}
                    onClick={handleClickButton}
                />
            </div>
        </div>
    )
}

export default CreateNewWidget;
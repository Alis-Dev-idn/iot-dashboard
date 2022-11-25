import {Button, TextInput, Toastify} from "../../../../component";
import {useContext, useState} from "react";
import {FormulirContext} from "../../../../context";
import DeviceService from "../../../../services/DeviceService/DeviceService";

interface PropTypes {
    application: string;
    callback: Function;
}

const AddDevice = (props: PropTypes) => {
    const formContext = useContext(FormulirContext);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        device: ""
    });

    const handleCloseForm = () => {
        formContext?.setIFormulir({
            show: false,
            label: "Add Device",
            children: <></>
        });
    }

    const OnChangeInput = (event: any) => {
        const {name, value} = event.target;
        setData((prev) => ({...prev, [name]: value}));
    }

    const handleClickAdd = async () => {
        try{
            if(data.device === "") {
                Toastify({type: "warning", message: "Nama Device Diperlukan"});
                return;
            }
            setLoading(true);
            await DeviceService.addNewDevice({application: props.application, name: data.device});
            await DeviceService.getCountDevice(true);
            setLoading(false);
            handleCloseForm();
            Toastify({type: "success", message: "Berhasil Menambah Aplikasi"});
            props.callback();
        }catch (error){
            setLoading(false);
            Toastify({type: "error", message: (error as Error).message});
        }
    }

    return(
        <div className="">
            <div className="flex flex-col space-y-1">
                <p className="text-white font-font1 text-sm">Nama Device</p>
                <TextInput
                    name="device"
                    value={data.device}
                    placeholder="Isi Nama Device"
                    onChange={OnChangeInput}
                />
            </div>
            <div className="flex justify-end">
                <Button
                    label="Tambah"
                    name="add"
                    onClick={handleClickAdd}
                    loading={loading}
                />
            </div>
        </div>
    )
}

export default AddDevice;
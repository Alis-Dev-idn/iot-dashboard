import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Button, LoaderContent, ScrollBars, Toastify} from "../../../component";
import {ReactComponent as DeviceIcon} from "../../../assets/icon/device-mobile.svg";
import {ReactComponent as Trash} from "../../../assets/icon/trash.svg";
import DeviceService from "../../../services/DeviceService/DeviceService";
import ApplicationService from "../../../services/ApplicationService/ApplicationService";
import {FormulirContext, UiContext} from "../../../context";
import AddDevice from "./Formulir/AddDevice";

const Device = () => {
    const locate = useLocation();
    const navigate = useNavigate();
    const uiContext = useContext(UiContext);
    const formulirContext = useContext(FormulirContext);
    const [loading, setLoading] = useState(false);
    const [loadData, setLoadData] = useState(false);
    const [name, setName] = useState("");
    const [data, setData] = useState<string[]>([]);
    const [device, setDevice] = useState("");

    const OnClickDevice = (name: string, idx: number) => {
        setDevice(name);
    }

    const GetListDevice = async (application: string) => {
        try{
            setLoading(true);
            setLoadData(true);
            const response = await DeviceService.getListDevice(application);
            setData(response.data);
            setLoading(false);
            setLoadData(false);
        }catch (err){
            setLoading(false);
            setLoadData(false);
        }
    }

    const handleDeleteApp = async () => {
        uiContext?.handleConfirm({
            show: true,
            message: "Delete Application?",
            callback: ConfirmDelete
        });
    }

    const ConfirmDelete = async () => {
        uiContext?.handleConfirm({
            show: false,
            message: "Delete Application?",
        });
        try{
            uiContext?.handleLoading({show: true, isBlock: false});
            await ApplicationService.DeleteApplication(name);
            await ApplicationService.GetApplication(true)
            uiContext?.handleLoading({show: false, isBlock: false});
            Toastify({type: "success", message: "Delete App Success"});
            navigate("/application");
        }catch (error){
            uiContext?.handleLoading({show: false, isBlock: false});
            Toastify({type: "error", message: (error as Error).message});
        }
    }

    const handleClickAdd = () => {
        formulirContext?.setIFormulir({
            show: true,
            label: "Add Device",
            children: <AddDevice application={name} callback={() => GetListDevice(name)}/>
        });
    }

    const handleClickDeleteDevice = async (application: string, device: string) => {
        uiContext?.handleConfirm({
            show: true,
            message: `Delete Device ${device}?`,
            callback: () => handleConfirmDeleteDevice(application, device)
        });
    }

    const handleConfirmDeleteDevice = async (application: string, device: string) => {
        try{
            uiContext?.handleConfirm({
                show: false,
                message: `Delete Device ${device}?`
            });
            uiContext?.handleLoading({show: true, isBlock: false});
            await DeviceService.deleteDevice({application, device});
            setDevice("");
            await GetListDevice(application);
            uiContext?.handleLoading({show: false, isBlock: false});
            Toastify({type: "success", message: "Berhasil Menghapus Aplikasi"});
        }catch (error){
            uiContext?.handleLoading({show: false, isBlock: false});
            Toastify({type: "error", message: (error as Error).message});
        }
    }

    useEffect(() => {
        if(name !== "") GetListDevice(name).then();
    }, [name]);

    useEffect(() => {
        setName(locate.pathname.split("/")[2]);
    }, [locate.pathname]);
    return(
        <div className="px-2 text-white">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 ">
                <div className="flex flex-col space-y-2 w-full md:w-[300px]">
                    <div className="flex flex-row space-x-2">
                        <Button
                            className="py-1 mt-0 text-sm flex justify-center w-full"
                            label="Add Device"
                            name="device"
                            onClick={handleClickAdd}
                        />
                        <Button
                            className="py-1 mt-0 text-sm flex justify-center w-full bg-red-700 hover:bg-red-500"
                            label="Delete App"
                            name="delete"
                            onClick={handleDeleteApp}
                        />
                    </div>
                    <div className="flex flex-col bg-blue-2 h-full rounded-md h-[200px] md:h-[400px] space-y-2">
                        <p className="text-sm font-font1 px-2 py-2">List Device {name}</p>
                        <LoaderContent loading={loading}>
                            <ScrollBars>
                                <div className="flex flex-col space-y-2 px-2 mb-5">
                                    {data.map((item, idx) => (
                                        <div
                                            key={`${item}-${idx}`}
                                            className={`flex flex-row justify-start items-center h-[40px] border border-white rounded-md space-x-2 px-2 cursor-pointer hover:bg-sky-700 ${device === item? "bg-sky-700" : null}`}
                                            onClick={() => OnClickDevice(item, idx)}
                                        >
                                            <DeviceIcon className="w-5 h-5 fill-white"/>
                                            <p className="text-sm font-font1">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollBars>
                        </LoaderContent>
                    </div>
                </div>
                <div className="flex flex-col space-y-2 w-full bg-blue-2 rounded-md h-[520px] px-2 py-2">
                    <div className="flex flex-row items-center space-x-2 w-full">
                        <p className="text-sm font-font1 w-full">Data Device {device}</p>
                        <div className="flex justify-end w-full px-3">
                            {device === ""? null :
                                <Trash
                                    className="w-5 h-5 fill-white cursor-pointer hover:fill-red-500"
                                    title="delete device"
                                    onClick={() => handleClickDeleteDevice(name, device)}
                                />
                            }
                        </div>
                    </div>
                    <div className="h-[1px] bg-white"></div>
                    <div className="flex flex-col h-full border border-white border-opacity-50 rounded-md px-2 py-2 h-[490px] overflow-y-auto device">
                        <LoaderContent loading={loadData}>
                            <ScrollBars>
                                {device === ""? null :
                                    <div>Data is Empty</div>
                                }
                            </ScrollBars>
                        </LoaderContent>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Device;
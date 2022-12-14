import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Button, LoaderContent, ScrollBars, TextInput, Toastify} from "../../../component";
import {ReactComponent as DeviceIcon} from "../../../assets/icon/device-mobile.svg";
import {ReactComponent as Trash} from "../../../assets/icon/trash.svg";
// import {ReactComponent as Arrow} from "../../../assets/icon/arrow-down.svg";
import DeviceService from "../../../services/DeviceService/DeviceService";
import ApplicationService from "../../../services/ApplicationService/ApplicationService";
import {AuthContext, FormulirContext, UiContext} from "../../../context";
import AddDevice from "./Formulir/AddDevice";
import {parseDateTime} from "../../../utils/Utils";
import {emitData, listenBrodcast} from "../../../services/SocketIoService/SocketIoService";

const QueryKey = {
    limit: 10,
    skip: 0,
}

let number = 0;
let lastDevice = "";

const Device = () => {
    const locate = useLocation();
    const navigate = useNavigate();
    const uiContext = useContext(UiContext);
    const authContext = useContext(AuthContext);
    const formulirContext = useContext(FormulirContext);
    // eslint-disable-next-line
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadContent, setLoadingContent] = useState(false);
    const [name, setName] = useState("");
    const [data, setData] = useState<{name: string, online: boolean}[]>([]);
    const [device, setDevice] = useState("");
    const [dataDevice, setDataDevice] = useState<{key: string, createdAt: string, data: any}[]>([]);
    const [dataCome, setDataCome] = useState({name: "", data: {}});
    const [text, setText] = useState({cmd: ""});
    // const [query, setQuery] = useState(QueryKey);

    const ChangeTextInput = (event: any) => {
        const {name, value} = event.target;
        setText((prev) => ({...prev, [name]: value}));
    }

    const handleKeyDown = async (e: React.KeyboardEvent) => {
        const { key } = e;
        if (key !== "Enter") return;
        sendCommand();
    };

    const sendCommand = async () => {
        if(text.cmd === "") return;
        setText((prev) => ({...prev, cmd: ""}));
        setDataDevice((prev) => [...prev, {key: device, data: {sending: {text: text.cmd}}, createdAt: Math.floor(new Date().setDate(new Date().getDate()))} as any]);
        number++;
        emitData("command", {device: device.split("-")[1], text: text.cmd}).then();
    }

    const OnClickDevice = async (name: string, idx: number) => {
        try{
            setLoadingContent(true);
            setDevice(name);
            const {data} = await DeviceService.getDataDevice({...QueryKey, device: name.split("-")[1]});
            setDataDevice(data.reverse());
            setLoadingContent(false);
            number++;
        }catch (error){
            Toastify({type: "error", message: (error as Error).message});
        }

    }

    const GetListDevice = async (application: string) => {
        try{
            setLoading(true);
            const response = await DeviceService.getListDevice(application);
            setData(response.data);
            setLoading(false);
        }catch (err){
            setLoading(false);
            Toastify({type: "error", message: (err as Error).message});
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
            await ApplicationService.GetApplication(true);
            await DeviceService.getCountDevice(true);
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
            message: `Delete Device ${device.split("-")[1]}?`,
            callback: () => handleConfirmDeleteDevice(application, device.split("-")[1])
        });
    }

    const handleConfirmDeleteDevice = async (application: string, device: string) => {
        try{
            uiContext?.handleConfirm({
                show: false,
                message: `Delete Device ${device.split("-")[1]}?`
            });
            uiContext?.handleLoading({show: true, isBlock: false});
            await DeviceService.deleteDevice({application, device});
            await DeviceService.getCountDevice(true);
            setDevice("");
            await GetListDevice(application);
            uiContext?.handleLoading({show: false, isBlock: false});
            Toastify({type: "success", message: "Berhasil Menghapus Aplikasi"});
            setDataDevice([]);
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

    useEffect(() => {
        if(lastDevice !== device) {
            const newData = dataDevice.filter(items => items.key === device);
            setDataDevice(() => newData);
        }
        listenBrodcast(device).then((data: any) => {
            lastDevice = device;
            if(data.key !== lastDevice) return;
            setDataDevice((prev) => [...prev, data]);
            setDataCome(data);
            number++;
        });

        // eslint-disable-next-line
    }, [dataCome ,device]);

    useEffect(() => {
        const interval = setInterval(() => {
            emitData("get_online", {}).then();
            listenBrodcast("get_online").then((result: any) => {
                if(data.length === 0) return;
                if(result.length === 0) {
                    let newData = data.map((items) => {
                        return {...items, name: items.name, online: false}
                    });
                    setData((prev) => newData);
                    return;
                }
                let newData = data.map((items, idx) => {
                    for (let i = 0; i < result.length; i++) {
                        if(items.name === result[i].key) return {...items, name: items.name, online: true}
                    }
                    return items;
                });
                setData((prev) => newData);
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [data]);

    return(
        <div className="flex flex-col space-y-2 px-2 text-white">
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
                            <ScrollBars type="top" update={0} callback={() => {}}>
                                <div className="flex flex-col space-y-2 px-2 mb-5">
                                    {data.map((item, idx) => (
                                        <div
                                            key={`${item}-${idx}`}
                                            className={`flex flex-row justify-start items-center h-[40px] border border-white rounded-md space-x-2 px-2 cursor-pointer hover:bg-sky-700 ${device === item.name? "bg-sky-700" : null}`}
                                            onClick={() => OnClickDevice(item.name, idx)}
                                        >
                                            <div className="flex flex-row space-x-2 w-full">
                                                <DeviceIcon className="w-5 h-5 fill-white"/>
                                                <p className="text-sm font-font1">{item.name.split("-")[1]}</p>
                                            </div>
                                            <div className="flex justify-end w-full">
                                                {item.online? <div className="w-5 h-5 rounded-full bg-green-400" title="Online"></div> : <div className="w-5 h-5 rounded-full bg-red-500" title="Offline"></div>}
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            </ScrollBars>
                        </LoaderContent>
                    </div>
                </div>
                <div className="flex flex-col space-y-2 w-full bg-blue-2 rounded-md h-[520px] px-2 py-2">
                    <div className="flex flex-row items-center space-x-2 w-full">
                        <p className="text-sm font-font1 w-full">Data Device {device.split("-")[1]}</p>
                        <div className="flex justify-end w-full px-3">
                            {device === ""? null :
                                <Trash
                                    className="w-5 h-5 fill-white cursor-pointer hover:fill-red-500"
                                    title="delete device"
                                    onClick={() => handleClickDeleteDevice(name, device)}
                                />
                            }
                            {/*<div */}
                            {/*    className={`absolute w-10 h-10 rounded-full bg-white bg-opacity-40 mt-[450px] mr-5 z-10 cursor-pointer ${show? "" : "hidden"}`}*/}
                            {/*    onClick={}*/}
                            {/*>*/}
                            {/*    <div className="flex justify-center items-center h-full">*/}
                            {/*        <Arrow className="w-8 h-8"/>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                    <div className="h-[1px] bg-white"></div>
                    <div className="flex flex-col h-full border border-white border-opacity-50 rounded-md px-2 py-2 h-[490px] overflow-y-auto device w-full">
                        <LoaderContent loading={loadContent}>
                            <ScrollBars type="bottom" update={number} id="device" callback={(e: boolean) => setShow(e)}>
                                <div className="flex flex-col space-y-2">
                                    {dataDevice.length === 0? <div>Data Not Found</div> :
                                        (dataDevice.map((items, idx) => (
                                            <div key={`${items.key}-${idx} w-full`}>
                                                <div className="flex flex-row space-x-2 w-full">
                                                    <p className="w-[140px]">{parseDateTime(items.createdAt)}</p>
                                                    <p className="w-[10px]">:</p>
                                                    <p className="w-full">{JSON.stringify(items.data, undefined, 3)}</p>
                                                </div>
                                            </div>
                                        )))
                                    }
                                </div>
                            </ScrollBars>
                        </LoaderContent>
                    </div>
                    <div className="px-2 py-1">
                        <div className="flex flex-row items-center space-x-2">
                            <TextInput
                                name="cmd"
                                value={text.cmd}
                                placeholder="command"
                                onChange={ChangeTextInput}
                                onKeyDown={handleKeyDown}
                            />
                            <Button
                                className="mt-0"
                                label="Kirim"
                                name="send"
                                onClick={sendCommand}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-2 w-full h-[190px] sm:h-[170px] rounded-md bg-blue-2 px-2 py-2">
                <div>
                    <p className="text-white font-font1">Socket Url : </p>
                    <p className="text-white font-font1 text-sm">https://api.smpvanilla.com:5042/socket.io/?transport=websocket</p>
                </div>
                <div>
                    <p className="text-white font-font1">Format Data : </p>
                    <p className="text-white font-font1 text-sm">{JSON.stringify({key: `${device === ""? `${authContext?.IUser.id}-<device name>` : device}`, data: "any json data"}, undefined, 5)}</p>
                </div>
                <div>
                    <p className="text-white font-font1">Example : </p>
                    <p className="text-white font-font1 text-sm cursor-pointer hover:text-blue-500" onClick={() => window.open("https://github.com/Alis-Dev-idn/iot-socket-arduino", '_blank')}>example code</p>
                </div>

            </div>
        </div>
    )
}

export default Device;
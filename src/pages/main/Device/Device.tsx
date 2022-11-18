import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, LoaderContent, ScrollBars} from "../../../component";
import {ReactComponent as DeviceIcon} from "../../../assets/icon/device-mobile.svg";
import DeviceService from "../../../services/DeviceService/DeviceService";

const Device = () => {
    const locate = useLocation();
    const [loading, setLoading] = useState(false);
    const [loadData, setLoadData] = useState(false);
    const [name, setName] = useState("");
    const [data, setData] = useState<string[]>([]);

    const OnClickDevice = (event: any) => {
        const {id} = event.target;
        console.log(id);
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
                            onClick={() => {}}
                        />
                        <Button
                            className="py-1 mt-0 text-sm flex justify-center w-full bg-red-700 hover:bg-red-500"
                            label="Delete App"
                            name="delete"
                            onClick={() => {}}
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
                                            className="flex flex-row justify-start items-center h-[40px] border border-white rounded-md space-x-2 px-2 cursor-pointer hover:bg-sky-700"
                                            onClick={OnClickDevice}
                                            id={item}
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
                <div className="flex flex-col space-y-2 w-full bg-blue-2 rounded-md h-[520px] px-2 py-1">
                    <p className="text-sm font-font1">Data Device</p>
                    <div className="h-[1px] bg-white"></div>
                    <div className="flex flex-col h-full border border-white border-opacity-50 rounded-md px-2 py-2 h-[490px] overflow-y-auto device">
                        <LoaderContent loading={loadData}>
                            <ScrollBars>
                                <div>aaa</div>
                            </ScrollBars>
                        </LoaderContent>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Device;
import {ReactComponent as Layer} from "../../../assets/icon/layer.svg";
import {ReactComponent as Device} from "../../../assets/icon/device-mobile.svg";
import {useEffect, useState} from "react";
import ApplicationService from "../../../services/ApplicationService/ApplicationService";
import DeviceService from "../../../services/DeviceService/DeviceService";

const Dashboard = () => {
    const [data, setData] = useState<string[]>([]);
    const [count, setCount] = useState(0);

    const handleGetApplication = async () => {
        const response = await ApplicationService.GetApplication();
        setData(response.data);
    }

    const handleGetCountDevice = async () => {
        const response = await DeviceService.getCountDevice();
        setCount(response.count);
    }

    useEffect(() => {
        handleGetApplication().then();
        handleGetCountDevice().then();
    }, []);

    return (
        <div className="">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div className="flex flex-col bg-blue-2 w-full h-full rounded-xl px-3 py-3">
                    <div className="flex justify-end">
                        <Layer className="w-10 h-10 fill-white"/>
                    </div>
                    <p className="text-white text-[35px]">{data.length}</p>
                    <p className="text-white">Application</p>
                </div>
                <div className="flex flex-col bg-blue-2 w-full h-full rounded-xl px-3 py-3">
                    <div className="flex justify-end">
                        <Device className="w-10 h-10 fill-white"/>
                    </div>
                    <p className="text-white text-[35px]">{count}</p>
                    <p className="text-white">Device</p>
                </div>
            </div>

        </div>

    )
}

export default Dashboard;
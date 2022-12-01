import {useEffect, useState} from "react";
import {Toastify} from "../../../component";
import WidgetService from "../../../services/WidgetService/WidgetService";
import {IWidget} from "../../../services/WidgetService/Widget";
import {Grid} from "react-loader-spinner";

const Widget = () => {
    const [loading, setLoading] = useState(false);
    const [dataList, setDataList] = useState<IWidget[]>([]);
    const handleGetListWidget = async () => {
        try{
            setLoading(true);
            const {data} = await WidgetService.getListWidget();
            setDataList(data);
            setLoading(false);
        }catch (error){
            setLoading(false);
            Toastify({type: "error", message: (error as Error).message});
        }
    }

    useEffect(() => {

    }, [dataList]);

    useEffect(() => {
        handleGetListWidget().then();
    }, []);

    return (
        <div className="">
            {dataList.length !== 0?
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                    {dataList.map((items, idx) => (
                        <div
                            key={`${items.data}-${idx}`}
                            className="flex flex-col space-y-2 w-full h-[200px] bg-blue-2 rounded-md px-2 py-2"
                        >
                            <div className="">
                                <p className="font-font1 text-sm text-white">{items.device}</p>
                                <div className="h-[1px] w-full bg-white"></div>
                            </div>
                        </div>
                    ))}
                </div>
                :
                (loading?
                    <div className="flex justify-center items-center h-[400px]">
                        <Grid
                            height="70"
                            width="70"
                            color="#a7d8de"
                            ariaLabel="grid-loading"
                            radius="13"
                            visible={true}
                        />
                    </div>
                    :
                    <div className="">

                    </div>
                )
            }
        </div>
    )
}

export default Widget;
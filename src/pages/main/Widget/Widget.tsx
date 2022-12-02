import {useContext, useEffect, useState} from "react";
import {ReactComponent as WidgetIcon} from "../../../assets/icon/cubes.svg";
import {ReactComponent as Trash} from "../../../assets/icon/trash.svg";
import {Button, LoaderSection, Toastify} from "../../../component";
import WidgetService from "../../../services/WidgetService/WidgetService";
import {IWidget} from "../../../services/WidgetService/Widget";
import {Grid} from "react-loader-spinner";
import {FormulirContext, UiContext} from "../../../context";
import {lazy, Suspense} from "react";
import Chart from "../../../component/molecules/Chart/Chart";

const CreateNew = lazy(() => import("./component/CreateNewWidget"))

const Widget = () => {
    const uiContext = useContext(UiContext);
    const formContext = useContext(FormulirContext);

    const [loading, setLoading] = useState(false);
    const [dataList, setDataList] = useState<IWidget[]>([]);

    const handleShowForm = () => {
        formContext?.setIFormulir({
            show: true,
            label: "Create New Widget",
            children: <Suspense fallback={<LoaderSection/>}>
                <CreateNew callback={handleGetListWidget}/>
            </Suspense>
        });
    }

    const handleClickDelete = (data: IWidget) => {
        uiContext?.handleConfirm({
            show: true,
            message: `Delete Widget ${data.widget_type} ${data.device}`,
            callback: () => handleConfirmDelete(data)
        });
    }

    const handleConfirmDelete = async (data: IWidget) => {
        uiContext?.handleConfirm({
            show: false,
            message: `Delete Widget ${data.widget_type} ${data.device}`,
            callback: () => console.log("delete widget")

        });
        try{
            uiContext?.handleLoading({show: true, isBlock: false});
            await WidgetService.deleteWidget(data);
            uiContext?.handleLoading({show: false, isBlock: false});
            handleGetListWidget().then();
            Toastify({type: "success", message: `Success Delete Widget ${data.widget_type} ${data.device}`});
        }catch (error){
            uiContext?.handleLoading({show: false, isBlock: false});
            Toastify({type: "error", message: (error as Error).message})
        }
    }

    const handleGetListWidget = async () => {
        formContext?.setIFormulir({
            show: false,
            label: "Create New Widget",
            children: <Suspense fallback={<LoaderSection/>}>
                <CreateNew callback={handleGetListWidget}/>
            </Suspense>
        });
        try{
            setLoading(true);
            const {data} = await WidgetService.getListWidget();
            await executeGetDataWidget(data);
            setLoading(false);
        }catch (error){
            setLoading(false);
            Toastify({type: "error", message: (error as Error).message});
        }
    }

    const executeGetDataWidget = async (value: IWidget[]) => {
        for (let widget of value) {
            if(widget.widget_type === "graph") {
                const {data} = await WidgetService.getWidgetGraphData(widget);
                value = value.map((items) => {
                    if(items.application === widget.application && items.data === widget.data) return {...items, graph: data}
                    return items;
                });
            }
        }
        setDataList(value);
    }

    useEffect(() => {
        handleGetListWidget().then();

        // eslint-disable-next-line
    }, []);

    return (
        <div className="flex flex-col space-y-2">
            <div className="flex justify-end items-center">
                <div className="flex flex-row space-x-2 items-center">
                    <Button
                        icon={<WidgetIcon className="w-5 h-5 fill-white"/>}
                        label="Create Widget"
                        name="create"
                        onClick={handleShowForm}
                    />
                </div>
            </div>
            {dataList.length !== 0?
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                    {dataList.map((items, idx) => (
                        <div
                            key={`${items.data}-${idx}`}
                            className="flex flex-col space-y-2 w-full h-[200px] bg-blue-2 rounded-md px-2 py-2"
                        >
                            <div className="flex flex-col space-y-1">
                                <div className="flex flex-row">
                                    <div className="flex justify-start w-full">
                                        <p className="font-font1 text-sm text-white">{items.application} | {items.device} | {items.data}</p>
                                    </div>
                                    <div className="flex justify-end  w-full">
                                        <Trash
                                            className="w-5 h-5 fill-white hover:fill-red-500 cursor-pointer"
                                            onClick={() => handleClickDelete(items)}
                                        />
                                    </div>
                                </div>
                                <div className="h-[1px] w-full bg-white"></div>
                            </div>
                            <div className="">
                                <Chart
                                    graph={items.graph || []}
                                />
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
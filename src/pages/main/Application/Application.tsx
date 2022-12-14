import {Button, Toastify} from "../../../component";
import {Suspense, lazy, useContext, useEffect, useState} from "react";
import {FormulirContext} from "../../../context";
import {ReactComponent as App} from "../../../assets/icon/clone.svg";
import ApplicationService from "../../../services/ApplicationService/ApplicationService";
import {Link} from "react-router-dom";
import {Grid} from "react-loader-spinner";

const FormulirAdd = lazy(() => import("./formulir/FormulirAdd"));

const Application = () => {
    const [loading, setLoading] = useState(false)
    const formulirContext = useContext(FormulirContext);
    const [data, setData] = useState<string[]>([]);

    const handleCallback = (name: string) => {
        setData([]);
        handleGetData(true);
        formulirContext?.setIFormulir({
            label: name,
            show: false,
            children: <></>
        });
    }

    const OnclickEvent = () => {
        formulirContext?.setIFormulir({
            label: "Add Application",
            show: true,
            children: <Suspense fallback={<div>Loading...</div>}>
                <FormulirAdd callback={() => handleCallback("Add Application")}/>
            </Suspense>
        });
    }

    const handleGetData = async (update?: boolean) => {
        try{
            setLoading(true);
            const response = await ApplicationService.GetApplication(update);
            setData(response.data);
            setLoading(false);
        }catch (err){
            Toastify({type: "error", message: (err as Error).message});
        }
    }

    useEffect(() => {
        handleGetData().then()
    }, []);

    return(
        <div className="flex flex-col space-y-2 w-full h-full px-2">
            <div className="flex flex-row justify-end">
                <Button
                    className="text-sm"
                    label="Add Application"
                    name="app"
                    onClick={OnclickEvent}
                />
            </div>
            {data.length !== 0?
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {data.map((item, idx) => (
                        <Link to={`/application/${item}`} key={`${item}-${idx}`}>
                            <div className="w-full h-[80px] bg-blue-2 rounded-md shadow shadow-md border border-white border-opacity-50 px-2 py-2">
                                <div className="flex flex-col justify-center h-full">
                                    <App className="w-7 h-7 fill-white"/>
                                    <div className="flex justify-end">
                                        <p className="text-white font-font1">{item}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
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
                     : null)

            }
        </div>
    )
}

export default Application;
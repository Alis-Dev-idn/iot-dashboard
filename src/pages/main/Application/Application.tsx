import {Button} from "../../../component";
import {useContext, useEffect, useState} from "react";
import {FormulirContext} from "../../../context";
import FormulirAdd from "./formulir/FormulirAdd";
import {ReactComponent as App} from "../../../assets/icon/clone.svg";
import ApplicationService from "../../../services/ApplicationService/ApplicationService";
import {Link} from "react-router-dom";
import {Grid} from "react-loader-spinner";


const Application = () => {
    const formulirContext = useContext(FormulirContext);
    const [data, setData] = useState<string[]>([]);


    const handleCallback = (name: string) => {
        setData([]);
        handleGetData();
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
            children: <FormulirAdd callback={() => handleCallback("Add Application")}/>
        });
    }

    const handleGetData = async () => {
        try{
            const response = await ApplicationService.GetApplication();
            setData(response.data);
        }catch (err){

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
            }
        </div>
    )
}

export default Application;
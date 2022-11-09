import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ReactComponent as Info} from "../../assets/icon/circle-info.svg";
import {Oval} from "react-loader-spinner";
import {sleep} from "../../utils/Utils";
import UserServices from "../../services/UserServices/UserServices";


const Active = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const [data, setData] = useState("")
    const [loading, setLoading] = useState(false);

    const GetParams = async () => {
        const username = params.get("username");
        const code = params.get("code");
        if(username && code)
            return {username, code}
        navigate("/login");
        return null;
    }

    useEffect(() => {
        GetParams().then(async (data) => {
            try{
                setLoading(true);
                await UserServices.ActiveUser({username: data?.username, code: data?.code});
                setLoading(false);
                setData("Akun Berhasil Aktif Silakan Login");
                await sleep(2000);
                navigate("/login");
            }catch (error){
                setLoading(false);
                setData((error as Error).message);
                await sleep(3000);
                navigate("/login");
            }
        });
        // eslint-disable-next-line
    }, []);

    return (
        <div className="w-screen h-screen bg-primary-blue">
            <div className="flex justify-center items-center h-full">
                <div className="border border-white rounded-md w-[400px] h-[180px]">
                    <div className="flex flex-col justify-center items-center h-full">
                        <div className="flex flex-col items-center">
                            <Info className="h-10 w-10 fill-white"/>
                            <div className="flex flex-row justify-center items-center mt-3 space-x-2">
                                <p className="text-white font-font1 font-bold">{data === ""? "Sedang Memeriksa Akun ..." : data}</p>
                                {loading?
                                    <Oval
                                        width={20}
                                        height={20}
                                        strokeWidth={10}
                                        color="#c5d7dd"
                                    />
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Active;
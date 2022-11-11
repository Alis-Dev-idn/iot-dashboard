import {Button} from "../../../../component";
import {useContext, useState} from "react";
import {UiContext} from "../../../../context";
import {sleep} from "../../../../utils/Utils";

interface PropTypes {
    callback: Function;
}

const FormulirChangeImage = (props: PropTypes) => {
    const uiContext = useContext(UiContext);
    const [file, setFile] = useState<File>();

    const createError = (value: string) => {
        uiContext?.handleAlert({
            show: true,
            type: "warning",
            message: value
        });
    }

    const handleClickSave = () => {
        if(!file) return createError("Image Diperlukan");
        uiContext?.handleConfirm({
            show: true,
            message: "Simpan Profile Image?",
            callback: confirmSave
        });
    }

    const confirmSave = async () => {
        uiContext?.handleConfirm({
            show: false,
            message: "Simpan Perubahan?",
        });
        uiContext?.handleLoading({show: true, isBlock: false});
        await sleep(2000);
        uiContext?.handleLoading({show: false, isBlock: false});
        props.callback();
        uiContext?.handleAlert({
            show: true,
            type: "warning",
            message: "Ops Something Wrong, Please Try Again Later"
        });
    }

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return;
        setFile(e.target.files[0]);
    }

    return (
        <div className="flex flex-col w-full">
            <div className="">
                <p className="text-gray-300 text-sm font-font1">Pilih Gambar</p>
                <div className="flex flex-row items-center w-full h-[35px] bg-gray-300 rounded-md">
                    <input
                        type="file"
                        className="cursor-pointer opacity-100 ml-1"
                        accept="image/png"
                        onChange={handleChangeFile}
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <Button
                    className="text-sm"
                    label="Simpan"
                    name="simpan"
                    onClick={handleClickSave}
                />
            </div>
        </div>
    )
}

export default FormulirChangeImage;
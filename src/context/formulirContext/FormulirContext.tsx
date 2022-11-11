import {createContext, ReactNode, useState} from "react";

interface PropTypes {
    children: ReactNode;
}

interface IFormulir {
    className?: string
    show: boolean;
    label: string;
    children: ReactNode;
}

export const FormulirContext = createContext<{
    formulir: IFormulir;
    setIFormulir: (data: IFormulir) => void;
} | null>(null);

export const FormulirContextProvider = (props: PropTypes) => {
    const [formulir, setFormulir] = useState<IFormulir>({
        show: false,
        label: "",
        children: <></>
    });

    const setIFormulir = (data: IFormulir) => {
        setFormulir((prev) => ({...prev, ...data}));
    }

    return(
        <FormulirContext.Provider value={{formulir, setIFormulir}}>
            {props.children}
        </FormulirContext.Provider>
    )
}
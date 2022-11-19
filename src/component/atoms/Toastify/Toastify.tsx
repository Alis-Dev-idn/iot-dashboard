import {toast} from "react-toastify";


interface Proptypes {
    type: "warning" | "info" | "success" | "error" | "default";
    message: string;
}

const Toastify = (props: Proptypes) => {
    console.log(props);
       if(props.type === "warning"){
           toast.warning(props.message, {
               position: "top-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: false,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "dark"
           });
       }
       if(props.type === "info") {
           toast.info(props.message, {
               position: "top-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: false,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "dark"
           });
       }
       if(props.type === "success") {
           toast.success(props.message, {
               position: "top-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: false,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "dark"
           });
       }
       if(props.type === "error") {
           toast.error(props.message, {
               position: "top-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: false,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "dark"
           });
       }
       if(props.type === "default") {
        toast(props.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });
    }
}

export default Toastify;
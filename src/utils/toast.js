import { toast } from "react-toastify";

export const successToast = (message) => {
    !toast.isActive(`${message}`) && toast.info(message, {
        toastId: `${message}`,
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        limit: 1,
    });
};

export const errorToast = (message) => {
    !toast.isActive(`${message}`) && toast.error(message, {
        toastId: `${message}`,
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        limit: 1,
    });
};

import toast from "react-hot-toast";

export const toastMessage = code => {
    if (+code === 3) return toast.error('')
}
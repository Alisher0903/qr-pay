import toast from "react-hot-toast";

export const consoleClear = () => console.clear()

export const toastMessage = code => {
    if (+code === 3) return toast.error('The password did not match')
    else if (+code === 2) return toast.error('No information found on this')
}
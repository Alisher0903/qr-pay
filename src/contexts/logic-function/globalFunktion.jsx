import axios from 'axios';
import { consoleClear, toastMessage } from 'contexts/toast-message';
import { config } from 'contexts/token';
import { getMeUrl } from "../api";
import toast from 'react-hot-toast';

export const userGetMe = async ({ setData, token }) => {
    try {
        const { data } = await axios.get(getMeUrl, token ? {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        } : config)

        if (data?.error?.code) setData(null)
        else setData(data.data)
    } catch (err) {
        setData(null)
        console.log(err)
        consoleClear()
    }
}

export async function globalGetFunction({ url, setData, setLoading }) {
    try {
        setLoading(true)
        const { data } = await axios.get(url, config)
        if (data?.error?.code) {
            setLoading(false)
            // toastMessage(data.error.code)
            setData([]);
        } else {
            setLoading(false)
            setData(data.data);
        }
    } catch (error) {
        setData([]);
        setLoading(false)
        console.error('Error during get operation:', error);
        // Qo'shimcha xato bilan shug'ullanish mexanizmlari bu yerda amalga oshirilishi mumkin.
    }
}

export async function globalPostFunction({ url, postData, setLoading, getFunction }) {
    try {
        setLoading(true)
        const { data } = await axios.post(url, postData, config)
        if (data?.error?.code) {
            setLoading(false)
            toastMessage(data.error.code)
        } else {
            setLoading(false)
            toast.success("Task completed successfully")
            getFunction()
        }
    } catch (error) {
        setLoading(false)
        toast.error('Error during create operation:');
        // Qo'shimcha xato bilan shug'ullanish mexanizmlari bu yerda amalga oshirilishi mumkin.
    }
}




export async function globalPutFunction({ url, putData, setLoading, getFunction }) {
    try {
        setLoading(true)
        const { data } = await axios.put(url, putData, config)
        if (data?.error?.code) {
            setLoading(false)
            toastMessage(data.error.code)
        } else {
            setLoading(false)
            toast.success("Task completed successfully")
            getFunction()
        }
    } catch (error) {
        setLoading(false)
        toast.error('Error during update operation:');
        // Qo'shimcha xato bilan shug'ullanish mexanizmlari bu yerda amalga oshirilishi mumkin.
    }
}

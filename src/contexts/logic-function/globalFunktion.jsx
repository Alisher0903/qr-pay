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
        consoleClear()
    }
}

export async function globalGetFunction({ url, setData, setLoading, setTotalElements, page, size }) {
    let getUrl = url; // Boshlang'ich URL
    try {
        const params = [];

        if (page) params.push(`page=${page}`);
        if (size) params.push(`size=${size}`);

        // Agar params mavjud bo'lsa, URLga qo'shamiz
        if (params.length > 0) {
            getUrl = `${url}?${params.join("&")}`;
        }
        
        if (setLoading) setLoading(true); // Agar setLoading funksiyasi mavjud bo'lsa, uni chaqiramiz

        const { data } = await axios.get(getUrl, config);

        if (data?.error?.code) {
            if (setLoading) setLoading(false);
            // toastMessage(data.error.code)
            setData([]);
        } else {
            if (setLoading) setLoading(false);
            setData(data.data);

            if (setTotalElements && data.data.totalElements !== undefined) {
                setTotalElements(data.data.totalElements); // Agar setTotalElements va totalElements mavjud bo'lsa, qiymatini saqlaymiz
            }
        }
    } catch (error) {
        setData([]);
        if (setLoading) setLoading(false);
        console.error('Error during get operation:', error);
        // Qo'shimcha xato bilan shug'ullanish mexanizmlari bu yerda amalga oshirilishi mumkin.
    }
}


export async function globalPostFunction({ url, postData, setLoading, getFunction }) {

    try {
        if (setLoading) setLoading(true);
        const { data } = await axios.post(url, postData, config)
        if (data?.error?.code) {
            if (setLoading) setLoading(false);
            toastMessage(data.error.code)
        } else {
            if (setLoading) setLoading(false);
            toast.success("Task completed successfully")
            getFunction()
        }
    } catch (error) {
        if (setLoading) setLoading(false);
        toast.error('Error during create operation:');
        // Qo'shimcha xato bilan shug'ullanish mexanizmlari bu yerda amalga oshirilishi mumkin.
    }
}

export async function globalPutFunction({ url, putData, setLoading, getFunction }) {
    try {
        if (setLoading) setLoading(true);
        const { data } = await axios.put(url, putData, config)
        if (data?.error?.code) {
            if (setLoading) setLoading(false);
            toastMessage(data.error.code)
        } else {
            if (setLoading) setLoading(false);
            toast.success("Task completed successfully")
            getFunction()
        }
    } catch (error) {
        if (setLoading) setLoading(false);
        toast.error('Error during update operation:');
        // Qo'shimcha xato bilan shug'ullanish mexanizmlari bu yerda amalga oshirilishi mumkin.
    }
}

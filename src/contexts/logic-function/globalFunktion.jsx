import axios from 'axios';
import {consoleClear, toastMessage} from 'contexts/toast-message';
import {config} from 'contexts/token';
import {getMeUrl} from "../api";
import toast from 'react-hot-toast';

export const userGetMe = async ({setData, token}) => {
    try {
        const {data} = await axios.get(getMeUrl, token ? {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        } : config)
        if (data?.error?.code) setData(null)
        else setData(data.data)
    } catch (err) {
        setData(null)
    } finally {
        consoleClear()
    }
}

export async function globalGetFunction({url, setData, setLoading, setTotalElements, page, size, token}) {
    let getUrl = url; // Boshlang'ich URL
    if (setLoading) setLoading(true); // Agar setLoading funksiyasi mavjud bo'lsa, uni chaqiramiz
    try {
        const params = [];

        if (page) params.push(`page=${page}`);
        if (size) params.push(`size=${size}`);

        // Agar params mavjud bo'lsa, URLga qo'shamiz
        if (params.length > 0) {
            getUrl = `${url}?${params.join("&")}`;
        }

        const {data} = await axios.get(getUrl, token ? {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        } : config);

        if (data?.error?.code) setData([]);
        else {
            setData(data.data);

            if (setTotalElements && data.data.totalElements !== undefined) {
                setTotalElements(data.data.totalElements); // Agar setTotalElements va totalElements mavjud bo'lsa, qiymatini saqlaymiz
            }
        }
    } catch (error) {
        setData([]);
        consoleClear()
    } finally {
        if (setLoading) setLoading(false);
        // consoleClear()
    }
}


export async function globalPostFunction({url, postData, setLoading, getFunction}) {
    if (setLoading) setLoading(true);
    try {
        const {data} = await axios.post(url, postData, config)
        if (data?.error?.code) toastMessage(data.error.code)
        else {
            toast.success("Task completed successfully")
            getFunction()
        }
    } catch (error) {
        toast.error('Error during create operation:');
    } finally {
        if (setLoading) setLoading(false);
        // consoleClear()
    }
}

export async function globalPutFunction({url, putData, setLoading, getFunction, setResponse}) {
    try {
        if (setLoading) setLoading(true);
        const {data} = await axios.put(url, putData, config)
        if (data?.error?.code) toastMessage(data.error.code)
        else {
            if (setResponse) setResponse(data.data)
            toast.success("Task completed successfully")
            getFunction()
        }
    } catch (error) {
        // toast.error('Error during update operation:');
    } finally {
        if (setLoading) setLoading(false);
        // consoleClear()
    }
}

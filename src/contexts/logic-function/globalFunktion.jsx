import axios from 'axios';
import {consoleClear, toastMessage} from 'contexts/toast-message';
import {config} from 'contexts/token';
import {getMeUrl} from "../api";

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
        console.log(err)
        consoleClear()
    }
}

async function globalCrudFunction({method, url, data, setData, setLoading}) {
    try {
        setLoading(true)
        const response = await axios({
            method,
            url,
            data,
            ...config, // Bu yerda config dan foydalanamiz
        });
        if (data?.error?.code) {
            setLoading(false)
            toastMessage(data.error.code)
        } else {
            setLoading(false)
            setData(response);
        }
    } catch (error) {
        setLoading(false)
        console.error('Error during CRUD operation:', error);
        // Qo'shimcha xato bilan shug'ullanish mexanizmlari bu yerda amalga oshirilishi mumkin.
    }
}

export default globalCrudFunction;

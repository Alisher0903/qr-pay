import axios from 'axios';

export const apiRequest = async (method, url, data = null, setData) => {
    try {
        const res = await axios({
            method: method,
            url: url,
            data: data,
        });

        setData(res.data.body);
    } catch (error) {
        console.error(`Error during ${method.toUpperCase()} request to ${url}:`, error);
        throw error;
    }
};
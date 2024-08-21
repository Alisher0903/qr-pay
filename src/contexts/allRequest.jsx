import axios from 'axios';

export const sliceNumber = (num) => {
    if (num.startsWith('998') && num.length === 12) return `+${num}`;
    else return ''
};

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
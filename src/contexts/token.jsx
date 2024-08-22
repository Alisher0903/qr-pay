export const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
}

export const imgConfig = {
    headers: {
        'multipart/type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
}

export const setConfig = () => config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
export const setImgConfig = () => imgConfig.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
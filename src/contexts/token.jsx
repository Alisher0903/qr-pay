export const config = {
    headers: {
        // Authorization: localStorage.getItem('token'),
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5NzIyMjA3OTAiLCJpYXQiOjE3MjQzMDU1NDcsImV4cCI6MTgxMDcwNTU0N30.Hc88hX0fz37yHFXG31Etmfqp7JB6TxoQlG0j5bZkmPk-ITFI_Ncv4sgVawJ-7TF83_po6xBmpNOnwkGc-Jtiyg',
    }
}

export const imgConfig = {
    headers: {
        'multipart/type': 'multipart/form-data',
        // Authorization: localStorage.getItem('token'),
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5NzIyMjA3OTAiLCJpYXQiOjE3MjQzMDU1NDcsImV4cCI6MTgxMDcwNTU0N30.Hc88hX0fz37yHFXG31Etmfqp7JB6TxoQlG0j5bZkmPk-ITFI_Ncv4sgVawJ-7TF83_po6xBmpNOnwkGc-Jtiyg',
    }
}

// export const setConfig = () => config.headers.Authorization = localStorage.getItem('token')
// export const setImgConfig = () => imgConfig.headers.Authorization = localStorage.getItem('token')
export const setConfig = () => config.headers.Authorization = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5NzIyMjA3OTAiLCJpYXQiOjE3MjQzMDU1NDcsImV4cCI6MTgxMDcwNTU0N30.Hc88hX0fz37yHFXG31Etmfqp7JB6TxoQlG0j5bZkmPk-ITFI_Ncv4sgVawJ-7TF83_po6xBmpNOnwkGc-Jtiyg'
export const setImgConfig = () => imgConfig.headers.Authorization = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5NzIyMjA3OTAiLCJpYXQiOjE3MjQzMDU1NDcsImV4cCI6MTgxMDcwNTU0N30.Hc88hX0fz37yHFXG31Etmfqp7JB6TxoQlG0j5bZkmPk-ITFI_Ncv4sgVawJ-7TF83_po6xBmpNOnwkGc-Jtiyg'
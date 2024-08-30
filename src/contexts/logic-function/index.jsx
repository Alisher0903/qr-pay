import axios from "axios";
import {consoleClear, toastMessage} from "../toast-message";
import {config} from "../token";
import {requestUpdateStatus} from "../api";
import toast from "react-hot-toast";

// request update status
export const updateRequestStatus = async ({reqID, status, getFunction}) => {
    try {
        const {data} = await axios.post(requestUpdateStatus, {
            id: reqID,
            status: status
        }, config)

        if(data.error?.code) toastMessage(data.error?.code)
        else {
            if (getFunction) getFunction()
            toast.success('Task completed successfully')
        }
    } catch (err) {
        console.log(err)
    } finally {
        consoleClear()
    }
}
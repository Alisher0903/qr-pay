import axios from 'axios';
import { toastMessage } from 'contexts/toast-message';
import { config } from 'contexts/token';


async function globalCrudFunction({ method, url, data, setData, setLoading }) {
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

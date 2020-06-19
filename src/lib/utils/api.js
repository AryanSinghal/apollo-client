import axios from 'axios';
import configuration from '../../configs/configuration';

const callApi = async (method, url, body) => {
  try {
    const { baseUrl } = configuration;
    const { data } = await axios({
      method: method,
      url: `${baseUrl}/${url}`,
      data: body,
      headers: {
        'authorization': localStorage.getItem('token')
      }
    });
    return data;
  }
  catch (err) {
    throw err;
  }
}

export default callApi;

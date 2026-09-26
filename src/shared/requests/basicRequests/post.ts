import axios, { AxiosError } from 'axios';
import envs from '../../../configs/envs';

const axiosPost = async ({ url, data }: { url: string; data: object }) => {
  try {
    const response = await axios.post(`${envs.API}${url}`, data);
    return response;
  } catch (error) {
    return (error as AxiosError).response?.data;
  }
};

export default axiosPost;

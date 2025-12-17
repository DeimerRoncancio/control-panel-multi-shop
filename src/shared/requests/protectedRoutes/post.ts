import axios, { AxiosError } from 'axios';
import envs from '../../../configs/envs';

type Props = {
  url: string;
  data: FormData;
  token: string;
}

const axiosPostBearer = async ({ url, data, token }: Props) => {
  try {
    const response = await axios.post(`${envs.API}${url}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  } catch (error) {
    return (error as AxiosError).response?.data;
  }
};

export default axiosPostBearer;

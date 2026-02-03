import axios, { AxiosError } from 'axios';
import envs from '../../../configs/envs';

type PropsFormData = {
  url: string;
  data: FormData;
  token: string;
}

type Props = {
  url: string;
  data: any;
  token: string;
}

const axiosPostFormDataBearer = async ({ url, data, token }: PropsFormData) => {
  try {
    const response = await axios.post(`${envs.API}${url}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  } catch (error: AxiosError | any) {
    return (error as AxiosError).response;
  }
};

export const axiosPostBearer = async ({ url, data, token }: Props) => {
  try {
    const response = await axios.post(`${envs.API}${url}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export default axiosPostFormDataBearer;

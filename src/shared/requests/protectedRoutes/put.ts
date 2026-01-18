import axios, { AxiosError } from 'axios';
import envs from '../../../configs/envs';

type AxiosPutFormDataProps = {
  url: string;
  data: object;
  token: string;
  headers?: Record<string, string>;
}

type AxiosPutProps = {
  url: string;
  data: object;
  token: string;
  headers?: Record<string, string>;
}

const axiosPutFormDataBearer = async ({ url, data, token, headers = {} }: AxiosPutFormDataProps) => {
  try {
    const response = await axios.put(`${envs.API}${url}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        ...headers,
      },
    });
    return response;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

export const axiosPutBearer = async ({ url, data, token }: AxiosPutProps) => {
  try {
    const response = await axios.put(`${envs.API}${url}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

export default axiosPutFormDataBearer;

import axios, { AxiosError } from 'axios';

type AxiosPutResponseProps = {
  url: string;
  data: object;
  token: string;
  headers?: Record<string, string>;
}

const axiosPutBearer = async ({ url, data, token, headers = {} }: AxiosPutResponseProps) => {
  try {
    const response = await axios.put(url, data, {
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

export default axiosPutBearer;

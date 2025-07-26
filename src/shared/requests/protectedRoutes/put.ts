import axios, { AxiosError } from 'axios';

const axiosPutBearer = async ({
  url,
  data,
  token,
  headers = {},
}: {
  url: string;
  data: object;
  token: string;
  headers?: Record<string, string>;
}) => {
  try {
    const response = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
    });
    return response;
  } catch (error) {
    return (error as AxiosError).response?.data;
  }
};

export default axiosPutBearer;

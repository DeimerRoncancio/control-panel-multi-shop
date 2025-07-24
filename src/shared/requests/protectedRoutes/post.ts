import axios, { AxiosError } from 'axios';

const axiosPostBearer = async ({
  url,
  data,
  token,
}: {
  url: string;
  data: object;
  token: string;
}) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return (error as AxiosError).response?.data;
  }
};

export default axiosPostBearer;

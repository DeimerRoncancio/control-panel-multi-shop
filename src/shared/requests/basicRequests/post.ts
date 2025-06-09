import axios, { AxiosError } from 'axios';

const axiosPost = async ({ url, data }: { url: string; data: object }) => {
  try {
    const response = await axios.post(url, data);
    console.log('Response:', response);
    return response;
  } catch (error) {
    return (error as AxiosError).response?.data;
  }
};

export default axiosPost;

import axios, { AxiosError } from 'axios';

const axiosGet = async ({ url }: { url: string }) => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    throw new Error(
      error instanceof AxiosError
        ? error.message
        : 'An unexpected error occurred'
    );
  }
};

export default axiosGet;

import axios, { AxiosError } from 'axios';
import envs from '../../../configs/envs';

type Props = {
  url: string;
  params?: {
    page: number;
    size: number;
  };
}

const axiosGet = async ({ url, params = { page: 0, size: 10 } }: Props) => {
  try {
    const response = await axios.get(`${envs.API}${url}`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error instanceof AxiosError
        ? error.message
        : 'An unexpected error occurred'
    );
  }
};

export default axiosGet;

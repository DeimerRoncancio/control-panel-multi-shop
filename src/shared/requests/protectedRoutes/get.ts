import axios, { AxiosError } from 'axios';
import envs from '../../../configs/envs';

type ParamsType = {
  page: number;
  size: number;
};

type GetBearerProps = {
  url: string;
  token: string;
  params?: ParamsType;
};

const axiosGetBearer = async ({ url, token, params }: GetBearerProps) => {
  try {
    const response = await axios.get(`${envs.API}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export default axiosGetBearer;

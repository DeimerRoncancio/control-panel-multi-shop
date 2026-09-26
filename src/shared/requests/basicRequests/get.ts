import axios, { AxiosError } from 'axios';
import envs from '../../../configs/envs';
import { cleanParams, PAGINATION_DEFAULT, ParamsType } from '../params';

type Props = {
  url: string;
  params?: ParamsType;
}

const axiosGet = async ({ url, params = PAGINATION_DEFAULT }: Props) => {
  try {
    const response = await axios.get(`${envs.API}${url}`, {
      params: cleanParams(params),
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

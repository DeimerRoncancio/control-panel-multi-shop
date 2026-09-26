import axios, { AxiosError } from 'axios';
import envs from '../../../configs/envs';
import { cleanParams, ParamsType } from '../params';

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

export default axiosGetBearer;

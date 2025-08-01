import axios, { AxiosError } from 'axios';
import envs from '../../../configs/envs';

const axiosDeleteBearer = async ({
  url,
  token,
}: {
  url: string;
  token: string;
}) => {
  try {
    const response = await axios.delete(`${envs.API}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export default axiosDeleteBearer;

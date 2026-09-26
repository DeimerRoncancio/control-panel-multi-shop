const isProduction = import.meta.env.MODE === 'production';

const envs = {
  API: isProduction
    ? import.meta.env.VITE_API_PRODUCTION
    : import.meta.env.VITE_API_DEVELOPMENT,
};

export default envs;

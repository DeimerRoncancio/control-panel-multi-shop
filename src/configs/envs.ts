const envs = {
  API:
    import.meta.env.MODE === 'production'
      ? import.meta.env.VITE_API_DEVELOPMENT
      : import.meta.env.VITE_API_PRODUCTION,
};

export default envs;

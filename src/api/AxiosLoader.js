import axios from 'axios';


const AxiosLoader = (setLoading) => {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost', // 나중에 배포할 때 사이트 이름 바꿔줘야 함
    });
  
    axiosInstance.interceptors.request.use(
      (config) => {
        if (setLoading) setLoading(true);
        return config;
      },
      (error) => {
        if (setLoading) setLoading(false);
        return Promise.reject(error);
      }
    );
  
    axiosInstance.interceptors.response.use(
      (response) => {
        if (setLoading) setLoading(false);
        return response;
      },
      (error) => {
        if (setLoading) setLoading(false);
        return Promise.reject(error);
      }
    );
  
    return axiosInstance;
  };

export default AxiosLoader;

import { useState, useEffect } from 'react';
import AxiosLoader from '../api/AxiosLoader';
import LoadingSpinner from '../component/LoadingSpinner/LoadingSpinner';

const SomeComponent = () => {
  const [isLoading, setLoading] = useState(false);
  const axiosInstance = AxiosLoader(setLoading);

  useEffect(() => {
    axiosInstance.get('/some-endpoint')
      .then(response => {
        // 데이터 처리
        // 스테이트 변환로직 (setLogin())
      })
      .catch(error => {
        // 에러 처리
      });
  }, [axiosInstance]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div>
      {/* 컴포넌트 내용 */}
    </div>
  );
};

export default SomeComponent;

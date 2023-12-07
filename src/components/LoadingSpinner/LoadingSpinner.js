import React from 'react';
import spinner from './Spinner.gif';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={styles.spinner__container}>
      <img src={spinner} alt="로딩 중..." className={styles.spinner__image} />
      <div className={styles.loading__text}>Loading...</div>
    </div>
  );
};

export default LoadingSpinner;

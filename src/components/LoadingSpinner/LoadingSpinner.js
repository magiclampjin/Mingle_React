import React from 'react';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={styles.spinner__container}>
      <img src='/assets/loadingSpinner/Spinner.gif' alt="로딩 중..." className={styles.spinner__image} />
      <div className={styles.loading__text}><span>L</span>OAD<span>I</span>NG<span>...</span></div>
    </div>
  );
};

export default LoadingSpinner;

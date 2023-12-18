import React from 'react';
import styles from './LoadingSpinnerMini.module.css';

const LoadingSpinnerMini = ({height, width}) => {
  const heightStyle = {
    height: height +"px",
    width: width +"px" 
  };

  return (
    <div className={styles.spinner__container} style={heightStyle}>
      <img src='/assets/loadingSpinner/Spinner.gif' alt="로딩 중..." className={styles.spinner__image} />
      <div className={styles.loading__text}><span>L</span>OAD<span>I</span>NG<span>...</span></div>
    </div>
  );
};

export default LoadingSpinnerMini;

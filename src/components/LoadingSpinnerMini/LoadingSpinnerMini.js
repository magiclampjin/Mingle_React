import React from 'react';
import spinner from './Spinner.gif';
import styles from './LoadingSpinnerMini.module.css';

const LoadingSpinnerMini = ({height}) => {
  const heightStyle = {
    height: height +"vh"
  };

  return (
    <div className={styles.spinner__container} style={heightStyle}>
      <img src={spinner} alt="로딩 중..." className={styles.spinner__image} />
      <div className={styles.loading__text}>Loading...</div>
    </div>
  );
};

export default LoadingSpinnerMini;

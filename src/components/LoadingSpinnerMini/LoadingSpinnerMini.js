import React from 'react';
import spinner from './Spinner.gif';
import styles from './LoadingSpinnerMini.module.css';

const LoadingSpinnerMini = ({height, width}) => {
  const heightStyle = {
    height: height +"px",
    width: width +"px" 
  };

  return (
    <div className={styles.spinner__container} style={heightStyle}>
      <img src={spinner} alt="로딩 중..." className={styles.spinner__image} />
      <div className={styles.loading__text}>Loading...</div>
    </div>
  );
};

export default LoadingSpinnerMini;

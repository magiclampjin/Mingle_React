import styles from "./OttCard.module.css";

const OttCard = ({ ott, thumbnail, title }) => {

    const MAX_LENGTH = 30; // 제목 글자수 제한

    const formatTitle = (title) => {
        // 제목이 최대 길이보다 길면, 제한된 길이만큼 자른 후 말줄임표를 추가합니다.
        return title.length > MAX_LENGTH ? title.substring(0, MAX_LENGTH) + "..." : title;
    };

    return (
      <div className={styles.ott__card}>
        <div className={styles.ott__title}>{ott}</div>
        <div className={styles[`ott__image-container`]}>
            <img src={thumbnail} alt="Thumbnail" className={styles.ott__image} />
        </div>
        <div className={styles.ott__content}>{formatTitle(title)}</div>
      </div>
    );
};

export default OttCard;

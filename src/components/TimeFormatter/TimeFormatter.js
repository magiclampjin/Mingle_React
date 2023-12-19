import { formatDistanceToNowStrict, parseISO,format } from 'date-fns';
import ko from 'date-fns/locale/ko'; // 한국어를 위한 로케일

export const timeFormatter = (writeDate) => {
    const date = parseISO(writeDate);
    const now = new Date();
    const differenceInMinutes = (now - date) / (1000 * 60);

    if (differenceInMinutes < 1) {
        return '방금 전';
    } else if (differenceInMinutes < 60) {
        return `${Math.floor(differenceInMinutes)}분 전`;
    } else if (differenceInMinutes < 60 * 24) {
        return formatDistanceToNowStrict(date, { addSuffix: true, locale: ko });
    } else if (differenceInMinutes < 60 * 24 * 7) {
        return formatDistanceToNowStrict(date, { addSuffix: true, locale: ko });
    } else {
        // format 함수를 사용하여 날짜 형식을 'yyyy-MM-dd'로 변환
        return format(date, 'yyyy-MM-dd');
    }
}
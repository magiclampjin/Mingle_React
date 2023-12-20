import { formatDistanceToNowStrict, parseISO,format } from 'date-fns';
import ko from 'date-fns/locale/ko'; // 한국어를 위한 로케일

export const timeFormatter = (writeDate) => {

    const date = parseISO(writeDate);

    if (isNaN(date.getTime())) {
        return '유효하지 않은 날짜입니다.';
    }
    const now = new Date();
  
        // format 함수를 사용하여 날짜 형식을 'yyyy-MM-dd'로 변환
        return format(date, 'MM월 dd일');
}
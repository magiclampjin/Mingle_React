import style from './CalculationSelectBox.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

const CalculationSelectBox = ({ day, setDay }) => {

    const [isFocus, setFocus] = useState(false);

    // select 핸들
    const handleSelect = (e) => {
        // 함수형 업데이트로 업데이트된 select값 확인
        setDay(e.target.value);
    }

    // 일 배열
    const dayList = [];

    // 매달 1일부터 28일까지 배열에 삽입
    for (let i = 1; i <= 28; i++) {
        dayList.push(i);
    }

    // 배열 요소 map으로 출력
    return (
        <div className={style.selectBoxCover}>
            <select name="" id="" className={style.selectBox} onChange={handleSelect} onClick={()=>{setFocus(!isFocus);}} value={day}>
                {dayList.map((item) => {
                    return (
                        <option key={item} value={item}>
                            매달 {item} 일
                        </option>
                    )
                })}
            </select>
            <FontAwesomeIcon icon={isFocus?faChevronUp:faChevronDown} className={style.chevronIcon}/>
        </div>
       

    );
}

export default CalculationSelectBox;

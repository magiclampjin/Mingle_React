import style from './CalculationSelectBox.module.css';

const CalculationSelectBox = ({ day, setDay }) => {

    // select 핸들
    const handleSelect = (e) => {
        // 함수형 업데이트로 업데이트된 select값 확인
        setDay((prev) => {
            console.log("이전 select값 : " + prev);
            console.log("현재 select값 : " + e.target.value);
            return e.target.value;
        });
    }

    // 일 배열
    const dayList = [];

    // 매달 1일부터 28일까지 배열에 삽입
    for (let i = 1; i <= 28; i++) {
        dayList.push(i);
    }

    // 배열 요소 map으로 출력
    return (
        <select name="" id="" className={style.selectBox} onChange={handleSelect} value={day}>
            {dayList.map((item) => {
                return (
                    <option key={item} value={item}>
                        매달 {item} 일
                    </option>
                )
            })}
        </select>

    );
}

export default CalculationSelectBox;

import PurpleRoundBtn from '../../../components/PurpleRoundBtn/PurpleRoundBtn';
import style from '../Calculation/Calculation.module.css';
import { useState } from 'react';
// import MyCalendar from './../MyCalendar';


const SelectBox = ({day, setDay}) =>{

  // select 핸들
  const handleSelect = (e) =>{
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
  for(let i = 1; i <= 28 ; i++){
    dayList.push(i);
  }

  // 배열 요소 map으로 출력
  return(
    <select name="" id="" className={style.selectBox} onChange={handleSelect} value={day}>
      {dayList.map((item)=>{
        return(
          <option key={item} value={item}>
          매달 {item} 일
        </option>
        )
      })}
    </select>

  );
}

// 버튼 누르면 변경된 날짜 저장
const DayChangeHandler = ({day}) =>{
   console.log(day);
   alert("정산일의 변경이 완료되었습니다.");
}

const Calculation = () => {

    // 날짜 변경 State
    const [day, setDay] = useState("");

    return (
        <div className={style.calManage}>
          <div className={style.calManageBox}>
            <div className={style.calManageBox__title}>밍글 정산일 관리</div>

            <div className={style.calManage__line}></div>

            <div className={style.calManageBox__selectBox}>
              <div className={style.calManage__changeSelect}>
                <SelectBox day={day} setDay={setDay}/>
              </div>
              <div className={style.calManageBox__changeCom}>
                  <PurpleRoundBtn title={"변경완료"} activation={true} onClick={()=>{ DayChangeHandler({day})}}></PurpleRoundBtn>
              </div>
            </div>
            <p className={style.desc}>
              밍글 정산일은 파티가 진행/예약중인 경우 변경할 수 없어요.<br></br>
              신중하게 선택해 주세요.
            </p>
          </div>
          {/* <div className={style.calendarWrapper}>
            <MyCalendar />
          </div> */}
        </div>
      );
}

export default Calculation;
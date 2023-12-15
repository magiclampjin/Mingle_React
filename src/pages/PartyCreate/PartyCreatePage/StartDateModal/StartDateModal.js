import Modal from "react-modal";
import Calendar from 'react-calendar';
import moment from 'moment';
import { useEffect, useState } from "react";
import style from "./StartDateModal.module.css";
import 'react-calendar/dist/Calendar.css';
import './customCalendar.css'
// import axios from "axios";
// import LoadingSpinnerMini from "../../../../components/LoadingSpinnerMini/LoadingSpinnerMini";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTriangleExclamation, faCheck } from "@fortawesome/free-solid-svg-icons";



Modal.setAppElement("#root");

// 최소 날짜 (오늘)
const currentDateTime = new Date();
// 최대 날짜 (한달 후)
const Maginot = new Date();
Maginot.setMonth(currentDateTime.getMonth()+1);

const StartDateModal = ({ isOpen, onRequestClose, contentLabel, width, height, value, onChange, setPeriodStep}) => {
  // 최소 날짜 이전 달로 이동 불가능
  const [isPrev, setPrev] = useState(false);
  // 최대 날짜 이후 달로 이동 불가능
  const [isNext, setNext] = useState(currentDateTime.getMonth() === Maginot.getMonth()?false:true);
  const setMove = (date) => {
    if(date.getMonth() === currentDateTime.getMonth()) setPrev(false);
    else setPrev(true);
    if(date.getMonth() === Maginot.getMonth()) setNext(false);
    else setNext(true);
  }
  useEffect(()=>{
    setNext(currentDateTime.getMonth() === Maginot.getMonth()?false:true);
    setPrev(false);
  },[isOpen]);

  useEffect(()=>{
    onRequestClose(true);
    if(value!=null) setPeriodStep(2);
  },[value])


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)"
        },
        content: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            width: width+"px", // 모달의 가로 크기
            height : height+"px", // 모달의 세로 크기
            transform: 'translate(-50%, -50%)',
            borderRadius: '20px'
        },
      }}
    >
    <div className={style.title}>파티 시작일 선택</div>
    <div className={style.explain}>오늘로부터 한달 이내의 날짜만 선택 가능</div>
    <div className={style.calendar}>
        <Calendar 
          // 뷰 month로 고정 (CSS 에서도 조정함)
          view="month"
          onViewChange={(view)=>{
            if(view !== "month"){
              setTimeout(()=>{
                view="month";
              },0);
            }
          }}
          
          // "일" 제거
          formatDay={(locale,date)=>moment(date).format('DD')}
          
          // 선택 날짜 정보
          value = {value}
          onChange = {onChange}

          // 오늘부터 한달 사이 날짜만 선택 가능
          tileDisabled={({ date, view }) =>
            moment(date).format("YYYY-MM-DD") > moment(Maginot).format("YYYY-MM-DD") || moment(date).format("YYYY-MM-DD") < moment(currentDateTime).format("YYYY-MM-DD")
          }
          navigationLabel={null}

          // 이전, 다음 이동 가능 여부에 따라 설정
          prevLabel = {isPrev?"<":null}
          nextLabel = {isNext?">":null}

          // 연단위 이동 불가
          prev2Label = {null}
          next2Label = {null}

          // 이전 / 다음으로 이동 시 이벤트 리스너
          onActiveStartDateChange={({ activeStartDate }) =>
            setMove(activeStartDate)
          }

          // 날짜 선택
          //onClickDay={onChange}
        ></Calendar>
    </div>
    </Modal>
  );
};

export default StartDateModal;

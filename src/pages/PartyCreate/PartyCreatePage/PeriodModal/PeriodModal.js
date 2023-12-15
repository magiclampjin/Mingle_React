import Modal from "react-modal";
import { useEffect, useState } from "react";
import style from "./PeriodModal.module.css";
import PurpleRectangleBtn from "../../../../components/PurpleRectangleBtn/PurpleRectangleBtn";
import WhiteRectangleBtn from "../../../../components/WhiteRectangleBtn/WhiteRectangleBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";


Modal.setAppElement("#root");


const PeriodModal = ({ isOpen, onRequestClose, contentLabel, width, height, periodMonth, setPeriodMonth, setPeriodStep}) => {
    const [periodMonthTemp, setPeriodMonthTemp] = useState();

    useEffect(()=>{
        setPeriodMonthTemp(periodMonth?periodMonth:12);
    },[isOpen])

    const hendlePeriod = (e) => {
        setPeriodMonthTemp(e.target.value);
    }
    const handleReset = (e) => {
        setPeriodMonthTemp(12);
    }
    const handleApply = (e) => {
        setPeriodMonth(periodMonthTemp);
        onRequestClose(true);
        setPeriodStep(3);
    }

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
    <div className={style.title}>파티 기간 선택</div>
    <div className={style.explain}>최소 2개월 이상 등록해주세요.</div>
    <div className={style.content}>{periodMonthTemp ? periodMonthTemp+"개월":`개월 수를 선택해주세요.`}</div>
    <div className={style.range}>
        <input type="range" min="2" max="12" step="1" value={periodMonthTemp} list="monthList" onChange={hendlePeriod}></input>
        <datalist id="monthList">
            {[2,3,4,5,6,7,8,9,10,11,12].map((e,i)=>(<option key={i} value={e}>{e}</option>))}
        </datalist>
    </div>
    <div className={style.btns}>
        <WhiteRectangleBtn title={<FontAwesomeIcon icon={faRotateRight} />} onClick={handleReset} width={50} heightPadding={10}/>
        <PurpleRectangleBtn title="적용하기" activation={true} onClick={handleApply} width={340} heightPadding={10}/>
    </div>
    </Modal>
  );
};

export default PeriodModal;

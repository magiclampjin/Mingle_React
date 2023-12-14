import Modal from "react-modal";

import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinnerMini from "../../../../components/LoadingSpinnerMini/LoadingSpinnerMini";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation, faCheck } from "@fortawesome/free-solid-svg-icons";
import PurpleRectangleBtn from "../../../../components/PurpleRectangleBtn/PurpleRectangleBtn"
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const StartDateModal = ({ isOpen, onRequestClose, contentLabel, width, height}) => {
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
    {/* <div className={style.title}>파티 시작일 선택</div>
    <div className={style.explain}>30일 이내의 날짜만 선택 가능</div> */}
       
    </Modal>
  );
};

export default StartDateModal;

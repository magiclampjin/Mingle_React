import Modal from "react-modal";
import style from "./PartyWithdrawalModal.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinnerMini from "../../../../../components/LoadingSpinnerMini/LoadingSpinnerMini";

Modal.setAppElement("#root");

const PartyWithdrawalModal = ({isOpen, onRequestClose, width, height}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
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
            <div>
                파티 탈퇴
            </div>
        </Modal>
    );
}

export default PartyWithdrawalModal;
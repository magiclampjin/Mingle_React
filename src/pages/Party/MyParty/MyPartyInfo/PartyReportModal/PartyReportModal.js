import Modal from "react-modal";
import style from "./PartyReportModal.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinnerMini from "../../../../../components/LoadingSpinnerMini/LoadingSpinnerMini";

Modal.setAppElement("#root");

const reportReasons =[
    "파티 계정 신고",
    "파티 미납 신고",
    "파티 댓글 신고"
];

const MAX_REASON_LENGTH = 1000;


const PartyReportModal = ({isOpen, onRequestClose, width, height}) => {
    
    // 신고 사유
    const [selectedReason, setSelectedReason] = useState({0:false, 1:false, 2:false});
    // 상세 신고 사유
    const [reportReasonTxt, setReportReasonTxt] = useState("");

    // 신고 버튼 클릭
    const handleReport = (e) =>{
        if(selectedReason!=="" && reportReasonTxt!==""){
            alert("제출");
        }
    }

    useEffect(()=>{
        setSelectedReason({0:false, 1:false, 2:false});
        setReportReasonTxt("");
    },[isOpen]);

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
            <div className={style.modalBody}>
                <h2 className={style.modalTitle}>
                    파티 신고
                </h2>
                <div className={style.body}>
                    <div className={style.reportDisclaimer}>
                        파티 신고는 밍글 이용수칙에 맞지 않는 파티를 신고하는 기능입니다. 고객님의 정직한 신고가 건전하고 올바른 밍글 문화를 만듭니다. 허위 신고의 경우 신고자가 제재받을 수 있음을 유념해주세요.
                    </div>
                 
                    <div className={style.reportLine}>
                        <div className={style.reasonHeader}>신고 사유</div>
                        <div className={style.reportReasons}>
                        {reportReasons.map((reason, index) => (
                            <label key={`reason-${index}`} className={style.radioContainer}>
                                <input
                                    type="radio"
                                    name="reportReason"
                                    value={reason}
                                    checked={selectedReason[index]}
                                    onChange={(e) => { 
                                        setSelectedReason(prevState => {
                                            const newSelection = { ...prevState };
                                            reportReasons.forEach((e, i) => {
                                                newSelection[i] = false;
                                            });
                                            newSelection[index] = true;
                                            return newSelection;
                                        });
                                    }}
                                />
                                {reason}
                            </label>
                        ))}
                        </div>
                    </div>
                   <div className={style.reportLine}>
                        <div className={style.reasonHeader}>상세 신고 사유</div>
                        <textarea
                            className={style.textArea}
                            placeholder="신고 사유를 자유롭게 입력해주세요."
                            value={reportReasonTxt}
                            maxLength={MAX_REASON_LENGTH}
                            onChange={(e) => {
                                setReportReasonTxt(e.target.value);
                            }}
                        />
                    </div>
                    <div className={style.charCountLimit}>
                        신고 사유 입력 제한 : {reportReasonTxt.length}/{MAX_REASON_LENGTH}
                    </div>
                    <button className={style.reportButton} onClick={handleReport}>
                        신고하기
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default PartyReportModal;
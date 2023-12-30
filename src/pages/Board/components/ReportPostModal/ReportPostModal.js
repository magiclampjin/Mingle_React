import Modal from "react-modal";
import styles from "./ReportPostModal.module.css";
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import DOMPurify from "dompurify";
import { LoginContext } from "../../../../App";

Modal.setAppElement("#root");

const reportReasons = [
    "허위사실 게제",
    "허위조작 / 광고",
    "폭력적인 내용 / 욕설",
    "인종차별 / 성차별",
    "기타"
];

const ReportPostModal = ({ isOpen, onRequestClose, contentLabel, postId }) => {
    const { loginId } = useContext(LoginContext)

    const MAX_REASON_LENGTH = 1000;
    const [selectedReason, setSelectedReason] = useState("");
    const [customReason, setCustomReason] = useState(""); // 사용자 정의 신고 사유 상태

    // 상세 신고 사유 변경 핸들러
    const handleCustomReasonChange = (e) => {
        const input = e.target.value;
        if (input.length <= MAX_REASON_LENGTH) {
            setCustomReason(DOMPurify.sanitize(input)); // 입력값 새니타이징
        }
    };

    // 라디오 버튼 선택 상태 변화 감지
    useEffect(() => {
        if (selectedReason !== "기타") {
            setCustomReason(""); // '기타'가 아닐 경우 상세 사유 초기화
        }
    }, [selectedReason]);


    // 신고 버튼 클릭 핸들러
    const handleReport = () => {
        const sanitizedReason = DOMPurify.sanitize(customReason);

        if(!loginId){
            alert("로그인이 되어있어야만 신고가 가능합니다!");
            return;
        }

        if (!selectedReason && !sanitizedReason) {
            alert("신고 사유를 선택하거나 입력해주세요.");
            return;
        }

        const reason = selectedReason !== "기타" ? selectedReason : customReason;

        const thisTime = new Date();
        const formData = new FormData();
        formData.append("memberReporterId", loginId);
        formData.append("content", reason);
        formData.append("reportDate", thisTime.toISOString());
        formData.append("isProcess",false);
        axios.post(`/api/post/report/${postId}`, formData) // 신고 API 업데이트 필요
            .then(response => {
                alert("신고가 접수되었습니다.")
            })
            .catch(error => {
                alert("신고 과정 중 오류가 발생했습니다.")
                console.error(error);
            });
        onRequestClose(); // 신고 후 모달 닫기
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={contentLabel}
            className={styles.modalContent}
            overlayClassName={styles.modalOverlay}
        >
            <div className={styles.modalBody}>
                <h2 className={styles.modalTitle}>{contentLabel}</h2>
                <div className={styles.reportDisclaimer}>
                    게시글 신고는 밍글 이용수칙에 맞지 않는 게시글을 신고하는 기능입니다.
                    고객님의 정직한 신고가 건전하고 올바른 밍글 문화를 만듭니다.
                    허위 신고의 경우 신고자가 제재받을 수 있음을 유념해주세요.
                </div>

                <div className={styles.reasonHeader}>신고 사유</div>
                <div className={styles.reportReasons}>
                    {reportReasons.map((reason, index) => (
                        <div key={index} className={styles.radioContainer}>
                            <input
                                type="radio"
                                id={`reportReason${index}`}
                                name="reportReason"
                                value={reason}
                                checked={selectedReason === reason}
                                onChange={(e) => {
                                    setSelectedReason(e.target.value);
                                }}
                            />
                            <label htmlFor={`reportReason${index}`}>{reason}</label>
                        </div>
                    ))}
                </div>
                {selectedReason === "기타" && (
                    <div>
                        <div className={styles.reasonHeader}>상세 신고 사유</div>
                        <textarea
                            className={styles.textArea}
                            placeholder="신고 사유를 자유롭게 입력해주세요."
                            value={customReason}
                            onChange={handleCustomReasonChange}
                            maxLength={MAX_REASON_LENGTH} // 입력 최대 길이 설정
                        />
                        <div className={styles.charCountLimit}>
                            신고 사유 입력 제한 : {customReason.length}/{MAX_REASON_LENGTH}
                        </div>
                    </div>
                )}
                <div className={styles.buttonGroup}>
                    <button className={styles.reportButton} onClick={handleReport}>
                        신고하기
                    </button>
                    <button className={styles.cancelButton} onClick={onRequestClose}>
                        취소
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ReportPostModal;
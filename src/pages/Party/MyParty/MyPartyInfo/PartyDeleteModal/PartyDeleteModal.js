import Modal from "react-modal";
import style from "./PartyDeleteModal.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinnerMini from "../../../../../components/LoadingSpinnerMini/LoadingSpinnerMini";
import WhiteRectangleBtn from "../../../../../components/WhiteRectangleBtn/WhiteRectangleBtn";
import PurpleRectangleBtn from "../../../../../components/PurpleRectangleBtn/PurpleRectangleBtn";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const PartyDeleteModal = ({isOpen, onRequestClose, width, height, regId}) => {
    const navi = useNavigate();

    const handleCancel = () => {
        onRequestClose();
    }    
    const handleDeleteParty = () => {
        axios.delete(`/api/party/delete/${regId}`).then(resp=>{
           console.log(resp.data);
            if(resp.data===1){
                // 삭제 성공
                alert("파티가 삭제되었습니다.");
                onRequestClose();
                navi("/party/myParty");
            }else{
                alert("파티에 가입한 사용자가 있어 삭제가 불가능합니다.");
                onRequestClose();
            }
        }).catch(()=>{
            onRequestClose();
            alert("문제가 발생했습니다.");
        })
    }
 
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
                <div className={style.title}>파티 삭제하기</div>
                <div className={style.content}>파티를 삭제하시겠습니까? 파티원이 존재하는 경우 파티 삭제가 불가능합니다.</div>
                <div className={style.btns}>
                    <WhiteRectangleBtn title={"취소"} onClick={handleCancel}/>
                    <PurpleRectangleBtn title={"삭제"} activation={true} onClick={handleDeleteParty}/>
                </div>
            </div>
        </Modal>
    );
}

export default PartyDeleteModal;
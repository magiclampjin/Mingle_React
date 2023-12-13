import Modal from "react-modal";
import axios from "axios";
import style from "./ServiceInfoModal.module.css";
import { useEffect, useState } from "react";
import LoadingSpinnerMini from "../../../../components/LoadingSpinnerMini/LoadingSpinnerMini";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation, faCheck } from "@fortawesome/free-solid-svg-icons";
import PurpleRectangleBtn from "../../../../components/PurpleRectangleBtn/PurpleRectangleBtn"

Modal.setAppElement("#root");

const ServiceInfoModal = ({ isOpen, onRequestClose, contentLabel, selectService, width, height, setChked, isChked}) => {

    // 선택한 서비스 정보 불러오기 로딩
    const [isServiceLoading, setServiceLoading] = useState(false);
    // 선택한 서비스 정보
    const [service, setService] = useState({});
    
  
    // 요금 안내 확인용 chkBox 체크 여부
    const handleChange = (e) => {
        setChked(!isChked);
    };

    // 요금 안내 확인 후 파티 생성창으로 이동하는 버튼 클릭 (다음 버튼)
    const handleNext = (e) => {
        if(isChked){
            console.log("f");
        }
    }

    useEffect(()=>{
        if(isOpen){
            console.log(selectService);
            setServiceLoading(true);
            axios.get(`/api/party/getServiceById/${selectService}`).then(resp=>{
                console.log(resp.data);
                setServiceLoading(false);
                setService(resp.data)
            }).catch(()=>{
                setServiceLoading(false);
            })
        }
    },[isOpen, selectService]);

   // 숫자를 천 단위로 콤마 찍어주는 함수
   const formatNumber = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

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
        {
            isServiceLoading ?
            <LoadingSpinnerMini height={55} width={26}/>
            : service.name ? (
            <>
                <div className={style.title}>요금 안내</div>
                <div className={style.servicePriceInfo}>
                    <div className={style.servicePlanNotice}>
                       {service.name} {service.plan} 요금제만 공유할 수 있어요
                    </div>
                    <div className={style.serviceNotice}>
                        <div className={style.servicePlan}>
                            <FontAwesomeIcon icon={faCheck} size="1x"/>&nbsp;&nbsp; {service.name} {service.plan}
                        </div>
                   
                        <ul className={style.serviceNoticeUL}>
                            <li>파티원 1 ~ {service.maxPeopleCount-1}명 모집 가능</li>
                            <li>파티원 1명당 매달 {formatNumber(Math.ceil(service.price/service.maxPeopleCount)-service.commission)}원 적립!<br></br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(파티 분담금 {formatNumber(Math.ceil(service.price/service.maxPeopleCount))}원 - 밍글 수수료 {formatNumber(service.commission)}원)</li>
                            <li>최대 인원({service.maxPeopleCount-1}명) 모집하면, 매달 최대 {formatNumber(Math.ceil((service.price)/(service.maxPeopleCount))*(service.maxPeopleCount-1)-(service.commission)*(service.maxPeopleCount-1))}원 적립</li>
                        </ul>
                        <FontAwesomeIcon icon={faTriangleExclamation} size="xs"/>&nbsp;&nbsp;원단위 올림으로 10원 이내 차이가 있을 수 있어요.
                    </div>
                </div>
                <div className={style.chkBox}>
                    <input type="checkbox" id="chkBox" onChange={handleChange}></input><label htmlFor="chkBox">안내를 확인했어요.</label>
                </div>
                <PurpleRectangleBtn title="다음" activation={isChked} onClick={handleNext} width={405} heightPadding={10}/>
            </>):null         
        }

    </Modal>
  );
};

export default ServiceInfoModal;

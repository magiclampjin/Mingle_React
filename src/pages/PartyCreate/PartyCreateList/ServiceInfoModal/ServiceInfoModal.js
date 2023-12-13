import Modal from "react-modal";
import { useEffect, useState } from "react";
import LoadingSpinnerMini from "../../../../components/LoadingSpinnerMini/LoadingSpinnerMini";
import axios from "axios";

Modal.setAppElement("#root");

const ServiceInfoModal = ({ isOpen, onRequestClose, contentLabel, selectService, children }) => {

    const [isServiceLoading, setServiceLoading] = useState(false);
    const [service, setService] = useState({});
    useEffect(()=>{
        console.log(selectService);
        setServiceLoading(true);
        axios.get(`/api/party/getServiceById/${selectService}`).then(resp=>{
            console.log(resp.data);
            setServiceLoading(false);
            setService(resp.data)
        }).catch(()=>{
            setServiceLoading(false);
        })
    },[selectService]);

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
          backgroundColor: "rgba(0, 0, 0, 0.0)",
        },
        content: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            width: "30%", // 모달의 가로 크기
            height : "50%", // 모달의 세로 크기
            transform: 'translate(-50%, -50%)',
            borderRadius: '20px'
        },
      }}
    >
        {
            isServiceLoading?
            <LoadingSpinnerMini height={43} width={27}/>:
            <>
                {/* {children} */}
                <div>
                  <b>요금 안내</b>
                </div>
                <div>
                    <div>
                        결제할 요금제: {service.name} 프리미엄
                    </div>
                    <div>
                        - 파티원 1 ~ {service.maxPeopleCount-1}명 모집 가능 <br></br>
                        - 파티원 1명당 매달 {formatNumber(Math.ceil(service.price/service.maxPeopleCount)-service.commission)}원 적립!<br></br>
                        (파티 분담금 {formatNumber(Math.ceil(service.price/service.maxPeopleCount))}원 - 밍글 수수료 {formatNumber(service.commission)}원)
                        <br></br>
                        - 최대 인원({service.maxPeopleCount-1}명) 모집하면, 매달 최대 {formatNumber(Math.ceil((service.price)/(service.maxPeopleCount))*(service.maxPeopleCount-1)-(service.commission)*(service.maxPeopleCount-1))}원 적립
                        <br></br>
                        - 원단위 올림으로 10원 이내 차이가 있을 수 있어요.
                    </div>
                </div>
            </>
        }
      
        
      
      
    </Modal>
  );
};

export default ServiceInfoModal;

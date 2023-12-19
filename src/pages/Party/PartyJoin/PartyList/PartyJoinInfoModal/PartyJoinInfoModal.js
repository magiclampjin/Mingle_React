import Modal from "react-modal";
import style from "./PartyJoinInfoModal.module.css";

Modal.setAppElement("#root");

// 숫자를 천 단위로 콤마 찍어주는 함수
const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 시작일까지 남은 날짜 계산하는 함수
const getStartDate = (value) => {
    let now = new Date();
    now.setHours(0,0,0,0);
    now.setHours(now.getHours()+9);
    const diff = (new Date(value).getTime() - now.getTime())/(1000*60*60*24);
    if(diff === 0){
        return (
            <>
                <span className={style.colorMainPurple}>오늘부터</span>
            </>
        );
    }else if(diff < 0){
        return (
            <>
                <span className={style.colorMainPurple}></span>
            </>
        );
    }else{
        return (
            <>
                <span className={style.colorMainPurple}>{diff}일 뒤 부터</span>
            </>
        );
    }
}

// 종료일 계산하는 함수
const getEndDate = (date, period) => {
    let endDate = new Date(date);
    endDate.setMonth(endDate.getMonth()+period);
    return endDate.toISOString().slice(0,10);
}


const PartyJoinInfoModal = ({isOpen, onRequestClose, contentLabel, width, height, service, selectParty}) => {
    console.log(service);
    console.log(selectParty);
   
    return(
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
        {selectParty?
            <div className={style.body}>
                <div className={style.title}>
                    파티 가입하고 {getStartDate(selectParty.startDate)}<br></br> 
                    {service.name} {service.plan}을 이용해 보세요.
                </div>
            </div>
            :<></>
        }
         
        </Modal>
    );
};

export default PartyJoinInfoModal;
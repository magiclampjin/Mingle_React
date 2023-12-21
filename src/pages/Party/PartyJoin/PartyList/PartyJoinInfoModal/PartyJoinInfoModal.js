import Modal from "react-modal";
import style from "./PartyJoinInfoModal.module.css";
import WhiteRectangleBtn from "../../../../../components/WhiteRectangleBtn/WhiteRectangleBtn";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { useContext } from "react";
import { JoinPartyContext } from "../../PartyJoinMain";

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
    if(diff <= 0){
        return (
            <>
                <span className={style.colorMainPurple}>오늘</span>
            </>
        );
    }else{
        return (
            <>
                <span className={style.colorMainPurple}>{diff}일 뒤 </span>
            </>
        );
    }
}

// 시작일이 경과했는 지 판단
const getStartDateOver = (value) => {
    let now = new Date();
    now.setHours(0,0,0,0);
    now.setHours(now.getHours()+9);
    const diff = (new Date(value).getTime() - now.getTime())/(1000*60*60*24);
    if(diff <= 0){
        return (
            <>
                오늘
            </>
        );
    }else{
        return (
            new Date(value).toISOString().slice(0,10)
        );
    }
}

// 종료일 계산하는 함수
const getEndDate = (date, period) => {
    let endDate = new Date(date);
    endDate.setMonth(endDate.getMonth()+period);
    return endDate.toISOString().slice(0,10);
}


const PartyJoinInfoModal = ({isOpen, onRequestClose, contentLabel, width, height}) => {
    const navi = useNavigate();
    const { selectParty, service } = useContext(JoinPartyContext);

    // 파티 가입 버튼 클릭
    const handleJoin = () => {
        //로그인 여부 판별
        axios.get("/api/member/isAuthenticated").then(resp=>{
            if(resp.data){
                // 로그인된 유저일 경우 파티 가입 창으로 이동
                navi("/party/partyJoin/partyAttend");
            }else{
                // 로그인하지않은 유저일 경우 로그인창으로 이동 혹은 현재 페이지 유지
                if(window.confirm("로그인 후 이용 가능한 서비스입니다.\n로그인 화면으로 이동하시겠습니까?")){
                    navi("/member/login");
                }
            }
        })
    }

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
                    파티 가입하고 {getStartDate(selectParty.startDate)}부터<br></br> 
                    {service.name} {service.plan}을 이용해 보세요.
                </div>
                <div className={style.serviceName}>
                    <div className={`${style.leftContent} ${style.colorGray}`}>이용 서비스</div>
                    <div className={`${style.rightContent}`}>{service.name} {service.plan}</div>
                </div>
                <div className={style.servicePeriod}>
                    <div className={`${style.leftContent} ${style.colorGray}`}>파티 기간</div>
                    <div className={`${style.rightContent}`}>{getStartDateOver(selectParty.startDate)} ~ {getEndDate(selectParty.startDate, selectParty.monthCount)} </div>
                </div>

                <div className={style.partyPrice}>
                    <div className={style.subTitle}>파티 요금</div>
                    <div className={style.contentCover}>
                        <div className={style.leftContent}>파티 분담금 <span className={style.colorGray}>(월)</span></div>
                        <div className={style.rightContent}>{formatNumber(Math.ceil((service.price)/(service.maxPeopleCount)))}원</div>
                    </div>
                    <div className={style.contentCover}>
                        <div className={style.leftContent}>밍글 수수료 <span className={style.colorGray}>(월, VAT 포함)</span></div>
                        <div className={style.rightContent}>{formatNumber(1000)}원</div>
                    </div>

                    <div className={style.subTitle}>파티 보증금 <span className={style.colorGray}>(최초 1회, 파티 종료 시 100% 환급)</span></div>
                    <div className={style.contentCover}>
                        <div className={style.leftContent}>보증금 <span className={style.colorGray}>((수수료 * 파티기간) + 한 달 분담금)</span></div>
                        <div className={style.rightContent}>{formatNumber(Math.ceil((service.price)/(service.maxPeopleCount))+service.commission*selectParty.monthCount)}원</div>
                    </div>
                </div>

                <div className={style.joinBtn}>
                    <WhiteRectangleBtn title={"파티 가입"} onClick={handleJoin} width={100} activation={true} heightPadding={10}/>
                </div>
            </div>
            :<></>
        }
         
        </Modal>
    );
};

export default PartyJoinInfoModal;
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { myPartyContext } from "../MyPartyMain";
import axios from "axios";
import style from "./MyPartyInfo.module.css";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";

const MyPartyInfo = () =>{
    const {selectParty} = useContext(myPartyContext);
    const [partyInfo, setPartyInfo] = useState();
    const navi = useNavigate();
    const [isLoading, setLoading] = useState(false);

    // 시작일 경과 여부
    const isStart = (value) => {
        let now = new Date();
        now.setHours(0,0,0,0);
        const diff = (new Date(value).getTime() - now.getTime())/(1000*60*60*24);
        if(diff <= 0){
            return 1;
        }else{
            return 0;
        }
    }

    // 종료일 계산하는 함수
    const getEndDate = (date, period) => {
        let endDate = new Date(date);
        endDate.setMonth(endDate.getMonth()+period);
        return endDate.toISOString().slice(0,10);
    }

     // 숫자를 천 단위로 콤마 찍어주는 함수
     const formatNumber = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    // 파티 탈퇴하기
    const handleSecession = () => {
        // 파티장일 경우
        // 1. 파티원이 없는 경우 -> 정상 해산 
        // 2. 파티원이 있는 경우 -> 위약금
        // 파티원일 경우
        // 1. 위약금
    }


    useEffect(()=>{
        setLoading(true);
        axios.get(`/api/party/getPartyInfo/${selectParty}`).then(resp=>{
            console.log(resp.data);
            setPartyInfo(resp.data);
            setLoading(false);
        }).catch(()=>{
            alert("정보를 불러오지 못 했습니다.\n같은 문제가 반복되면 관리자에게 문의하세요.");
            navi(-1);
        })
    },[selectParty]);

    if(isLoading){
        return <LoadingSpinner/>;
    }
    
    return(
        <>
            {
                partyInfo?(   
                <>
                    <div className={style.guide}>
                        <div className={style.header}>
                            <img src={`/assets/serviceLogo/${partyInfo.englishName}.png`} alt={`${partyInfo.name} 로고 이미지`} className={`${style.logoImg} ${style.VAlign}`}></img>
                            <div className={style.name}>{partyInfo.name} {partyInfo.plan}</div>
                            <div className={`${style.tags} ${style.centerAlign}`}>
                                <div className={style.tag}>{isStart(partyInfo.startDate)===1?"진행":"예정"}</div>
                                {partyInfo.partyManager?<div className={style.tag}>방장</div>:null}
                            </div>
                        </div>
                        <div className={style.body}>
                            <div className={style.left}>
                                <div className={style.leftInfo}>
                                    <div className={style.subTitle}>파티 정보</div>
                                    <div className={style.grayTitle}>파티 기간</div>
                                    <div className={style.subContent}>{partyInfo.startDate.slice(0,10)} <span className={style.br}>~</span> {getEndDate(partyInfo.startDate, partyInfo.monthCount)}</div>
                                    <div className={style.grayTitle}>정산일</div>
                                    <div className={style.subContent}>매달 {partyInfo.calculationDate}일</div>
                                    <div className={style.grayTitle}>정산 금액</div>
                                    <div className={style.subContent}>매달 {formatNumber(Math.ceil((partyInfo.price)/(partyInfo.maxPeopleCount))+1000)}원</div>
                                </div>
                                <div className={style.leftInfo}>
                                    <div className={style.subTitle}>계정 정보</div>
                                    <div className={style.grayTitle}>아이디</div>
                                    <div className={style.subContent}>{isStart(partyInfo.startDate)===1?partyInfo.loginId:"파티가 시작되면 공개됩니다."}</div>
                                    <div className={style.grayTitle}>비밀번호</div>
                                    <div className={style.subContent}>{isStart(partyInfo.startDate)===1?partyInfo.loginPw:"파티가 시작되면 공개됩니다."}</div>
                                </div>
                                <div className={style.leftInfo}>
                                    <div className={style.subTitle}>파티 탈퇴</div>
                                    <div className={`${style.grayTitle} ${style.secession}`} onClick={handleSecession}>탈퇴하기</div>
                                </div>
                            </div>
                            <div className={style.right}>
                                <div className={style.partyInfo}>
                                    <div className={style.infoContent}>
                                        <div className={style.infoTitle}></div>
                                        <div className={style.infoSubContent}></div>
                                    </div>
                                    <div className={style.infoContent}>
                                        <div className={style.infoTitle}></div>
                                        <div className={style.infoSubContent}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>):null
            }
        </>
    )
};

export default MyPartyInfo;
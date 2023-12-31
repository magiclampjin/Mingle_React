import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { myPartyContext } from "../MyPartyMain";
import axios from "axios";
import style from "./MyPartyInfo.module.css";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import PartyWithdrawalModal from "./PartyWithdrawalModal/PartyWithdrawalModal";
import { LoginContext } from "../../../../App";
import PartyReportModal from "./PartyReportModal/PartyReportModal";
import PartyDeleteModal from "./PartyDeleteModal/PartyDeleteModal";
import PartyReply from "./PartyReply/PartyReply";

const MyPartyInfo = () =>{
    const {selectParty} = useContext(myPartyContext);
    const [partyInfo, setPartyInfo] = useState();
    const navi = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const {loginStatus ,loginId } = useContext(LoginContext);
    // 파티장 여부
    const [isManager, setManager] = useState(false);
    // 파티 구성원 정보
    const [partyMember, setPartyMember] = useState([]);
    
    // 로그인 여부
    useEffect(()=>{
        if(loginStatus!=="confirm")
            setLoading(true);
        else{
            if(loginId===""){
                navi("/denied");
            }
            setLoading(false);
        }
    },[loginId, loginStatus]);


    // 시작일 경과 여부
    const isStart = (value, monthCount) => {
        let now = new Date();
        now.setHours(0,0,0,0);
        const diff = (new Date(value).getTime() - now.getTime())/(1000*60*60*24);

        // 종료일
        let end = new Date(value);
        end.setMonth(end.getMonth()+monthCount);
        // 종료일까지 남은 일자
        const diffEnd = (now.getTime() - end.getTime())/(1000*60*60*24);

        if(diffEnd>=0){
            return -1;
        }else{
            if(diff <= 0){
                return 1;
            }else{
                return 0;
            }
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
    const handleWithdrawal = () => {
        // 파티장일 경우
        // 1. 파티원이 없는 경우 -> 정상 해산 
        // 2. 파티원이 있는 경우 -> 위약금
        // 파티원일 경우
        // 1. 위약금

        setModalIsOpen(true);
    }

    // 파티 탈퇴 모달창 열림 / 닫힘 여부 state
    const [modalIsOpen, setModalIsOpen] = useState(false);
    // 파티 탈퇴 모달창 닫기
    const closeModal = () => {
        setModalIsOpen(false);
    }

    // 파티 신고하기
    const handleReport = () => {
        // 파티장일 경우
        // 1. 파티원 신고 (미납 문제, 파티 댓글)
        // 파티원일 경우
        // 1. 파티장 신고 (서비스 계정관련 문제, 파티 댓글)

        setReportModalIsOpen(true);
    }

    // 파티 탈퇴 모달창 열림 / 닫힘 여부 state
    const [reportModalIsOpen, setReportModalIsOpen] = useState(false);
    // 파티 탈퇴 모달창 닫기
    const closeReportModal = () => {
        setReportModalIsOpen(false);
    }

    // 파티 삭제
    const handleDeleteParty = () => {
        setDeleteModalIsOpen(true);
    }
    // 파티 삭제 모달창 열림 / 닫힘 여부 state
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    // 파티 삭제 모달창 닫기
    const closeDeleteModal = () => {
        setDeleteModalIsOpen(false);
    }

    useEffect(()=>{
        setLoading(true);
        if(selectParty === undefined){
            setLoading(false);
            navi("/party/myParty");
            return;
        }
        axios.get(`/api/party/getPartyInfo/${selectParty}`).then(resp=>{
            setPartyInfo(resp.data);
            setManager(resp.data.partyManager);
            setPartyMember(resp.data.memberNicknames.split(","));
            console.log(resp.data);
            setLoading(false);
        }).catch(()=>{
            alert("정보를 불러오지 못 했습니다.\n같은 문제가 반복되면 관리자에게 문의하세요.");
            navi("/");
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
                                <div className={style.tag}>{isStart(partyInfo.startDate, partyInfo.monthCount)===1?"진행":isStart(partyInfo.startDate, partyInfo.monthCount)===0?"예정":"종료"}</div>
                                {partyInfo.partyManager?<div className={style.tag}>방장</div>:null}
                            </div>
                        </div>
                        <div className={style.body}>
                            <div className={style.left}>
                                <div className={style.leftInfo}>
                                    <div className={style.subTitle}>파티 정보</div>
                                    <div className={style.grayTitle}>파티 기간</div>
                                    <div className={style.subContent}>{partyInfo.startDate.slice(0,10)} <span className={style.br}>~</span> {getEndDate(partyInfo.startDate, partyInfo.monthCount)}</div>
                                    {isStart(partyInfo.startDate, partyInfo.monthCount)===-1?null:
                                    <>
                                        <div className={style.grayTitle}>정산일</div>
                                        <div className={style.subContent}>매달 {partyInfo.calculationDate}일</div>
                                    </>}

                                    {/* 파티 종료 */}
                                    {isStart(partyInfo.startDate, partyInfo.monthCount)===-1?null:
                                    isManager?
                                    <>
                                        <div className={style.grayTitle}>적립<span className={style.br}></span> 예정 금액</div>
                                        <div className={style.subContent}>매달 {formatNumber((Math.ceil((partyInfo.price)/(partyInfo.maxPeopleCount))-partyInfo.commission)*partyInfo.memberCnt)}원</div>
                                    </>
                                    :
                                    <>
                                        <div className={style.grayTitle}>정산<span className={style.br}></span> 예정 금액</div>
                                        <div className={style.subContent}>매달 {formatNumber(Math.ceil((partyInfo.price)/(partyInfo.maxPeopleCount))+1000)}원</div>
                                    </>
                                    }  
                                </div>
                                <div className={style.leftInfo}>
                                    <div className={style.subTitle}>계정 정보</div>
                                    <div className={style.grayTitle}>아이디</div>
                                    <div className={style.subContent}>{isStart(partyInfo.startDate, partyInfo.monthCount)===1?partyInfo.loginId:isStart(partyInfo.startDate, partyInfo.monthCount)===0?"파티가 시작되면 공개됩니다.":"파티가 종료되었습니다."}</div>
                                    <div className={style.grayTitle}>비밀번호</div>
                                    <div className={style.subContent}>{isStart(partyInfo.startDate, partyInfo.monthCount)===1?partyInfo.loginPw:isStart(partyInfo.startDate, partyInfo.monthCount)===0?"파티가 시작되면 공개됩니다.":"파티가 종료되었습니다."}</div>
                                </div>
                                <div className={style.leftInfo}>
                                    <div className={style.subTitle}>기타 메뉴</div>
                                    {/* <div className={`${style.grayTitle} ${style.withdrawal}`} onClick={handleWithdrawal}>파티 탈퇴하기</div> */}
                                    {
                                        partyMember.length>1?
                                        <>
                                            <div className={`${style.grayTitle} ${style.withdrawal}`} onClick={handleReport}>파티 신고하기</div>
                                            <PartyReportModal
                                                isOpen={reportModalIsOpen}
                                                onRequestClose={closeReportModal}
                                                width={500}
                                                height={690}
                                                regId={partyInfo.partyRegistrationId}
                                                partyMember={partyMember}
                                            />
                                        </>
                                        :null
                                    }
                                    {isManager && partyInfo.memberCnt===0 && isStart(partyInfo.startDate, partyInfo.monthCount)!==-1?
                                    <>
                                        <div className={`${style.grayTitle} ${style.withdrawal}`} onClick={handleDeleteParty}>파티 삭제하기</div>
                                        <PartyDeleteModal
                                            isOpen={deleteModalIsOpen}
                                            onRequestClose={closeDeleteModal}
                                            width={300}
                                            height={210}
                                            regId={partyInfo.partyRegistrationId}
                                        />
                                    </>:null}
                                </div>
                                <PartyWithdrawalModal
                                    isOpen={modalIsOpen}
                                    onRequestClose={closeModal}
                                    width={500}
                                    height={270}
                                />
                            </div>
                            <div className={style.right}>
                                <div className={style.partyMemberInfo}>
                                    <div className={style.infoContent}>
                                        <div className={style.infoTitle}>파티 구성원</div>
                                        <div className={style.infoMemberContent}>
                                            {
                                                partyMember.length>0?
                                                partyMember.map((e,i)=>
                                                (
                                                    <div className={style.memberContent} key={`member-${1}`}>
                                                        <div className={style.memberRole}>
                                                            {e===partyInfo.managerNickname?<b>파티장</b>:<>파티원</>}
                                                        </div>
                                                        <div className={style.memberProfile}>
                                                            <img className={style.memberProfileImg} src="/assets/basicProfile.png" alt="프로필 이미지"></img>
                                                        </div>
                                                        <div className={style.memberNickName}>
                                                            {e}
                                                        </div>
                                                    </div>
                                                )):null
                                            }
                                           
                                        </div>
                                    </div>
                                </div>
                                <div className={style.partyInfo}>
                                    <div className={style.infoContent}>
                                        <div className={style.infoTitle}>파티댓글</div>
                                        <div className={style.infoSubContent}>
                                            <PartyReply partyRegistrationId={partyInfo.partyRegistrationId}/>
                                        </div>
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
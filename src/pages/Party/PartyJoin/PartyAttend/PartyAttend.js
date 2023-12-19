import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./PartyAttend.module.css";
import { faCircleArrowLeft, faQuestion, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import WhiteRectangleBtn from "../../../../components/WhiteRectangleBtn/WhiteRectangleBtn";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountModal from "../../PartyCreate/PartyCreatePage/AccountModal/AccountModal";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";

const PartyAttend = () => {
    // 이전으로 돌아가기
    const navi = useNavigate();
    const handleBack = () => {
        navi(-1);
    }

    const location = useLocation();
    const selectParty = location.state.selectParty;
    const service = location.state.service;

    // 파티 가입 가능 여부
    const [isPossible, setPossible] = useState({isAccount:false, isAgree:false});

    // 필수 동의 여부
    const [agree,setAgree] = useState({1:false,2:false,3:false,4:false,5:false});

    // 동의 여부 state에 반영
    const handleAgree = (e) => {
        const {name, checked} = e.target;
        setAgree(prev=>({...prev,[name]:checked}));

        let arr =  Object.values(agree);
        arr[name-1]=checked;

        const result = Object.values(arr).every(item=>item);
        setPossible(prev=>({...prev,isAgree:result}));
    }
    
    // 첫달 요금 안내 popup hover
    const [isHovering, setHovering] = useState(false);

    // 매달 내야하는 요금
    const [monthFee, setMonthFee] = useState(Math.ceil((service.price)/(service.maxPeopleCount))+1000);
    // 첫달 파티 요금
    const [firstMonthFee, setFirstMonthFee] = useState(0);
    // 다음 정산일 까지의 날짜
    const [calDate, setCalDate] = useState();
    // 파티 보증금
    const [deposit, setDeposit] = useState(0);
    // 합계
    const [amount, setAmount] = useState(0);
    // 최종 결제 금액
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(()=>{
        // 파티 보증금
        setDeposit(Math.ceil((service.price)/(service.maxPeopleCount))+service.commission*selectParty.monthCount);

        // 다음 정산일까지 남은 날짜 계산해서 하루 가격에 곱해줌 ( 첫 달 결제 금액 )
        let now = new Date();
        now.setHours(0,0,0,0);
        now.setHours(now.getHours()+9);
        let nextCal = new Date(now);
        nextCal.setDate(selectParty.calculationDate);
        if(nextCal.getDate()<=now.getDate()){
            nextCal.setMonth(nextCal.getMonth()+1);
        }
        const diff = (new Date(nextCal).getTime() - new Date(now).getTime())/(1000*60*60*24);
        setCalDate(diff);
        if(nextCal.getDate()===now.getDate()){        
            setFirstMonthFee(Math.ceil((service.price)/(service.maxPeopleCount))+1000);
            setAmount(Math.ceil((service.price)/(service.maxPeopleCount))+service.commission*selectParty.monthCount + Math.ceil((service.price)/(service.maxPeopleCount))+1000);
        }else{
            const pricePerDay = Math.ceil((((service.price)/(service.maxPeopleCount))+1000)/31);
            setFirstMonthFee(diff*pricePerDay);
            setAmount(Math.ceil((service.price)/(service.maxPeopleCount))+service.commission*selectParty.monthCount + diff*pricePerDay)
        }
    },[monthFee]);

    // 숫자를 천 단위로 콤마 찍어주는 함수
    const formatNumber = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    // 시작일이 경과했는 지 판단
    const getStartDateOver = (value) => {
        let now = new Date();
        now.setHours(0,0,0,0);
        now.setHours(now.getHours()+9);
        const diff = (new Date(value).getTime() - now.getTime())/(1000*60*60*24);
        if(diff === 0){
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

    // 파티 가입하는 함수
    const handleJoinParty = () => {
        if(isPossible.isAccount&&isPossible.isAgree){
            alert("가입 ㄱ");
        }
    }


    // 결제 수단 ---------------------
    // 결제 계좌 정보
    const [account, setAccount] = useState();
    
    // 로딩
    const [isLoading, setLoading] = useState(false);

    // 계좌 등록 모달창 열림 / 닫힘
    const [accountModalIsOpen, setAccountModalIsOpen] = useState(false);

    // 계좌 등록 모달창 열기
    const openAccountModal = (e) => {
        const partyContentElement = e.currentTarget;
        const clickedElement = e.target; 
        
        if (clickedElement === partyContentElement || partyContentElement.contains(clickedElement)) {
            // partyContent 또는 그 자식 요소를 클릭한 경우에만 처리
            setAccountModalIsOpen(true);
        }
    };

    // 계좌 등록 모달창 닫기
    const closeAccountModal = () => {
        setAccountModalIsOpen(false);
    };

    // 등록된 계좌 정보 있는 지 확인
    useEffect(()=>{
        if(!accountModalIsOpen){
            setLoading(true);
            axios.get("/api/paymentAccount/accountSelect").then(resp=>{
                setAccount(resp.data);
                if(resp.data !== ""){
                    setPossible(prev=>({...prev,isAccount:true}));
                }
                setLoading(false);
            }).catch(()=>{
                setLoading(false);
            });
        }
    },[accountModalIsOpen]);

    if(isLoading){
        return <LoadingSpinner/>;
    }

    return(
        <div className={style.body}>
            <div className={`${style.VAlign} ${style.mb50}`}>
                <FontAwesomeIcon icon={faCircleArrowLeft} onClick={handleBack} className={style.backIcon}/> 
                <div className={style.bigTitle}>파티 가입하기</div>
            </div>

            <div className={style.allContent}>
                <div className={style.leftAllContent}>
                    <div className={`${style.contentBox}`}>
                        <div className={style.subTitle}>파티 정보</div>
                        <div className={style.contents}>
                            <div className={style.content}>
                                <div className={style.leftContent}>이용 서비스</div>
                                <div className={style.rightContent}>{service.name} {service.plan}</div>
                            </div>
                            <div className={style.content}>
                                <div className={style.leftContent}>정산 일자</div>
                                <div className={style.rightContent}>매월 {selectParty.calculationDate}일</div>
                            </div>
                            <div className={style.content}>
                                <div className={style.leftContent}>파티 기간</div>
                                <div className={style.rightContent}>{getStartDateOver(selectParty.startDate)} ~ {getEndDate(selectParty.startDate, selectParty.monthCount)}</div>
                            </div>
                            <div className={style.content}>
                                <div className={style.leftContent}>파티 요금 (월, VAT 포함)</div>
                                <div className={style.rightContent}>{formatNumber(Math.ceil((service.price)/(service.maxPeopleCount))+1000)}원</div>
                            </div>
                        </div>
                    </div>
                    <div className={`${style.contentBox}`}>
                        <div className={style.subTitle}>결제수단</div>
                        <div className={style.contents}>
                            <div className={style.content}>
                                {
                                account?
                                    <div className={style.accountBox}>
                                        <div className={style.bank}>{account.bankId}</div>
                                        <div className={style.accountNumber}>{account.accountNumber}</div>
                                        <div className={style.accountChkIcon}><FontAwesomeIcon icon={faCheck} /></div>
                                    </div>
                                    :
                                    <>  
                                        <div className={style.accountBtn}>
                                            <WhiteRectangleBtn title="+ 결제 계좌 등록하기" onClick={openAccountModal} width={300} heightPadding={5}/>
                                        </div>
                                        <AccountModal
                                            isOpen={accountModalIsOpen}
                                            onRequestClose={closeAccountModal}
                                            width={500}
                                            height={270}
                                            setAllComplete = {setPossible}
                                        >
                                        </AccountModal>          
                                    </>    
                                }
                            </div>
                            <div className={style.content}>
                                <div className={style.leftContent}>밍글 머니 우선 사용 (0원 보유)</div>
                                <div className={style.rightContent}>켜짐</div>
                            </div>
                        </div>
                    </div>
                    <div className={`${style.contentBox}`}>
                        <div className={style.subTitle}>파티 가입 필수 동의</div>
                        <div className={style.contents}>
                            <div className={style.agreeContent}>
                                <div className={style.chkBox}><input type="checkbox" id="chk1" name="1" onChange={handleAgree}></input></div>
                                <label htmlFor="chk1"><div className={style.leftContent}>파티 시작일({selectParty.startDate.slice(0,10)})에 {formatNumber(totalPrice)}원이 등록된 계좌를 통해 결제되는 것을 동의합니다.</div></label>                       
                            </div>
                            <div className={style.agreeContent}>
                                <div className={style.chkBox}><input type="checkbox" id="chk2" name="2" onChange={handleAgree}></input></div>
                                <label htmlFor="chk2"><div className={style.leftContent}>파티 가입 시 지불하는 파티 보증금 {formatNumber(deposit)}원은 파티가 끝나면 100% 환급되며, 파티 중도 탈퇴 시 환급되지 않는 것을 동의합니다.</div></label>                       
                            </div>
                            <div className={style.agreeContent}>
                                <div className={style.chkBox}><input type="checkbox" id="chk3" name="3" onChange={handleAgree}></input></div>
                                <label htmlFor="chk3"><div className={style.leftContent}>다음 정산일({selectParty.calculationDate}일) 부터는 밍글 수수료가 포함된 {formatNumber(monthFee)}원의 파티 요금이 결제되는 것을 동의합니다.</div></label>                       
                            </div>
                            <div className={style.agreeContent}>
                                <div className={style.chkBox}><input type="checkbox" id="chk4" name="4" onChange={handleAgree}></input></div>
                                <label htmlFor="chk4"><div className={style.leftContent}>{service.name} 이용 시 프로필 닉네임을 밍글 닉네임으로 설정해야 합니다.</div></label>                       
                            </div>
                            <div className={style.agreeContent}>
                                <div className={style.chkBox}><input type="checkbox" id="chk5" name="5" onChange={handleAgree}></input></div>
                                <label htmlFor="chk5"><div className={style.leftContent}>파티 가입 조건 및 서비스 이용약관을 확인했으며, 이에 동의합니다.</div></label>                       
                            </div>               
                        </div>
                    </div>
                </div>
                <div className={style.rightAllContent}>
                    <div className={`${style.partyAmount} ${style.contentBox}`}>
                        <div className={style.subTitle}>첫 달 결제 금액</div>
                        <div className={style.contents}>
                            <div className={style.content}>
                                <div className={`${style.leftContent} ${style.centerAlign}`}>파티 요금(첫 달)<FontAwesomeIcon onMouseOver={()=>{setHovering(true)}} onMouseOut={()=>{setHovering(false)}} icon={faQuestion} className={`${style.questionIcon} ${style.centerAlign}`}/></div>
                                <div className={style.rightContent}>{formatNumber(firstMonthFee)}원</div>
                            </div>
                            {
                                isHovering?
                                <div className={style.infoPop}>
                                    <div className={style.miniTitle}>첫 달 파티 요금이란?</div>
                                    <div className={style.miniContent}>파티 시작일로부터 다음 정산일까지의 파티요금이며, 밍글 이용 수수료가 포함되어 있습니다. 첫 달 파티 요금은 파티 시작일에 결제됩니다.</div>
                                    <hr></hr>
                                    <div className={style.miniContent}> ( 다음 파티 정산일까지 {calDate}일 ) * <br></br> ( 일 파티 요금 약 {formatNumber(Math.ceil((((service.price)/(service.maxPeopleCount))+1000)/31))}원 ) = {formatNumber(firstMonthFee)}원</div>
                                </div>:null
                            }
                            <div className={style.content}>
                                <div className={style.leftContent}>파티 보증금(100% 환급)</div>
                                <div className={style.rightContent}>{formatNumber(deposit)}원</div>
                            </div>
                            <hr className={style.hrLine}></hr>
                            <div className={style.content}>
                                <div className={style.leftContent}>합계</div>
                                <div className={style.rightContent}>{formatNumber(amount)}원</div>
                            </div>
                            <div className={style.content}>
                                <div className={style.leftContent}>밍글 머니 결제</div>
                                <div className={style.rightContent}>- 0원</div>
                            </div>
                            <hr className={style.hrLine}></hr>
                            <div className={style.content}>
                                <div className={style.leftContent}>최종 결제 금액</div>
                                <div className={style.rightContent}>
                                    {formatNumber(totalPrice)}원
                                </div>
                            </div>
                        </div>

                        <div className={style.grayBox}>
                            <div className={style.content}>
                                <div className={style.leftContent}>파티 종료 시 환급될 밍글 머니</div>
                                <div className={style.rightContent}>+ {formatNumber(Math.ceil((service.price)/(service.maxPeopleCount))+service.commission*selectParty.monthCount)}원</div>
                            </div>
                        </div>
                    </div>
                    <div className={isPossible.isAccount&&isPossible.isAgree?`${style.joinBtn}`:`${style.joinBtnNone}`}>
                        <WhiteRectangleBtn width={450} heightPadding={10} title={"결제하고 파티 시작"} onClick={handleJoinParty}/>    
                    </div>
                    
                   
                </div>           
            </div>
        </div>
    );
}

export default PartyAttend;
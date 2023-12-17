import style from "./PartyCreatePage.module.css";
import {useLocation} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTriangleExclamation, faPlus, faMinus, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import PurpleRectangleBtn from "../../../components/PurpleRectangleBtn/PurpleRectangleBtn";
import StartDateModal from "./StartDateModal/StartDateModal"
import moment from "moment";
import PeriodModal from "./PeriodModal/PeriodModal";
import WhiteRectangleBtn from "../../../components/WhiteRectangleBtn/WhiteRectangleBtn";
import CalculationSelectBox from "../../../components/CalculationSelectBox/CalculationSelectBox";
import { useNavigate } from "react-router-dom";

const PartyCreatePage = () =>{
    //  공통 사용 -------------------------------------------------

    const location = useLocation();
    const service = location.state.service;
    const navi = useNavigate();

    // 현재 단계
    const [step, setStep] = useState(1);

    // 다음 단계로 넘어갈 수 있는 지 판단
    const [isGoNext, setGoNext] = useState(false);

    // 다음 버튼 클릭
    const handleNext = () =>{
        if(isGoNext){
            setStep(prev=>
                {   
                    if(prev+1 !== 2) setGoNext(false);
                    return prev+1;
                });
           
        }
    }

    // 이전 버튼 클릭
    const handlePrev = () =>{
        let currentStep = step;
        setStep(prev=>prev-1);
        setGoNext(true);
        setAllComplete(false);

        // 저장된 2단계 정보 초기화
        if(currentStep-1 === 1){
            setPeopleCnt(service.maxPeopleCount-1);
            setUpdatePeopleCnt({minus:(service.maxPeopleCount-1)!==1, plus:false})

        // 저장된 3단계 정보 초기화
        }else if(currentStep-1 === 2){
            onChange();
            setPeriodMonth();
            setPeriodStep(1);
        // 저장된 4단계 정보 초기화
        }else if(currentStep-1 === 3){
            setCalculation(1);
        }
    }
    
    // ----------------------------------------------------------


    // 1단계 ----------------------------------------------------

    // 비밀번호 보기 여부
    const [isView,setView] = useState(false);
    // 비밀번호 일치 여부
    const [isSame,setSame] = useState(false);
    // input tag focus 여부
    // const [isFocus,setFocus] = useState({id:false, pw:false, pwConfirm:false});

    // 입력한 계정 정보
    const [accountInfo, setAccountInfo] = useState({id:"", pw:"", pwConfirm:""});
    
    // 1단계 정보 입력 여부 판단 (id 입력, pw 일치 여부)
    const [isChked, setChecked] = useState({id:false, pw:false});

    // 입력한 아이디 state에 저장
    const handleChangeId = (e) => {
        setChecked((prev)=>({...prev,id:true}))
        setAccountInfo((prev)=>{
            if(e.target.value!==""){setChecked((prev)=>{ if(isChked.pw){setGoNext(true)} return {...prev,id:true};})}
            else setChecked((prev)=>{ setGoNext(false); return {...prev,id:false}});
            return {...prev,id:e.target.value}
        });
    }

    // 비밀번호 or 비밀번호 확인 입력
    const handleChangePW = (e) => {
        const {name, value} = e.target;
        setChecked((prev)=>({...prev,pw:false}))
        setAccountInfo((prev)=>{
            
            // 비밀번호 일치여부 검사
            let compartTargetName = "pw";
            if(name === "pw") compartTargetName = "pwConfirm";
            if(accountInfo[compartTargetName] === value) {setSame(true); if(value!==""){if(isChked.id){setGoNext(true)} setChecked((prev)=>({...prev,pw:true}))}}
            else {setSame(false); setGoNext(false);};

            // 입력한 비밀번호 state에 저장
            return {...prev,[name]:value}
        });
    };

    // 비밀번호 보기
    const handleView = (e) =>{
        const partyContentElement = e.currentTarget;
        const clickedElement = e.target; 
        if (clickedElement === partyContentElement || partyContentElement.contains(clickedElement)) {
            // partyContent 또는 그 자식 요소를 클릭한 경우에만 처리
            setView(prev=>!prev);
        }        
    }

    // -------------------------------------------------------------------------------


    // 2단계 -------------------------------------------------------------------------
    // 파티원 명수
    const [peopleCnt, setPeopleCnt] = useState(service.maxPeopleCount-1);
    
    // 파티원 명수 버튼 클릭할 수 있는지
    const [isUpdatePeopleCnt, setUpdatePeopleCnt] = useState({minus:(service.maxPeopleCount-1)!==1, plus:false})

    // 파티원 명수 조절
    const handleUpdatePeopleCnt = (e) => {
        const partyContentElement = e.currentTarget;
        const clickedElement = e.target; 
        let currentCnt = peopleCnt;
        if (clickedElement === partyContentElement || partyContentElement.contains(clickedElement)) {
            // partyContent 또는 그 자식 요소를 클릭한 경우에만 처리
            const name = partyContentElement.dataset.name;
            if(name === "minus"){
                if(peopleCnt>1){
                    currentCnt = peopleCnt-1;
                    setPeopleCnt(prev=>{
                        return prev-1;
                    });
                }
                
            }else if(name === "plus"){
                if(peopleCnt<service.maxPeopleCount-1){
                    currentCnt = peopleCnt+1;
                    setPeopleCnt(prev=>{
                        return prev+1;
                    });
                }
            }

            // 더이상 마이너스 불가
            if(currentCnt===1){
                setUpdatePeopleCnt(prev=>({...prev, minus:false}));
            }else{
                setUpdatePeopleCnt(prev=>({...prev, minus:true}));
            }

            // 더이상 플러스 불가
            if(currentCnt===(service.maxPeopleCount-1)){
                setUpdatePeopleCnt(prev=>({...prev, plus:false}));
            }else{
                setUpdatePeopleCnt(prev=>({...prev, plus:true}));
            }
        }  
    }


    // -------------------------------------------------------------------------------
    // 3단계 -------------------------------------------------------------------------
    
    // 3단계 내에서 기간 설정 단계 (1. 시작일, 2. 기간, 3. 종료일)
    const [periodStep, setPeriodStep] = useState(1);


    // 파티 시작일 모달창 열림 / 닫힘
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // 파티 기간 모달창 열림 / 닫힘
    const [periodModalIsOpen, setperiodModalIsOpen] = useState(false);

    // 파티 시작일 모달창 열기
    const openModal = (e) => {
        const partyContentElement = e.currentTarget;
        const clickedElement = e.target; 
       
        if (clickedElement === partyContentElement || partyContentElement.contains(clickedElement)) {
            // partyContent 또는 그 자식 요소를 클릭한 경우에만 처리
            setModalIsOpen(true);
        }
    };

    // 파티 시작일 모달창 닫기
    const closeModal = () => {
        setModalIsOpen(false);
    };

    // 파티 시작일 선택날짜
    const [value, onChange] = useState();

    // 파티 개월수 선택날짜
    const [periodMonth, setPeriodMonth] = useState();

    // 파티 개월 수 모달창 열기
    const openPeriodModal = (e) => {
        const periodElement = e.currentTarget;
        const clickedElement = e.target; 
       
        if (clickedElement === periodElement || periodElement.contains(clickedElement)) {
            // periodElement 또는 그 자식 요소를 클릭한 경우에만 처리
            setperiodModalIsOpen(true);
        }
    }

    //  파티 개월 수 모달창 열기
       const closePeriodModal = () => {
        setperiodModalIsOpen(false);
    };

    
    // ------------------------------------------------------------------------------
    // 4단계 - 결제수단 등록 및 정산일 관리
    // 모든 입력이 완료 되었나요 ?
    const [isAllComplete, setAllComplete] = useState(false);

    // 결제 계좌 정보

    // 정산일 정보
    const [calculation, setCalculation] = useState(1); 
    const handleComplete = () => {
        if(isAllComplete){
            let partyData = {
                peopleCount:peopleCnt,
                serviceId:service.id,
                startDate:new Date(value).toISOString(),
                monthCount:periodMonth,
                content:"내용",
                loginId:accountInfo.id,
                loginPw:accountInfo.pw
            }
            axios.post("/api/party", partyData).then(resp=>{
                if(window.confirm("파티 등록 성공! 등록된 정보를 확인하시겠어요?")){
                    navi("/");
                }else{
                    navi("/");
                }
            });
        }
    }

    // -------------------------------------------------------------------------------

    return(
        <div className={`${style.body} ${style.dflex}`}>
            <div className={style.left}>
                <div className={style.stepBox}>
                    스텝
                </div>
            </div>
            <div className={style.right}>
                {
                    step===1?(
                        <>
                            <div className={style.title}>{service.name} {service.plan}의<br></br>로그인 정보를 입력해주세요.</div>
                            <div className={style.inputTags}>
                                <div className={style.inputTag}><div className={style.inputCover}><div className={`${accountInfo.id===""?`${style.inputTitle} ${style.inputTitleHidden}`:`${style.inputTitle}`}`}>아이디</div><input type="text"  className={`${accountInfo.id===""?null:`${style.hasContent}`}`} name="id" placeholder="아이디" onChange={handleChangeId} value={accountInfo.id}></input></div></div>
                                <div className={style.inputTag}><div className={style.inputCover}><div className={`${accountInfo.pw===""?`${style.inputTitle} ${style.inputTitleHidden}`:`${style.inputTitle}`}`}>비밀번호</div><input type={`${isView?"text":"password"}`} className={`${accountInfo.pw===""?null:`${style.hasContent}`}`} name="pw" placeholder="비밀번호" onChange={handleChangePW} value={accountInfo.pw}></input></div><div className={`${style.iconCover} ${style.centerAlign}`}><FontAwesomeIcon icon={faEye} size="sm" className={`${isView?`${style.eyeIconActive} ${style.eyeIcon}`:`${style.eyeIcon}`}`} onClick={handleView} data-name="pw"/></div></div>
                                <div className={style.inputTag}><div className={style.inputCover}><div className={`${accountInfo.pwConfirm===""?`${style.inputTitle} ${style.inputTitleHidden}`:`${style.inputTitle}`}`}>비밀번호 확인</div><input type={`${isView?"text":"password"}`} className={`${accountInfo.pwConfirm===""?null:`${style.hasContent}`}`} name="pwConfirm" placeholder="비밀번호 확인" onChange={handleChangePW} value={accountInfo.pwConfirm}></input></div><div className={`${style.iconCover} ${style.centerAlign}`}><FontAwesomeIcon icon={faEye} size="sm" className={`${isView?`${style.eyeIconActive} ${style.eyeIcon}`:`${style.eyeIcon}`}`} onClick={handleView} data-name="pwConfirm"/></div></div>
                            </div>
                            <div className={style.pwCheck}>
                                {`${isSame===false && accountInfo.pwConfirm !=="" && accountInfo.pw!=="" ? "비밀번호가 일치하지 않습니다.":""}`}
                            </div>
                            <div className={`${style.inputNotice}`}><FontAwesomeIcon icon={faTriangleExclamation} size="xs"/><div className={style.inputNoticeTxt}>입력하신 계정은 유효성 검증에 사용되며, 파티를 만들고 난 뒤 정보를 변경할 수 없으니 주의해주세요.</div></div>
                            
                            <div className={style.goService}><a href={service.url} target="_blank" rel="noopener noreferrer">{service.name} 바로가기</a></div>
                            <div className={style.nextBtn}><PurpleRectangleBtn title="다음" activation={isGoNext} onClick={handleNext} width={150} heightPadding={10}/></div>
                        </>
                    ):step===2?
                    <>
                        <div className={style.title}>몇 명의 파티원을<br></br>모집하실 건가요?</div>
                        <div className={style.peopleCntCover}>
                            <div className={style.peopleCnt}>
                                <div className={`${isUpdatePeopleCnt.minus?`${style.peopleCntBtn}`:`${style.peopleCntBtn} ${style.disabled}`}`} data-name="minus" onClick={handleUpdatePeopleCnt}><FontAwesomeIcon icon={faMinus}/></div>
                                <div className={style.peopelCntTxt}><span>{peopleCnt}</span>명</div>
                                <div className={`${isUpdatePeopleCnt.plus?`${style.peopleCntBtn}`:`${style.peopleCntBtn} ${style.disabled}`}`} data-name="plus" onClick={handleUpdatePeopleCnt}><FontAwesomeIcon icon={faPlus}/></div>
                            </div>
                        </div>
                        <div className={`${style.inputNotice}`}><FontAwesomeIcon icon={faTriangleExclamation} size="xs"/><div className={style.inputNoticeTxt}>파티 운영을 위해서는 최소 1명 이상의 파티원이 필요해요.</div></div>
                            
                        <div className={style.bnts}>
                            <div className={style.prevBtn}><PurpleRectangleBtn title="이전" activation={true} onClick={handlePrev} width={150} heightPadding={10}/></div>
                            <div className={style.nextBtn}><PurpleRectangleBtn title="다음" activation={isGoNext} onClick={handleNext} width={150} heightPadding={10}/></div>
                        </div>
                    </>:step===3?
                    <>
                        <div className={style.title}>파티 기간을<br></br>설정해 주세요.</div>
                        <div className={`${style.partyDateCover}`}>
                            <div className={`${style.partyStartDateCover} ${style.periodCover}`} onClick={openModal}>
                                <div className={`${style.partyStartDate} ${style.period}`}>
                                    <div className={`${style.periodTitle}`}>시작일</div>
                                    <div className={`${style.periodTxt}`}>{value ? moment(value).format("YYYY-MM-DD"):`선택`}</div>
                                </div>
                                <div className={`${style.periodIcon} ${style.centerAlign}`}><FontAwesomeIcon icon={faChevronDown}/></div>
                            </div>
                            <StartDateModal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                contentLabel="정보 모달"
                                width={450}
                                height={500}
                                value={value}
                                onChange={onChange}
                                setPeriodStep={setPeriodStep}
                            >
                            </StartDateModal>   
                            {
                                periodStep===2?
                                <>
                                    <div className={`${style.partyPeriodCover} ${style.periodCover}`} onClick={openPeriodModal}>
                                        <div className={`${style.partyPeriod} ${style.period}`}>
                                            <div className={`${style.periodTitle}`}>파티 기간</div>
                                            <div className={`${style.periodTxt}`}>{periodMonth ? periodMonth+"개월":`선택`}</div>
                                        </div>
                                        <div className={`${style.periodIcon} ${style.centerAlign}`}><FontAwesomeIcon icon={faChevronDown}/></div>
                                    </div>
                                    <PeriodModal
                                        isOpen={periodModalIsOpen}
                                        onRequestClose={closePeriodModal}
                                        contentLabel="정보 모달"
                                        width={450}
                                        height={350}
                                        periodMonth={periodMonth}
                                        setPeriodMonth={setPeriodMonth}
                                        setGoNext={setGoNext}
                                    >
                                    </PeriodModal>  
                                </>:null
                            }
                        </div>
                        <div className={`${style.inputNotice}`}><FontAwesomeIcon icon={faTriangleExclamation} size="xs"/><div className={style.inputNoticeTxt}>파티를 만들고 난 뒤에는 파티 기간 수정이 불가능하며, 파티 종료일 이전에 파티를 해산할 경우 위약금이 부과돼요.</div></div>
                        <div className={style.bnts}>
                            <div className={style.prevBtn}><PurpleRectangleBtn title="이전" activation={true} onClick={handlePrev} width={150} heightPadding={10}/></div>
                            <div className={style.nextBtn}><PurpleRectangleBtn title="다음" activation={isGoNext} onClick={handleNext} width={150} heightPadding={10}/></div>
                        </div>
                    </>:
                    <>
                        <div className={style.title}>마지막 단계<br></br>결제 계좌와 정산일을 등록해주세요.</div>
                       
                        <div className={style.subMenu}>
                            <div className={style.subTitle}>결제 정보 등록</div>
                            <WhiteRectangleBtn title="+ 결제 계좌 등록하기" onClick={()=>{alert("구현 예정 기능입니다."); setAllComplete(true);}} width={300} heightPadding={5}/>
                            <div className={`${style.inputNotice}`}><FontAwesomeIcon icon={faTriangleExclamation} size="xs"/><div className={style.inputNoticeTxt}>결제 계좌는 파티장의 귀책 사유 발생시 위약금 부과를 위해 필요하며, 유효성 검증을 위해 1원 시범 결제 후 즉시 취소처리 합니다.</div></div>
                        </div>
                        <div className={style.subMenu}>
                            <div className={style.subTitle}>정산일 정보 등록</div>
                            <CalculationSelectBox
                                setDay={setCalculation}
                                day={calculation}
                            ></CalculationSelectBox>
                            <div className={`${style.inputNotice}`}><FontAwesomeIcon icon={faTriangleExclamation} size="xs"/><div className={style.inputNoticeTxt}>정산일은 파티 요금 적립과 결제가 이루어지는 기준일입니다.</div></div>
                        </div>
                        
                       
                        <div className={style.bnts}>
                            <div className={style.prevBtn}><PurpleRectangleBtn title="이전" activation={true} onClick={handlePrev} width={150} heightPadding={10}/></div>
                            <div className={style.nextBtn}><PurpleRectangleBtn title="파티 만들기" activation={isAllComplete} onClick={handleComplete} width={150} heightPadding={10}/></div>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

export default PartyCreatePage;
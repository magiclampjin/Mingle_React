import style from "./MyPartyList.module.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { renderToString } from 'react-dom/server';
import { LoginContext } from "../../../../App";
import {myPartyContext} from "../MyPartyMain";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadTear, faQuestion } from "@fortawesome/free-solid-svg-icons";

const MyPartyList = () => {
    const [isLoading, setLoading] = useState(false);
    const [myPartyList, setMyPartyList] = useState();
    const [proceedEmpty, setProceedEmpty] = useState(true);
    const [progressEmpty, setProgressEmpty] = useState(true);

    const {setSelectParty} = useContext(myPartyContext);
    const navi = useNavigate();

    // 종료된 파티 hover
    const [isHovering, setHovering] = useState(false);

    // 미로그인 시 접근불가
    const {loginId, loginStatus} = useContext(LoginContext);
    
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

    // 가입한 파티 목록 가져오기
    useEffect(()=>{
        setLoading(true);
        axios.get("/api/party/getMyAllPartyList").then(resp=>{
            setMyPartyList(resp.data);
            setLoading(false);
        }).catch(()=>{
            navi("/denied");
        })
    },[]);

    // 가입한 파티 목록 가져오기 로딩
    if(isLoading){
        return <LoadingSpinner/>;
    }

    // 시작일까지 남은 날짜 계산하는 함수
    const getStartDate = (value, monthCount) => {
        // 시작일
        let now = new Date();
        now.setHours(0,0,0,0);

        // 시작일까지 남은 일자
        const diff = (new Date(value).getTime() - now.getTime())/(1000*60*60*24);

        // 종료일
        let end = new Date(value);
        end.setMonth(end.getMonth()+monthCount);

        // 종료일까지 남은 일자
        const diffEnd = (now.getTime() - end.getTime())/(1000*60*60*24);
        
        if(diffEnd>=0){
            return (<>종료</>);
        }else{
            if(diff <= 0){
                return (<>진행중</>);
            }else{
                return (<>{diff}일 뒤 시작</>);
            }
        }
       
    }

    // 선택한 파티의 정보창으로 이동
    const handleClick = (e) =>{
        if(loginId){
            const contentElement = e.currentTarget;
            const clickedElement = e.target; 
            
            if (clickedElement === contentElement || contentElement.contains(clickedElement)) {
                setSelectParty(contentElement.dataset.id)
                navi("/party/myParty/myPartyInfo");
            }
        }else{
             // 로그인하지않은 유저일 경우 로그인창으로 이동 혹은 현재 페이지 유지
            if(window.confirm("로그인 후 이용 가능한 서비스입니다.\n로그인 화면으로 이동하시겠습니까?")){
                navi("/member/login");
            }
        }
    }


    return(
        <div className={style.body}>
            <div className={style.title}>
                나의 파티    
            </div>

            <div className={style.subTitle}>
                진행 예정 파티
            </div>
            <div className={`${style.partyList} ${style.dflex}`}>
                {
                    myPartyList?myPartyList.map((e,i)=>{
                        if(renderToString(getStartDate(e.startDate, e.monthCount))!=="진행중" && renderToString(getStartDate(e.startDate, e.monthCount))!=="종료"){
                            if(proceedEmpty) setProceedEmpty(false);
                            return(
                                <div className={`${style.myParty}`} key={i} data-id={e.id} onClick={handleClick}>
                                    <div className={`${style.serviceImg} ${style.centerAlign}`}>
                                        <img src={`/assets/serviceLogo/${e.englishName}.png`} alt={`${e.name} 로고 이미지`} className={`${e.logoImg} ${style.VAlign}`}></img>
                                    </div>
                                    <div className={`${style.serviceName} ${style.centerAlign}`}>
                                        {e.name} {e.plan}
                                    </div>
                                    <div className={`${style.startDate} ${style.centerAlign}`}>
                                        {getStartDate(e.startDate, e.monthCount)}
                                    </div> 
                                    <div className={`${style.serviceName} ${style.centerAlign}`}>
                                        <div className={style.tag}>예정</div>
                                        {e.partyManager?<div className={style.tag}>방장</div>:null}
                                    </div>
                                </div>
                            )
                        }
                    }):null
                }
                {
                    proceedEmpty?
                    <div className={style.empty}>
                    <div className={`${style.emptyIcon} ${style.centerAlign}`}>
                        <FontAwesomeIcon icon={faFaceSadTear} />
                    </div>
                    <div className={`${style.emptyTxt} ${style.centerAlign}`}>
                        진행 예정인 파티가 없어요.
                    </div>
                    </div>:null
            }
            </div>

            <div className={style.subTitle}>
                진행 중인 파티
            </div>
            <div className={`${style.partyList} ${style.dflex}`}>
                {
                     myPartyList?myPartyList.map((e,i)=>{
                        
                        if(renderToString(getStartDate(e.startDate, e.monthCount))==="진행중"){
                            if(progressEmpty) setProgressEmpty(false);
                            return(
                                <div className={`${style.myParty}`} key={i} data-id={e.id} onClick={handleClick}>
                                    <div className={`${style.serviceImg} ${style.centerAlign}`}>
                                        <img src={`/assets/serviceLogo/${e.englishName}.png`} alt={`${e.name} 로고 이미지`} className={`${e.logoImg} ${style.VAlign}`}></img>
                                    </div>
                                    <div className={`${style.serviceName} ${style.centerAlign}`}>
                                        {e.name} {e.plan}
                                    </div>
                                    <div className={`${style.startDate} ${style.centerAlign}`}>
                                        {getStartDate(e.startDate, e.monthCount)}
                                    </div> 
                                    <div className={`${style.serviceName} ${style.centerAlign}`}>
                                        <div className={style.tag}>진행</div>
                                        {e.partyManager?<div className={style.tag}>방장</div>:null}
                                    </div>
                                </div>
                            )
                        }
                    }):null
                } 
                {
                    progressEmpty?
                    <div className={style.empty}>
                        <div className={`${style.emptyIcon} ${style.centerAlign}`}>
                            <FontAwesomeIcon icon={faFaceSadTear} />
                        </div>
                        <div className={`${style.emptyTxt} ${style.centerAlign}`}>
                            진행 중인 파티가 없어요.
                        </div>
                    </div>:null
                }
            </div>
            <div className={`${style.subTitle} ${style.dflex}`}>
                종료된 파티
                <FontAwesomeIcon
                    onMouseOver={() => {
                        setHovering(true);
                    }}
                    onMouseOut={() => {
                        setHovering(false);
                    }}
                    icon={faQuestion}
                    className={`${style.questionIcon} ${style.centerAlign}`}
                />
                 {isHovering ? (
                    <div className={style.infoPop}>
                        <div className={style.miniTitle}>
                            종료된 파티 정보는 왜 보관되나요?
                        </div>
                        <div className={style.miniContent}>
                            파티원들간의 원활한 소통을 위해 파티 종료일로부터 3개월간 파티 정보가 보관됩니다. 
                            단, 서비스 계정의 비밀번호 정보는 종료일에 즉시 파기됩니다.
                        </div>
                    </div>
                  ) : null}
            </div>  
            
            <div className={`${style.partyList} ${style.dflex}`}>
                {
                    myPartyList?myPartyList.map((e,i)=>{
                        if(renderToString(getStartDate(e.startDate, e.monthCount))==="종료"){
                            if(proceedEmpty) setProceedEmpty(false);
                            return(
                                <div className={`${style.myParty} ${style.endParty}`} key={i} data-id={e.id} onClick={handleClick}>
                                    <div className={`${style.serviceImg} ${style.centerAlign}`}>
                                        <img src={`/assets/serviceLogo/${e.englishName}.png`} alt={`${e.name} 로고 이미지`} className={`${e.logoImg} ${style.VAlign}`}></img>
                                    </div>
                                    <div className={`${style.serviceName} ${style.centerAlign}`}>
                                        {e.name} {e.plan}
                                    </div>
                                    <div className={`${style.startDate} ${style.centerAlign}`}>
                                        {getStartDate(e.startDate, e.monthCount)}
                                    </div> 
                                    <div className={`${style.serviceName} ${style.centerAlign}`}>
                                        <div className={style.tag}>종료</div>
                                        {e.partyManager?<div className={style.tag}>방장</div>:null}
                                    </div>
                                </div>
                            )
                        }
                    }):null
                }
                {
                    proceedEmpty?
                    <div className={style.empty}>
                    <div className={`${style.emptyIcon} ${style.centerAlign}`}>
                        <FontAwesomeIcon icon={faFaceSadTear} />
                    </div>
                    <div className={`${style.emptyTxt} ${style.centerAlign}`}>
                        종료된 파티가 없어요.
                    </div>
                    </div>:null
            }
            </div>
        </div>
    );
}

export default MyPartyList;
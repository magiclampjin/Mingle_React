import style from "./MyPartyList.module.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { renderToString } from 'react-dom/server';
import { LoginContext } from "../../../../App";
import {myPartyContext} from "../MyPartyMain";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadTear } from "@fortawesome/free-solid-svg-icons";

const MyPartyList = () => {
    const [isLoading, setLoading] = useState(false);
    const [myPartyList, setMyPartyList] = useState();
    const [proceedEmpty, setProceedEmpty] = useState(true);
    const [progressEmpty, setProgressEmpty] = useState(true);

    const {setSelectParty} = useContext(myPartyContext);
    const navi = useNavigate();

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
        axios.get("/api/party/getMyPartyList").then(resp=>{
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
    const getStartDate = (value) => {
        let now = new Date();
        now.setHours(0,0,0,0);
        const diff = (new Date(value).getTime() - now.getTime())/(1000*60*60*24);
        if(diff <= 0){
            return (<>진행중</>);
        }else{
            return (<>{diff}일 뒤 시작</>);
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
                        
                        if(renderToString(getStartDate(e.startDate))!=="진행중"){
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
                                        {getStartDate(e.startDate)}
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
                        
                        if(renderToString(getStartDate(e.startDate))==="진행중"){
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
                                        {getStartDate(e.startDate)}
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
        </div>
    );
}

export default MyPartyList;
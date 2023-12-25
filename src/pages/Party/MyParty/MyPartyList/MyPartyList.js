import style from "./MyPartyList.module.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { renderToString } from 'react-dom/server';
import { LoginContext } from "../../../../App";
import {myPartyContext} from "../MyPartyMain";

const MyPartyList = () => {
    const [isLoading, setLoading] = useState(false);
    const [myPartyList, setMyPartyList] = useState();
    const {setSelectParty} = useContext(myPartyContext);
    const navi = useNavigate();

    // 미로그인 시 접근불가
    const {loginId} = useContext(LoginContext);
    useEffect(()=>{
        if(loginId===""){
           navi("/denied");
        }
    },[loginId]);

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
            <div className={`${style.partyList} ${style.dflex}`}>
                {
                    myPartyList?myPartyList.map((e,i)=>(
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
                                <div className={style.tag}>{renderToString(getStartDate(e.startDate))==="진행중"?"진행":"예정"}</div>
                                {e.partyManager?<div className={style.tag}>방장</div>:null}
                            </div>
                        </div>
                    )):null
                }
               
            </div>
        </div>
    );
}

export default MyPartyList;

/*


 <div className={`${style.partyListLine} ${style.centerAlign}`}>
{   
    isServiceListLoading ? (
        <LoadingSpinnerMini height={260} width={100}/>
    ) :(
        service.map((e,i)=>{                         
            return(
                <>
                    <div key={i} data-id={e.id} className={`${style.partyContent}`} onClick={openModal}>
                        <div className={`${style.partyContent__img} ${style.centerAlign}`}><img src={`/assets/serviceLogo/${e.englishName}.png`} alt={`${e.name} 로고 이미지`}></img></div>
                        <div className={`${style.partyContent__name} ${style.centerAlign}`}>{e.name}</div>
                        <div className={`${style.partyContent__txt} ${style.centerAlign}`}>매달 적립!</div>
                        <div className={`${style.centerAlign}`}>
                            <div className={`${style.maxPrice} ${style.centerAlign}`}>~{formatNumber(Math.ceil((e.price)/(e.maxPeopleCount))*(e.maxPeopleCount-1)-(e.commission)*(e.maxPeopleCount-1))}원</div>
                            <div className={`${style.hotTag} ${style.centerAlign}`}><FontAwesomeIcon icon={faStar} size="1x"/><div className={`${style.hatTagTxt}`}>HOT</div></div>
                        </div>
                    </div>
                </>
            ); 
        })  
    )                 
}


*/
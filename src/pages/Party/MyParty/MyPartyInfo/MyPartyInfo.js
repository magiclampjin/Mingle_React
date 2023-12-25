import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { myPartyContext } from "../MyPartyMain";
import axios from "axios";
import style from "./MyPartyInfo.css";
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

    useEffect(()=>{
        setLoading(true);
        axios.get(`/api/party/getPartyInfo/${selectParty}`).then(resp=>{
            console.log(resp.data);
            setPartyInfo(resp.data);
            setLoading(false);
        }).catch(()=>{
            alert("정보를 불러오지 못 했습니다. 같은 문제가 반복되면 관리자에게 문의하세요.");
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
                            <img src={`/assets/serviceLogo/${partyInfo.englishName}.png`} alt={`${partyInfo.name} 로고 이미지`} className={`${partyInfo.logoImg} ${style.VAlign}`}></img>
                            <div className={style.name}>{partyInfo.name} {partyInfo.plan}</div>
                            <div className={`${style.serviceName} ${style.centerAlign}`}>
                                <div className={style.tag}>{isStart(partyInfo.startDate)===1?"진행":"예정"}</div>
                                {partyInfo.partyManager?<div className={style.tag}>방장</div>:null}
                            </div>
                        </div>
                        <div className={style.body}>
                            <div className={style.left}>
                                <div className={style.leftInfo}>
                                    <div className={style.subTitle}>파티 정보</div>
                                    <div className={style.grayTitle}>파티 기간</div>
                                    <div className={style.period}>기간</div>
                                </div>
                                <div className={style.leftInfo}>
                                    <div className={style.subTitle}>정산일 정보</div>
                                    <div className={style.period}>매달 n일</div>
                                </div>
                            </div>
                            <div className={style.right}>
                                <div className={style.partyInfo}>
                                    <div className={style.infoContent}>
                                        <div className={style.infoTitle}>아이디</div>
                                        <div className={style.infoContent}>sdfsdf</div>
                                    </div>
                                    <div className={style.infoContent}>
                                        <div className={style.infoTitle}>비밀번호</div>
                                        <div className={style.infoContent}>sdfsdf</div>
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
import style from "./PartyList.module.css"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWonSign } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";

const PartyList = () => {
    const location = useLocation();
    const selectService = location.state.selectService;
    const [partyList, setPartyList] = useState();
    const [service, setService] = useState();
    const [isLoading, setLoading] = useState(false);
    const [price, setPrice] = useState();

    useEffect(()=>{
        setLoading(true);

        axios.get(`/api/party/getServiceById/${selectService}`).then(resp=>{
            setService(resp.data);
            setPrice(formatNumber(Math.ceil((resp.data.price)/(resp.data.maxPeopleCount))+1000));
            axios.get(`/api/party/getPartyList/${selectService}`).then(resp=>{
                setPartyList(resp.data);
                console.log(resp.data);
                setLoading(false);
            }).catch(()=>{
                setLoading(false);
            });
        }).catch(()=>{
            setLoading(false);
        })

       
    },[selectService]);
    

    // 카테고리 불러오기 로딩
    if(isLoading){
        return <LoadingSpinner/>;
    }

    // 숫자를 천 단위로 콤마 찍어주는 함수
    const formatNumber = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

   
    return(
        <div className={style.body}>
            {
            service?
                <>
                    <div className={`${style.dflex} ${style.m35}`}>
                        <div className={`${style.bigTitle} ${style.w70}`}>
                            <div className={style.colorMainPurple}>{service.name} {service.plan}</div>
                            파티를 찾아드릴게요.
                        </div>
                        <div className={`${style.w30} ${style.hAlignEnd}`}>
                            <img src={`/assets/serviceLogo/${service.englishName}.png`} alt={`${service.name} 로고 이미지`} className={`${style.logoImg} ${style.VAlign}`}></img>
                        </div>
                    </div>
                    <div className={`${style.period} ${style.dflex}`}>
                        <div>파티 시작일</div>
                        <div>오늘 시작</div>
                    </div>
                    <div className={`${style.partyList}`}>
                        파티 검색 결과
                        {
                            partyList.map((e,i)=>( 
                                <div key={i} className={`${style.party}`} data-id={e.id}>
                                    <div className={`${style.partyTop} ${style.dflex}`}>
                                        <div className={`${style.partyStartDate} ${style.title} ${style.w70}`}>
                                            <span className={style.colorMainPurple}>{Math.abs((new Date(e.startDate).getTime() - new Date().getTime())/(1000*60*60*24))}일 후</span> 시작되는 <span className={style.colorMainPurple}>{e.monthCount}개월</span> 파티
                                        </div>
                                        <div className={`${style.price} ${style.centerAlign} ${style.w30}`}><div className={`${style.wonIcon} ${style.centerAlign}`}><FontAwesomeIcon icon={faWonSign}/></div>월 {price}원</div>
                                    </div>
                                    <div className={`${style.partyBottom}`}>
                                        ~ 2024.11.26 까지
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </>
            :null
            }
        </div>
    );
};

export default PartyList;
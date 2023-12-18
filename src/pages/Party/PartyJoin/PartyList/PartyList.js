import style from "./PartyList.module.css"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";

const PartyList = () => {
    const location = useLocation();
    const selectService = location.state.selectService;
    const [partyList, setPartyList] = useState();
    const [service, setService] = useState();
    const [isLoading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);

        axios.get(`/api/party/getServiceById/${selectService}`).then(resp=>{
            setService(resp.data)
        }).catch(()=>{
            setLoading(false);
        })

        axios.get(`/api/party/getPartyList/${selectService}`).then(resp=>{
            setPartyList(resp.data);
            setLoading(false);
        }).catch(()=>{
            setLoading(false);
        });
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
            <div className={style.title}>
                {service.name}<br></br>
                파티를 찾아드릴게요.
            </div>
        </div>
    );
};

export default PartyList;
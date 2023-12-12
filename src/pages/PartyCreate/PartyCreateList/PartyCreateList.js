import style from "./PartyCreateList.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
 
const PartyCreateList = ({selectServiceCategory,setSelectServiceCategory}) => {
    const [serviceCategory,setServiceCategory] = useState([]);
    const [service, setService] = useState([{}]);
    const [isLoading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        axios.get(`/api/party`).then(resp=>{
            setServiceCategory(resp.data);

            axios.get(`/api/party/getService/${selectServiceCategory}`).then(resp=>{
                setLoading(false);
                console.log(resp.data);
                setService(resp.data);
            })
        }).catch(()=>{})
    },[]);

    if(isLoading){
        return <LoadingSpinner/>;
    }

    const handleSelectCategory = (e) => {
        setLoading(true);
        console.log(e.target.innerText);
        setSelectServiceCategory(e.target.innerText);

        axios.get(`/api/party/getService/${e.target.innerText}`).then(resp=>{
            setLoading(false);
            console.log(resp.data);
            setService(resp.data);
        })
    };

    return (
        <>
            <div className={`${style.partyName} ${style.centerAlign}`}>어떤 파티를 만드시겠어요?</div>
            <div className={`${style.partyCategoryList} ${style.centerAlign}`}>
                <div className={`${style.partyCategory}`} onClick={handleSelectCategory}>전체</div>
                {
                    serviceCategory.map((e,i)=>(
                        <div key={i} className={`${style.partyCategory}`} onClick={handleSelectCategory}>{e.id}</div>
                    ))
                }
            </div>
            <div className={`${style.partyList}`}>
                <div className={`${style.partyListLine} ${style.centerAlign}`}>
                    {    
                        service.map((e,i)=>{
                            return(
                                <div key={i} className={`${style.partyContent}`}>
                                    <div className={`${style.partyContent__img} ${style.centerAlign}`}><img src={`/assets/serviceLogo/${e.name}.png`}></img></div>
                                    <div className={`${style.partyContent__name} ${style.centerAlign}`}>{e.name}</div>
                                    <div className={`${style.partyContent__txt} ${style.centerAlign}`}>매달 적립!</div>
                                    <div className={`${style.centerAlign}`}>
                                        <div className={`${style.maxPrice} ${style.centerAlign}`}>~{e.price}</div>
                                        <div className={`${style.hotTag} ${style.centerAlign}`}><FontAwesomeIcon icon={faStar} size="1x"/><div className={`${style.hatTagTxt}`}>HOT</div></div>
                                    </div>
                                </div>  
                            ); 
                        })                 
                    }
                </div>    
                {/* <div className={`${style.partyListLine} ${style.centerAlign}`}>
                    <div className={`${style.partyContent}`}>
                        <div className={`${style.partyContent__img} ${style.centerAlign}`}><img src="/assets/serviceLogo/netflix.png"></img></div>
                        <div className={`${style.partyContent__name} ${style.centerAlign}`}>넷플릭스 추가 공유</div>
                        <div className={`${style.partyContent__txt} ${style.centerAlign}`}>매달 적립!</div>
                        <div className={`${style.centerAlign}`}>
                            <div className={`${style.maxPrice} ${style.centerAlign}`}>~17,010원</div>
                            <div className={`${style.hotTag} ${style.centerAlign}`}><FontAwesomeIcon icon={faStar} size="1x"/><div className={`${style.hatTagTxt}`}>HOT</div></div>
                        </div>
                    </div>   
                </div>      */}
            </div>   
        </>
    );
}

export default PartyCreateList;
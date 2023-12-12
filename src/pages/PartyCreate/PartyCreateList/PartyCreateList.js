import style from "./PartyCreateList.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import LoadingSpinnerMini from "../../../components/LoadingSpinnerMini/LoadingSpinnerMini";
import ServiceCategoryNavi from "./ServiceCategoryNavi/ServiceCategoryNavi"; 

const PartyCreateList = ({selectServiceCategory,setSelectServiceCategory}) => {
    const [serviceCategory,setServiceCategory] = useState([]);
    const [service, setService] = useState([]);
    const [isCategoryLoading, setCategoryLoading] = useState(false);
    const [isServiceListLoading, setServiceListLoading]= useState(false);

    useEffect(()=>{
        setCategoryLoading(true);
        axios.get(`/api/party`).then(resp=>{
            setServiceCategory(Array.isArray(resp.data) ? resp.data : []);

            axios.get(`/api/party/getService/${selectServiceCategory}`).then(resp=>{
                setService(Array.isArray(resp.data)? resp.data : []);
                setCategoryLoading(false);
            }).catch(()=>{
                setCategoryLoading(false);
                setService([]);
            })
        }).catch(()=>{
            setCategoryLoading(false);
            setServiceCategory([]);
        })
    },[]);

    if(isCategoryLoading){
        return <LoadingSpinner/>;
    }

    return (
        <>
            <div className={`${style.partyName} ${style.centerAlign}`} >어떤 파티를 만드시겠어요?</div>
            <div className={`${style.partyCategoryList} ${style.centerAlign}`}>
                <ServiceCategoryNavi id="전체" isSelected={selectServiceCategory=="전체"} isServiceListLoading={isServiceListLoading} setServiceListLoading={setServiceListLoading} selectServiceCategory={selectServiceCategory} setSelectServiceCategory={setSelectServiceCategory} service={service} setService={setService}/>
                {
                    serviceCategory.map((e,i)=>(
                        <ServiceCategoryNavi key={i} id={e.id} isSelected={selectServiceCategory==e.id} isServiceListLoading={isServiceListLoading} setServiceListLoading={setServiceListLoading} selectServiceCategory={selectServiceCategory} setSelectServiceCategory={setSelectServiceCategory} service={service} setService={setService}/>
                    ))
                }
            </div>
            <div className={`${style.partyList}`}>
                <div className={`${style.partyListLine} ${style.centerAlign}`}>
                    {   
                        isServiceListLoading ? (
                            <LoadingSpinnerMini height={50}/>
                        ) :(
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
                        )                 
                    }
                </div>    
            </div>   
        </>
    );
}

export default PartyCreateList;
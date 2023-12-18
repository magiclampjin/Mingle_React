import style from "../../PartyCreate/PartyCreateList/PartyCreateList.module.css"
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import LoadingSpinnerMini from "../../../../components/LoadingSpinnerMini/LoadingSpinnerMini";
import ServiceCategoryNavi from "../../PartyCreate/PartyCreateList/ServiceCategoryNavi/ServiceCategoryNavi"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import React from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PartyAllList = ({selectServiceCategory,setSelectServiceCategory}) => {
     // 서비스 카테고리 목록
     const [serviceCategory,setServiceCategory] = useState([]);
     // 카테고리 선택 시 해당 카테고리 내 서비스 목록
     const [service, setService] = useState([]);
     // 서비스 카테고리 목록 불러오기 로딩 여부
     const [isCategoryLoading, setCategoryLoading] = useState(false);
     // 서비스 목록 불러오기 로딩 여부
     const [isServiceListLoading, setServiceListLoading]= useState(false);

     const navi = useNavigate();

     // 선택한 서비스 종류
     const [selectService, setSelectService] = useState("");
 
     // 숫자를 천 단위로 콤마 찍어주는 함수
     const formatNumber = (value) => {
         return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
     };
    
     // 초기 카테고리 & 카테고리별 목록 불러오기
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

    // 카테고리 불러오기 로딩
    if(isCategoryLoading){
        return <LoadingSpinner/>;
    }

    // 서비스 선택
    const handleSelectService = (e) => {
        const partyContentElement = e.currentTarget;
        const clickedElement = e.target; 
        
        if (clickedElement === partyContentElement || partyContentElement.contains(clickedElement)) {
            // partyContent 또는 그 자식 요소를 클릭한 경우에만 처리
            setSelectService(partyContentElement.dataset.id);
            navi("/party/PartyJoin/PartyList",{state:{selectService:partyContentElement.dataset.id}});
        }
    };


    return(
        <div className={`${style.partyCreateList}`}>  
        <div className={`${style.partyName} ${style.centerAlign}`} >어떤 파티를 찾고 있나요?</div>
        <div className={`${style.categoryListCover}`}>

      
            <div className={`${style.partyCategoryList} ${style.centerAlign}`}>
                <ServiceCategoryNavi id="전체" isSelected={selectServiceCategory==="전체"} isServiceListLoading={isServiceListLoading} setServiceListLoading={setServiceListLoading} selectServiceCategory={selectServiceCategory} setSelectServiceCategory={setSelectServiceCategory} service={service} setService={setService}/>
                {
                    serviceCategory.map((e,i)=>(
                        <ServiceCategoryNavi key={i} id={e.id} isSelected={selectServiceCategory===e.id} isServiceListLoading={isServiceListLoading} setServiceListLoading={setServiceListLoading} selectServiceCategory={selectServiceCategory} setSelectServiceCategory={setSelectServiceCategory} service={service} setService={setService}/>
                    ))
                }
            </div>
        </div>
        <div className={`${style.partyList}`}>
            <div className={`${style.partyListLine} ${style.centerAlign}`}>
                {   
                    isServiceListLoading ? (
                        <LoadingSpinnerMini height={260} width={100}/>
                    ) :(
                        service.map((e,i)=>{                         
                            return(
                                <>
                                    <div key={i} data-id={e.id} className={`${style.partyContent}`} onClick={handleSelectService}>
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
            </div>   
        </div>   
    </div>
    );
};

export default PartyAllList;
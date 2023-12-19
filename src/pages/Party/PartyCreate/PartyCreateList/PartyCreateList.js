import style from "./PartyCreateList.module.css"
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import LoadingSpinnerMini from "../../../../components/LoadingSpinnerMini/LoadingSpinnerMini";
import ServiceCategoryNavi from "./ServiceCategoryNavi/ServiceCategoryNavi"; 

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import ServiceInfoModal from "./ServiceInfoModal/ServiceInfoModal";
import { createContext } from "react";

export const selectService = createContext();

const PartyCreateList = ({selectServiceCategory,setSelectServiceCategory}) => {
    // 서비스 카테고리 목록
    const [serviceCategory,setServiceCategory] = useState([]);
    // 카테고리 선택 시 해당 카테고리 내 서비스 목록
    const [service, setService] = useState([]);
    // 서비스 카테고리 목록 불러오기 로딩 여부
    const [isCategoryLoading, setCategoryLoading] = useState(false);

    // 가입된 서비스 목록
    const [joinService, setJoinService] = useState([]);
    let jsId = 0;
     // 가입 가능 여부 (이미 가입했을 경우 fasle)
    let joinPossible = true;
    
    // 서비스 목록 불러오기 로딩 여부
    const [isServiceListLoading, setServiceListLoading]= useState(false);

    // 서비스 모달창 열림 / 닫힘
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // 모달창을 띄울 서비스 종류
    const [selectService, setSelectService] = useState("");

    // 요금 안내 확인용 chkBox 
    const [isChked, setChked] = useState(false);

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
                setService(Array.isArray(resp.data.list)? resp.data.list : []);
                let joinArr = Array.isArray(resp.data.joinList)?resp.data.joinList : [];
                if(joinArr.length>0){
                    joinArr.sort();
                    setJoinService(joinArr);
                }
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

    // 서비스 정보 모달창 열기
    const openModal = (e) => {
        const partyContentElement = e.currentTarget;
        const clickedElement = e.target; 
       
        if (clickedElement === partyContentElement || partyContentElement.contains(clickedElement)) {
            // partyContent 또는 그 자식 요소를 클릭한 경우에만 처리
            setSelectService(partyContentElement.dataset.id);
            setModalIsOpen(true);
            setChked(false);
        }
    };

    // 서비스 정보 모달창 닫기
    const closeModal = () => {
        setModalIsOpen(false);
        setChked(false);
    };


    return (
        <div className={`${style.partyCreateList}`}>  
            <div className={`${style.partyName} ${style.centerAlign}`} >어떤 파티를 만드시겠어요?</div>
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
                                if(e.id === joinService[jsId]){
                                    joinPossible=false; jsId++;
                                }else joinPossible=true; 
                                return(
                                    <>
                                        <div key={i} data-id={e.id} className={joinPossible?`${style.partyContent}`:`${style.partyContent} ${style.cantSelectContent}`} onClick={joinPossible?openModal:null}>
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
                <ServiceInfoModal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="정보 모달"
                    selectService = {selectService}
                    width={450}
                    height={430}
                    isChked={isChked}
                    setChked={setChked}
                >
                </ServiceInfoModal>   
            </div>   
        </div>
    );
}

export default PartyCreateList;
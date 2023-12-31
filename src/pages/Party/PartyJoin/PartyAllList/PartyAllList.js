import style from "../../PartyCreate/PartyCreateList/PartyCreateList.module.css";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import LoadingSpinnerMini from "../../../../components/LoadingSpinnerMini/LoadingSpinnerMini";
import ServiceCategoryNavi from "../../PartyCreate/PartyCreateList/ServiceCategoryNavi/ServiceCategoryNavi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadTear, faStar } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import React from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { JoinPartyContext } from "../../../../App";

const PartyAllList = ({ selectServiceCategory, setSelectServiceCategory }) => {
  // 서비스 카테고리 목록
  const [serviceCategory, setServiceCategory] = useState([]);
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
  const [isServiceListLoading, setServiceListLoading] = useState(false);

  const navi = useNavigate();

  // 선택한 서비스 종류
  //const [selectService, setSelectService] = useState("");
  const { setSelectService } = useContext(JoinPartyContext);

  // 숫자를 천 단위로 콤마 찍어주는 함수
  const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // 초기 카테고리 & 카테고리별 목록 불러오기
  useEffect(() => {
    setCategoryLoading(true);
    axios
      .get(`/api/party`)
      .then((resp) => {
        setServiceCategory(Array.isArray(resp.data) ? resp.data : []);

        axios
          .get(`/api/party/getService/${selectServiceCategory}`)
          .then((resp) => {
            setService(Array.isArray(resp.data.list) ? resp.data.list : []);
            let joinArr = Array.isArray(resp.data.joinList)
              ? resp.data.joinList
              : [];
            if (joinArr.length > 0) {
              joinArr.sort();
              setJoinService(joinArr);
            }
            setCategoryLoading(false);
          })
          .catch(() => {
            setCategoryLoading(false);
            setService([]);
          });
      })
      .catch(() => {
        setCategoryLoading(false);
        setServiceCategory([]);
      });
  }, []);

  // 카테고리 불러오기 로딩
  if (isCategoryLoading) {
    return <LoadingSpinner />;
  }

  // 서비스 선택
  const handleSelectService = (e) => {
    const partyContentElement = e.currentTarget;
    const clickedElement = e.target;

    if (
      clickedElement === partyContentElement ||
      partyContentElement.contains(clickedElement)
    ) {
      // partyContent 또는 그 자식 요소를 클릭한 경우에만 처리
      setSelectService(partyContentElement.dataset.id);
      navi("/party/PartyJoin/PartyList", {
        state: { selectService: partyContentElement.dataset.id },
      });
    }
  };

  return (
    <div className={`${style.partyCreateList}`}>
      <div className={`${style.partyName} ${style.centerAlign}`}>
        어떤 파티를 찾고 있나요?
      </div>
      <div className={`${style.categoryListCover}`}>
        <div className={`${style.partyCategoryList} ${style.centerAlign}`}>
          <ServiceCategoryNavi
            id="전체"
            isSelected={selectServiceCategory === "전체"}
            isServiceListLoading={isServiceListLoading}
            setServiceListLoading={setServiceListLoading}
            selectServiceCategory={selectServiceCategory}
            setSelectServiceCategory={setSelectServiceCategory}
            setService={setService}
            setJoinService={setJoinService}
          />
          {serviceCategory.map((e, i) => (
            <ServiceCategoryNavi
              key={`category-${i}`}
              id={e.id}
              isSelected={selectServiceCategory === e.id}
              isServiceListLoading={isServiceListLoading}
              setServiceListLoading={setServiceListLoading}
              selectServiceCategory={selectServiceCategory}
              setSelectServiceCategory={setSelectServiceCategory}
              setService={setService}
              setJoinService={setJoinService}
            />
          ))}
        </div>
      </div>
      <div className={`${style.partyList}`}>
        <div className={`${style.partyListLine} ${style.centerAlign}`}>
          {isServiceListLoading ? (
            <LoadingSpinnerMini height={260} width={100} />
          ) : (
            <>
              {service&&service.length!==0?
             
                service.map((e, i) => {
                  if (e.id === joinService[jsId]) {
                    joinPossible = false;
                    jsId++;
                  } else joinPossible = true;
                  return (
                    <>
                      <div key={`joinList-${i}`} data-id={e.id} className={joinPossible?`${style.partyContent}`:`${style.partyContent} ${style.cantSelectContent}`}
                          onClick={joinPossible?handleSelectService: () => {alert("이미 가입한 서비스의 파티입니다.\n추가 가입은 불가능합니다.");}}>
                        <div className={`${style.partyContent__img} ${style.centerAlign}`}>
                          <img src={`/assets/serviceLogo/${e.englishName}.png`} alt={`${e.name} 로고 이미지`}></img>
                        </div>
                        <div className={`${style.partyContent__name} ${style.centerAlign}`}>{e.name}</div>
                        <div className={`${style.partyContent__txt} ${style.centerAlign}`}>매달 적립!</div>
                        <div className={`${style.centerAlign}`}>
                          <div className={`${style.maxPrice} ${style.centerAlign}`}>~{formatNumber(Math.ceil(e.price / e.maxPeopleCount) *(e.maxPeopleCount - 1) - e.commission * (e.maxPeopleCount - 1))}원</div>
                          <div className={`${style.hotTag} ${style.centerAlign}`}>
                            <FontAwesomeIcon icon={faStar} size="1x" />
                            <div className={`${style.hatTagTxt}`}>HOT</div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                }):
                <div className={style.empty}>
                    <div className={`${style.emptyIcon} ${style.centerAlign}`}>
                    <FontAwesomeIcon icon={faFaceSadTear} />
                    </div>
                    <div className={`${style.emptyTxt} ${style.centerAlign}`}>
                        해당 카테고리는 아직 서비스가 존재하지 않아요.
                    </div>
                </div>
              }
          </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartyAllList;

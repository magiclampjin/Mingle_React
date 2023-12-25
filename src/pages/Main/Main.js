import style from "./Main.module.css";
import "./Main.css";
import GrayRectangleBtn from "../../components/GrayRectangleBtn/GrayRectangleBtn";
import PurpleRectangleBtn from "../../components/PurpleRectangleBtn/PurpleRectangleBtn";
import PurpleRoundBtn from "../../components/PurpleRoundBtn/PurpleRoundBtn";
import WhiteRectangleBtn from "../../components/WhiteRectangleBtn/WhiteRectangleBtn";
import WhiteRoundBtn from "../../components/WhiteRoundBtn/WhiteRoundBtn";
import RenderNewVideo from "../Board/components/RenderNewVideo/RenderNewVideo";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ServiceInfoModal from "../Party/PartyCreate/PartyCreateList/ServiceInfoModal/ServiceInfoModal";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faWonSign } from "@fortawesome/free-solid-svg-icons";
import { faFaceSadTear } from "@fortawesome/free-regular-svg-icons";
import { useContext, useEffect, useState } from "react";
// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginContext } from "../../App";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Main = () => {
  const { loginId } = useContext(LoginContext);

  // 무한 롤링 애니메이션 설정
  const [animate, setAnimate] = useState(true);
  const onStop = () => setAnimate(false); // 멈춤
  const onRun = () => setAnimate(true); // 재생

  const getServiceId = "전체";
  // 서비스 목록
  const [service, setService] = useState([]);
  // 가입된 서비스 목록
  const [joinService, setJoinService] = useState([]);
  let jsId = 0;
  // 가입 가능 여부 (이미 가입했을 경우 fasle)
  let joinPossible = true;
  // 서비스 모달창 열림 / 닫힘
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // 모달창을 띄울 서비스 종류
  const [selectService, setSelectService] = useState("");
  // 요금 안내 확인용 chkBox
  const [isChked, setChked] = useState(false);

  // 파티 목록
  const [partyList, setPartyList] = useState(null);
  // 최소 날짜 (오늘)
  const currentDate = new Date();
  // 최대 날짜 (한달 후)
  const maginot = new Date();
  maginot.setMonth(currentDate.getMonth() + 1);
  // 검색 기간
  const [period, setPeriod] = useState({ start: currentDate, end: maginot });

  // 최신 비디오 목록
  const [newVideoInfo, setNewVideoInfo] = useState(null);

  const navi = useNavigate();
  // 메인화면 로딩 시 페이지 맨 위로 끌어올리기
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // 컴포넌트가 마운트될 때 데이터 로드
  useEffect(() => {
    // 전체 이용할 수 있는 서비스 목록 불러오기
    // 로그인 아이디가 있을 때 추가로 만들 수 있는 서비스가 있다면 파티 만들기
    axios
      .get("/api/party/getService/" + getServiceId)
      .then((resp) => {
        console.log(resp.data);
        setService(Array.isArray(resp.data.list) ? resp.data.list : []);
        let joinArr = Array.isArray(resp.data.joinList)
          ? resp.data.joinList
          : [];
        if (joinArr.length > 0) {
          joinArr.sort();
          setJoinService(joinArr);
        }
      })
      .catch(() => {
        setService([]);
      });
  }, [loginId]);
  useEffect(() => {
    // 오늘부터 1달동안의 가입가능한 파티 불러오기
    let data = {
      start: period.start.toISOString(),
      end: period.end.toISOString(),
    };
    // 파티 목록 불러오기
    axios
      .get("/api/party/getPartyListForMain", { params: data })
      .then((resp) => {
        console.log(resp.data);
        console.log(partyList);
        setPartyList(resp.data);
      });
    // 최신 비디오 목록 불러오기
    axios
      .get("/api/external/youtube/latestvideo")
      .then((resp) => {
        setNewVideoInfo(resp.data);
        console.log(resp.data);
      })
      .catch((error) => {
        console.error("error reporting! : " + error);
      });
  }, []);

  // 파티 만들러 가기
  const handlePartyCreate = (e) => {
    console.log(e.currentTarget);
    const partyContentElement = e.currentTarget;
    const clickedElement = e.target;
    console.log(partyContentElement.dataset.id);
    if (
      clickedElement === partyContentElement ||
      partyContentElement.contains(clickedElement)
    ) {
      // partyContent 또는 그 자식 요소를 클릭한 경우에만 처리
      setSelectService(partyContentElement.dataset.id);
      setModalIsOpen(true);
      setChked(false);
    }

    console.log("stet" + selectService);
    // if (
    //   clickedElement === partyContentElement ||
    //   partyContentElement.contains(clickedElement)
    // ) {
    //   // partyContent 또는 그 자식 요소를 클릭한 경우에만 처리
    //   // setSelectService(partyContentElement.dataset.id);
    //   navi("/party/PartyJoin/PartyList", {
    //     state: { selectService: partyContentElement.dataset.id },
    //   });
    // }
  };

  // 서비스 정보 모달창 닫기
  const closeModal = () => {
    setModalIsOpen(false);
    setChked(false);
  };

  // 숫자를 천 단위로 콤마 찍어주는 함수
  const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // 시작일까지 남은 날짜 계산하는 함수
  const getStartDate = (value) => {
    let now = new Date();
    now.setHours(0, 0, 0, 0);
    now.setHours(now.getHours() + 9);
    const diff =
      (new Date(value).getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    if (diff === 0) {
      return (
        <>
          <span className={style.colorMainPurple}>오늘</span> 시작되는
        </>
      );
    } else if (diff < 0) {
      return (
        <>
          <span className={style.colorMainPurple}>현재</span> 진행중인
        </>
      );
    } else {
      return (
        <>
          <span className={style.colorMainPurple}>{diff}일 후</span> 시작되는
        </>
      );
    }
  };

  // 종료일 계산하는 함수
  const getEndDate = (date, period) => {
    let endDate = new Date(date);
    endDate.setMonth(endDate.getMonth() + period);
    return endDate.toISOString().slice(0, 10);
  };

  // 파티 만들기 페이지로 이동
  const goCreateParty = (e) => {
    if (loginId) {
      const contentElement = e.currentTarget;
      const clickedElement = e.target;

      if (
        clickedElement === contentElement ||
        contentElement.contains(clickedElement)
      ) {
        navi("/party/partyCreate");
      }
    } else {
      // 로그인하지않은 유저일 경우 로그인창으로 이동 혹은 현재 페이지 유지
      if (
        window.confirm(
          "로그인 후 이용 가능한 서비스입니다.\n로그인 화면으로 이동하시겠습니까?"
        )
      ) {
        navi("/member/login");
      }
    }
  };

  // 파티 찾기 페이지로 이동
  const handleSearchParty = () => {
    navi("/party/partyJoin");
  };

  if (newVideoInfo === null || service.length === 0 /*|| partyList === null*/) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className={`${style.mainDiv}`}>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          // navigation
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
        </Swiper>
      </div>
      <div
        className={`${style.rollingSlide}`}
        // onMouseEnter={onStop}
        // onMouseLeave={onRun}
      >
        <div className={`${style.original} ${animate ? "" : style.stop}`}>
          {service.map((e, i) => {
            if (e.id === joinService[jsId]) {
              joinPossible = false;
              jsId++;
            } else joinPossible = true;
            return (
              <div
                key={i}
                data-id={e.id}
                className={style.slideDiv}
                onMouseEnter={onStop}
                onMouseLeave={onRun}
              >
                <div className={style.slideImg}>
                  <img
                    src={`/assets/serviceLogo/${e.englishName}.png`}
                    alt={`${e.name} 로고 이미지`}
                  />
                </div>
                {joinPossible && loginId !== "" ? (
                  <div
                    className={style.partyCreate}
                    data-id={e.id}
                    onClick={handlePartyCreate}
                  >
                    <FontAwesomeIcon icon={faRightToBracket} />
                    <div>파티 만들기</div>
                  </div>
                ) : null}

                <div className={style.partyContent__name}>{e.name}</div>
              </div>
            );
          })}
        </div>
        <div className={`${style.clone} ${animate ? "" : style.stop}`}>
          {service.map((e, i) => {
            if (e.id === joinService[jsId]) {
              joinPossible = false;
              jsId++;
            } else joinPossible = true;
            return (
              <div
                key={i}
                data-id={e.id}
                className={style.slideDiv}
                onMouseEnter={onStop}
                onMouseLeave={onRun}
              >
                <div className={style.slideImg}>
                  <img
                    src={`/assets/serviceLogo/${e.englishName}.png`}
                    alt={`${e.name} 로고 이미지`}
                  />
                </div>
                {joinPossible && loginId !== "" ? (
                  <div
                    className={style.partyCreate}
                    data-id={e.id}
                    onClick={handlePartyCreate}
                  >
                    <FontAwesomeIcon icon={faRightToBracket} />
                    <div>파티 만들기</div>
                  </div>
                ) : null}

                <div className={style.partyContent__name}>{e.name}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* <ServiceInfoModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="정보 모달"
        selectService={selectService}
        width={450}
        height={430}
        isChked={isChked}
        setChked={setChked}
      ></ServiceInfoModal> */}

      <div className={style.partyCardList} class="partList">
        <div className={style.sectionTitle}>참여 가능한 파티</div>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          // navigation

          pagination={{ clickable: true }}
        >
          <div className={style.partySection}>
            {partyList !== null ? (
              Array.from({ length: Math.ceil(partyList.length / 4) }).map(
                (_, groupIndex) => (
                  <SwiperSlide key={groupIndex}>
                    {/* partyList를 4개씩 묶어서 매핑 */}
                    {partyList
                      .slice(groupIndex * 4, (groupIndex + 1) * 4)
                      .map((e, i) => (
                        <div
                          key={groupIndex * 4 + i}
                          className={style.party}
                          data-id={groupIndex * 4 + i}
                        >
                          <div className={style.partyLeft}>
                            <div className={style.partyTop}>
                              <div className={style.partyStartDate}>
                                {getStartDate(e.startDate)}
                                <span className={style.monthCount}>
                                  &nbsp;{e.monthCount}개월
                                </span>
                                파티
                              </div>
                              <div className={style.partyPrice}>
                                <div className={style.wonIcon}>
                                  <FontAwesomeIcon icon={faWonSign} />
                                </div>
                                <div>
                                  월
                                  {formatNumber(
                                    Math.ceil(e.price / e.maxPeopleCount) + 1000
                                  )}
                                  원
                                </div>
                              </div>
                            </div>
                            <div className={style.partyBottom}>
                              ~ {getEndDate(e.startDate, e.monthCount)}까지
                            </div>
                          </div>
                          <div className={style.partyRight}>
                            <img
                              src={`/assets/serviceLogo/${e.englishName}.png`}
                              alt={`${e.name} 로고 이미지`}
                            />
                          </div>
                        </div>
                      ))}
                  </SwiperSlide>
                )
              )
            ) : (
              // partyList.map((e, i) => {
              //   return (
              //     <SwiperSlide key={i}>
              //       <div className={style.party} data-id={i}>
              //         <div className={style.partyLeft}>
              //           <div className={style.partyTop}>
              //             <div className={style.partyStartDate}>
              //               {getStartDate(e.startDate)}
              //               <span className={style.monthCount}>
              //                 {e.monthCount}개월
              //               </span>
              //               파티
              //             </div>
              //             <div className={style.partyPrice}>
              //               <div className={style.wonIcon}>
              //                 <FontAwesomeIcon icon={faWonSign} />
              //               </div>
              //               <div>
              //                 월
              //                 {formatNumber(
              //                   Math.ceil(e.price / e.maxPeopleCount) + 1000
              //                 )}
              //                 원
              //               </div>
              //             </div>
              //           </div>
              //           <div className={style.partyBottom}>
              //             ~ {getEndDate(e.startDate, e.monthCount)}까지
              //           </div>
              //         </div>
              //         <div className={style.partyRight}>
              //           <img
              //             src={`/assets/serviceLogo/${e.englishName}.png`}
              //             alt={`${e.name} 로고 이미지`}
              //           />
              //         </div>
              //       </div>
              //     </SwiperSlide>
              //   );
              // })
              <div className={style.empty}>
                <div className={`${style.emptyIcon} ${style.centerAlign}`}>
                  <FontAwesomeIcon icon={faFaceSadTear} />
                </div>
                <div className={`${style.emptyTxt} ${style.centerAlign}`}>
                  비어있는 파티가 없어요.
                </div>
              </div>
            )}
          </div>
        </Swiper>
        <div className={style.partyBtns}>
          {partyList !== null ? (
            <PurpleRectangleBtn
              title={"파티 더보기"}
              activation={true}
              width={150}
              heightPadding={10}
              onClick={handleSearchParty}
            ></PurpleRectangleBtn>
          ) : (
            <PurpleRectangleBtn
              title={"파티 만들기"}
              activation={true}
              width={150}
              heightPadding={10}
            ></PurpleRectangleBtn>
          )}
        </div>
      </div>
      <div className={style.newVideoInfo}>
        <RenderNewVideo newVideoInfo={newVideoInfo} />
      </div>
    </>
  );
};

export default Main;

import style from "./Main.module.css";
import PurpleRectangleBtn from "../../components/PurpleRectangleBtn/PurpleRectangleBtn";
import RenderNewVideo from "../Board/components/RenderNewVideo/RenderNewVideo";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ServiceInfoModal from "../Party/PartyCreate/PartyCreateList/ServiceInfoModal/ServiceInfoModal";
import PartyJoinInfoModal from "../Party/PartyJoin/PartyList/PartyJoinInfoModal/PartyJoinInfoModal";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faWonSign,
  faHandshakeSimple,
} from "@fortawesome/free-solid-svg-icons";
import { faFaceSadTear } from "@fortawesome/free-regular-svg-icons";
import { useContext, useEffect, useState } from "react";
// import Swiper core and required modules
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginContext, JoinPartyContext } from "../../App";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Main = () => {
  const { loginId } = useContext(LoginContext);

  // 메인 배너 모집중인 파티 개수
  const [partyCount, setPartyCount] = useState(0);
  // 현재 시간 기준
  const [nowTime, setNowTime] = useState("");

  const getServiceId = "전체";
  // 서비스 목록
  const [serviceList, setServiceList] = useState([]);
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

  // 무한 롤링 애니메이션 설정
  const [animate, setAnimate] = useState(true);
  const onStop = () => setAnimate(false); // 멈춤
  const onRun = () => {
    if (!modalIsOpen) {
      setAnimate(true);
    }
  }; // 재생

  // 파티 목록
  const [partyList, setPartyList] = useState(null);
  // 파티 가입 모달창 열림 / 닫힘
  const [joinModalIsOpen, setJoinModalIsOpen] = useState(false);
  // 최소 날짜 (오늘)
  const currentDate = new Date();
  // 최대 날짜 (한달 후)
  const maginot = new Date();
  maginot.setMonth(currentDate.getMonth() + 1);
  // 검색 기간
  const [period, setPeriod] = useState({ start: currentDate, end: maginot });

  // 최신 비디오 목록
  const [newVideoInfo, setNewVideoInfo] = useState(null);
  // 선택한 파티
  const { selectParty, setSelectParty, service, setService } =
    useContext(JoinPartyContext);

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
        setServiceList(Array.isArray(resp.data.list) ? resp.data.list : []);
        let joinArr = Array.isArray(resp.data.joinList)
          ? resp.data.joinList
          : [];
        if (joinArr.length > 0) {
          joinArr.sort();
          setJoinService(joinArr);
        }
      })
      .catch(() => {
        setServiceList([]);
      });
  }, [loginId]);
  useEffect(() => {
    // 파티 목록 불러오기
    axios.get("/api/party/getPartyListForMain").then((resp) => {
      setPartyList(resp.data);
    });
    // 최신 비디오 목록 불러오기
    axios
      .get("/api/external/youtube/latestvideo")
      .then((resp) => {
        setNewVideoInfo(resp.data);
      })
      .catch((error) => {
        console.error("error reporting! : " + error);
      });
    axios.get("/api/party/selectAllPartyCountForMain").then((resp) => {
      let count = resp.data;
      // partyCount를 두 자리 숫자로 변환
      const formattedCount = String(count).padStart(2, "0");
      setPartyCount(formattedCount);
    });

    const updateCurrentTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1; // 월은 0부터 시작하므로 +1
      const day = now.getDate();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      // 오후/오후 구분
      const ampm = hours >= 12 ? "오후" : "오전";
      const displayHours = hours % 12 || 12; // 12시간 표시

      const formattedTime = `${year}.${month}.${day} ${ampm} ${displayHours}:${minutes}`;
      setNowTime(formattedTime + "기준");
    };

    // 페이지가 마운트될 때와 함께 첫 번째 시간 업데이트 실행
    updateCurrentTime();
  }, []);

  // 파티 만들러 가기
  const handlePartyCreate = (e) => {
    const partyContentElement = e.currentTarget;
    const clickedElement = e.target;
    if (
      clickedElement === partyContentElement ||
      partyContentElement.contains(clickedElement)
    ) {
      // partyContent 또는 그 자식 요소를 클릭한 경우에만 처리
      setSelectService(partyContentElement.dataset.id);
      setModalIsOpen(true);
      setChked(false);
      console.log("durl");
      console.log(animate);
      onStop();
      // setAnimate(false);
    }
  };

  // 파티 가입 모달창 열기
  const handleJoinModal = (e) => {
    const contentElement = e.currentTarget;
    const clickedElement = e.target;
    console.log(contentElement);
    console.log(clickedElement);

    if (
      clickedElement === contentElement ||
      contentElement.contains(clickedElement)
    ) {
      setJoinModalIsOpen(true);
      setSelectParty(
        partyList.find(
          (obj) => obj.id == contentElement.getAttribute("data-id")
        )
      );

      const selectedObj = partyList.find(
        (obj) => obj.id == contentElement.getAttribute("data-id")
      );

      const selectServiceId = selectedObj ? selectedObj.serviceId : null;
      const serviceObj = serviceList.find((obj) => obj.id === selectServiceId);
      setService(serviceObj);
    }
  };

  useEffect(() => {
    if (!modalIsOpen) {
      onRun();
    }
  }, [modalIsOpen]);

  // 서비스 정보 모달창 닫기
  const closeModal = () => {
    setModalIsOpen(false);
    setChked(false);
    onRun();
  };

  // 파티 가입 모달창 닫기
  const closeJoinModal = () => {
    setJoinModalIsOpen(false);
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

  // 파티 찾기 페이지로 이동
  const handleSearchParty = () => {
    navi("/party/partyJoin");
  };

  // 로그인하기로 이동
  const handleGoLogin = () => {
    navi("/member/login");
  };

  if (newVideoInfo === null || serviceList.length === 0 || partyList === null) {
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
          // navigation={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <div className={style.slideBackground}>
              <div className={style.slideGuide}>
                <div className={style.slideLeft}>
                  <div className={style.title}>
                    1등 공동 구독 플랫폼 <br></br>Mingle
                  </div>
                  <div className={style.slideConf}>
                    {serviceList[0].name}부터{" "}
                    {serviceList[serviceList.length - 1].name}까지
                    <br></br>더 안전하게 밍글과 함께하세요<br></br>
                  </div>
                  <div className={style.btns}>
                    <PurpleRectangleBtn
                      title={"밍글 시작하기"}
                      width={220}
                      heightPadding={20}
                      activation={true}
                      onClick={handleGoLogin}
                    ></PurpleRectangleBtn>
                  </div>
                  <div className={style.naviBtn}>01 | 02</div>
                </div>
                <div className={style.slideRight}>
                  <img
                    src="/assets/MainSlide/mainSlide01.png"
                    alt="메인슬라이드1"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={`${style.slideBackground} ${style.yellowBack}`}>
              <div className={style.slideGuide}>
                <div className={style.slideLeft}>
                  <div className={style.title}>
                    파티에 참여해보세요! <br></br>지금 모집중인 파티는
                    대기중&nbsp;
                    <FontAwesomeIcon icon={faHandshakeSimple} />
                  </div>
                  <div className={style.slideConf}>
                    넷플릭스부터 오피스 365까지<br></br>나에게 딱 맞는 파티를
                    찾아보세요!
                  </div>
                  <div className={style.btns}>
                    <PurpleRectangleBtn
                      title={"나에게 맞는 파티 찾기"}
                      width={220}
                      heightPadding={20}
                      activation={true}
                      onClick={handleSearchParty}
                    ></PurpleRectangleBtn>
                  </div>
                  <div className={style.naviBtn}>02 | 02</div>
                </div>
                <div className={style.slideRight}>
                  <div className={style.noneImgBanner}>
                    <div className={style.partyCountBox}>
                      <div className={style.partyCount}>{partyCount}</div>
                      <div>명</div>
                    </div>
                    <div className={style.nowTime}>{nowTime}</div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className={`${style.rollingSlide}`}>
        <div className={`${style.original} ${animate ? "" : style.stop}`}>
          {serviceList.map((e, i) => {
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
                // onClick={handleCreate}
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
          {serviceList.map((e, i) => {
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
      <div className={`${style.partyCardList} ${partyList}`} id="partyList">
        <div className={style.sectionTitle}>참여 가능한 파티</div>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          <div className={style.partySection}>
            {partyList !== null ? (
              Array.from({ length: Math.ceil(partyList.length / 4) }).map(
                (_, groupIndex) => (
                  <SwiperSlide
                    key={groupIndex}
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* partyList를 4개씩 묶어서 매핑 */}
                    {partyList
                      .slice(groupIndex * 4, (groupIndex + 1) * 4)
                      .map((e, i) => (
                        <div
                          key={groupIndex * 4 + i}
                          className={style.party}
                          data-id={e.id}
                          onClick={handleJoinModal}
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
      <ServiceInfoModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="정보 모달"
        selectService={selectService}
        width={450}
        height={430}
        isChked={isChked}
        setChked={setChked}
      ></ServiceInfoModal>
      <PartyJoinInfoModal
        isOpen={joinModalIsOpen}
        onRequestClose={closeJoinModal}
        contentLabel="파티 가입 모달"
        width={500}
        height={670}
      ></PartyJoinInfoModal>
    </>
  );
};

export default Main;

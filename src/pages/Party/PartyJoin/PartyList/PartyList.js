import style from "./PartyList.module.css";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWonSign,
  faCirclePlus,
  faMagnifyingGlass,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import { faFaceSadTear, faCalendar } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import SearchDateModal from "./SearchDateModal/SearchDateModal";
import { LoginContext } from "../../../../App";
import PartyJoinInfoModal from "./PartyJoinInfoModal/PartyJoinInfoModal";
import { JoinPartyContext } from "../../../../App";

const PartyList = () => {
  const { selectService } = useContext(JoinPartyContext);
  const [partyList, setPartyList] = useState();
  const [isLoading, setLoading] = useState(false);
  const [price, setPrice] = useState();
  const navi = useNavigate();

  // 선택한 파티
  const { setSelectParty, service, setService } = useContext(JoinPartyContext);

  // 로그인 정보
  const { loginId, loginStatus } = useContext(LoginContext);

  // 검색할 파티일자 선택 모달창 열림 / 닫힘
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // 파티 가입 모달창 열림 / 닫힘
  const [joinModalIsOpen, setJoinModalIsOpen] = useState(false);

  // 최소 날짜 (오늘)
  const currentDate = new Date();
  // 최대 날짜 (한달 후)
  const maginot = new Date();
  maginot.setMonth(currentDate.getMonth() + 1);
  // 검색 기간
  const [period, setPeriod] = useState({ start: currentDate, end: maginot });


  // 서비스 목록 불러오기
  useEffect(() => {
    setLoading(true);

    // 새로고침 혹은 비정상접근 감지
    if(selectService===undefined || selectService===""){
      navi("/party/partyJoin");
      return;
    }

    axios
      .get(`/api/party/getServiceById/${selectService}`)
      .then((resp) => {
        setService(resp.data);
        setPrice(
          formatNumber(
            Math.ceil(resp.data.price / resp.data.maxPeopleCount) + 1000
          )
        );
        
        if(loginStatus === "confirm"){
          axios
          .get(`/api/party/getPartyList/${selectService}`)
          .then((resp) => {
            setPartyList(resp.data);
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
        }   
      })
      .catch(() => {
        setLoading(false);
      });
  }, [selectService, loginStatus]);

  // 날짜로 검색
  useEffect(() => {
    setLoading(true);
    let data = {
      start: period.start.toISOString(),
      end: period.end.toISOString(),
    };
    axios
      .get(`/api/party/getPartyListByStartDate/${selectService}`, {
        params: data,
      })
      .then((resp) => {
        setPartyList(resp.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [period]);

  // 카테고리 불러오기 로딩
  if (isLoading) {
    return <LoadingSpinner />;
  }

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

  // 파티 매칭 페이지로 이동
  const goMatchingParty = (e) => {
    if (loginId) {
      const contentElement = e.currentTarget;
      const clickedElement = e.target;

      if (
        clickedElement === contentElement ||
        contentElement.contains(clickedElement)
      ) {
        alert("열심히 기능을 만들고 있어요!\n고객님들의 편의를 위해 노력하겠습니다.^_^");
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

  // 검색할 날짜 출력
  const getSearchDate = () => {
    if (period.start === period.end)
      return <>{period.start.toISOString().slice(5, 10)}</>;
    else {
      return (
        <>
          {period.start.toISOString().slice(5, 10)} ~{" "}
          {period.end.toISOString().slice(5, 10)}
        </>
      );
    }
  };

  // 오늘 시작하는 파티 검색
  const handleToday = (e) => {
    const contentElement = e.currentTarget;
    const clickedElement = e.target;

    if (
      clickedElement === contentElement ||
      contentElement.contains(clickedElement)
    ) {
      setLoading(true);
      let now = new Date();
      now.setHours(0, 0, 0, 0);
      now.setHours(now.getHours() + 9);

      setPeriod({ start: now, end: now });
    }
  };

  // 검색할 파티 기간 설정 (모달창 열기)
  const handleSetPeriod = (e) => {
    const contentElement = e.currentTarget;
    const clickedElement = e.target;

    if (
      clickedElement === contentElement ||
      contentElement.contains(clickedElement)
    ) {
      setModalIsOpen(true);
    }
  };

  // 파티 시작일 모달창 닫기
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // 파티 가입 모달창 열기
  const handleJoinModal = (e) => {
    const contentElement = e.currentTarget;
    const clickedElement = e.target;

    if (
      clickedElement === contentElement ||
      contentElement.contains(clickedElement)
    ) {
      setJoinModalIsOpen(true);
      setSelectParty(partyList[contentElement.dataset.id]);
    }
  };

  // 파티 가입 모달창 닫기
  const closeJoinModal = () => {
    setJoinModalIsOpen(false);
  };

  return (
    <div className={style.body}>
      {service && partyList? (
        <>
          <div className={`${style.dflex} ${style.m35}`}>
            <div className={`${style.bigTitle} ${style.w70}`}>
              <div className={style.colorMainPurple}>
                {service.name} {service.plan}
              </div>
              파티를 찾아드릴게요.
            </div>
            <div className={`${style.w30} ${style.hAlignEnd}`}>
              <img
                src={`/assets/serviceLogo/${service.englishName}.png`}
                alt={`${service.name} 로고 이미지`}
                className={`${style.logoImg} ${style.VAlign}`}
              ></img>
            </div>
          </div>
          <div className={`${style.periodBtns} ${style.dflex}`}>
            <div
              className={`${style.periodBtn} ${style.period}`}
              onClick={handleSetPeriod}
            >
              <div className={style.periodIcon}>
                <FontAwesomeIcon icon={faCalendar} />
              </div>
              파티 시작일
              <div className={`${style.periodDate}`}>{getSearchDate()}</div>
            </div>
            <div className={style.periodBtn} onClick={handleToday}>
              <div className={style.periodIcon}>
                <FontAwesomeIcon icon={faBolt} />
              </div>
              오늘 시작
            </div>
          </div>
          <div className={`${style.partyList}`}>
            <div className={style.subTitle}>파티 검색 결과</div>
            {
              // 가입 가능한 파티가 있는 경우
              partyList ? (
                partyList.map((e, i) => (
                  <div
                    key={i}
                    className={`${style.party}`}
                    data-id={i}
                    onClick={handleJoinModal}
                  >
                    <div className={`${style.partyTop} ${style.dflex}`}>
                      <div
                        className={`${style.partyStartDate} ${style.title} ${style.w70}`}
                      >
                        {getStartDate(e.startDate)}
                        <span className={style.colorMainPurple}>
                          {" "}
                          {e.monthCount}개월
                        </span>{" "}
                        파티
                      </div>
                      <div
                        className={`${style.price} ${style.centerAlign} ${style.w30}`}
                      >
                        <div
                          className={`${style.wonIcon} ${style.centerAlign}`}
                        >
                          <FontAwesomeIcon icon={faWonSign} />
                        </div>
                        월 {price}원
                      </div>
                    </div>
                    <div className={`${style.partyBottom}`}>
                      ~ {getEndDate(e.startDate, e.monthCount)} 까지
                    </div>
                  </div>
                ))
              ) : (
                // 가입 가능한 파티가 없는 경우
                <div className={style.empty}>
                  <div className={`${style.emptyIcon} ${style.centerAlign}`}>
                    <FontAwesomeIcon icon={faFaceSadTear} />
                  </div>
                  <div className={`${style.emptyTxt} ${style.centerAlign}`}>
                    비어있는 파티가 없어요.
                  </div>
                </div>
              )
            }
            <SearchDateModal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="날짜 선택 모달"
              width={450}
              height={670}
              period={period}
              setPeriod={setPeriod}
            ></SearchDateModal>

            <PartyJoinInfoModal
              isOpen={joinModalIsOpen}
              onRequestClose={closeJoinModal}
              contentLabel="파티 가입 모달"
              width={500}
              height={670}
            ></PartyJoinInfoModal>

            <div className={`${style.others}`}>
              <div className={`${style.subTitle}`}>원하는 파티가 없다면</div>
              <div
                className={`${style.party} ${style.dflex}`}
                onClick={goMatchingParty}
              >
                <div className={style.left}>
                  <div className={`${style.title}`}>파티 매칭하기</div>
                  <div className={`${style.othersExplain}`}>
                    원하는 조건의 파티가 열리면 바로 매칭돼요 !
                  </div>
                </div>
                <div className={style.right}>
                  <div className={style.othersIcon}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </div>
                </div>
              </div>
              <div
                className={`${style.party} ${style.dflex}`}
                onClick={goCreateParty}
              >
                <div className={style.left}>
                  <div className={`${style.title}`}>파티 만들기</div>
                  <div className={`${style.othersExplain}`}>
                    원하는 조건이 있다면 직접 만들어 보세요 !
                  </div>
                </div>
                <div className={style.right}>
                  <div className={style.othersIcon}>
                    <FontAwesomeIcon icon={faCirclePlus} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default PartyList;

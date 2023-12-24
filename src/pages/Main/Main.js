import style from "./Main.module.css";
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
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
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

  // 최신 비디오 목록
  const [newVideoInfo, setNewVideoInfo] = useState(null);

  const navi = useNavigate();

  // 컴포넌트가 마운트될 때 데이터 로드
  useEffect(() => {
    // 전체 이용할 수 있는 서비스 목록 불러오기
    axios
      .get("/api/party/getServiceMainPage")
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

  const [animate, setAnimate] = useState(true);
  const onStop = () => setAnimate(false);
  const onRun = () => setAnimate(true);

  if (newVideoInfo === null || service.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className={`${style.mainDiv}`}></div>
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
                {joinPossible ? (
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
                {joinPossible ? (
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
      <div className={style.newVideoInfo}>
        <RenderNewVideo newVideoInfo={newVideoInfo} />
      </div>
    </>
  );
};

export default Main;

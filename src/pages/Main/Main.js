import style from "./Main.module.css";
import GrayRectangleBtn from "../../components/GrayRectangleBtn/GrayRectangleBtn";
import PurpleRectangleBtn from "../../components/PurpleRectangleBtn/PurpleRectangleBtn";
import PurpleRoundBtn from "../../components/PurpleRoundBtn/PurpleRoundBtn";
import WhiteRectangleBtn from "../../components/WhiteRectangleBtn/WhiteRectangleBtn";
import WhiteRoundBtn from "../../components/WhiteRoundBtn/WhiteRoundBtn";
import RenderNewVideo from "../Board/components/RenderNewVideo/RenderNewVideo";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import axios from "axios";

import { useContext, useEffect, useState } from "react";

const Main = () => {
  // 서비스 목록
  const [service, setService] = useState([]);
  // 최신 비디오 목록
  const [newVideoInfo, setNewVideoInfo] = useState(null);

  // 컴포넌트가 마운트될 때 데이터 로드
  useEffect(() => {
    // 전체 이용할 수 있는 서비스 목록 불러오기
    axios
      .get("/api/party/getServiceMainPage")
      .then((resp) => {
        console.log(resp.data);
        setService(Array.isArray(resp.data) ? resp.data : []);
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

  if (newVideoInfo === null || service.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className={`${style.mainDiv}`}></div>
      <div className={style.rollingSlide}>
        {service.map((e, i) => {
          return (
            <>
              <div key={i} data-id={e.id} className={style.slideDiv}>
                <img
                  src={`/assets/serviceLogo/${e.englishName}.png`}
                  alt={`${e.name} 로고 이미지`}
                />
                <div className={style.partyContent__name}>{e.name}</div>
              </div>
            </>
          );
        })}
      </div>
      <div className={style.newVideoInfo}>
        <RenderNewVideo newVideoInfo={newVideoInfo} />
      </div>
    </>
  );
};

export default Main;

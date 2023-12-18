import style from "./PwCertification.module.css";
import WhiteRoundBtn from "../../../../../components/WhiteRoundBtn/WhiteRoundBtn";
import PurpleRectangleBtn from "../../../../../components/PurpleRectangleBtn/PurpleRectangleBtn";

import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PwCertification = () => {
  const [user, setUser] = useState({ id: "", name: "", email: "" });
  const [certificationNum, setCertificationNum] = useState("");
  const [timeSeconds, setTimerSeconds] = useState(180); // 초기 시간 설정 (3분)
  const [timerStart, setTimerStart] = useState(false);
  const navi = useNavigate();

  // user State 값 채우기
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // 인증 번호 state 값 채우기
  const handleCertificaton = (e) => {
    const { value } = e.target;
    setCertificationNum(value);
  };

  // 타이머 로직
  useEffect(() => {
    const updateCountdown = () => {
      const minutes = Math.floor(timeSeconds / 60);
      const seconds = timeSeconds % 60;

      // 시간을 2자리 숫자로 표시
      const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
        seconds
      ).padStart(2, "0")}`;

      if (timerStart) {
        // 시간 업데이트
        setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
        // 인증 시간 초과 시
        if (timeSeconds === 0) {
          setTimerStart(false);
          alert("인증 시간이 초과되었습니다.");
        }
      }
    };

    // 1초마다 업데이트
    const timerId = setInterval(updateCountdown, 1000);

    // 컴포넌트가 언마운트되면 타이머 정리
    return () => clearInterval(timerId);
  }, [timeSeconds, timerStart]);

  // 본인 인증 눌렀을 때
  const handleCertification = () => {
    // 다시 누르면 인증번호 재 발송
    setTimerSeconds(180);
    alert(
      "인증번호가 발송되었습니다. 메일을 확인해주세요. \n 메일이 도착하지 않을 경우 스팸 메일함을 확인해주세요."
    );

    // 타이머 시작
    setTimerStart(true);
  };

  // 로그인하러가기 눌렀을 때
  const handleLogin = () => {
    navi("/member/login");
  };
  return (
    <div className={style.findInfoBox}>
      <div className={style.title}>비밀번호 변경하기</div>
      <div className={style.inputBox}>
        <div className={style.inputTitle}>아이디</div>
        <input
          type="text"
          placeholder="아이디를 입력해주세요."
          onChange={handleChange}
          name="id"
          value={user.name}
        />
      </div>
      <div className={style.inputBox}>
        <div className={style.inputTitle}>이름</div>
        <input
          type="text"
          placeholder="이름을 입력해주세요."
          onChange={handleChange}
          name="name"
          value={user.name}
        />
      </div>
      <div className={style.inputBox}>
        <div className={style.inputTitle}>이메일</div>
        <div className={style.emailBox}>
          <input
            type="text"
            placeholder="회원가입에 사용한 이메일을 입력해주세요."
            onChange={handleChange}
            name="email"
            value={user.email}
          />
          <WhiteRoundBtn
            title={"본인인증"}
            onClick={handleCertification}
          ></WhiteRoundBtn>
        </div>
      </div>
      <div className={style.inputBox}>
        <div className={style.inputTitle}>인증번호</div>
        <input
          type="text"
          placeholder="인증번호를 입력해주세요."
          onChange={handleCertificaton}
          value={certificationNum}
        />
        <div className={style.timer}>{`${String(
          Math.floor(timeSeconds / 60)
        ).padStart(2, "0")}:${String(timeSeconds % 60).padStart(2, "0")}`}</div>
      </div>
      <PurpleRectangleBtn
        title={"비밀번호 변경"}
        width={400}
        heightPadding={10}
      ></PurpleRectangleBtn>
      <div className={style.goLogin} onClick={handleLogin}>
        로그인 하러가기
      </div>
    </div>
  );
};

export default PwCertification;

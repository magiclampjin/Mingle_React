import style from "./IdCertification.module.css";
import WhiteRoundBtn from "../../../../../components/WhiteRoundBtn/WhiteRoundBtn";
import PurpleRectangleBtn from "../../../../../components/PurpleRectangleBtn/PurpleRectangleBtn";
import LoadingSpinner from "../../../../../components/LoadingSpinner/LoadingSpinner";
import axios from "axios";

import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FindIdContext } from "../FindId";

const IdCertification = () => {
  const { user, setUser } = useContext(FindIdContext); //사용자 정보
  const [certificationNum, setCertificationNum] = useState(""); //인증번호
  const [timeSeconds, setTimerSeconds] = useState(180); // 초기 시간 설정 (3분)
  const [timerStart, setTimerStart] = useState(false); // 타이머 시작 여부
  // 입력값 유효성 검사 결과
  const [checkText, setCheckText] = useState({
    name: "",
    email: "",
  });

  // 본인인증 조건 검사
  const [findIdConditions, setFindIdConditions] = useState({
    name: false,
    email: false,
  });
  const [findId, setFindId] = useState(false); // 아이디 찾기 활성화 여부
  const [isLoading, setLoading] = useState(false); // 본인 인증 시 로딩바
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

  // 유효성 검사 결과 텍스트
  const handleCondition = (key, value) => {
    setFindIdConditions((prev) => ({ ...prev, [key]: value }));
  };

  // 타이머 로직
  useEffect(() => {
    const updateCountdown = () => {
      const minutes = Math.floor(timeSeconds / 60);
      const seconds = timeSeconds % 60;

      if (timerStart) {
        // 시간 업데이트
        setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
        // 인증 시간 초과 시
        if (timeSeconds === 0) {
          setTimerStart(false);
          setFindId(false);
          alert("인증 시간이 초과되었습니다.");
        }
      }
    };

    // 1초마다 업데이트
    const timerId = setInterval(updateCountdown, 1000);

    // 컴포넌트가 언마운트되면 타이머 정리
    return () => clearInterval(timerId);
  }, [timeSeconds, timerStart]);

  // 이름 유효성 검사
  useEffect(() => {
    if (user.name !== "") {
      // 정규식 : 한글 2~5글자인지 검사
      let regexName = /^[가-힣]{2,5}$/;
      let resultName = regexName.test(user.name);

      // 이름 형식이 올바를때
      if (resultName) {
        setCheckText((prev) => ({ ...prev, name: "" }));
        handleCondition("name", true);
      } else {
        // 이름 형식이 올바르지 않을 때
        setCheckText((prev) => ({
          ...prev,
          name: "이름 형식이 올바르지 않습니다. 한글 2~5글자로 입력해주세요.",
        }));
        handleCondition("name", false);
      }
    } else {
      setCheckText((prev) => ({ ...prev, name: "" }));
      handleCondition("name", false);
    }
  }, [user.name]);

  // 이메일 유효성 검사
  useEffect(() => {
    if (user.email !== "") {
      // 정규식 : 영문 대소문자,숫자, 밑줄(_)이 오고, @다음 메인 도메인+점(.)+서브도메인
      let regexEmail = /^[a-zA-Z0-9_]+@[a-z]+\.[a-z]+(\.*[a-z])*$/;
      let resultEmail = regexEmail.test(user.email);
      if (resultEmail) {
        // 이메일 형식이 올바를 때
        setCheckText((prev) => ({ ...prev, email: "" }));
        handleCondition("email", true);
      } else {
        // 이메일 형식이 올바르지 않을때
        setCheckText((prev) => ({
          ...prev,
          email: "이메일 형식이 올바르지 않습니다.",
        }));
        handleCondition("email", false);
      }
    } else {
      setCheckText((prev) => ({ ...prev, email: "" }));
      handleCondition("email", false);
    }
  }, [user.email]);

  // 본인 인증 눌렀을 때
  const handleCertification = () => {
    // 다시 누르면 인증번호 재 발송
    if (findIdConditions.name && findIdConditions.email) {
      setLoading(true);
      axios.post("/api/member/verificationEmail", user).then((resp) => {
        if (resp.data) {
          // 본인 인증이 성공하고 메일 발송을 마침
          setLoading(false);
          // 타이머 시간 세팅
          setTimerSeconds(180);
          // 타이머 시작
          setTimerStart(true);
          alert(
            "인증번호가 발송되었습니다. 메일을 확인해주세요. \n 메일이 도착하지 않을 경우 스팸 메일함을 확인해주세요."
          );
        } else {
          setLoading(false);
          alert("해당 정보로 회원가입된 기록이 없습니다.");
        }
      });
    } else {
      alert("이름과 이메일 정보를 모두 입력해주세요.");
    }
  };

  // 로그인하러가기 눌렀을 때
  const handleLogin = () => {
    navi("/member/login");
  };

  // 인증 번호 입력시 아이디 찾기 기능 활성화
  useEffect(() => {
    if (certificationNum !== "") {
      setFindId(true);
    }
  }, [certificationNum]);

  // 아이디 찾기 눌렀을 때
  const handleFindId = () => {
    if (findId) {
      const formData = new FormData();
      formData.append("code", certificationNum);
      axios.post("/api/member/certification/id", formData).then((resp) => {
        if (resp.data) {
          // 본인인증 코드가 일치하면
          navi("/member/findInfo/id/find");
        } else {
          alert("본인 인증 코드가 일치하지 않습니다.");
          // 정보 초기화
          setUser({ name: "", email: "" });
          setCertificationNum("");
          setFindId(false);
          setTimerStart(false);
          setTimerSeconds(180);
        }
      });
    } else {
      alert("이름과 이메일 정보를 통해 본인 인증을 완료해주세요.");
    }
  };

  // 엔터키로 인증완료 감지
  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      handleFindId();
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={style.findInfoBox}>
      <div className={style.title}>아이디 찾기</div>
      <div className={style.inputBox}>
        <div className={style.inputTitle}>이름</div>
        <input
          type="text"
          placeholder="이름을 입력해주세요."
          onChange={handleChange}
          name="name"
          value={user.name}
        />
        <div className={style.check}>{checkText.name}</div>
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
        <div className={style.check}>{checkText.email}</div>
      </div>
      <div className={style.inputBox}>
        <div className={style.inputTitle}>인증번호</div>
        <input
          type="text"
          placeholder="인증번호를 입력해주세요."
          onChange={handleCertificaton}
          onKeyDown={handleKeyPress}
          value={certificationNum}
        />
        <div className={style.timer}>{`${String(
          Math.floor(timeSeconds / 60)
        ).padStart(2, "0")}:${String(timeSeconds % 60).padStart(2, "0")}`}</div>
      </div>
      <PurpleRectangleBtn
        title={"아이디 찾기"}
        width={400}
        heightPadding={10}
        activation={findId}
        onClick={handleFindId}
      ></PurpleRectangleBtn>
      <div className={style.goLogin} onClick={handleLogin}>
        로그인 하러가기
      </div>
    </div>
  );
};

export default IdCertification;

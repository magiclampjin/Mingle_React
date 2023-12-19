import style from "./PwChange.module.css";
import PurpleRectangleBtn from "../../../../../components/PurpleRectangleBtn/PurpleRectangleBtn";
import axios from "axios";

import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FindPwContext } from "../FindPw";

const PwChange = () => {
  const { user } = useContext(FindPwContext); //사용자 정보
  const [update, setUpdate] = useState({ id: "", password: "" });
  // 비밀번호 확인 input value
  const [pwCheckText, setPwCheckText] = useState("");
  // 입력값 유효성 검사 결과
  const [checkText, setCheckText] = useState({
    password: "",
    pwCheck: "",
  });
  // 비밀번호 변경 조건 검사
  const [changePwConditions, setChangePwConditions] = useState({
    password: false,
    pwCheck: false,
  });
  const [changePw, setChangePw] = useState(false); // 비밀번호 변경 활성화 여부
  const navi = useNavigate();

  // 글씨 색 변경 css
  const colorStyle = (check) => {
    return {
      color: check ? "forestgreen" : "#ff4500",
    };
  };

  useEffect(() => {
    // 비밀번호를 변경할 id 설정
    if (user.id !== "") {
      setUpdate((prev) => ({ ...prev, id: user.id }));
    }
  }, []);

  useEffect(() => {
    console.log(update);
    console.log(pwCheckText);
    console.log(changePwConditions);
  }, [update, pwCheckText]);

  // user State 값 채우기
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name !== "pwCheck") {
      setUpdate((prev) => ({ ...prev, [name]: value }));
    } else {
      setPwCheckText(value);
    }
  };

  // 유효성 검사 결과 텍스트
  const handleCondition = (key, value) => {
    console.log(key);
    setChangePwConditions((prev) => ({ ...prev, [key]: value }));
  };

  // 비밀번호 변경 조건이 모두 맞는지 확인
  useEffect(() => {
    if (changePwConditions.password && changePwConditions.pwCheck) {
      setChangePw(true);
    } else {
      setChangePw(false);
    }
  }, [changePwConditions]);

  // 비밀번호 유효성 검사
  useEffect(() => {
    if (update.password !== "") {
      // 비밀번호 input에 값이 있을 때
      // 정규식 : 특수문자 1개, 대문자 1개, 소문자 1개가 모두 포함된 8~30글자
      let regexPw =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,30}$/;
      let resultPw = regexPw.test(update.password);
      if (resultPw) {
        // 정규식 검사 통과
        setCheckText((prev) => ({
          ...prev,
          password: "사용가능한 비밀번호입니다.",
        }));
        handleCondition("password", true);
        if (pwCheckText !== "" && pwCheckText === update.password) {
          // 비밀번호랑 비밀번호 확인이랑 값이 일치할 때
          setCheckText((prev) => ({
            ...prev,
            pwCheck: "비밀번호가 일치합니다.",
          }));
          handleCondition("pwCheck", true);
        } else if (pwCheckText !== "") {
          setCheckText((prev) => ({
            ...prev,
            pwCheck: "비밀번호가 일치하지 않습니다.",
          }));
          handleCondition("pwCheck", false);
        }
      } else {
        // 비밀번호 형식 불일치
        setCheckText((prev) => ({
          ...prev,
          password: "8~30자의 영문 대소문자, 숫자 밑 특수문자를 사용하세요.",
        }));
        handleCondition("password", false);

        if (pwCheckText !== "" && pwCheckText !== update.password) {
          // 비밀번호랑 비밀번호 확인이랑 값이 일치하지 않을 때
          setCheckText((prev) => ({
            ...prev,
            pwCheck: "비밀번호가 일치하지 않습니다.",
          }));
          handleCondition("pwCheck", false);
        }
      }
    } else {
      if (pwCheckText !== "") {
        setCheckText((prev) => ({
          ...prev,
          pwCheck: "비밀번호를 입력해주세요.",
        }));
        handleCondition("pwCheck", false);
      }
      // 비밀번호 input에 값이 없을 때
      setCheckText((prev) => ({ ...prev, password: "" }));
      handleCondition("password", false);
    }
  }, [update.password]);

  // 비밀번호 확인 일치 검사
  useEffect(() => {
    if (pwCheckText !== "") {
      // 비밀번호 확인 input에 값이 있을 때
      if (update.password !== "") {
        // 비밀번호 input에 값이 있을 때
        if (pwCheckText === update.password) {
          // 비밀번호랑 비밀번호 확인이랑 값이 일치할 때
          setCheckText((prev) => ({
            ...prev,
            pwCheck: "비밀번호가 일치합니다.",
          }));
          handleCondition("pwCheck", true);
        } else {
          // 비밀번호랑 비밀번호 확인이랑 값이 일치하지 않을 때
          setCheckText((prev) => ({
            ...prev,
            pwCheck: "비밀번호가 일치하지 않습니다.",
          }));
          handleCondition("pwCheck", false);
        }
      } else {
        // 비밀번호 input에 값이 없을 때
        setCheckText((prev) => ({
          ...prev,
          pwCheck: "비밀번호를 입력해주세요.",
        }));
        handleCondition("pwCheck", false);
      }
    } else {
      // 비밀번호 확인 input에 값이 없을 때
      setCheckText((prev) => ({ ...prev, pwCheck: "" }));
      handleCondition("pwCheck", false);
    }
  }, [pwCheckText]);

  const handleChangePw = () => {
    if (changePw) {
      axios.post("/api/member/updatePw", update).then((resp) => {
        if (resp.data) {
          alert("비밀번호 변경이 완료되었습니다.");
          navi("/member/login");
        } else {
          alert("비밀번호 변경에 실패하였습니다.");
          navi("/member/findInfo/pw");
        }
      });
    }
  };

  // 로그인하러가기 눌렀을 때
  const handleLogin = () => {
    navi("/member/login");
  };

  return (
    <div className={style.pwChange}>
      <div className={style.title}>비밀번호 변경하기</div>
      <div className={style.inputBox}>
        <div className={style.inputTitle}>비밀번호</div>
        <input
          type="password"
          placeholder="8~30자의 영문 대소문자, 숫자 및 특수문자를 사용하세요."
          onChange={handleChange}
          name="password"
          value={update.password}
        />
        <div
          className={style.check}
          style={colorStyle(changePwConditions.password)}
        >
          {checkText.password}
        </div>
      </div>
      <div className={style.inputBox}>
        <div className={style.inputTitle}>비밀번호 확인</div>
        <input
          type="password"
          placeholder="비밀번호를 확인해주세요."
          onChange={handleChange}
          name="pwCheck"
          value={pwCheckText}
        />
        <div
          className={style.check}
          style={colorStyle(changePwConditions.pwCheck)}
        >
          {checkText.pwCheck}
        </div>
      </div>
      <PurpleRectangleBtn
        title={"비밀번호 변경"}
        width={400}
        heightPadding={10}
        activation={changePw}
        onClick={handleChangePw}
      ></PurpleRectangleBtn>
      <div className={style.goLogin} onClick={handleLogin}>
        로그인 하러가기
      </div>
    </div>
  );
};

export default PwChange;

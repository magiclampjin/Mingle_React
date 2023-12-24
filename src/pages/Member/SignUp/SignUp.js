import style from "./SignUp.module.css";

import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../../App";
import StepBox from "./StepBox/StepBox";
import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";
import Step3 from "./Step3/Step3";

export const SignUpInfoContext = createContext();

const SignUp = () => {
  const { loginId } = useContext(LoginContext);
  // 현재 회원가입 단계
  const [currentStep, setCurrentStep] = useState("step1");
  const [nextStep, setNextStep] = useState("step2");
  const [isNext, setNext] = useState(false); // 다음 단계로 넘어갈 수 있는지 확인
  const [chkAll, setChhAll] = useState(false); // 1단계 약관 모두 동의
  const [chkUse, setChkUse] = useState(false); // 1단계 이용약관 동의
  const [chkPrivacy, setChkPrivacy] = useState(false); // 1단계 개인정보 활용 동의
  // 2단계 입력값 저장
  const [user, setUser] = useState({
    id: "",
    password: "",
    name: "",
    email: "",
    phone: "",
    nickname: "",
    birth: "",
    memberRecommenderId: "",
  });
  const navi = useNavigate();

  // 로그인 된 사용자가 만약 이전 페이지가 마이페이지라면 홈으로 돌려보내기
  useEffect(() => {
    if (loginId !== "") {
      navi("/");
    }
  }, [loginId]);

  // 현재 페이지 새로고침시 저장되지 않음을 알림
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // 이벤트를 취소하여 브라우저가 페이지를 떠날 때 사용자에게 경고를 표시
      event.preventDefault();
    };

    // 이벤트 리스너 등록
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      // 컴포넌트가 언마운트되면 이벤트 리스너 제거
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <SignUpInfoContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        isNext,
        setNext,
        user,
        setUser,
        chkAll,
        setChhAll,
        chkUse,
        setChkUse,
        chkPrivacy,
        setChkPrivacy,
        nextStep,
        setNextStep,
      }}
    >
      <div className={style.signupBox}>
        <StepBox></StepBox>
        <Routes>
          {/* <Route path="/*" element={<SignUpStep />}></Route> */}
          <Route path="/" element={<Step1 />}></Route>
          <Route path="/step2" element={<Step2 />}></Route>
          <Route path="/step3" element={<Step3 />}></Route>
        </Routes>
      </div>
    </SignUpInfoContext.Provider>
  );
};

export default SignUp;

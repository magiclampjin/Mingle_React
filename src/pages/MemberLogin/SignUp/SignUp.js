import style from "./SignUp.module.css";
import PurpleRectangleBtn from "../../../components/PurpleRectangleBtn/PurpleRectangleBtn";
import GrayRectangleBtn from "../../../components/GrayRectangleBtn/GrayRectangleBtn";
import WhiteRoundBtn from "../../../components/WhiteRoundBtn/WhiteRoundBtn";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  // 현재 회원가입 단계
  const [currentStep, setCurrentStep] = useState("step1");
  const [chkAll, setChhAll] = useState(false); // 1단계 약관 모두 돵의
  const [chkUse, setChkUse] = useState(false); // 1단계 이용약관 동의
  const [chkPrivacy, setChkPrivacy] = useState(false); // 1단계 개인정보 활용 동의
  const [isNext, setNext] = useState(false); // 다음 단계로 넘어갈 수 있는지 확인
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
  // 비밀번호 확인 input value
  const [pwCheckText, setPwCheckText] = useState("");
  // 입력값 유효성 검사 결과
  const [checkText, setCheckText] = useState({
    id: "",
    password: "",
    pwCheck: "",
    name: "",
    email: "",
    phone: "",
    nickname: "",
    birth: "",
    memberRecommenderId: "",
  });
  // 회원가입 조건 검사
  const [signupConditions, setSignupConditions] = useState({
    id: "",
    password: "",
    pwCheck: "",
    name: "",
    email: "",
    phone: "",
    nickname: "",
    birth: "",
    memberRecommenderId: true,
  });
  const [isLoading, setLoading] = useState(false); // 닉네임 로딩 상태
  // 글씨 색 변경 css
  const colorStyle = (check) => {
    return {
      color: check ? "forestgreen" : "#ff4500",
    };
  };
  const navi = useNavigate();

  // 현재 몇단계인지 저장
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

  // 각 단계별 페이지 보이기 설정
  const displayStyle = (stepId) => {
    if (stepId === currentStep) {
      return { display: "block" };
    } else {
      return { display: "none" };
    }
  };

  // 전체 동의 눌렀을 때
  const handleAllCheck = () => {
    let check = chkAll;
    setChhAll(!check);
    setChkUse(!check);
    setChkPrivacy(!check);
    setNext(!check);
  };

  // 이용약관 동의 눌렀을 때
  const handleUseCheck = () => {
    if (chkUse) {
      setChkUse(false);
      setChhAll(false);
      setNext(false);
    } else {
      setChkUse(true);
    }
  };
  // 개인정보 수집 동의 눌렀을 때
  const handlePrivacyCheck = () => {
    if (chkPrivacy) {
      setChkPrivacy(false);
      setChhAll(false);
      setNext(false);
    } else {
      setChkPrivacy(true);
    }
  };

  // 약관 둘다 동의 시 전체 동의 체크
  useEffect(() => {
    if (chkUse && chkPrivacy) {
      setChhAll(true);
      setNext(true);
    }
    if (currentStep === "step2") {
      setNext(false);
    }
  }, [chkUse, chkPrivacy, currentStep]);

  const handleStep = () => {
    // 다음 단계 구하기
    let nextStep = "";
    if (currentStep === "step1") {
      nextStep = "step2";
    } else {
      nextStep = "step3";
    }

    // 다음 단계 조건이 충족되면
    if (isNext) {
      // 현재 단계 currentStep 제거
      // let currentStepElement = document.getElementById(currentStep);
      // if (currentStepElement) {
      //   currentStepElement.classList.remove(style.currentStep);
      // }

      // 다음단계로 이동

      // 다음단계 조건 초기화
      if (nextStep === "step2") {
        setCurrentStep(nextStep);
        setNext(false);
      }

      // 다음 단계에 currentStep 추가
      // let nextStepElement = document.getElementById(nextStep);
      // if (nextStepElement) {
      //   nextStepElement.classList.add(style.currentStep);
      // }
    } else {
      if (currentStep === "step1") {
        alert("약관을 모두 동의해주세요.");
      } else if (currentStep === "step2") {
        alert("회원가입 필수 내용을 모두 입력해주세요.");
      } else {
        nextStep = "step3";
      }
    }

    if (currentStep === "step2") {
      setLoading(true);
      // 'YYYYMMDD' 형식의 문자열을 'YYYY-MM-DD' 날짜형식으로 변환
      const formattedBirth = `${user.birth.substring(
        0,
        4
      )}-${user.birth.substring(4, 6)}-${user.birth.substring(6, 8)}`;
      const birthToSend = new Date(formattedBirth).toISOString();

      // setUser((prev) => {
      // ...prev, ["birth"]: birthToSend
      console.log("인서트문");
      axios
        .post("/api/member/insertMember", { ...user, birth: birthToSend })
        .then((resp) => {
          console.log(resp);
          setLoading(false);
          if (resp.data === 1 && nextStep === "step3") {
            setCurrentStep(nextStep);
          } else {
            alert("회원가입에 실패했습니다.");
          }
          // return { ...prev, birth: birthToSend };
        })
        .catch((error) => {
          console.error("에러 발생:", error);
          setLoading(false);
          // 에러 발생 시에도 상태 업데이트
          // return { ...prev, birth: birthToSend };
        });
      // });
    }
  };

  //취소 혹은 이전 버튼 눌렀을 때
  const handleCancle = () => {
    // 현재 단계 currentStep 제거
    let currentStepElement = document.getElementById(currentStep);
    if (currentStepElement) {
      currentStepElement.classList.remove(style.currentStep);
    }

    // 이전 단계 구하기
    let prevStep = "";
    if (currentStep === "step2") {
      prevStep = "step1";
    } else if (currentStep === "step3") {
      prevStep = "step2";
    }

    if (currentStep === "step1") {
      navi(-1);
    } else if (currentStep === "step2") {
      setCurrentStep("step1");
    } else if (currentStep === "step3") {
      setCurrentStep("step2");
    }

    // 이전 단계에 currentStep 추가
    // let prevStepElement = document.getElementById(prevStep);
    // if (prevStepElement) {
    //   prevStepElement.classList.add(style.currentStep);
    // }
  };

  // user State 값 채우기
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name !== "pwCheck") {
      setUser((prev) => ({ ...prev, [name]: value }));
    } else {
      setPwCheckText(value);
    }
  };

  // 2단계 조건 검사
  useEffect(() => {
    // 필요 정보를 모두 입력하면 넘어갈 수 있음
    if (
      user.id !== "" &&
      user.password !== "" &&
      user.name !== "" &&
      user.birth !== "" &&
      user.email !== "" &&
      user.phone !== "" &&
      user.nickname
    ) {
      setNext(true);
    }

    // 현재 단계가 3단계면 다음단계없음
    if (currentStep === "step3") {
      setNext(false);
    }
    console.log(user);
    console.log(currentStep);
  }, [user, pwCheckText, currentStep]);

  // 아이디 유효성 및 중복 검사
  useEffect(() => {
    if (user.id !== "") {
      // 아이디 input가 비어있지 않으면
      // 정규식: 영문자, 숫자, 밑줄(_) 허용, 한글 불허용
      const regex = /^[a-zA-Z0-9_]+$/;
      // 입력값과 정규식을 비교하여 매치 여부 확인
      const isValid = regex.test(user.id);

      // 영문자, 숫자, 밑줄만 입력했을 때 아이디 중복 검사 실행
      if (isValid) {
        axios.post("/api/member/idDuplicateCheck", user.id).then((resp) => {
          if (resp.data) {
            // 중복된 아이디가 있을 때
            setCheckText((prev) => ({
              ...prev,
              id: "중복된 아이디입니다. 사용하실 수 없습니다.",
            }));
            handleCondition("id", false);
          } else {
            // 중복된 아이디가 없을 때
            setCheckText((prev) => ({ ...prev, id: "" }));
            // 정규식: 8~14자로 구성, 알파벳 대소문자, 숫자, _로만 구성
            let regexId = /^[\w]{8,14}$/;
            let resultId = regexId.test(user.id);
            if (resultId) {
              // 아이디 유효성 검사
              setCheckText((prev) => ({
                ...prev,
                id: "사용가능한 아이디입니다.",
              }));
              handleCondition("id", true);
            } else {
              // 사용불가능한 아이디 형식일 때
              setCheckText((prev) => ({
                ...prev,
                id: "8~14자의 영문자, 숫자, 밑줄(_)만 입력 가능합니다.",
              }));
              handleCondition("id", false);
            }
          }
        });
      } else {
        // 중복된 아이디는 아니지만 유효성검사에 통과하지 못했을 때
        setCheckText((prev) => ({ ...prev, id: "" }));
        handleCondition("id", false);
      }
    } else {
      // 아이디 input에 값이 없을 때
      setCheckText((prev) => ({ ...prev, id: "" }));
      handleCondition("id", false);
    }
  }, [user.id]);

  // 비밀번호 유효성 검사
  useEffect(() => {
    if (user.password !== "") {
      // 비밀번호 input에 값이 있을 때
      // 정규식 : 특수문자 1개, 대문자 1개, 소문자 1개가 모두 포함된 8~30글자
      let regexPw =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,30}$/;
      let resultPw = regexPw.test(user.password);
      if (resultPw) {
        // 정규식 검사 통과
        setCheckText((prev) => ({
          ...prev,
          password: "사용가능한 비밀번호입니다.",
        }));
        handleCondition("password", true);
        if (pwCheckText === user.password) {
          console.log("test");
          // 비밀번호랑 비밀번호 확인이랑 값이 일치할 때
          setCheckText((prev) => ({
            ...prev,
            pwCheck: "비밀번호가 일치합니다.",
          }));
          handleCondition("pwCheck", true);
        } else {
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
          password:
            "비밀번호 형식이 올바르지 않습니다. 8~30자의 영문 대소문자, 숫자 밑 특수문자를 사용하세요.",
        }));
        handleCondition("password", false);

        if (pwCheckText !== user.password) {
          console.log("test");
          // 비밀번호랑 비밀번호 확인이랑 값이 일치할 때
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
  }, [user.password]);

  // 비밀번호 확인 일치 검사
  useEffect(() => {
    if (pwCheckText !== "") {
      // 비밀번호 확인 input에 값이 있을 때
      if (user.password !== "") {
        // 비밀번호 input에 값이 있을 때
        if (pwCheckText === user.password) {
          console.log("test");
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
      }
      // else {
      //   // 비밀번호 input에 값이 없을 때
      //   setCheckText((prev) => ({
      //     ...prev,
      //     pwCheck: "비밀번호를 입력해주세요.",
      //   }));
      //   handleCondition("pwCheck", false);
      // }
    } else {
      // 비밀번호 확인 input에 값이 없을 때
      setCheckText((prev) => ({ ...prev, pwCheck: "" }));
      handleCondition("pwCheck", false);
    }
  }, [pwCheckText]);

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

  // 생년월일 유효성 검사
  useEffect(() => {
    if (user.birth !== "") {
      // 정규식 : 1900~2000대에 태어났으며 1~12월생, 01~31일생
      let regexBirth = /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/;
      let resultBirth = regexBirth.test(user.birth);
      // 생년월일 형식이 올바를 때
      if (resultBirth) {
        setCheckText((prev) => ({ ...prev, birth: "" }));
        handleCondition("birth", true);
      } else {
        // 생년월일 형식이 올바르지 않을때
        setCheckText((prev) => ({
          ...prev,
          birth:
            "생년월일 형식이 올바르지 않습니다. 숫자만 8글자 입력해주세요.",
        }));
        handleCondition("birth", false);
      }
    } else {
      setCheckText((prev) => ({ ...prev, birth: "" }));
      handleCondition("birth", false);
    }
  }, [user.birth]);

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

        const formData = new FormData();
        formData.append("email", user.email);
        axios.post("/api/member/emailDuplicateCheck", formData).then((resp) => {
          if (resp.data) {
            // 중복된 이메일이 있을 때
            setCheckText((prev) => ({
              ...prev,
              email: "중복된 이메일입니다. 사용하실 수 없습니다.",
            }));
            handleCondition("email", false);
          } else {
            // 중복된 이메일이 없을 때
            setCheckText((prev) => ({ ...prev, email: "" }));
            handleCondition("email", true);
          }
        });
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

  // 전화번호 유효성 검사
  useEffect(() => {
    if (user.phone !== "") {
      //정규식 : 2~3자리, 3~4자리, 4자리로 지역번호를 포함한 번호도 입력 가능
      let regexPhone = /^^\d{2,3}(\d{3,4})(\d{4})$/;
      let resultPhone = regexPhone.test(user.phone);
      if (resultPhone) {
        // 전화번호 형식이 올바를 때
        setCheckText((prev) => ({ ...prev, phone: "" }));
        handleCondition("phone", true);
        axios
          .post("/api/member/phoneDuplicateCheck", user.phone)
          .then((resp) => {
            if (resp.data) {
              // 중복된 전화번호가 있을 때
              setCheckText((prev) => ({
                ...prev,
                phone: "중복된 전화번호입니다. 사용하실 수 없습니다.",
              }));
              handleCondition("phone", false);
            } else {
              // 중복된 전화번호가 없을 때
              setCheckText((prev) => ({ ...prev, phone: "" }));
              handleCondition("phone", true);
            }
          });
      } else {
        // 전화번호 형식이 올바르지 않을때
        setCheckText((prev) => ({
          ...prev,
          phone: "전화번호 형식이 올바르지 않습니다.",
        }));
        handleCondition("phone", false);
      }
    } else {
      setCheckText((prev) => ({ ...prev, phone: "" }));
      handleCondition("phone", false);
    }
  }, [user.phone]);

  // 추천인 아이디 존재하는지 검사
  useEffect(() => {
    if (user.memberRecommenderId !== "") {
      axios
        .post("/api/member/idDuplicateCheck", user.memberRecommenderId)
        .then((resp) => {
          if (resp.data) {
            // 추천인 아이디 있을 때
            setCheckText((prev) => ({
              ...prev,
              memberRecommenderId: "",
            }));
            handleCondition("memberRecommenderId", true);
          } else {
            // 추천인 아이디가 없을 때
            setCheckText((prev) => ({
              ...prev,
              memberRecommenderId: "존재하지 않는 추천인입니다.",
            }));
            handleCondition("memberRecommenderId", false);
          }
        });
    } else {
      setCheckText((prev) => ({ ...prev, memberRecommenderId: "" }));
      handleCondition("memberRecommenderId", true);
    }
  }, [user.memberRecommenderId]);

  const handleCondition = (key, value) => {
    setSignupConditions((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    // 페이지 로딩시 바로 닉네임 한번 불러오기
    handleNickName();
  }, []);

  // 랜덤 닉네임 가져오기
  const handleNickName = () => {
    setLoading(true);
    axios.get("/api/member/createNickName").then((resp) => {
      setLoading(false);
      console.log(resp);
      setUser((prev) => ({ ...prev, nickname: resp.data }));
    });
  };

  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }

  return (
    <div className={style.signupBox}>
      <div className={style.title}>회원가입</div>
      <div className={style.stepBox}>
        <div
          className={`${style.stepBox__step} ${
            currentStep === "step1" ? style.currentStep : ""
          }`}
        >
          <div className={style.step__info}>STEP 01</div>
          <div className={style.step__title}>약관동의</div>
        </div>
        <div className={style.stepBox__arrow}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <div
          className={`${style.stepBox__step} ${
            currentStep === "step2" ? style.currentStep : ""
          }`}
        >
          <div className={style.step__info}>STEP 02</div>
          <div className={style.step__title}>정보입력</div>
        </div>
        <div className={style.stepBox__arrow}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <div
          className={`${style.stepBox__step} ${
            currentStep === "step3" ? style.currentStep : ""
          }`}
        >
          <div className={style.step__info}>STEP 03</div>
          <div className={style.step__title}>가입완료</div>
        </div>
      </div>
      <div className={style.agrreBox} style={displayStyle("step1")}>
        <div className={style.totallyAgree}>
          <input
            type="checkbox"
            id="chk_all"
            onChange={handleAllCheck}
            checked={chkAll}
          />
          <label htmlFor="chk_all">약관 전체 동의</label>
        </div>
        <div className={style.useAgree}>
          <input
            type="checkbox"
            id="chk_use"
            onChange={handleUseCheck}
            checked={chkUse}
          />
          <label htmlFor="chk_use">
            이용약관<span className={style.agree__span}>(필수)</span>
          </label>
          <div className={style.useDetail}>
            <div className={style.article}>
              <div className={style.article__title}>여러분을 환영합니다.</div>
              <div className={style.article__text}>
                Mingle 서비스를 이용해 주셔서 감사합니다. 본 약관은 다양한
                Mingle 서비스의 이용과 관련하여 Mingle 서비스를 제공하는
                Mingle작전팀과 이를 이용하는 Mingle 서비스 회원(이하 ‘회원’)
                또는 비회원과의 관계를 설명하며, 아울러 여러분의 Mingle 서비스
                이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.
              </div>
              <div className={style.article__text}>
                Mingle 서비스를 이용하시거나 Mingle 서비스 회원으로 가입하실
                경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게
                되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.
              </div>
            </div>
            <div className={style.article}>
              <div className={style.article__title}>
                회원으로 가입하시면 Mingle 서비스를 보다 편리하게 이용할 수
                있습니다.
              </div>
              <div className={style.article__text}>
                여러분은 본 약관을 읽고 동의하신 후 회원 가입을 신청하실 수
                있으며, Mingle은 이에 대한 승낙을 통해 회원 가입 절차를 완료하고
                여러분께 Mingle 서비스 이용 계정(이하 ‘계정’)을 부여합니다.
                계정이란 회원이 Mingle 서비스에 로그인한 이후 이용하는 각종
                서비스 이용 이력을 회원 별로 관리하기 위해 설정한 회원 식별
                단위를 말합니다. 회원은 자신의 계정을 통해 좀더 다양한 Mingle
                서비스를 보다 편리하게 이용할 수 있습니다.
              </div>
            </div>
            <div className={style.article}>
              <div className={style.article__title}>
                여러분이 제공한 콘텐츠를 소중히 다룰 것입니다.
              </div>
              <div className={style.article__text}>
                Mingle은 여러분이 게재한 게시물이 Mingle 서비스를 통해 다른
                이용자들에게 전달되어 우리 모두의 삶을 더욱 풍요롭게 해줄 것을
                기대합니다. 게시물은 여러분이 타인 또는 자신이 보게 할 목적으로
                Mingle 서비스 상에 게재한 부호, 문자, 음성, 음향, 그림, 사진,
                동영상, 링크 등으로 구성된 각종 콘텐츠 자체 또는 파일을
                말합니다.
              </div>
              <div className={style.article__text}>
                Mingle은 여러분의 생각과 감정이 표현된 콘텐츠를 소중히 보호할
                것을 약속 드립니다. 여러분이 제작하여 게재한 게시물에 대한
                지식재산권 등의 권리는 당연히 여러분에게 있습니다.
              </div>
              <div className={style.article__text}>
                여러분은 Mingle 서비스 내에 콘텐츠 삭제, 비공개 등의 관리기능이
                제공되는 경우 이를 통해 직접 타인의 이용 또는 접근을 통제할 수
                있고, 고객센터를 통해서도 콘텐츠의 삭제, 비공개, 검색결과 제외
                등의 조치를 요청할 수 있습니다. 다만, 일부 Mingle 서비스의 경우
                삭제, 비공개 등의 처리가 어려울 수 있으며, 이러한 내용은 각
                서비스 상의 안내, 공지사항, 고객센터 도움말 등에서 확인해 주시길
                부탁 드립니다.
              </div>
            </div>
            <div className={style.article}>
              <div className={style.article__title}>
                여러분의 개인정보를 소중히 보호합니다.
              </div>
              <div className={style.article__text}>
                Mingle은 서비스의 원활한 제공을 위하여 회원이 동의한 목적과 범위
                내에서만 개인정보를 수집∙이용하며, 개인정보 보호 관련 법령에
                따라 안전하게 관리합니다.
              </div>
            </div>
            <div className={style.article}>
              <div className={style.article__title}>
                Mingle 서비스 이용과 관련하여 몇 가지 주의사항이 있습니다.
              </div>
              <div className={style.article__text}>
                Mingle은 여러분이 Mingle 서비스를 자유롭고 편리하게 이용할 수
                있도록 최선을 다하고 있습니다. 다만, 여러분이 Mingle 서비스를
                보다 안전하게 이용하고 Mingle 서비스에서 여러분과 타인의 권리가
                서로 존중되고 보호받으려면 여러분의 도움과 협조가 필요합니다.
                여러분의 안전한 서비스 이용과 권리 보호를 위해 부득이 아래와
                같은 경우 여러분의 게시물 게재나 Mingle 서비스 이용이 제한될 수
                있으므로, 이에 대한 확인 및 준수를 요청 드립니다.
              </div>
              <div className={style.article__text}>
                회원 가입 시 이름, 생년월일, 휴대전화번호 등의 정보를 허위로
                기재해서는 안 됩니다. 회원 계정에 등록된 정보는 항상 정확한 최신
                정보가 유지될 수 있도록 관리해 주세요. 자신의 계정을 다른
                사람에게 판매, 양도, 대여 또는 담보로 제공하거나 다른 사람에게
                그 사용을 허락해서는 안 됩니다. 아울러 자신의 계정이 아닌 타인의
                계정을 무단으로 사용해서는 안 됩니다.
              </div>
              <div className={style.article__text}>
                타인에 대해 직접적이고 명백한 신체적 위협을 가하는 내용의
                게시물, 타인의 자해 행위 또는 자살을 부추기거나 권장하는 내용의
                게시물, 타인의 신상정보, 사생활 등 비공개 개인정보를 드러내는
                내용의 게시물, 타인을 지속적으로 따돌리거나 괴롭히는 내용의
                게시물, 성매매를 제안, 알선, 유인 또는 강요하는 내용의 게시물,
                공공 안전에 대해 직접적이고 심각한 위협을 가하는 내용의 게시물은
                제한될 수 있습니다. 관련 법령상 금지되거나 형사처벌의 대상이
                되는 행위를 수행하거나 이를 교사 또는 방조하는 등의 범죄 관련
                직접적인 위험이 확인된 게시물, 관련 법령에서 홍보, 광고, 판매
                등을 금지하고 있는 물건 또는 서비스를 홍보, 광고, 판매하는
                내용의 게시물, 타인의 지식재산권 등을 침해하거나 모욕, 사생활
                침해 또는 명예훼손 등 타인의 권리를 침해하는 내용이 확인된
                게시물은 제한될 수 있습니다.
              </div>
              <div className={style.article__text}>
                자극적이고 노골적인 성행위를 묘사하는 등 타인에게 성적 수치심을
                유발시키거나 왜곡된 성 의식 등을 야기할 수 있는 내용의 게시물,
                타인에게 잔혹감 또는 혐오감을 일으킬 수 있는 폭력적이고 자극적인
                내용의 게시물, 본인 이외의 자를 사칭하거나 허위사실을 주장하는
                등 타인을 기만하는 내용의 게시물, 과도한 욕설, 비속어 등을
                계속하여 반복적으로 사용하여 심한 혐오감 또는 불쾌감을 일으키는
                내용의 게시물은 제한될 수 있습니다.
              </div>
            </div>
            <div className={style.article}>
              <div className={style.article__title}>
                부득이 서비스 이용을 제한할 경우 합리적인 절차를 준수합니다.
              </div>
              <div className={style.article__text}>
                Mingle은 다양한 정보와 의견이 담긴 여러분의 콘텐츠를 소중히 다룰
                것을 약속 드립니다만, 여러분이 게재한 게시물이 관련 법령, 본
                약관, 게시물 운영정책, 각 개별 서비스에서의 약관, 운영정책 등에
                위배되는 경우, 부득이 이를 비공개 또는 삭제 처리하거나 게재를
                거부할 수 있습니다. 다만, 이것이 Mingle이 모든 콘텐츠를 검토할
                의무가 있다는 것을 의미하지는 않습니다.
              </div>
              <div className={style.article__text}>
                또한 여러분이 관련 법령, 본 약관, 계정 및 게시물 운영정책, 각
                개별 서비스에서의 약관, 운영정책 등을 준수하지 않을 경우,{" "}
                Mingle은 여러분의 관련 행위 내용을 확인할 수 있으며, 그 확인
                결과에 따라 Mingle 서비스 이용에 대한 주의를 당부하거나, Mingle{" "}
                서비스 이용을 일부 또는 전부, 일시 또는 영구히 정지시키는 등 그
                이용을 제한할 수 있습니다. 한편, 이러한 이용 제한에도 불구하고
                더 이상 Mingle 서비스 이용계약의 온전한 유지를 기대하기 어려운
                경우엔 부득이 여러분과의 이용계약을 해지할 수 있습니다.
              </div>
              <div className={style.article__text}>
                부득이 여러분의 서비스 이용을 제한해야 할 경우 명백한 법령
                위반이나 타인의 권리침해로서 긴급한 위험 또는 피해 차단이
                요구되는 사안 외에는 위와 같은 단계적 서비스 이용제한 원칙을
                준수 하겠습니다. 명백한 법령 위반 등을 이유로 부득이 서비스
                이용을 즉시 영구 정지시키는 경우 서비스 이용을 통해 획득한
                포인트 및 기타 혜택 등은 모두 소멸되고 이에 대해 별도로 보상하지
                않으므로 유의해 주시기 바랍니다.
              </div>
            </div>
            <div className={style.article}>
              <div className={style.article__title}>
                언제든지 Mingle 서비스 이용계약을 해지하실 수 있습니다.
              </div>
              <div className={style.article__text}>
                Mingle에게는 참 안타까운 일입니다만, 회원은 언제든지 Mingle
                서비스 이용계약 해지를 신청하여 회원에서 탈퇴할 수 있으며, 이
                경우 Mingle은 관련 법령 등이 정하는 바에 따라 이를 지체 없이
                처리하겠습니다.
              </div>
              <div className={style.article__text}>
                또한 여러분이 관련 법령, 본 약관, 계정 및 게시물 운영정책, 각
                개별 서비스에서의 약관, 운영정책 등을 준수하지 않을 경우,{" "}
                Mingle은 여러분의 관련 행위 내용을 확인할 수 있으며, 그 확인
                결과에 따라 Mingle 서비스 이용에 대한 주의를 당부하거나, Mingle{" "}
                서비스 이용을 일부 또는 전부, 일시 또는 영구히 정지시키는 등 그
                이용을 제한할 수 있습니다. 한편, 이러한 이용 제한에도 불구하고
                더 이상 Mingle 서비스 이용계약의 온전한 유지를 기대하기 어려운
                경우엔 부득이 여러분과의 이용계약을 해지할 수 있습니다.
              </div>
              <div className={style.article__text}>
                Mingle 서비스 이용계약이 해지되면, 관련 법령 및
                개인정보처리방침에 따라 Mingle이 해당 회원의 정보를 보유할 수
                있는 경우를 제외하고, 해당 회원 계정에 부속된 게시물 일체를
                포함한 회원의 모든 데이터는 소멸됨과 동시에 복구할 수 없게
                됩니다.
              </div>
            </div>
            <div className={style.article}>
              <div className={style.article__text}>
                공지 일자: 2023년 11월 12일<br></br> 적용 일자: 2018년 11월 12일
                <br></br>
                Mingle 서비스와 관련하여 궁금하신 사항이 있으시면 고객센터(대표
                메일: eyungenius@gmail.com/ 평일 09:00~18:00)로 문의 주시기
                바랍니다.
              </div>
            </div>
          </div>
        </div>
        <div className={style.privacyAgree}>
          <input
            type="checkbox"
            id="chk_privacy"
            onChange={handlePrivacyCheck}
            checked={chkPrivacy}
          />
          <label htmlFor="chk_privacy">
            개인정보 수집 및 이용에 대한 안내
            <span className={style.agree__span}>(필수)</span>
          </label>
          <div className={style.useDetail}>
            <div className={style.article}>
              <div className={style.article__text}>
                개인정보보호법에 따라 Mingle에 회원가입 신청하시는 분께 수집하는
                개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및
                이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내
                드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.
              </div>
            </div>
            <div className={style.article}>
              <div className={style.article__title}>1. 수집하는 개인정보</div>
              <div className={style.article__text}>
                이용자는 회원가입을 하지 않아도 게임 이용 등 Mingle 서비스를
                회원과 동일하게 이용할 수 있습니다. 이용자가 게임 이용, 게시판
                글 작성 등과 같이 개인화 혹은 회원제 서비스를 이용하기 위해
                회원가입을 할 경우, Mingle은 서비스 이용을 위해 필요한 최소한의
                개인정보를 수집합니다.
              </div>
              <div className={style.article__text}>
                회원가입 시점에 Mingle이 이용자로부터 수집하는 개인정보는 아래와
                같습니다.
              </div>
              <div className={style.article__text}>
                구체적으로 1) 서비스 이용 과정에서 이용자에 관한 정보를 자동화된
                방법으로 생성하여 이를 저장(수집)하거나, 2) 이용자 기기의 고유한
                정보를 원래의 값을 확인하지 못 하도록 안전하게 변환하여
                수집합니다.
              </div>
              <div className={style.article__text}>
                이와 같이 수집된 정보는 개인정보와의 연계 여부 등에 따라
                개인정보에 해당할 수 있고, 개인정보에 해당하지 않을 수도
                있습니다.
              </div>
            </div>
            <div className={style.article}>
              <div className={style.article__title}>
                2. 수집한 개인정보의 이용
              </div>
              <div className={style.article__text}>
                Mingle 및 Mingle 관련 제반 서비스(모바일 웹/앱 포함)의 회원관리,
                서비스 개발・제공 및 향상, 안전한 인터넷 이용환경 구축 등 아래의
                목적으로만 개인정보를 이용합니다.
              </div>
              <div className={style.article__text}>
                - 회원 가입 의사의 확인, 이용자 식별, 회원탈퇴 의사의 확인 등
                회원관리를 위하여 개인정보를 이용합니다.
              </div>
              <div className={style.article__text}>
                - 법령 및 Mingle 이용약관을 위반하는 회원에 대한 이용 제한 조치,
                부정 이용 행위를 포함하여 서비스의 원활한 운영에 지장을 주는
                행위에 대한 방지 및 제재, 계정도용 및 부정거래 방지, 약관 개정
                등의 고지사항 전달, 분쟁조정을 위한 기록 보존, 민원처리 등
                이용자 보호 및 서비스 운영을 위하여 개인정보를 이용합니다.
              </div>
              <div className={style.article__text}>
                - 보안, 프라이버시, 안전 측면에서 이용자가 안심하고 이용할 수
                있는 서비스 이용환경 구축을 위해 개인정보를 이용합니다.
              </div>
            </div>
            <div className={style.article}>
              <div className={style.article__title}>3. 개인정보의 보관기간</div>
              <div className={style.article__text}>
                회사는 원칙적으로 이용자의 개인정보를 회원 탈퇴 시 지체없이
                파기하고 있습니다.
              </div>
              <div className={style.article__text}>
                단, 이용자에게 개인정보 보관기간에 대해 별도의 동의를 얻은 경우,
                또는 법령에서 일정 기간 정보보관 의무를 부과하는 경우에는 해당
                기간 동안 개인정보를 안전하게 보관합니다.
              </div>
            </div>
            <div className={style.article}>
              <div className={style.article__title}>
                4. 개인정보 수집 및 이용 동의를 거부할 권리
              </div>
              <div className={style.article__text}>
                이용자는 개인정보의 수집 및 이용 동의를 거부할 권리가 있습니다.
                회원가입 시 수집하는 최소한의 개인정보, 즉, 필수 항목에 대한
                수집 및 이용 동의를 거부하실 경우, 회원가입이 어려울 수
                있습니다.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.signupBox} style={displayStyle("step2")}>
        <div className={style.signupTitle}>아이디/비밀번호</div>
        <div className={style.basicInfo}>
          <div className={style.basicInfo__line} id="id">
            <div className={style.signup__title}>
              아이디<span className={style.essential}>*</span>
            </div>
            <div className={style.signup__inputBox}>
              <input
                type="text"
                id="idInput"
                name="id"
                placeholder="8~14자의 영문, 숫자, 밑줄(_)를 사용할 수 있습니다."
                onChange={handleChange}
                value={user.id !== "" ? user.id : ""}
              />
              <div
                className={style.signup__chk}
                id="idCheck"
                style={colorStyle(signupConditions.id)}
              >
                {checkText.id}
              </div>
            </div>
          </div>
          <div className={style.basicInfo__line} id="password">
            <div className={style.signup__title}>
              비밀번호<span className={style.essential}>*</span>
            </div>
            <div className={style.signup__inputBox}>
              <input
                type="password"
                id="pwInput"
                name="password"
                placeholder="8~30자의 영문 대소문자, 숫자 및 특수문자를 사용하세요."
                onChange={handleChange}
                value={user.password !== "" ? user.password : ""}
              />
              <div
                className={style.signup__chk}
                id="pwCheck"
                style={colorStyle(signupConditions.password)}
              >
                {checkText.password}
              </div>
            </div>
          </div>
          <div className={style.basicInfo__line} id="verify">
            <div className={style.signup__title}>
              비밀번호 확인<span className={style.essential}>*</span>
            </div>
            <div className={style.signup__inputBox}>
              <input
                type="password"
                id="verifyInput"
                name="pwCheck"
                placeholder="비밀번호를 확인해주세요."
                onChange={handleChange}
                value={user.pwCheck !== "" ? user.pwCheck : ""}
              />
              <div
                className={style.signup__chk}
                id="verifyCheck"
                style={colorStyle(signupConditions.pwCheck)}
              >
                {checkText.pwCheck}
              </div>
            </div>
          </div>
        </div>
        <div className={style.signupTitle}>내 정보 입력</div>
        <div className={style.myInfo}>
          <div className={style.myInfo__line} id="name">
            <div className={style.signup__title}>
              이름<span className={style.essential}>*</span>
            </div>
            <div className={style.signup__inputBox}>
              <input
                type="text"
                id="nameInput"
                name="name"
                placeholder="이름을 입력해주세요."
                onChange={handleChange}
                value={user.name !== "" ? user.name : ""}
              />
              <div
                className={style.signup__chk}
                id="nameCheck"
                style={colorStyle(signupConditions.name)}
              >
                {checkText.name}
              </div>
            </div>
          </div>
          <div className={style.myInfo__line} id="birth">
            <div className={style.signup__title}>
              생년월일<span className={style.essential}>*</span>
            </div>
            <div className={style.signup__inputBox}>
              <input
                type="text"
                id="birthInput"
                name="birth"
                placeholder="생년월일 8자를 입력해주세요. ex)20000101"
                onChange={handleChange}
                value={user.birth !== "" ? user.birth : ""}
              />
              <div
                className={style.signup__chk}
                id="birthCheck"
                style={colorStyle(signupConditions.birth)}
              >
                {checkText.birth}
              </div>
            </div>
          </div>
          <div className={style.myInfo__line} id="email">
            <div className={style.signup__title}>
              이메일<span className={style.essential}>*</span>
            </div>
            <div className={style.signup__inputBox}>
              <input
                type="text"
                id="emailInput"
                name="email"
                placeholder="이메일을 입력해주세요."
                onChange={handleChange}
                value={user.email !== "" ? user.email : ""}
              />
              <div
                className={style.signup__chk}
                id="emailCheck"
                style={colorStyle(signupConditions.email)}
              >
                {checkText.email}
              </div>
            </div>
          </div>
          <div className={style.myInfo__line} id="phone">
            <div className={style.signup__title}>
              전화번호<span className={style.essential}>*</span>
            </div>
            <div className={style.signup__inputBox}>
              <input
                type="text"
                id="phoneInput"
                name="phone"
                placeholder="- 없이 숫자만 입력해주세요. ex)01012345678"
                onChange={handleChange}
                value={user.phone !== "" ? user.phone : ""}
              />
              <div
                className={style.signup__chk}
                id="phoneCheck"
                style={colorStyle(signupConditions.phone)}
              >
                <WhiteRoundBtn title={"본인인증"}></WhiteRoundBtn>
                {checkText.phone}
              </div>
            </div>
          </div>
          <div className={style.myInfo__line} id="nick">
            <div className={style.signup__title}>
              닉네임<span className={style.essential}>*</span>
            </div>
            <div className={style.signup__inputBox}>
              <input
                type="text"
                id="nickInput"
                name="nickname"
                placeholder="직접 입력은 불가능합니다."
                value={user.nickname}
                readOnly
              />
              <div className={style.signup__chk} id="nickCheck">
                <WhiteRoundBtn
                  title={"닉네임 선택"}
                  onClick={handleNickName}
                ></WhiteRoundBtn>
              </div>
            </div>
          </div>
        </div>
        <div className={style.signupTitle}>기타입력</div>
        <div className={style.etcInfo}>
          <div className={style.etcInfo__line} id="referral">
            <div className={style.signup__title}>추천인 아이디</div>
            <div className={style.signup__inputBox}>
              <input
                type="text"
                id="recommenderInput"
                name="memberRecommenderId"
                placeholder="추천인 아이디를 입력해주세요."
                onChange={handleChange}
                value={
                  user.memberRecommenderId !== ""
                    ? user.memberRecommenderId
                    : ""
                }
              />
              <div
                className={style.signup__chk}
                id="memberRecommenderIdCheck"
                style={colorStyle(signupConditions.memberRecommenderId)}
              >
                {checkText.memberRecommenderId}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.userWelcome} style={displayStyle("step3")}>
        <div className={style.userWelcomeInfo}>
          <div>
            <div className={style.backCircle}>
              <div className={style.mainCircle}>
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </div>
          </div>
          <div className={style.userWelcome__title}>회원가입 완료</div>
          <div className={style.userWelcome__conf}>
            {user.name}님({user.id})의 회원가입이 성공적으로 완료되었습니다.
          </div>
          <div className={style.userWelcome__info}>
            입력한 회원 정보는 마이페이지에서 확인 및 수정이 가능합니다.
          </div>
        </div>
      </div>
      {currentStep !== "step3" ? (
        <div className={style.stepBtns}>
          {currentStep === "step1" ? (
            <GrayRectangleBtn
              title={"취소"}
              heightPadding={20}
              width={190}
              onClick={handleCancle}
            ></GrayRectangleBtn>
          ) : (
            <GrayRectangleBtn
              title={"이전"}
              heightPadding={20}
              width={190}
              onClick={handleCancle}
            ></GrayRectangleBtn>
          )}
          {currentStep !== "step2" ? (
            <PurpleRectangleBtn
              title={"다음"}
              heightPadding={20}
              width={190}
              activation={isNext}
              onClick={handleStep}
            ></PurpleRectangleBtn>
          ) : (
            <PurpleRectangleBtn
              title={"회원가입"}
              heightPadding={20}
              width={190}
              activation={isNext}
              onClick={handleStep}
            ></PurpleRectangleBtn>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default SignUp;

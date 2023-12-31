import style from "./Step2.module.css";
import WhiteRoundBtn from "../../../../components/WhiteRoundBtn/WhiteRoundBtn";
import GrayRectangleBtn from "../../../../components/GrayRectangleBtn/GrayRectangleBtn";
import PurpleRectangleBtn from "../../../../components/PurpleRectangleBtn/PurpleRectangleBtn";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import axios from "axios";

import { SignUpInfoContext } from "../SignUp";
import { useState, useEffect, useContext, useReducer } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Step2 = () => {
  const { currentStep, setCurrentStep } = useContext(SignUpInfoContext);
  const { user, setUser } = useContext(SignUpInfoContext);
  const { isNext, setNext } = useContext(SignUpInfoContext);
  // 비밀번호 확인 input value
  const [pwCheckText, setPwCheckText] = useState("");
  // 본인 인증 코드 확인 input value
  const [mycode, setMycode] = useState("");
  // 입력값 유효성 검사 결과
  const [checkText, setCheckText] = useState({
    id: "",
    password: "",
    pwCheck: "",
    name: "",
    email: "",
    mycode: "",
    phone: "",
    nickname: "",
    birth: "",
    memberRecommenderId: "",
  });
  // 회원가입 조건 검사
  const [signupConditions, setSignupConditions] = useState({
    id: false,
    password: false,
    pwCheck: false,
    name: false,
    email: false,
    mycode: false,
    phone: false,
    nickname: false,
    birth: false,
    memberRecommenderId: true,
  });
  const [isLoading, setLoading] = useState(false); // 닉네임 로딩 상태
  const [timeSeconds, setTimerSeconds] = useState(180); // 초기 시간 설정 (3분)
  const [timerStart, setTimerStart] = useState(false); // 타이머 시작 여부

  const navi = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // 뒤로가기 버튼을 통해서 들어오거나 주소를 통해서 들어왔다면 돌려보내기
  useEffect(() => {
    if (currentStep !== "step2") {
      alert("잘못된 접근입니다.");
      navi("/member/signup");
    }
  }, []);

  // 글씨 색 변경 css
  const colorStyle = (check) => {
    return {
      color: check ? "forestgreen" : "#ff4500",
    };
  };

  // 인증코드 확인하기
  const handleCode = (value) => {
    // 인증번호를 입력하면 서버에 저장된 코드랑 일치하는지 확인
    setMycode(value);
    const formData = new FormData();
    formData.append("code", value);
    if (value !== "" && timeSeconds !== 0) {
      axios.post("/api/member/certification/signup", formData).then((resp) => {
        if (resp.data) {
          setCheckText((prev) => ({
            ...prev,
            mycode: "인증 코드가 일치합니다.",
          }));
          handleCondition("mycode", true);
        } else {
          setCheckText((prev) => ({
            ...prev,
            mycode: "인증 코드가 일치하지 않습니다.",
          }));
          handleCondition("mycode", false);
        }
      });
    } else {
      if (timeSeconds === 0) {
        setCheckText((prev) => ({
          ...prev,
          mycode: "인증 시간이 초과되었습니다.",
        }));
        handleCondition("mycode", false);
        axios.get("/api/member/removeVerificationCode");
      } else {
        setCheckText((prev) => ({
          ...prev,
          mycode: "",
        }));
      }

      handleCondition("mycode", false);
    }
  };

  // user State 값 채우기
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name !== "pwCheck" && name !== "mycode") {
      setUser((prev) => ({ ...prev, [name]: value }));
    } else if (name === "mycode") {
      handleCode(value);
    } else {
      setPwCheckText(value);
    }
  };

  //이전 버튼 눌렀을 때
  const handleCancle = () => {
    navi("/member/signup");
    setCurrentStep("step1");
  };

  const handleStep = () => {
    // 다음 단계
    let nextStep = "step3";

    // 다음 단계 조건이 충족되면
    if (!isNext) {
      if (!signupConditions.memberRecommenderId) {
        alert("존재하지 않는 추천인은 입력이 불가능합니다.");
      } else if (!signupConditions.mycode) {
        alert("본인 인증을 진행해주세요.");
      } else {
        alert("회원가입 필수 내용을 모두 입력해주세요.");
      }

      return false;
    } else {
      setLoading(true);
      const birthToSend = new Date(user.birth).toISOString();

      axios
        .post("/api/member/insertMember", { ...user, birth: birthToSend })
        .then((resp) => {
          setLoading(false);
          if (resp.data === 1 && nextStep === "step3") {
            setCurrentStep(nextStep);
            navi("/member/signup/step3");
          } else {
            alert("회원가입에 실패했습니다.");
          }
        })
        .catch((error) => {
          // 에러 발생 시
          console.error("에러 발생:", error);
          setLoading(false);
          alert("회원가입에 실패했습니다.");
        });
    }
  };

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
        const formData = new FormData();
        formData.append("id", user.id);
        axios.post("/api/member/idDuplicateCheck", formData).then((resp) => {
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
        setCheckText((prev) => ({
          ...prev,
          id: "8~14자의 영문자, 숫자, 밑줄(_)만 입력 가능합니다.",
        }));
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
        if (pwCheckText !== "" && pwCheckText === user.password) {
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
          password: "8~30자의 영문 대소문자, 숫자 및 특수문자를 사용하세요.",
        }));
        handleCondition("password", false);

        if (pwCheckText !== "" && pwCheckText !== user.password) {
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
  }, [user.password]);

  // 비밀번호 확인 일치 검사
  useEffect(() => {
    if (pwCheckText !== "") {
      // 비밀번호 확인 input에 값이 있을 때
      if (user.password !== "") {
        // 비밀번호 input에 값이 있을 때
        if (pwCheckText === user.password) {
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
      let regexBirth =
        /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
      let resultBirth = regexBirth.test(user.birth);
      // 생년월일 형식이 올바를 때
      if (resultBirth) {
        setCheckText((prev) => ({ ...prev, birth: "" }));
        handleCondition("birth", true);
      } else {
        // 생년월일 형식이 올바르지 않을때
        setCheckText((prev) => ({
          ...prev,
          birth: "생년월일 형식이 올바르지 않습니다.",
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
      let regexPhone = /^(\d{2,3})(\d{3,4})(\d{4})$/;
      let resultPhone = regexPhone.test(user.phone);
      if (resultPhone) {
        // 전화번호 형식이 올바를 때
        setCheckText((prev) => ({ ...prev, phone: "" }));
        handleCondition("phone", true);
        const formData = new FormData();
        formData.append("phone", user.phone);
        axios.post("/api/member/phoneDuplicateCheck", formData).then((resp) => {
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
      const formDtat = new FormData();
      formDtat.append("id", user.memberRecommenderId);
      axios.post("/api/member/idDuplicateCheck", formDtat).then((resp) => {
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

  // 유효성 검사 결과 텍스트
  const handleCondition = (key, value) => {
    setSignupConditions((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    // 페이지 로딩시 바로 닉네임 한번 불러오기
    handleNickName();
    setSignupConditions((prev) => ({ ...prev, nickname: true }));
  }, []);

  // 랜덤 닉네임 가져오기
  const handleNickName = () => {
    setLoading(true);
    axios.get("/api/member/createNickName").then((resp) => {
      setLoading(false);
      setUser((prev) => ({ ...prev, nickname: resp.data }));
    });
  };

  // 2단계 조건 검사
  useEffect(() => {
    // 필요 정보를 모두 입력하면 넘어갈 수 있음
    if (
      signupConditions.id &&
      signupConditions.password &&
      signupConditions.pwCheck &&
      signupConditions.name &&
      signupConditions.birth &&
      signupConditions.email &&
      signupConditions.mycode &&
      signupConditions.phone &&
      signupConditions.nickname &&
      signupConditions.memberRecommenderId
    ) {
      setNext(true);
    } else {
      setNext(false);
    }
  }, [signupConditions]);

  // 이메일 본인인증
  const handleAuthenticationEmail = () => {
    if (!signupConditions.email && user.email === "") {
      // 이메일을 입력하지 않았으면
      alert("이메일 주소를 입력해주세요.");
    } else if (!signupConditions.email) {
      if(checkText.email==="중복된 이메일입니다. 사용하실 수 없습니다."){
        alert("중복된 이메일은 본인 인증을 진행할 수 없습니다.")
      }else{
        alert("이메일 주소가 올바른 형식이 아닙니다.");
      }
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append("email", user.email);
      axios
        .post("/api/member/verificationSignupEmail", formData)
        .then((resp) => {
          // 본인 인증이 성공하고 메일 발송을 마침
          setLoading(false);
          if (resp.data) {
            // 타이머 시간 세팅
            setTimerSeconds(180);
            // 타이머 시작
            setTimerStart(true);
            alert(
              "인증번호가 발송되었습니다. 메일을 확인해주세요. \n 메일이 도착하지 않을 경우 스팸 메일함을 확인해주세요."
            );
            if (mycode !== "") {
              setMycode("");
            }
          } else {
            alert("인증번호 발송이 실패하였습니다.");
            axios.get("/api/member/removeVerificationCode");
          }
        });
    }
  };

  // 타이머 로직
  useEffect(() => {
    const updateCountdown = () => {
      if (timerStart) {
        // 시간 업데이트
        setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
        // 인증 시간 초과 시
        if (timeSeconds === 0) {
          setTimerStart(false);
          alert("인증 시간이 초과되었습니다.");
          handleCondition("mycode", false);
          axios.get("/api/member/removeVerificationCode");
        } else if (timeSeconds === 180) {
          setCheckText((prev) => ({
            ...prev,
            mycode: "",
          }));
        }
      }
    };

    // 1초마다 업데이트
    const timerId = setInterval(updateCountdown, 1000);

    // 컴포넌트가 언마운트되면 타이머 정리
    return () => clearInterval(timerId);
  }, [timeSeconds, timerStart]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className={style.signupBox}>
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
                value={pwCheckText !== "" ? pwCheckText : ""}
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
                type="date"
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
            <div className={style.emailRightBox}>
              <div className={style.signup__inputBox}>
                <input
                  type="text"
                  id="emailInput"
                  name="email"
                  placeholder="이메일을 입력해주세요."
                  onChange={handleChange}
                  value={user.email !== "" ? user.email : ""}
                />
                <div className={style.signup__chk} id="emailCheck">
                  <WhiteRoundBtn
                    title={"본인인증"}
                    onClick={handleAuthenticationEmail}
                  ></WhiteRoundBtn>
                  <div
                    className={style.miniEmailCheck}
                    style={colorStyle(signupConditions.email)}
                  >
                    {checkText.email}
                  </div>
                </div>
              </div>
              <div
                className={style.pullEmailCheck}
                style={colorStyle(signupConditions.email)}
              >
                {checkText.email}
              </div>
            </div>
          </div>
          <div className={style.myInfo__line} id="mycode">
            <div className={style.signup__title}>
              인증번호<span className={style.essential}>*</span>
            </div>
            <div className={style.signup__inputBox}>
              <input
                type="text"
                id="mycodeInput"
                name="mycode"
                placeholder="이메일로 발송된 인증 코드를 입력해주세요."
                onChange={handleChange}
                value={mycode !== "" ? mycode : ""}
              />
              <div
                className={style.signup__chk}
                id="mycodeCheck"
                style={colorStyle(signupConditions.mycode)}
              >
                <span className={style.timer}>{`${String(
                  Math.floor(timeSeconds / 60)
                ).padStart(2, "0")}:${String(timeSeconds % 60).padStart(
                  2,
                  "0"
                )}`}</span>
                {checkText.mycode}
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
      <div className={style.stepBtns}>
        <GrayRectangleBtn
          title={"이전"}
          heightPadding={20}
          width={190}
          onClick={handleCancle}
        ></GrayRectangleBtn>
        <PurpleRectangleBtn
          title={"회원가입"}
          heightPadding={20}
          width={190}
          activation={isNext}
          onClick={handleStep}
        ></PurpleRectangleBtn>
      </div>
    </>
  );
};

export default Step2;

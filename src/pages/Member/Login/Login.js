import style from "./Login.module.css";
import PurpleRectangleBtn from "../../../components/PurpleRectangleBtn/PurpleRectangleBtn";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import axios from "axios";

import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { LoginContext } from "../../../App";

const Login = () => {
  const [user, setUser] = useState({ id: "", pw: "" });
  const [isLoading, setLoading] = useState(false);
  const [rememberId, setRememberId] = useState("");
  const { setLoginId } = useContext(LoginContext);

  const navi = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    // 아이디 기억하기를 했다면 쿠키에 있는 아이디 출력하기
    let cookieRememeberId = cookies.get("rememberID");
    let cookieLoginId = cookies.get("loginID");
    if (cookieRememeberId) {
      setUser({ id: cookieLoginId, pw: "" });
      setRememberId(cookieRememeberId);
    }
  }, []);

  // user State 값 채우기
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // id기억하기 클릭 감지
  const handleRemember = () => {
    // 체크박스를 토글하면 rememberId 상태를 변경
    setRememberId(!rememberId);
  };

  // 로그인 하기
  const handleLogin = () => {
    if (user.id !== "" && user.pw !== "") {
      const formData = new FormData();
      formData.append("id", user.id);
      formData.append("pw", user.pw);
      setLoading(true);

      // const location = useLocation();

      axios.post("/api/member/login", formData).then((resp) => {
        if (resp.statusText === "OK") {
          setLoginId(user.id);
          // 아이디 기억하기를 눌렀다면 쿠키에 로그인 아이디 저장
          const expiresInSeconds = 7 * 24 * 60 * 60; // 7일을 초 단위로 계산
          cookies.set("loginID", user.id, {
            path: "/",
            maxAge: expiresInSeconds,
          });
          cookies.set("rememberID", rememberId, {
            path: "/",
          });

          setUser({ id: "", pw: "" });

          navi(-1);

          setLoading(false);
        } else if (resp.statusText === "UNAUTHORIZED") {
          alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
          setUser({ id: "", pw: "" });
          setLoading(false);
        }
      });
    } else {
      alert("아이디, 비밀번호를 모두 입력해주세요.");
    }
  };

  // 엔터키로 로그인 감지
  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      handleLogin();
    }
  };

  const handleSignup = () => {
    navi("/member/signup");
  };

  const handleFindInfo = () => {
    navi("/member/findInfo");
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={style.loginBox}>
      <div className={style.logo}>
        <span>L</span>OG<span>I</span>N
      </div>
      <div className={style.loginInputBox}>
        <div>
          <input
            type="text"
            name="id"
            placeholder="아이디"
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            value={user.id}
          />
        </div>
        <div>
          <input
            type="password"
            name="pw"
            placeholder="비밀번호"
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            value={user.pw}
          />
        </div>
      </div>

      <div className={style.loginOption}>
        <div>
          <input
            type="checkbox"
            id="saveId"
            onChange={handleRemember}
            checked={rememberId}
          />
          <label htmlFor="saveId">아이디 기억하기</label>
        </div>
        <div className={style.memberMenu}>
          <div onClick={handleSignup}>회원가입</div>
          <div onClick={handleFindInfo}>아이디/비밀번호 찾기</div>
        </div>
      </div>
      <div>
        <PurpleRectangleBtn
          title={"로그인"}
          width={400}
          heightPadding={15}
          onClick={handleLogin}
          activation={true}
        ></PurpleRectangleBtn>
      </div>
    </div>
  );
};

export default Login;

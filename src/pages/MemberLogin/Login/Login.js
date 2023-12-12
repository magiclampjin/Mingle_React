import style from "./Login.module.css";
import PurpleRectangleBtn from "../../../components/PurpleRectangleBtn/PurpleRectangleBtn";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { LoginContext } from "../../../App";

const Login = () => {
  const [user, setUser] = useState({ id: "", pw: "" });
  const { setLoginId } = useContext(LoginContext);
  const navi = useNavigate();

  // user State 값 채우기
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    console.log(user.id);
    if (user.id !== "" && user.pw !== "") {
      const formData = new FormData();
      formData.append("id", user.id);
      formData.append("pw", user.pw);

      axios.post("/api/member/login", formData).then((resp) => {
        console.log("로그인 성공");
        console.log(resp);
        if (resp.statusText === "OK") {
          setLoginId(user.id);
          setUser({ id: "", pw: "" });
          navi(-1);
        } else if (resp.statusText === "UNAUTHORIZED") {
          alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
          setUser({ id: "", pw: "" });
        }
      });
    } else {
      alert("아이디, 비밀번호를 모두 입력해주세요.");
    }
  };
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
            value={user.id}
          />
        </div>
        <div>
          <input
            type="password"
            name="pw"
            placeholder="비밀번호"
            onChange={handleChange}
            value={user.pw}
          />
        </div>
      </div>

      <div className={style.loginOption}>
        <div>
          <input type="checkbox" id="saveId" />
          <label htmlFor="saveId">아이디 기억하기</label>
        </div>
        <div className={style.memberMenu}>
          <Link to="signup">
            <div>회원가입</div>
          </Link>
          <div>아이디/비밀번호 찾기</div>
        </div>
      </div>
      <div>
        <PurpleRectangleBtn
          title={"로그인"}
          width={400}
          heightPadding={15}
          onClick={handleLogin}
        ></PurpleRectangleBtn>
      </div>
    </div>
  );
};

export default Login;

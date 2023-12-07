import style from "./Login.module.css";
import PurpleRectangleBtn from "../../../components/PurpleRectangleBtn/PurpleRectangleBtn";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className={style.loginBox}>
      <div className={style.logo}>
        <span>L</span>OG<span>I</span>N
      </div>
      <div className={style.loginInputBox}>
        <div>
          <input type="text" />
        </div>
        <div>
          <input type="password" />
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
        ></PurpleRectangleBtn>
      </div>
    </div>
  );
};

export default Login;

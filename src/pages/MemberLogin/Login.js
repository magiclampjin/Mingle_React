import style from "./Login.module.css";
import PurpleRectangleBtn from "../../components/PurpleRectangleBtn/PurpleRectangleBtn";

const Login = () => {
  return (
    <div className={style.loginBox}>
      <div className={style.logo}>
        <span>L</span>OG<span>I</span>N
      </div>
      <div>
        <input type="text" />
      </div>
      <div>
        <input type="text" />
      </div>
      <div>
        <div>
          <input type="checkbox" id="saveId" />
          <label htmlFor="saveId">아이디 기억하기</label>
        </div>
        <div>
          <div>회원가입</div>
          <div>아이디/비밀번호 찾기</div>
        </div>
      </div>
      <div>
        <PurpleRectangleBtn
          title={"로그인"}
          width={150}
          heightPadding={10}
        ></PurpleRectangleBtn>
      </div>
    </div>
  );
};

export default Login;

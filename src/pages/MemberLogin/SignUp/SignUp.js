import style from "./SignUp.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
  return (
    <div className={style.signupBox}>
      <div className={style.title}>회원가입</div>
      <div className={style.stepBox}>
        <div
          className={`${style.stepBox__step} ${style.currentStep}`}
          id="step1"
        >
          <div className={style.step__info}>STEP 01</div>
          <div className={style.step__title}>약관동의</div>
        </div>
        <div className={style.stepBox__arrow}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <div className={style.stepBox__step} id="step2">
          <div className={style.step__info}>STEP 02</div>
          <div className={style.step__title}>정보입력</div>
        </div>
        <div className={style.stepBox__arrow}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <div className={style.stepBox__step} id="step3">
          <div className={style.step__info}>STEP 03</div>
          <div className={style.step__title}>가입완료</div>
        </div>
      </div>
      <div className={style.totallyAgree}>
        <input type="checkbox" id="chk_all" />
        <label htmlFor="chk_all">약관 전체 동의</label>
      </div>
    </div>
  );
};

export default SignUp;

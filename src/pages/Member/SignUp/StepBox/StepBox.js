import style from "./StepBox.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useContext } from "react";
import { SignUpInfoContext } from "../SignUp";

const StepBox = () => {
  const { currentStep } = useContext(SignUpInfoContext);
  return (
    <>
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
    </>
  );
};

export default StepBox;

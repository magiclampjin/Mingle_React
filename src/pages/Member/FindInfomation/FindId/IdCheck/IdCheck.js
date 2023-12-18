import style from "./IdCheck.module.css";
import PurpleRectangleBtn from "../../../../../components/PurpleRectangleBtn/PurpleRectangleBtn";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext, useEffect } from "react";
import { FindIdContext } from "../FindId";
import { useNavigate } from "react-router-dom";

const IdCheck = () => {
  const { user, setUser } = useContext(FindIdContext);
  const [id, setId] = useState("");
  const navi = useNavigate();

  useEffect(() => {
    if (user.name !== "" && user.email !== "") {
      axios.post("/api/member/findUserId", user).then((resp) => {
        console.log(resp.data);
        setId(resp.data);
      });
    } else {
      navi("/member/findInfo/id");
    }
  });
  return (
    <div className={style.idChek}>
      <div className={style.title}>아이디 찾기</div>
      <div className={style.idCheckBox}>
        {/* <div> */}
        <div className={style.backCircle}>
          <div className={style.mainCircle}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </div>
        {/* </div> */}
        {/* <div className={style.icon}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div> */}
        <div className={style.id}>
          {user.name}님 아이디는 {id} 입니다.
        </div>
        <PurpleRectangleBtn
          title={"로그인"}
          width={300}
          heightPadding={10}
          activation={true}
        ></PurpleRectangleBtn>
        <div className={style.findpw}>비밀번호 찾기</div>
      </div>
    </div>
  );
};

export default IdCheck;

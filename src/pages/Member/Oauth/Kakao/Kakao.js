import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../../../App";
import axios from "axios";

const Kakao = (props) => {
  const { loginId, setLoginId } = useContext(LoginContext);
  const navi = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  useEffect(() => {
    console.log(code);
    const formData = new FormData();
    formData.append("code", code);
    axios.get("/api/member/oauth/loginInfo").then((resp) => {
      console.log(resp);
      // if (resp.data !== "") {
      setLoginId(resp.data);
      // navi(-1);
      // } else {
      // alert("카카오 로그인에 실패하였습니다.");
      // navi("/member/login");
      // }
    });
  }, [props.history]);

  useEffect(() => {
    console.log(loginId);
  }, [loginId]);

  return <LoadingSpinner></LoadingSpinner>;
};
export default Kakao;

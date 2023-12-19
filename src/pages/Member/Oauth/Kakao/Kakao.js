import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Kakao = (props) => {
  const navi = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  useEffect(() => {
    console.log(code);
    const formData = new FormData();
    formData.append("code", code);
    axios.post("/api/member/login/oauth/kakao", formData).then((resp) => {
      console.log(resp);
    });
  }, [props.history]);

  return <LoadingSpinner></LoadingSpinner>;
};
export default Kakao;

import { Routes, Route, useNavigate } from "react-router-dom";
import FindType from "./FindType/FindType";
import FindId from "./FindId/FindId";
import FindPw from "./FindPw/FindPw";
import { useContext, useEffect } from "react";
import { LoginContext } from "../../../App";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const FindInfomation = () => {

  const { loginId, loginStatus } = useContext(LoginContext);
  const navi = useNavigate();

  useEffect(()=>{
    if(loginStatus=="loading"){
      <LoadingSpinner/>
    }else{
      if(loginId!==""){
        navi("/")
      }
    }
  },[loginId, loginStatus]);

  return (
    <Routes>
      <Route path="/" element={<FindType />}></Route>
      <Route path="/id/*" element={<FindId />}></Route>
      <Route path="/pw/*" element={<FindPw />}></Route>
    </Routes>
  );
};

export default FindInfomation;

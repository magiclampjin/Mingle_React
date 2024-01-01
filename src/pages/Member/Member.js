import { Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MenuContext } from "../../App";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import FindInfomation from "./FindInfomation/FindInfomation";
const Member = () => {
  // 선택된 메뉴 초기화
  const { setSelectedMenu } = useContext(MenuContext);
  useEffect(() => {
    setSelectedMenu("");
  }, []);
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup/*" element={<SignUp />}></Route>
      <Route path="/findInfo/*" element={<FindInfomation />}></Route>
    </Routes>
  );
};

export default Member;

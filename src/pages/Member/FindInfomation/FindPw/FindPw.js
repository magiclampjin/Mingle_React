import { Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import PwCertification from "./PwCertification/PwCertification";
import PwChange from "./PwChange/PwChange";

export const FindPwContext = createContext();

const FindPw = () => {
  const [user, setUser] = useState({ id: "", name: "", email: "" });
  const [findPw, setFindPw] = useState(false); // 비밀번호 찾기 활성화 여부
  return (
    <FindPwContext.Provider value={{ user, setUser, findPw, setFindPw }}>
      <Routes>
        <Route path="/" element={<PwCertification />}></Route>
        <Route path="/change" element={<PwChange />}></Route>
      </Routes>
    </FindPwContext.Provider>
  );
};

export default FindPw;

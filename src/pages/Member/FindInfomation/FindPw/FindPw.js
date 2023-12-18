import { Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import PwCertification from "./PwCertification/PwCertification";

export const FindPwContext = createContext();

const FindPw = () => {
  const [user, setUser] = useState({ id: "", name: "", email: "" });
  return (
    <FindPwContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<PwCertification />}></Route>
      </Routes>
    </FindPwContext.Provider>
  );
};

export default FindPw;

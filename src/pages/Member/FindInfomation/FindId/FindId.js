import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useContext, createContext } from "react";

import IdCertification from "./IdCertification/IdCertification";
import IdCheck from "./IdCheck/IdCheck";

export const FindIdContext = createContext();

const FindId = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  return (
    <FindIdContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<IdCertification />}></Route>
        <Route path="/find" element={<IdCheck />}></Route>
      </Routes>
    </FindIdContext.Provider>
  );
};

export default FindId;

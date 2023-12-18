import { Routes, Route } from "react-router-dom";
import PwCertification from "./PwCertification/PwCertification";

const FindPw = () => {
  return (
    <Routes>
      <Route path="/" element={<PwCertification />}></Route>
    </Routes>
  );
};

export default FindPw;

import { Routes, Route } from "react-router-dom";
import IdCertification from "./IdCertification/IdCertification";
import IdCheck from "./IdCheck/IdCheck";

const FindId = () => {
  return (
    <Routes>
      <Route path="/" element={<IdCertification />}></Route>
      <Route path="/find" element={<IdCheck />}></Route>
    </Routes>
  );
};

export default FindId;

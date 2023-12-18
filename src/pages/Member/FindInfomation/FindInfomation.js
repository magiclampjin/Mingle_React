import { Routes, Route } from "react-router-dom";
import FindType from "./FindType/FindType";
import FindId from "./FindId/FindId";
import FindPw from "./FindPw/FindPw";

const FindInfomation = () => {
  return (
    <Routes>
      <Route path="/" element={<FindType />}></Route>
      <Route path="/id/*" element={<FindId />}></Route>
      <Route path="/pw/*" element={<FindPw />}></Route>
    </Routes>
  );
};

export default FindInfomation;

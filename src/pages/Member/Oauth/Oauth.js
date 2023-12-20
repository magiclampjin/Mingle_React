import { Routes, Route } from "react-router-dom";
import Kakao from "./Kakao/Kakao";
const Oauth = () => {
  return (
    <Routes>
      <Route path="/Kakao" element={<Kakao />}></Route>
    </Routes>
  );
};

export default Oauth;

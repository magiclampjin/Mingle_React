import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import FindInfomation from "./FindInfomation/FindInfomation";
import Oauth from "./Oauth/Oauth";
const Member = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup/*" element={<SignUp />}></Route>
      <Route path="/findInfo/*" element={<FindInfomation />}></Route>
      <Route path="/oauth/*" element={<Oauth />}></Route>
    </Routes>
  );
};

export default Member;

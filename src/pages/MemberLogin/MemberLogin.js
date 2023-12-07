import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
const MemberLogin = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
    </Routes>
  );
};

export default MemberLogin;

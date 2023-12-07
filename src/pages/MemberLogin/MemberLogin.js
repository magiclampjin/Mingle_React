import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
const MemberLogin = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
    </Routes>
  );
};

export default MemberLogin;

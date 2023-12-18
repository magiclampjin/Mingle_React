import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import AccountRegistration from "./AccountRegistration/AccountRegistration";
const Member = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup/*" element={<SignUp />}></Route>
      <Route path="/account" element={<AccountRegistration />}></Route>
    </Routes>
  );
};

export default Member;

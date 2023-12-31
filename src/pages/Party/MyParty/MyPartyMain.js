import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { LoginContext, MenuContext } from "../../../App";
import MyPartyList from "./MyPartyList/MyPartyList";
import MyPartyInfo from "./MyPartyInfo/MyPartyInfo";
import { createContext, useState } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

export const myPartyContext = createContext();
const MyPartyMain = () => {
  const [selectParty, setSelectParty] = useState();
  // 선택된 메뉴 초기화
  const { setSelectedMenu } = useContext(MenuContext);
  useEffect(() => {
    setSelectedMenu("나의 파티");
  }, []);

  const navi = useNavigate();
  const [isLoading, setLoading] = useState(false);

  // 미로그인 시 접근불가
  const {loginId, loginStatus} = useContext(LoginContext);
  
  // // 로그인 여부
  useEffect(()=>{
      if(loginStatus!=="confirm")
          setLoading(true);
      else{
          if(loginId===""){
            console.log("디나이드");
              navi("/denied");
          }
          setLoading(false);
      }
  },[loginId, loginStatus]);

  if(isLoading){
    return <LoadingSpinner/>;
  }

  return (
    <myPartyContext.Provider
      value={{
        selectParty: selectParty,
        setSelectParty: setSelectParty,
      }}
    >
      <Routes>
        <Route path="/" element={<MyPartyList />} />
        <Route path="/myPartyInfo" element={<MyPartyInfo />} />
      </Routes>
    </myPartyContext.Provider>
  );
};

export default MyPartyMain;

import style from '../../pages/MyPage/Mypage.module.css';
import MyPageSideBarLeft from './components/MypageSidebarLeft/MypageSideBarLeft';
import Calculation from './Calculation/Calculation';
import MypageSidebarRight from './components/MypageSidebarRight/MypageSidebarRight';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MypageMain from './MypageMain/MypageMain';
import MemberInfoUpdate from './MemberInfoUpdate/MemberInfoUpdate';
import PaymentManage from './PaymentManage/PaymentManage';
import PaymentRecord from './PaymentRecord/PaymentRecord';
import { createContext,useState } from 'react';

export const mypageMenuContext = createContext();

const Mypage= () => {

    const [menu, setMenu] = useState("메뉴");

    console.log(menu);

    return(
        <mypageMenuContext.Provider value={{menu,setMenu}}>
            <div className={style.container}>
                <div className={style.container__inner}>
                    <div >
                        <MyPageSideBarLeft></MyPageSideBarLeft>
                    </div>
                    <div>
                        <Routes>
                            <Route path="/" element={<MypageMain/>}></Route>
                            <Route path="Calculation" element={<Calculation/>}></Route>
                            <Route path="MemberInfoUpdate" element={<MemberInfoUpdate/>}></Route>
                            <Route path="PaymentManage" element={<PaymentManage/>}></Route>
                            <Route path="PaymentRecord" element={<PaymentRecord/>}></Route>
                        </Routes>
                    </div>
                    <div >
                        <MypageSidebarRight></MypageSidebarRight>
                    </div>
                </div>
            </div>
        </mypageMenuContext.Provider>
    );
}

export default Mypage;
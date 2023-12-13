import { useContext } from 'react';
import style from '../../../../pages/MyPage/components/MypageSidebarLeft/MypageSideBarLeft.module.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { mypageMenuContext } from './../../Mypage';



const MyPageSideBarLeft = () =>{

    // 메뉴 컨텍스트 사용
    const {menu, setMenu} = useContext(mypageMenuContext);

    // 사이드바 클릭 시 내용에 맞게 setMenu
    const handleClickNav = (e) => {
        let value = e.target.parentNode.textContent;
        setMenu(value);
    };
    // 클릭한 내용과 같으면 적용하는 스타일
    const backStyle = {
        color:"rgb(64, 64, 204)"
    };
    
    return(
        <div className={style.sidebarBox}>
            <div className={style.sidebar}>

                <div className={style.sidebar__inner}>공지사항</div>
                
                <Link to="MemberInfoUpdate">
                    <div className={style.sidebar__inner}
                     onClick={handleClickNav} 
                     style={menu === "회원 정보 수정" ? backStyle : {}}
                     >회원 정보 수정</div>
                </Link>
                <Link to="PaymentManage">
                    <div className={style.sidebar__inner}
                     onClick={handleClickNav} 
                     style={menu === "결제 수단 관리" ? backStyle : {}}
                     >결제 수단 관리</div>
                </Link>
                <Link to="PaymentRecord">
                    <div className={style.sidebar__inner} 
                    onClick={handleClickNav} 
                    style={menu === "정산 내역 확인" ? backStyle : {}}
                    >정산 내역 확인</div>
                </Link>
                 <Link to="Calculation"> 
                    <div className={style.sidebar__inner} 
                    onClick={handleClickNav} 
                    style={menu === "정산일 관리" ? backStyle : {}}
                    > 정산일 관리 </div>
                </Link>
                
                <div className={style.sidebar__inner}
                onClick={handleClickNav} 
                style={menu === "파티 관리" ? backStyle : {}}
                >파티 관리</div>
            </div>
            
        </div>
    );

}

export default MyPageSideBarLeft;
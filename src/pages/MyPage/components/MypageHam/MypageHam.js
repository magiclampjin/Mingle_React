import { useContext, useState } from 'react';
import style from '../../components/MypageHam/MypageHam.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { mypageMenuContext } from '../../Mypage';

const MypageHam = () =>{
    // 메뉴 초기값 false
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // 메뉴 컨텍스트 사용
    const {menu, setMenu} = useContext(mypageMenuContext);

    // 사이드바 클릭 시 내용에 맞게 setMenu
    const handleClickNav = (e) => {
        let value = e.target.parentNode.textContent;
        console.log(value);
        setMenu(value);
    }; 

    // 클릭한 내용과 같으면 적용하는 스타일
    const backStyle = {
        color:"rgb(64, 64, 204)"
    };

    // nav 클릭 on,off 개념
    const handleClick = () => {
        setIsMenuOpen(!isMenuOpen)
      }
      const navArray = [{'title':'공지사항', 'url':'#'},
                        {'title':'회원 정보 수정' , 'url':'MemberInfoUpdate'},
                        {'title':'결제 수단 관리' , 'url':'PaymentManage'},
                        {'title':'정산 내역 확인' , 'url':'PaymentRecord'},
                        {'title':'정산일 관리' , 'url':'Calculation'}
                    ];
 

    return(
        <div className={style.container}>
            <div onClick={handleClick}>
                <div className={style.dropDownMenu}>
                    <div>
                        {menu == '' ? '마이페이지' : menu}
                    </div>
                    <div className={style.dropDownArrow}>
                    {
                    isMenuOpen ? 
                    <FontAwesomeIcon icon={faAngleUp} /> 
                    : <FontAwesomeIcon icon={faAngleDown} />
                    }
                    </div>
                </div>
                {isMenuOpen && (
                navArray.map(item => (
                    <Link to={item.url}>
                        <div 
                        className={style.dropDownMenu__inner} 
                        onClick={handleClickNav}
                        style={menu === item.title ? backStyle : {}}
                        >{item.title}
                        </div>
                    </Link>

                ))
                ) }
            </div>
            
      </div>
    );
}

export default MypageHam;
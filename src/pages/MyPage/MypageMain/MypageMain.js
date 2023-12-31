import style from '../../MyPage/MypageMain/MypageMain.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from 'react';
import { LoginContext } from '../../../App';

const MypageMain = () =>{

     // 프로필 이미지 상태 
    const [profileUrl, setProfileUrl] = useState("/assets/basicProfile.png");

    // App.js의 LoginContext 사용
    const {loginNick} = useContext(LoginContext);


    return(

        <div className={style.container}>
            <div className={style.profileBack}></div>
            <img src={profileUrl} className={style.profileImage} alt="" />
            <div className={style.nickname}>{loginNick}</div>
            <div className={style.profileBackBottom}></div>
        </div>

    );
}

export default MypageMain;
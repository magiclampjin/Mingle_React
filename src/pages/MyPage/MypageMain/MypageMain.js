import style from '../../MyPage/MypageMain/MypageMain.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const MypageMain = () =>{

    return(

        <div className={style.container}>
            <div className={style.profileBack}></div>
            <img src="" alt="" />
            <div className={style.nickname}>닉네임</div>
            <div className={style.updateIcon}><FontAwesomeIcon icon={faPenToSquare} /></div>
            <div className={style.profileBackBottom}></div>
        </div>

    );
}

export default MypageMain;
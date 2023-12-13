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

    const OnUploadImage = (e) =>{
        console.log(e.target);

        // 미리보기
        // 선택한 사진의 파일을 FileReader Api 를 이용해서 url 주소를 생성하고
        // 그 주소를 uploadImgUrl 상태에 업데이트 하는 코드
        const {files} = e.target;
        const uploadFile = files[0];

        const reader = new FileReader();
        // readAsDataURL : 선택한 파일을 url 로 변환해주는 함수
        reader.readAsDataURL(uploadFile);

        reader.onloadend = () => {
            setProfileUrl(reader.result);
        }

        // 서버로 보냄
        // axios.get("/api/mypage",profileUrl).then((resp)=>{
        //     alert("변경이 완료되었습니다.");
        // })

    }


    return(

        <div className={style.container}>
            <div className={style.profileBack}></div>
            <img src={profileUrl} className={style.profileImage} alt="" />
            <div className={style.nickname}>{loginNick}</div>

            <label 
            htmlFor="image"
             className={style.updateIcon}
            >
                <FontAwesomeIcon icon={faPenToSquare} />
            </label>

            <input 
            id="image"
            type="file" 
            accept="image/*"
            onChange={OnUploadImage}
            className={style.imgInput}/>

            <div className={style.profileBackBottom}></div>
        </div>

    );
}

export default MypageMain;
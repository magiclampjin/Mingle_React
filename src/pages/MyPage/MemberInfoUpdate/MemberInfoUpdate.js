import { useContext, useState } from 'react';
import PurpleRoundBtn from '../../../components/PurpleRoundBtn/PurpleRoundBtn';
import style from '../../MyPage/MemberInfoUpdate/MemberInfoUpdate.module.css';

const MemberInfoUpdate = () =>{



    // 로그인 계정 State
    const [account, setAccount] = useState(true);

    // 로그인 계정 버튼 클릭
    const handleAccUpdate = (e) =>{
        setAccount(!account);
    }

    // 휴대폰 State
    const [phone, setPhone] = useState(true);

    const handlePhoneUpdate =(e)=>{
        
    }

    return(
        <div className={style.container}>
            <div className={style.container__inner}>
                <div className={style.inner__title}>회원 정보 수정</div>
                <div className={style.inner__line}></div>

                <div className={style.inner}>
                    <div className={style.inner__left}>연결된 소셜 로그인 계정</div>
                    <div className={style.inner__right}>
                        <div className={style.input}>네이버</div>
                        <PurpleRoundBtn title={account?"변경하기":"변경취소"} activation={account} onClick={handleAccUpdate}></PurpleRoundBtn>
                    </div>
                </div>

                <div className={`${style.inner} ${style.none}`}>
                    dd
                </div>

                {account && 
                <>
                <div className={style.inner}>
                    <div className={style.inner__left}>휴대폰 번호</div>
                    <div className={style.inner__right}>
                        <div className={style.input}>01012344321</div>
                        <PurpleRoundBtn title={"변경하기"} activation={phone} onClick={handlePhoneUpdate}></PurpleRoundBtn>
                    </div>
                </div>
                </>
                 }

                 {account && 
                 <>
                <div className={style.inner}>
                    <div className={style.inner__left}>내 이메일</div>
                    <div className={style.inner__right}>
                        <div className={style.input}>@naver.com</div>
                        <PurpleRoundBtn title={"변경하기"} activation={true}></PurpleRoundBtn>
                    </div>
                </div>
                 </>
                 }
               
                
                
            </div>
        </div>
    );
}

export default MemberInfoUpdate;
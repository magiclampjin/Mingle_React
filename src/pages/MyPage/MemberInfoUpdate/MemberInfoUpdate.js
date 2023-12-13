import { useContext, useState } from 'react';
import PurpleRoundBtn from '../../../components/PurpleRoundBtn/PurpleRoundBtn';
import style from '../../MyPage/MemberInfoUpdate/MemberInfoUpdate.module.css';
import CustomModal from '../../../components/CustomModal/CustomModal';
import PurpleRectangleBtn from '../../../components/PurpleRectangleBtn/PurpleRectangleBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import WhiteRectangleBtn from '../../../components/WhiteRectangleBtn/WhiteRectangleBtn';

const MemberInfoUpdate = () =>{

    // 로그인 계정 State
    const [account, setAccount] = useState(true);

    // 로그인 계정 버튼 클릭
    const handleAccUpdate = (e) =>{
        setAccount(!account);
    }

    // 휴대폰 State
    const [phone, setPhone] = useState(true);
    // 휴대폰 모달창 State
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 휴대폰 변경 버튼 클릭
    const handlePhoneUpdate =(e)=>{
        setPhone(!phone);
        setIsModalOpen(true);
    }
    // 모달창 닫기
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // 이메일 State
    const [email,setEmail] = useState(false);
    // 이메일 모달창 State
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

    // 이메일 변경 버튼 클릭
    const handleEmailUpdate = () =>{
        setEmail(!email);
        setIsEmailModalOpen(true);
    }

     // 이메일 모달창 닫기
     const closeEmailModal = () => {
        setEmail(!email);
        setIsEmailModalOpen(false);
    };

    return(
        <div className={style.container}>
            <div className={style.container__inner}>
                <div className={style.inner__title}>회원 정보 수정</div>
                <div className={style.inner__line}></div>

                {phone && 
                <>
                    <div className={style.inner}>
                        <div className={style.inner__left}>연결된 소셜 로그인 계정</div>
                        <div className={style.inner__right}>
                            <div className={style.input}>네이버</div>
                            <PurpleRoundBtn title={account?"변경하기":"변경취소"} activation={account} onClick={handleAccUpdate}></PurpleRoundBtn>
                        </div>
                    </div>
                </>
                }
                
                {!account &&
                <>
                    <div >
                        <div className={style.loginText}>변경하려는 소셜 로그인 수단을 선택해 주세요.</div>
                        <div className={style.socialBox}>
                            <div className={style.social}>
                                <div>
                                    <img src="/assets/socialLogo/kakao.png" className={style.socialImg} alt="카카오 로그인" />
                                </div>
                                <div className={style.text}>
                                    카카오로 시작하기
                                </div>
                                <div></div>
                            </div>
                            <div className={style.social}>
                                <div>
                                    <img src="/assets/socialLogo/google.png" className={style.socialImg}  alt="구글 로그인" />
                                </div>
                                <div className={style.text}>
                                    구글로 시작하기
                                </div>
                            </div>
                            <div className={style.social}>
                                <div>
                                    <img src="/assets/socialLogo/naver.png" className={style.socialImg}  alt="네이버 로그인" />
                                </div>
                                <div className={style.text}>
                                    네이버로 시작하기
                                </div>
                            </div>
                        </div>

                    </div>
                </>
                }
               

                {account && 
                <>
                <div className={style.inner}>
                    <div className={style.inner__left}>휴대폰 번호</div>
                    <div className={style.inner__right}>
                        <div className={style.input}>01012344321</div>
                        <PurpleRoundBtn title={phone?"변경하기":"변경취소"} activation={phone} onClick={handlePhoneUpdate}></PurpleRoundBtn>
                    </div>
                </div>
                </>
                }

                {/* 휴대폰 번호 변경하기 버튼 누르면 바로 모달창 뜸 */}
                {!phone && 
                <>
                    <CustomModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    width={100}
                    height={100}
                    >
                        <div>
                            <div className={style.modalTitle}>휴대폰 번호 변경을 위해서는 본인 인증이 필요합니다.</div>
                            <div className={style.modalSubTitle}>본인 명의의 새 휴대폰 번호로 인증을 진행해 주세요.</div>
                            <div className={style.modalBtn}>
                                <PurpleRectangleBtn
                                title={"확인"}
                                width={100}
                                heightPadding={10}
                                onClick={closeModal}
                                ></PurpleRectangleBtn>
                            </div>
                            
                        </div>
                    </CustomModal>
                </>
                }
                 


                 {account && phone &&
                 <>
                <div className={style.inner}>
                    <div className={style.inner__left}>내 이메일</div>
                    <div className={style.inner__right}>
                        <div className={style.input}>@naver.com</div>
                        <PurpleRoundBtn
                        title={"등록하기"}
                        activation={true} 
                        onClick={handleEmailUpdate}
                        ></PurpleRoundBtn>
                    </div>
                </div>
                 </>
                 }

                {/* 이메일 등록하기 버튼 누르면 뜨는 모달 */}
               {email && 
               <>
                <CustomModal
                isOpen={isEmailModalOpen}
                onRequestClose={closeEmailModal}
                width={200}
                height={150}
                >
                    <div>
                        <div className={style.closeBtn}>
                            <FontAwesomeIcon icon={faXmark} size="lg" onClick={closeEmailModal}/>
                        </div>
                        <div className={style.modalTitle}>고객님의 메일을 등록해 주세요.</div>
                        <div className={style.modalSubTitle}>밍글의 중요한 알림을 고객님의 메일로도 받을 수 있어요.</div>
                        
                        <div className={style.emailBox}>
                            <div className={style.email__inner}>
                                <div>
                                    <input type="text" placeholder='이메일 입력' className={style.inputEmail}/>
                                </div>
                                <div>
                                    <WhiteRectangleBtn
                                    title={"인증하기"}
                                    width={80}
                                    heightPadding={13}
                                    ></WhiteRectangleBtn>
                                </div>
                               
                            </div>
                            <div>
                                <input type="text" placeholder='인증번호 입력' className={style.inputEmail}/>
                            </div>

                            <div className={style.modalBtn}>
                            <PurpleRectangleBtn
                            title={"완료"}
                            width={100}
                            heightPadding={10}
                            ></PurpleRectangleBtn>
                            </div>
                            
                        </div>
                    </div>
                </CustomModal>
               </>
               }
               
                
                
            </div>
        </div>
    );
}

export default MemberInfoUpdate;
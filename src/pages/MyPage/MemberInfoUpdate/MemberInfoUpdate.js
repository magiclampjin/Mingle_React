import { useContext, useEffect, useState } from 'react';
import PurpleRoundBtn from '../../../components/PurpleRoundBtn/PurpleRoundBtn';
import style from '../../MyPage/MemberInfoUpdate/MemberInfoUpdate.module.css';
import PurpleRectangleBtn from '../../../components/PurpleRectangleBtn/PurpleRectangleBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faL, faXmark} from "@fortawesome/free-solid-svg-icons";
import WhiteRectangleBtn from '../../../components/WhiteRectangleBtn/WhiteRectangleBtn';
import MypageModal from '../components/MypageModal/MypageModal';
import axios from 'axios';
import LoadingSpinnerMini from '../../../components/LoadingSpinnerMini/LoadingSpinnerMini';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../../App';

const MemberInfoUpdate = () =>{
    
    // 로그인 컨텍스트
    const { loginId ,setLoginId } = useContext(LoginContext);

    const navi = useNavigate();

    // 로딩 State
    const [isLoading, setLoading]=useState(false);

    // 로그인 계정 State
    const [account, setAccount] = useState(true);

    // 로그인 계정 버튼 클릭
    const handleAccUpdate = (e) =>{
        setAccount(!account);
    }

    // // 휴대폰 State
    // const [phone, setPhone] = useState(true);
    // 휴대폰 모달창 State
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 휴대폰 변경 버튼 클릭
    const handlePhoneUpdate =(e)=>{
        // setPhone(!phone);
        setIsModalOpen(true);
    }
    // 휴대폰 모달창 닫기
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // 이메일 유효성 검사
    const isValidEmail = (value) => {
        // 이메일 유효성 검사를 위한 정규식
        const regex = /^[a-z0-9_]+@[a-z]+\.[a-z]{2,3}$/;
        return regex.test(value);
    };

    // 이메일 버튼 클릭 State
    const [email,setEmail] = useState(false);

    // 이메일 다시 등록할때의 State
    const [inputEmail, setInputEmail] = useState("");
    
    // 이메일 Regex 결과 State
    const [isEmail, setIsEmail] = useState(false);

    // 이메일 모달창 State
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

    // 이메일 입력 input
    const handleEmail = (e) =>{
        const emailValue = e.target.value;
        setInputEmail(emailValue);

        const result = isValidEmail(emailValue);
        setIsEmail(result);
    }

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

    // 휴대폰 번호 유효성 검사
    const isValidPhone = (value) =>{
        // 정규표현식을 사용하여 휴대폰 번호 유효성 검사
        const regex = /^010[0-9]{8}$/;
        return regex.test(value);
    }

    // 휴대폰 regex
    const [isPhone, setIsPhone] = useState(false);

    // 폰 다시 등록할때의 State
    const [inputPhone, setInputPhone] = useState("");

    // 휴대폰 번호 입력input
    const handlePhoneNum = (e) => {
        const phoneValue = e.target.value;
        setInputPhone(phoneValue);
        console.log(e.target.value);

        const result = isValidPhone(phoneValue);
        setIsPhone(result);
    }

    // 휴대폰 번호 변경하기 -> 확인
    const handlePhoneSubmit = () => {
        console.log(isPhone);
        if(isPhone){
            axios.put("/api/member/mypagePhoneUpdate",{phone:inputPhone}).then((resp)=>{
                setUserPhone(inputPhone);
                closeModal();
            })
        }else{
            setInputPhone();
            alert("휴대폰 번호를 다시 입력해주세요.");
        }
        
    } 

   
    // 사용자의 휴대폰 번호 State
    const [userPhone, setUserPhone] = useState("");

    // 사용자의 이메일 State
    const [userEmail, setUserEmail] = useState("");

    // 인증번호 - 완료버튼 클릭 State
    const [codeCom,setCodeCom] = useState(false);
  

    // 서버에서 사용자 기본 정보 불러오기
    useEffect(()=>{
        setLoading(true);
        axios.get("/api/member/mypageUserInfo").then((resp)=>{
            setUserPhone(resp.data.phone);
            setUserEmail(resp.data.email);
            setLoading(false);
        }).catch(()=>{
            alert("정보를 불러오지 못했습니다.");
            setLoading(false);
        })
    },[codeCom,userPhone])


    // 이메일 인증하기 버튼 누름
    const handleAuthBtn = () =>{
        if(inputEmail == ""){
            alert("이메일을 입력해주세요.");
            return;
        }
        if(!isEmail){
            // 이메일 제대로 입력 안함
            alert("이메일 양식을 확인해주세요.");
            return;
        }else{
            alert("인증번호가 발송되었습니다.");
            // 이메일 제대로 입력함
            axios.get("/api/member/mypageEmailAuth",{params:{email:inputEmail}}).then((resp)=>{
                if (resp) {
                   console.log(resp.data);
                }
            })
          
        }
    }

    // 인증번호
    const [code, setCode] = useState("");

    // 인증번호 입력
    const handleAuthCode = (e) =>{
        let code = e.target.value;
        setCode(code);
    }

    // 인증번호 완료
    const handleAuthSubmit = (e)=>{
        axios.get("/api/member/emailChk",{params:{code:code, email:inputEmail}}).then((resp)=>{
            console.log(resp.data);
            if(resp.data){
                setIsEmailModalOpen(false);
                alert("변경되었습니다.");
                setCodeCom(!codeCom);
            }else{
                alert("이메일 인증에 실패했습니다.");
            }
        });

        
    }

    // 멤버 탈퇴 모달 State
    const [memberOutModal, setMemberOutModal] = useState(false);

    // 멤버 탈퇴 버튼 클릭 하면 모달 띄우기
    const HandleMemberOutModal = () => {
        setMemberOutModal(!memberOutModal);
    }

    // 탈퇴모달 닫기
    const closeMemberOutModal = () =>{
        setMemberOutModal(!memberOutModal);
    }

    const isValidPw = (value) =>{
        // 정규식 : 특수문자 1개, 대문자 1개, 소문자 1개가 모두 포함된 8~30글자
        let regexPw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,30}$/;

        return regexPw.test(value);
    }

    // 비밀번호 Regex 결과 State
    const [isPw, setIsPw] = useState(false);

    // 비밀번호 State
    const [inputPw, setInputPw] = useState("");

    // 비밀번호 input 입력
    const handlePwChange = (e) => {
        const pwValue = e.target.value;
        setInputPw(pwValue);

        const result = isValidPw(pwValue);
        setIsPw(result);
    }


    // 탈퇴버튼 누름
    const handleMemberOutSubmit = (e) =>{
        if(isPw){
            axios.get("/api/member/mypageMemberOut",{params:{password:inputPw}}).then((resp)=>{
              
                console.log(resp.data);
                if(resp.data === 1){
                    alert("탈퇴가 완료되었습니다.")
                    moveHome();
                }else if(resp.data === 2){
                    alert("비밀번호가 일치하지 않습니다.");
                }else if(resp.data === 3){
                    alert("가입한 파티가 있으면 탈퇴가 불가능합니다.");
                }
                closeMemberOutModal();
            })
            .catch(()=>{
                alert("탈퇴에 실패했습니다.");
            })
        }else{
            alert("비밀번호 형식을 확인해주세요.");
        }
        
    }

    // 홈으로 이동
    const moveHome=()=>{
        navi("/");
        setLoginId("");
    }
   

    return(
        <div className={style.container}>
           
            <div className={style.container__inner}>
                <div className={style.inner__title}>회원 정보 수정</div>
                <div className={style.inner__line}></div>
                {isLoading
                ?
                <LoadingSpinnerMini width={600} height={160}/>
                :
                <>

                    <>
                        <div className={style.inner}>
                            <div className={style.inner__left}>연결된 소셜 로그인 계정</div>
                            <div className={style.inner__right}>
                                <div className={style.input}>네이버</div>
                                <PurpleRoundBtn title={account?"변경하기":"변경취소"} activation={account} onClick={handleAccUpdate}></PurpleRoundBtn>
                            </div>
                        </div>
                    </>
                
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
                        <div className={style.input}>{userPhone}</div>
                        <PurpleRoundBtn title={"변경하기"} activation={true} onClick={handlePhoneUpdate}></PurpleRoundBtn>
                    </div>
                </div>
                </>
                }

                {/* 휴대폰 번호 변경하기 버튼 누르면 바로 모달창 뜸 */}
                {isModalOpen && 
                <>
                    <MypageModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    width={300}
                    height={220}
                    >
                        <div>
                            <div className={style.closeBtn}>
                                <FontAwesomeIcon icon={faXmark} size="lg" onClick={closeModal}/>
                            </div>
                            <div className={style.modalTitle}>휴대폰 번호 변경</div>
                            <div className={style.phoneBox}>
                                <input type="text" placeholder='휴대폰 번호 입력'
                                style={{
                                    borderColor: inputPhone ? (isPhone ? 'black' : 'red') : 'black'
                                }} 
                                onChange={handlePhoneNum}
                                />
                            </div>
                            <div className={style.modalBtn}>
                                <PurpleRectangleBtn
                                title={"확인"}
                                width={100}
                                heightPadding={10}
                                activation={true}
                                onClick={handlePhoneSubmit}
                                ></PurpleRectangleBtn>
                            </div>
                            
                        </div>
                    </MypageModal>
                </>
                }
                 


                 {account  &&
                 <>
                <div className={style.inner}>
                    <div className={style.inner__left}>내 이메일</div>
                    <div className={style.inner__right}>
                        <div className={style.input}>{userEmail}</div>
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
                <MypageModal
                isOpen={isEmailModalOpen}
                onRequestClose={closeEmailModal}
                width={500}
                height={340}
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
                                    <input type="text" 
                                    placeholder='이메일 입력' 
                                    className={style.inputEmail}
                                    onChange={handleEmail}
                                    style={{
                                        borderColor: inputEmail ? (isEmail ? 'black' : 'red'):'black'
                                    }}
                                    />
                                </div>
                                <div>
                                    <WhiteRectangleBtn
                                    title={"인증하기"}
                                    width={80}
                                    heightPadding={13}
                                    onClick={handleAuthBtn}
                                    ></WhiteRectangleBtn>
                                </div>
                               
                            </div>
                            <div>
                                <input type="text" 
                                placeholder='인증번호 입력'
                                className={style.inputEmail}
                                onChange={handleAuthCode}
                                />
                            </div>

                            <div className={style.modalBtn}>
                                <PurpleRectangleBtn
                                title={"완료"}
                                width={100}
                                heightPadding={10}
                                activation={true}
                                onClick={handleAuthSubmit}
                                ></PurpleRectangleBtn>
                            </div>
                            
                        </div>
                    </div>
                </MypageModal>
               </>
               }

               {account && 
               <div className={style.inner}>
                    <div className={style.inner__left}></div>
                    <div className={`${style.inner__right} ${style.memberOut}`}
                    onClick={HandleMemberOutModal}
                    >
                        탈퇴하기
                    </div>
                </div>
                } 
                
                {/* 멤버탈퇴 모달 */}
                {memberOutModal && 
                    <MypageModal
                    isOpen={memberOutModal}
                    onRequestClose={closeMemberOutModal}
                    width={450}
                    height={260}
                    >
                        <div>
                            <div className={style.closeBtn}>
                                <FontAwesomeIcon icon={faXmark} size="lg" onClick={closeMemberOutModal}/>
                            </div>
                            <div className={style.modalTitle}>탈퇴하시겠습니까?</div>
                            <div className={style.modalSubTitle}>정확한 본인확인을 위해 비밀번호를 입력해 주세요.</div>
                            <div className={style.emailBox}>
                                <input className={style.inputPw}
                                    type="password"
                                    name="password"
                                    placeholder="8~30자의 영문 대소문자, 숫자 및 특수문자"
                                    style={{borderColor: inputPw ? (isPw ? "black" : "red" ) : "black"}}
                                    onChange={handlePwChange}
                                />
                                <div className={`${style.modalBtn} ${style.btnBox}`}>
                                    <PurpleRectangleBtn
                                    title={"취소"}
                                    width={100}
                                    heightPadding={10}
                                    activation={false}
                                    onClick={closeMemberOutModal}
                                    ></PurpleRectangleBtn>

                                    <PurpleRectangleBtn
                                    title={"탈퇴"}
                                    width={100}
                                    heightPadding={10}
                                    activation={true}
                                    onClick={handleMemberOutSubmit}
                                    ></PurpleRectangleBtn>
                                </div>
                            </div>
                            
                        </div>
                         
                    </MypageModal>
                }
                    
                
               </>
            }
            </div>
        </div>
    );
}

export default MemberInfoUpdate;
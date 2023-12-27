import { useContext, useEffect, useState } from 'react';
import PurpleRoundBtn from '../../../components/PurpleRoundBtn/PurpleRoundBtn';
import style from '../../MyPage/PaymentManage/PaymentManage.module.css';
import PurpleRectangleBtn from '../../../components/PurpleRectangleBtn/PurpleRectangleBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark, faCheck} from "@fortawesome/free-solid-svg-icons";
import WhiteRectangleBtn from '../../../components/WhiteRectangleBtn/WhiteRectangleBtn';
import MypageModal from '../components/MypageModal/MypageModal';
import WhiteRoundBtn from '../../../components/WhiteRoundBtn/WhiteRoundBtn';
import axios from 'axios';
import LoadingSpinnerMini from '../../../components/LoadingSpinnerMini/LoadingSpinnerMini';
import { LoginContext } from '../../../App';


const PaymentManage = () =>{

    // 로그인 컨텍스트
    const { loginId ,setLoginId } = useContext(LoginContext);

     // 로딩 State
     const [isLoading, setLoading]=useState(false);

    // 계좌 State
    const [card,setCard] = useState(false);
    // 계좌 모달창 State
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);

    // 계좌 등록 버튼 클릭
    const handleCardInsert = () =>{
        setCard(!card);
        setIsCardModalOpen(!isCardModalOpen); // 모달 열기
    }
    // 계좌 모달창 닫기
    const closeCardModal = () => {
        setCard(!card);
        setAccountNum("");
        setSelectedBank("");
        setIsCardModalOpen(!isCardModalOpen);
    };

    // // ------ 계좌번호 유효성 검사
    // const isValidCardNumber = (cardNumber) => {
    //     // 숫자만 허용하고, 전체 길이가 16이어야 함
    //     const cardNumberRegex = /^\d{16}$/;
        
    //     return cardNumberRegex.test(cardNumber);
    // };
      
    // // 카드번호 입력받는 State
    // const [cardNumber, setCardNumber] = useState("");
    // const [isCardValid, setIsCardValid] = useState(true);

    // // 카드번호 입력
    // const handleCardNum = (e) =>{
    //     const newCardValue = e.target.value;
    //     setCardNumber(newCardValue);

    //     // 입력된 카드 번호 유효성 검사
    //     const valid = isValidCardNumber(newCardValue);
    //     setIsCardValid(valid);
    // }

    // ---시작
    // 계좌번호 유효성 검사
    const isValidKoreanBankAccountNumber = (value) => {
        // 9~16자리
        const regex = /^[0-9]{9,16}$/;
        return regex.test(value);
    };

    // 계좌번호 입력받는 State
    const [accountNum, setAccountNum] = useState("");
    const [isAccount,setIsAccount] = useState(false);

    // 계좌번호 입력
    const handleAccountNum = (e) =>{
        console.log(e.target.value);
        // 숫자만 입력 받기
        const newAccountValue = e.target.value.replace(/[^0-9]/g, '').replace(/([\d]{16})([\d]{1,})/g, '$1');
        setAccountNum(newAccountValue);
        // 입력된 계좌 번호 유효성 검사
        const valid = isValidKoreanBankAccountNumber(newAccountValue);
        setIsAccount(valid);
    }

    // 은행 State
    const [selectedBank, setSelectedBank] = useState('');
    const [isBank, setIsBank] = useState(false);
        
    const handleBankChange = (e) => {
        console.log(e.target.value);
        const newBankValue = e.target.value;
        setSelectedBank(newBankValue);

        if(newBankValue != "선택"){
            setIsBank(true);
        }
        if(newBankValue == "선택"){
            setIsBank(false);
        }
    };

   // 은행 목록
   const [bankList, setBankList] = useState([]);

   useEffect(()=>{
        // 은행 정보 불러오기
        setLoading(true);
        axios.get("/api/paymentAccount/selectBankList").then((resp)=>{
            // console.log(resp.data);
            setBankList(resp.data);
            setLoading(false);
       }).catch(()=>{
            alert("은행 정보를 불러오는 데 실패했습니다.");
            setLoading(false);
       })
   },[])

   

    // 끝


    // // ----- 유효기간 MM, YY 유효성검사
    // const isValidTwoDigitNumber = (value) => {
    //     // 숫자만 허용하고, 전체 길이가 2이어야 함
    //     const twoDigitNumberRegex = /^\d{2}$/;
        
    //     return twoDigitNumberRegex.test(value);
    // };
      
    // // 유효기간 MM State
    // const [cardMonth, setCardMonth] = useState("");
    // const [isCardMonth, setIsCardMonth] = useState(true);

    // // 유효기간 MM
    // const handleMonthNum = (e)=>{
    //     const newValue = e.target.value;
    //     setCardMonth(newValue);

    //     // 입력된 값의 유효성 검사
    //     const valid = isValidTwoDigitNumber(newValue);
    //     setIsCardMonth(valid);
    // }

    // // 유효기간 YY State
    // const [cardYear, setCardYear] = useState("");
    // const [isCardYear, setIsCardYear] = useState(true);

    // // 유효기간 YY
    // const handleYearNum = (e)=>{
    //     const newValue = e.target.value;
    //     setCardYear(newValue);

    //     // 입력된 값의 유효성 검사
    //     const valid = isValidTwoDigitNumber(newValue);
    //     setIsCardYear(valid);
    // }

    // // ----- 생일 유효성 검사
    // const isValidSixDigitNumber = (input) => {
    //     const regex = /^\d{6}$/;
    //     return regex.test(input);
    // };

    // // 생일 State
    // const [birth, setBirth] = useState("");
    // const [isBirth, setIsBirth] = useState(true);

    // // 생일 
    // const handleBirth = (e) => {
    //     const newValue = e.target.value;
    //     setBirth(newValue);

    //     // 입력된 값의 유효성 검사  
    //     const valid = isValidSixDigitNumber(newValue);
    //     setIsBirth(valid);
    // }

    // // 비밀번호 앞 두자리 State
    // const [password, setPassword] = useState("");
    // const [isPassword, setIsPassword] = useState(true);

    // // 비밀번호
    // const handlePW = (e) => {
    //     const newValue = e.target.value;
    //     setPassword(newValue);

    //     // 입력된 값의 유효성 검사
    //     const valid = isValidTwoDigitNumber(newValue);
    //     setIsPassword(valid);
    // }

    // // 유효성 검사 통과했는지?
    // const totalValid = isCardValid && isCardMonth && isCardYear && isBirth && isPassword;


   // Regex 검사결과
    const totalValid = isAccount && isBank;

    // 계좌번호 수정 State
    const [updateAccount, setUpdateAccount] = useState("");

   // 서버로 보낼 데이터
   const postData = {
    bankId: selectedBank,
    accountNumber: accountNum
   }

   // 계좌 등록 완료 버튼
    const handleSubmit = () =>{
        console.log(totalValid);
        
        if(totalValid){
            // 계좌 등록
            console.log("은행 : "+selectedBank);
            console.log("계좌번호 : "+accountNum);
            axios.post("/api/paymentAccount/accountInsert",postData).then((resp)=>{
                closeCardModal();
                setUpdateAccount(accountNum);
            }).catch(()=>{
                alert("계좌 등록에 실패했습니다.")
            })
        }else{
            alert("은행명과 계좌번호를 다시 입력해주세요.");
        }

    }

    // 불러온 계좌 State
    const [account, setAccount] = useState({});

    // 등록된 계좌 불러오기
    useEffect(()=>{
        // if(loginId !== ""){
            axios.get("/api/paymentAccount/accountSelect").then((resp)=>{
                console.log(resp.data);
                setAccount(resp.data);
            }).catch(()=>{
                alert("계좌를 불러오는데 실패했습니다.");
            })
        // }
    },[updateAccount])

    // 계좌 삭제하시겠습니까 모달 상태
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // 모달의 취소버튼
    const closeDelModal = () =>{
        setIsDeleteModalOpen(!isDeleteModalOpen);
    }

    // 삭제 버튼 눌렀을 때
    const handleDelModalOpen = () =>{
        setIsDeleteModalOpen(!isDeleteModalOpen);
    }

    // 모달에서 삭제버튼 눌렀을 때에
    const handleCardDelete = () =>{
        axios.delete("/api/paymentAccount/accountDelete").then((resp)=>{
            setIsDeleteModalOpen(!isDeleteModalOpen);
            alert(resp.data);
            setUpdateAccount("");
        }).catch(()=>{
            alert("삭제에 실패했습니다.");
        });
    }

    // 계좌 수정 모달창 State
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    // 계좌 수정 모달
    const handleCardUpdate = () =>{
        setIsUpdateModalOpen(!isUpdateModalOpen);
    }

    // 수정 모달닫기
    const closeUpdateModal = () =>{
        setAccountNum("");
        setSelectedBank("");
        setIsUpdateModalOpen(!isUpdateModalOpen);
    }

    const handleUpdateReject = () => {}

    
    // 수정모달의 제출
    const handleUpdateSubmit = () => {
        
        if(totalValid){
            // 계좌 등록
            console.log("은행 : "+selectedBank);
            console.log("계좌번호 : "+accountNum);
            axios.put("/api/paymentAccount/accountUpdate",postData).then((resp)=>{
                closeUpdateModal();
                setUpdateAccount(accountNum);
                alert("계좌가 변경되었습니다.");
            }).catch(()=>{
                alert("계좌 변경을 실패했습니다.");
            })
            
        }else{
            alert("계좌 등록에 실패했습니다.");
        }
    }

    return(
        <>
            <div className={style.container}>
                <div className={style.container__inner}>

                    <div className={style.inner__title}>결제 수단 관리</div>
                    <div className={style.inner__line}></div>
                    {isLoading
                    ?
                    <LoadingSpinnerMini width={600} height={160}/>
                    :
                        <>
                             {account == "" ? 
                            // {/* 계좌 등록 안됨 */}
                            <div className={style.inner}>
                                <div className={style.inner__left}>등록된 결제 수단이 없어요.</div>
                                <div className={style.inner__right}>
                                    <PurpleRoundBtn title={"계좌 등록"} activation={true} onClick={handleCardInsert}></PurpleRoundBtn>
                                </div>
                            </div>
                            :
                            // {/* 계좌 등록됨 */}
                            <div className={style.inner__card}>
                                <div className={style.cardLeft}>
                                    <div className={`${style.flex}`}>
                                        <div className={style.bankName}>{account.bankId}</div>
                                        <div className={style.bankAccount}>{account.accountNumber}</div>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </div>
                                </div>
                                <div className={style.cardRight}>
                                    <div>
                                        <button type='button'
                                        onClick={handleCardUpdate}
                                        >
                                            수정
                                        </button>
                                    </div>
                                    <div>
                                        <button type='button'
                                        onClick={handleDelModalOpen}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </div>
                            </div>
                        }
                        </>
                    }

                   
                    

                    
                </div>
            </div>
                {/* 등록 모달 */}
                 {card && 
                    <>
                        <MypageModal
                        isOpen={setIsCardModalOpen}
                        onRequestClose={closeCardModal}
                        width={500}
                        height={270}
                        >
                            <div>
                                <div className={style.closeBtn}>
                                    <FontAwesomeIcon icon={faXmark} size="lg" onClick={closeCardModal}/>
                                </div>
                                <div className={style.modalTitle}>결제 계좌를 등록해 주세요.</div>
                                <div className={style.modalSubTitle}>
                                    본인 명의의 계좌만 등록가능합니다.
                                    계좌번호 9~16자리를 입력해주세요.
                                </div>
                                
                                <div className={style.cardBox}>
                                    <div>
                                        <select id="bankSelect" className={style.bankSelect}
                                        value={selectedBank} 
                                        onChange={handleBankChange}
                                        >
                                            <option value = "선택">선택</option>
                                            {bankList.map((item,index) => {
                                                return(
                                                    <option key = {item.id} value = {item.id}>
                                                        {item.id}
                                                    </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div>
                                        <input type="text" placeholder='계좌 번호 입력'
                                        style={{
                                            borderColor: accountNum ? (isAccount ? 'black' : 'red') : 'black'
                                        }} 
                                        onChange={handleAccountNum}
                                        value={accountNum}
                                        />
                                    </div>
                                </div>

                                <div className={style.modalBtn}>
                                    <PurpleRectangleBtn
                                    title={"완료"}
                                    width={150}
                                    heightPadding={10}
                                    onClick={totalValid ? handleSubmit : handleUpdateReject}
                                    activation={totalValid}
                                    ></PurpleRectangleBtn>
                                </div>
                            </div>
                        </MypageModal>
                    </>
                }

                {/* 삭제모달 */}
                {isDeleteModalOpen&&
                    <>
                    <MypageModal
                    isOpen={setIsDeleteModalOpen}
                    onRequestClose={closeDelModal}
                    width={260}
                    height={110}
                    >
                        <div className={style.modalTitle}>계좌를 삭제하시겠습니까?</div>
                        <div className={style.deleteBtnBox}>
                            <div>
                               <PurpleRoundBtn title={"취소"} activation={false} onClick={closeDelModal}></PurpleRoundBtn>
                            </div>
                            <div>
                                <PurpleRoundBtn title={"삭제"} activation={true} onClick={handleCardDelete}></PurpleRoundBtn>
                            </div>
                        </div>

                    </MypageModal>
                    </>
                }

                {/* 수정모달 */}
                {isUpdateModalOpen &&
                    <>
                        <MypageModal
                        isOpen={setIsCardModalOpen}
                        onRequestClose={closeUpdateModal}
                        width={500}
                        height={270}
                        >
                            <div>
                                <div className={style.closeBtn}>
                                    <FontAwesomeIcon icon={faXmark} size="lg" onClick={closeUpdateModal}/>
                                </div>
                                <div className={style.modalTitle}>결제 계좌를 등록해 주세요.</div>
                                <div className={style.modalSubTitle}>
                                    본인 명의의 계좌만 등록가능합니다.
                                    계좌번호 9~16자리를 입력해주세요.
                                </div>
                                
                                <div className={style.cardBox}>
                                    <div>
                                        <select id="bankSelect" className={style.bankSelect}
                                        value={selectedBank} 
                                        onChange={handleBankChange}
                                        >
                                            <option value = "선택">선택</option>
                                            {bankList.map((item,index) => {
                                                return(
                                                    <option key = {item.id} value = {item.id}>
                                                        {item.id}
                                                    </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div>
                                        <input type="text" placeholder='계좌 번호 입력'
                                        style={{
                                            borderColor: accountNum ? (isAccount ? 'black' : 'red') : 'black'
                                        }} 
                                        onChange={handleAccountNum}
                                        value={accountNum}
                                        />
                                    </div>
                                </div>

                                <div className={style.modalBtn}>
                                        <PurpleRectangleBtn
                                        title={"완료"}
                                        width={150}
                                        heightPadding={10}
                                        onClick={totalValid ? handleUpdateSubmit : handleUpdateReject}
                                        activation={totalValid}
                                        ></PurpleRectangleBtn>
                                </div>
                            </div>
                        </MypageModal>
                    </>
                }
            

            {/* {card && 
                <>
                <MypageModal
                isOpen={setIsCardModalOpen}
                onRequestClose={closeCardModal}
                width={500}
                height={430}
                >
                    <div>
                        <div className={style.closeBtn}>
                            <FontAwesomeIcon icon={faXmark} size="lg" onClick={closeCardModal}/>
                        </div>
                        <div className={style.modalTitle}>결제 카드를 등록해 주세요.</div>
                        <div className={style.modalSubTitle}>
                            밍글은 고객님의 카드 정보를 직접 저장하지 않고,
                            결제 보안 솔루션을 통해 안전하게 관리하고 있으니 걱정마세요.
                        </div>
                        
                        <div className={style.cardBox}>
                            <div>
                                <input type="text" placeholder='카드 번호 입력'
                                style={{borderColor: isCardValid? 'black':'red'}} 
                                onChange={handleCardNum}
                                />
                            </div>
                            <div className={style.card}>
                                <div>
                                    <input type="text" placeholder='유효기간(MM)'
                                    style={{borderColor: isCardMonth ? 'black':'red'}}
                                    onChange={handleMonthNum}
                                    />
                                </div>
                                <div>
                                    <input type="text" placeholder='유효기간(YY)'
                                    style={{borderColor : isCardYear ? 'black':'red'}}
                                    onChange={handleYearNum}
                                    />
                                </div>
                            </div>

                            <div className={style.card}>
                                <div>
                                    <input type="text" placeholder='생년월일(6자리)'
                                    style={{borderColor : isBirth ? 'black' : 'red'}}
                                    onChange={handleBirth}
                                    />
                                </div>
                                <div>
                                    <input type="password" placeholder='비밀번호(앞 2자리)'
                                    style={{borderColor : isPassword ? 'black' : 'red'}}
                                    onChange={handlePW}
                                    />
                                </div>
                                
                            </div>
                        </div>

                        <div className={style.modalBtn}>
                            <PurpleRectangleBtn
                            title={"완료"}
                            width={150}
                            heightPadding={10}
                            onClick={handleSubmit}
                            ></PurpleRectangleBtn>
                        </div>
                    </div>
                </MypageModal>
                </>
            } */}

            
            
        </>
    );

   
}

export default PaymentManage;
import axios from 'axios';
import WhiteRectangleBtn from '../../../../components/WhiteRectangleBtn/WhiteRectangleBtn';
import style from '../MypageSidebarRight/MypageSidebarRight.module.css';
import { useContext, useEffect, useState } from 'react';
import MypageModal from '../MypageModal/MypageModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faXmark,
    faCoins
} from "@fortawesome/free-solid-svg-icons";
import PurpleRectangleBtn from '../../../../components/PurpleRectangleBtn/PurpleRectangleBtn';
import { LoginContext } from '../../../../App';

const MypageSidebarRight = () => {

    // 로그인 컨텍스트
    const { loginId } = useContext(LoginContext);

    const { loginStatus } = useContext(LoginContext);

    // 밍글머니 State
    const [mingleMoney, setMingleMoney] = useState("");

    useEffect(() => {

        console.log("money " + loginId);
        if (loginStatus === "confirm" && loginId !== "") {
            axios.get("/api/member/getMingleMoney"
            ).then((resp) => {
                // 성공적으로 처리된 경우의 로직
                setMingleMoney(resp.data);
            }).catch((error) => {
                // 오류 발생 시의 처리 로직
                console.error(error);
                console.log("밍글머니를 불러오는데 실패했습니다.");
            });
        }
    }, [mingleMoney])


    // 숫자를 천 단위로 콤마 찍어주는 함수
    const formatNumber = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const withdrawBtn = {
        fontSize: '14px'
    };

    // 인출 모달 상태
    const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);

    // 인출하기 버튼
    const handleWithdrawModalOpen = () => {
        setWithdrawModalOpen(true);
    }

    // 모달 닫기
    const handleModalClose = () => {
        setWithdrawModalOpen(false);
        setAllMoney(false);
        setIsAccount(false);
        setInputMoney("");
    }

    // 불러온 계좌 State
    const [account, setAccount] = useState({});

    // 등록된 계좌 불러오기
    useEffect(() => {
        axios.get("/api/paymentAccount/accountSelect").then((resp) => {
            // console.log(resp.data);
            setAccount(resp.data);
        })
    }, [])

     // 사용자가 입력한 돈 State
     const [inputMoney, setInputMoney] = useState("");

    // 전액 인출 상태
    const [allMoney, setAllMoney] = useState(false);
    // 전액 인출
    const handleAllMoney = (e) => {
        if (mingleMoney === 0) {
            setAllMoney(false);
            alert("0원은 인출 불가능합니다.");
        } else {
            console.log(e.target.value);
            setAllMoney(true);
            setMingleMoney(mingleMoney); 
        }
    }
    

    // 사용자가 입력한 돈
    const handleInputMoney = (e) => {
        setAllMoney(false);
        const money = e.target.value;

        // 만약 첫 번째 문자가 0이면 빈 문자열로 설정
        const sanitizedMoney = money.length > 0 && money[0] === '0' ? '' : money;

        setInputMoney(sanitizedMoney.replace(/\D/g, ''));

    }

    // // 전액인출
    // const handleAllMingleMoney = (e)=>{
    //     setAllMoney(true);
        
    // }

    // 모달에서 인출하기 버튼 눌렀을 때
    const handleSubmit = () => {
        console.log("입력한 돈 : "+inputMoney);
        // 가지고 있는 돈보다 많게 입력하면
        if (inputMoney > mingleMoney) {
            alert("현재 밍글 머니 잔액보다 많은 금액은 인출이 불가능합니다.");
        } else {
            alert("인출되었습니다.");
            // 가지고 있는 돈보다 적으면 인출 가능
            // 직접 입력
            if(allMoney){
                axios.get("/api/payment/withdrawMingleMoney", { params: { money: mingleMoney } }).then((resp) => {
                    console.log(resp.data);
                    setMingleMoney(resp.data);
                    handleModalClose();
                    // window.location.reload();
                }).catch(() => {
                    alert("인출에 실패했습니다.");
                })
            }
            else{
                axios.get("/api/payment/withdrawMingleMoney", { params: { money: inputMoney } }).then((resp) => {
                    console.log(resp.data);
                    setMingleMoney(resp.data);
                    handleModalClose();
                    // window.location.reload();
                }).catch(() => {
                    alert("인출에 실패했습니다.");
                })
            }
           
        }
    }

    // 버튼 false
    const handleSubmitReject = () => {
        alert("인출 계좌를 등록해주세요.");
    }

    // 계좌 등록 State
    const [accountReg, setAccountReg] = useState(false);

    const handleAccountReg = () => {
        setAccountNum("");
        setSelectedBank("");
        setIsAccount(false);
        setAccountReg(!accountReg);
    }

    // 계좌번호 유효성 검사
    const isValidKoreanBankAccountNumber = (value) => {
        // 9~16자리
        const regex = /^[0-9]{9,16}$/;
        return regex.test(value);
    };

    // 계좌번호 입력받는 State
    const [accountNum, setAccountNum] = useState("");
    const [isAccount, setIsAccount] = useState(false);

    // 계좌번호 입력
    const handleAccountNum = (e) => {
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

        if (newBankValue != "선택") {
            setIsBank(true);
        }
        if (newBankValue == "선택") {
            setIsBank(false);
        }
    };


    // 은행 목록
    const [bankList, setBankList] = useState([]);

    useEffect(() => {
        // 은행 정보 불러오기
        axios.get("/api/paymentAccount/selectBankList").then((resp) => {
            // console.log(resp.data);
            setBankList(resp.data);
        }).catch(() => {
            alert("은행 정보를 불러오는 데 실패했습니다.");
        })
    }, [])


    // 서버로 보낼 데이터
    const postData = {
        bankId: selectedBank,
        accountNumber: accountNum
    }

    // 계좌 등록 완료 버튼
    const handleAccountSubmit = () => {

        if (isAccount) {
            // 계좌 등록
            console.log("은행 : " + selectedBank);
            console.log("계좌번호 : " + accountNum);
            axios.post("/api/paymentAccount/accountInsert", postData).then((resp) => {
                alert("등록이 완료되었습니다.")
            }).catch(() => {
                alert("계좌 등록에 실패했습니다.");
            })
            window.location.reload();
        } else {
            alert("계좌 등록에 실패했습니다.");
        }

    }

    const handleAccountReject = () => { }

    // 계좌 변경 State
    const [accountChg, setAccountChg] = useState(false);

    // 변경하기 클릭
    const handleAccountChg = () => {
        setAccountChg(!accountChg);
    }

    // 수정모달의 제출
    const handleUpdateSubmit = () => {

        if (isAccount) {
            // 계좌 등록
            axios.put("/api/paymentAccount/accountUpdate", postData).then((resp) => {
                alert("계좌가 변경되었습니다.");
                window.location.reload();
            }).catch(() => {
                alert("계좌 변경을 실패했습니다.");
            })
        } else {
            alert("계좌 등록에 실패했습니다.");
        }
    }

    // 인출하기가 ture? false
    const handleMoney = () => {
        alert("금액을 다시 입력해주세요.");
    }

    return (
        <div className={style.moneyBox}>
            <div>
                <div className={style.money__inner}>나의 밍글 머니</div>
                <div className={style.money__inner}>{formatNumber(mingleMoney)} 원</div>
                <div className={style.money__inner}></div>
                <div className={style.money__inner}>
                    <WhiteRectangleBtn
                        style={withdrawBtn}
                        width={170}
                        heightPadding={10}
                        title={"인출하기"}
                        onClick={handleWithdrawModalOpen}
                    ></WhiteRectangleBtn>
                </div>
            </div>

            {withdrawModalOpen &&
                <MypageModal
                    isOpen={withdrawModalOpen}
                    onRequestClose={handleModalClose}
                    width={550}
                    height={accountReg || accountChg ? 650 : 550}
                >
                    <div>
                        <div className={style.closeBtn}>
                            <FontAwesomeIcon icon={faXmark} size="lg" onClick={handleModalClose} />
                        </div>
                        <div className={style.modalTitle}>인출하기</div>
                        <div className={style.modalSubTitle}>밍글 머니 잔액</div>
                        <div>
                            <div className={style.modalMoneyBox}>
                                <div>
                                    <FontAwesomeIcon icon={faCoins} />
                                </div>
                                <div>
                                    {formatNumber(mingleMoney)}원
                                </div>
                            </div>
                            <div>
                                <div className={style.modalSubTitle}>인출할 밍글 머니를 입력해주세요. </div>
                                <div className={style.inputBox}>
                                    <input type="text" placeholder='금액 입력(원)'
                                        value={allMoney ? mingleMoney : inputMoney}
                                        onChange={handleInputMoney}
                                    />
                                </div>
                                <div>
                                    <div className={style.allMoney}
                                        onClick={handleAllMoney}
                                    >
                                        전액 입력 : {formatNumber(mingleMoney)}원
                                    </div>
                                </div>
                                <div className={style.accountBox}>
                                    <div className={style.modalSubTitle}>인출 계좌</div>
                                    {account == "" ?
                                        // 계좌 등록 안됨
                                        <div className={style.inner}>
                                            <div className={style.cardLeft}
                                                onClick={handleAccountReg}
                                            >
                                                계좌 등록
                                            </div>
                                            <div className={`${style.cardRight} ${style.noneAccount}`}>
                                                등록된 계좌가 없습니다. 계좌를 먼저 등록해주세요.
                                            </div>
                                            <div>
                                                {accountReg &&
                                                    <>
                                                        <div className={style.cardBox}>
                                                            <div>
                                                                <select id="bankSelect" className={style.bankSelect}
                                                                    value={selectedBank}
                                                                    onChange={handleBankChange}
                                                                >
                                                                    <option value="선택">선택</option>
                                                                    {bankList.map((item, index) => {
                                                                        return (
                                                                            <option key={item.id} value={item.id}>
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
                                                            <div className={`${style.modalBtn} ${style.accountSubmit}`}>
                                                                <PurpleRectangleBtn
                                                                    title={"완료"}
                                                                    width={50}
                                                                    heightPadding={10}
                                                                    onClick={isAccount ? handleAccountSubmit : handleAccountReject}
                                                                    activation={isAccount}
                                                                ></PurpleRectangleBtn>
                                                            </div>
                                                        </div>

                                                    </>
                                                }

                                            </div>
                                        </div>
                                        :
                                        // 계좌 등록됨
                                        <div className={style.inner__card}>
                                            <div className={style.cardLeft}
                                                onClick={handleAccountChg}
                                            >
                                                변경하기
                                            </div>
                                            <div className={style.cardRight}>
                                                <div className={style.bankName}>
                                                    {account.bankId}
                                                </div>
                                                <div className={style.cardRight__inner}>
                                                    <div className={style.bankAccount}>
                                                        {account.accountNumber}
                                                    </div>
                                                    <div className={style.bankUserName}>
                                                        예금주:{account.accountHolder}
                                                    </div>
                                                </div>
                                            </div>
                                            {accountChg &&
                                                <>
                                                    <div className={style.cardBox}>
                                                        <div>
                                                            <select id="bankSelect" className={style.bankSelect}
                                                                value={selectedBank}
                                                                onChange={handleBankChange}
                                                            >
                                                                <option value="선택">선택</option>
                                                                {bankList.map((item, index) => {
                                                                    return (
                                                                        <option key={item.id} value={item.id}>
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
                                                        <div className={`${style.modalBtn} ${style.accountSubmit}`}>
                                                            <PurpleRectangleBtn
                                                                title={"완료"}
                                                                width={50}
                                                                heightPadding={10}
                                                                onClick={isAccount ? handleUpdateSubmit : handleAccountReject}
                                                                activation={isAccount}
                                                            ></PurpleRectangleBtn>
                                                        </div>
                                                    </div>

                                                </>
                                            }
                                        </div>
                                    }
                                </div>
                                <div className={style.modalBtn}>
                                    <PurpleRectangleBtn
                                        title={"인출하기"}
                                        width={100}
                                        heightPadding={10}
                                        onClick={inputMoney ?  (account ? handleSubmit : handleSubmitReject) : 
                                            (allMoney ? handleSubmit : handleMoney)
                                            
                                        }
                                        activation={inputMoney ? true : false}
                                    ></PurpleRectangleBtn>
                                </div>
                            </div>
                        </div>
                    </div>
                </MypageModal>
            }


        </div>



    );
}

export default MypageSidebarRight;

import axios from 'axios';
import WhiteRectangleBtn from '../../../../components/WhiteRectangleBtn/WhiteRectangleBtn';
import style from '../MypageSidebarRight/MypageSidebarRight.module.css';
import { useContext, useEffect, useState } from 'react';
import MypageModal from '../MypageModal/MypageModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faXmark, 
    faCoins,
    faCheck
 } from "@fortawesome/free-solid-svg-icons";
import PurpleRectangleBtn from '../../../../components/PurpleRectangleBtn/PurpleRectangleBtn';
import { LoginContext } from '../../../../App';
import PurpleRoundBtn from '../../../../components/PurpleRoundBtn/PurpleRoundBtn';

const MypageSidebarRight = () =>{

    // 로그인 컨텍스트
    const { loginId ,setLoginId } = useContext(LoginContext);

    // 밍글머니 State
    const [mingleMoney, setMingleMoney] = useState("");

    useEffect(()=>{
        if(loginId !== ""){
            axios.get("/api/member/getMingleMoney").then((resp) => {
                // 성공적으로 처리된 경우의 로직
                setMingleMoney(resp.data);
            })
            .catch((error) => {
                // 오류 발생 시의 처리 로직
                console.error(error);
                alert("밍글머니를 불러오는데 실패했습니다.");
            });
        }
    })
   

    // 숫자를 천 단위로 콤마 찍어주는 함수
    const formatNumber = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const withdrawBtn = {
        fontSize : '14px'
    };

    // 인출 모달 상태
    const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);

    // 인출하기 버튼
    const handleWithdrawModalOpen = () => {
        setWithdrawModalOpen(true);
    }

    // 모달 닫기
    const handleModalClose = () =>{
        setWithdrawModalOpen(false);
        setAllMoney(false);
        setInputMoney("");
    }

    // 불러온 계좌 State
    const [account, setAccount] = useState({});

    // 등록된 계좌 불러오기
    useEffect(()=>{
        axios.get("/api/paymentAccount/accountSelect").then((resp)=>{
            console.log(resp.data);
            setAccount(resp.data);
        })
    },[])

    // 전액 인출 상태
    const [allMoney, setAllMoney] = useState(false);
    // 전액 인출
    const handleAllMoney = () =>{
        setAllMoney(true);
    }

    // 사용자가 입력한 돈 State
    const [inputMoney, setInputMoney] = useState("");


    // 사용자가 입력한 돈
    const handleInputMoney = (e) =>{
        const money = e.target.value;
        console.log(e.target.value);
        setInputMoney(money);
        
    } 

    // 모달에서 인출하기 버튼 눌렀을 때
    const handleSubmit = () =>{
        // // 가지고 있는 돈보다 많게 입력하면
        if(inputMoney > mingleMoney){
            alert("인출이 불가능합니다.");
        }else{
            alert("인출되었습니다.");
            // 가지고 있는 돈보다 적으면 인출 가능
            // axios.get("")
        }
    } 

    return(
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
                width={500}
                height={600}
            >
                <div>
                        <div className={style.closeBtn}>
                            <FontAwesomeIcon icon={faXmark} size="lg" onClick={handleModalClose}/>
                        </div>
                        <div className={style.modalTitle}>인출하기</div>
                        <div className={style.modalSubTitle}>밍글 머니 잔액</div>
                        <div>
                            <div className={style.modalMoneyBox}>
                                <div>
                                    <FontAwesomeIcon icon={faCoins}/>
                                </div>
                                <div>
                                    {formatNumber(mingleMoney)}원
                                </div>
                            </div>
                            <div>
                                <div className={style.modalSubTitle}>인출할 밍글 머니를 입력해주세요. </div>
                                <div className={style.inputBox}>
                                    <input type="text" placeholder='금액 입력(원)' 
                                    value={allMoney?formatNumber(mingleMoney):inputMoney}
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
                                        <div className={style.inner__left}>등록된 결제 수단이 없어요.</div>
                                        <div className={style.inner__right}>
                                            <PurpleRoundBtn title={"계좌 등록"} activation={true} 
                                            // onClick={handleCardInsert}
                                            >
                                            </PurpleRoundBtn>
                                        </div>
                                    </div>
                                    :
                                    // 계좌 등록됨
                                    <div className={style.inner__card}>
                                        <div className={style.cardLeft}>
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
                                    </div>
                                    }
                                </div>
                                <div className={style.modalBtn}>
                                    <PurpleRectangleBtn
                                    title={"인출하기"}
                                    width={100}
                                    heightPadding={10}
                                    onClick={handleSubmit}
                                    activation={true}
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
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PurpleRectangleBtn from "../../../../../components/PurpleRectangleBtn/PurpleRectangleBtn";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import style from "../../../../MyPage/PaymentManage/PaymentManage.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinnerMini from "../../../../../components/LoadingSpinnerMini/LoadingSpinnerMini";


Modal.setAppElement("#root");

const AccountModal = ({ isOpen, onRequestClose, width, height, setAllComplete}) => {

    const [isLoading, setLoading] = useState(false);

    // if(isLoading){
    //     return <LoadingSpinnerMini height={10} width={10}/>
    // }

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
        axios.get("/api/member/bankList").then((resp)=>{
            setBankList(resp.data);
            setLoading(false);
        }).catch(()=>{
            setLoading(false);
        })
    },[isOpen]);

    // 계좌 등록 완료 버튼
    const handleSubmit = () =>{
        if(isAccount&&isBank){
            const postData = {
                bankId: selectedBank,
                accountNumber: accountNum
            }
            setLoading(true);
            axios.post("/api/paymentAccount/accountInsert",postData).then((resp)=>{
                onRequestClose();
                setLoading(false);
                alert("결제 수단 등록에 성공했습니다.");
                setAllComplete(true);
               
            }).catch(()=>{
                onRequestClose();
                setLoading(false);
                alert("결제 수단 등록에 실패했습니다.");
               
            })
        }else{
            onRequestClose();
            setLoading(false);
            alert("결제 수단 등록에 실패했습니다.");
        }

    }


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
            overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)"
            },
            content: {
                position: 'fixed',
                top: '50%',
                left: '50%',
                width: width+"px", // 모달의 가로 크기
                height : height+"px", // 모달의 세로 크기
                transform: 'translate(-50%, -50%)',
                borderRadius: '20px'
            },
            }}
        >
            {
                isLoading?<LoadingSpinnerMini width={455} height={225}/>:
            
                <div>
                    <div className={style.closeBtn}>
                        <FontAwesomeIcon icon={faXmark} size="lg" onClick={onRequestClose} />
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
                                <option value="선택">선택</option>
                                {bankList.map((item, index) => {
                                    return (
                                        <option key={index} value={item.id}>
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
                        {isBank && isAccount &&
                            <>
                                <PurpleRectangleBtn
                                    title={"완료"}
                                    width={150}
                                    heightPadding={10}
                                    onClick={handleSubmit}
                                    activation={true}
                                ></PurpleRectangleBtn>
                            </>
                        }
                    </div>
                </div>
            }
        </Modal>
    );
}

export default AccountModal;
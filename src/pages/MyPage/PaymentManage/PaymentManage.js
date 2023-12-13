import { useState } from 'react';
import PurpleRoundBtn from '../../../components/PurpleRoundBtn/PurpleRoundBtn';
import style from '../../MyPage/PaymentManage/PaymentManage.module.css';
import CustomModal from '../../../components/CustomModal/CustomModal';
import PurpleRectangleBtn from '../../../components/PurpleRectangleBtn/PurpleRectangleBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import WhiteRectangleBtn from '../../../components/WhiteRectangleBtn/WhiteRectangleBtn';

const PaymentManage = () =>{

    // 카드 State
    const [card,setCard] = useState(false);
    // 카드 모달창 State
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);

    // 카드 등록 버튼 클릭
    const handleCardUpdate = () =>{
    setCard(!card);
        setIsCardModalOpen(true);
    }
    // 카드 모달창 닫기
    const closeCardModal = () => {
    setCard(!card);
        setIsCardModalOpen(false);
    };


    return(
        <>
        <div className={style.container}>
            <div className={style.container__inner}>
                <div className={style.inner__title}>결제 수단 관리</div>
                <div className={style.inner__line}></div>

                <div className={style.inner}>
                    <div className={style.inner__left}>등록된 결제 수단이 없어요.</div>
                    <div className={style.inner__right}>
                        <PurpleRoundBtn title={"카드 등록"} activation={true} onClick={handleCardUpdate}></PurpleRoundBtn>
                    </div>
                </div>
            </div>
        </div>

            {card && 
                <>
                <CustomModal
                isOpen={setIsCardModalOpen}
                onRequestClose={closeCardModal}
                width={150}
                height={150}
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
                                <input type="text" placeholder='카드 번호 입력' />
                            </div>
                            <div className={style.card}>
                                <div>
                                    <input type="text" placeholder='유효기간(MM)'/>
                                </div>
                                <div>
                                    <input type="text" placeholder='유효기간(YY)'/>
                                </div>
                            </div>

                            <div className={style.card}>
                                <div>
                                    <input type="text" placeholder='생년월일(6자리)'/>
                                </div>
                                <div>
                                    <input type="password" placeholder='비밀번호(앞 2자리)'/>
                                </div>
                                
                            </div>
                        </div>

                        <div className={style.modalBtn}>
                            <PurpleRectangleBtn
                            title={"완료"}
                            width={150}
                            heightPadding={10}
                            ></PurpleRectangleBtn>
                        </div>
                    </div>
                </CustomModal>
                </>
            }
            
        </>
    );

   
}

export default PaymentManage;
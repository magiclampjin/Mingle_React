
import axios from 'axios';
import WhiteRectangleBtn from '../../../../components/WhiteRectangleBtn/WhiteRectangleBtn';
import style from '../MypageSidebarRight/MypageSidebarRight.module.css';
import { useEffect, useState } from 'react';
import MypageModal from '../MypageModal/MypageModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const MypageSidebarRight = () =>{

    // 밍글머니 State
    const [mingleMoney, setMingleMoney] = useState("");

    useEffect(()=>{
        axios.get("/api/member/getMingleMoney").then((resp) => {
            // 성공적으로 처리된 경우의 로직
            setMingleMoney(resp.data);
        })
        .catch((error) => {
            // 오류 발생 시의 처리 로직
            console.error(error);
            alert("밍글머니를 불러오는데 실패했습니다.");
        });
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

    // 닫기
    const handleModalClose = () =>{
        setWithdrawModalOpen(false);
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
                height={400}
            >
                <div>
                        <div className={style.closeBtn}>
                            <FontAwesomeIcon icon={faXmark} size="lg" onClick={handleModalClose}/>
                        </div>
                        <div className={style.modalTitle}>인출하기</div>
                        <div className={style.modalSubTitle}>
                            밍글 머니 잔액
                        </div>
                        <div>
                            <div className={style.modalMoneyBox}>
                                {formatNumber(mingleMoney)} 원
                            </div>
                        </div>
                </div>
            </MypageModal>
             }


        </div>

        

    );
}

export default MypageSidebarRight;
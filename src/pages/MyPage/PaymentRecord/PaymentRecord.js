import { useEffect, useState } from 'react';
import style from '../../MyPage/PaymentRecord/PaymentRecord.module.css';
import MypageModal from '../components/MypageModal/MypageModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import PurpleRectangleBtn from '../../../components/PurpleRectangleBtn/PurpleRectangleBtn';
import axios from 'axios';

const PaymentRecord = () =>{

    // 검색 모달 상태
    const [searchModalOpen, setSearchModalOpen] = useState(false);

    // 검색 모달 열기
    const handleSearchModalOpen = () =>{
        setSearchModalOpen(true);
    }

    // 검색 모달 닫기
    const handleSearchModalClose = () =>{
        setSearchModalOpen(false);
    }

    // 서비스 명 불러오기
    useEffect(()=>{
        axios.get("/api/party").then((resp)=>{
            console.log(resp.data);
        })
    },[])

    return(
        <>
            <div className={style.container}>
                <div className={style.container__inner}>
                    <div className={style.inner__title}>결제/적립/인출</div>
                    <div className={style.inner__line}></div>
                    <div className={style.searchBox}>
                        <div className={style.searchType} onClick={handleSearchModalOpen}>
                            검색 타입
                        </div>
                    </div>
                </div>
            </div>


            {searchModalOpen && 
                <MypageModal
                isOpen={searchModalOpen}
                onRequestClose={handleSearchModalClose}
                width={500}
                height={300}
                >
                    <div>
                        <div className={style.closeBtn}>
                            <FontAwesomeIcon icon={faXmark} size="lg" onClick={handleSearchModalClose}/>
                        </div>
                        <div className={style.modalTitle}>결제 계좌를 등록해 주세요.</div>
                        <div className={style.modalSubTitle}>
                            본인 명의의 계좌만 등록가능합니다.
                            계좌번호 9~16자리를 입력해주세요.
                        </div>

                        <div>

                        </div>

                        <div className={style.modalBtn}>
                                <PurpleRectangleBtn
                                title={"완료"}
                                width={100}
                                heightPadding={10}
                                // onClick={handleSubmit}
                                activation={true}
                                ></PurpleRectangleBtn>
                        </div>
                    </div>
                
                </MypageModal>
            }
        </>
    );
} 

export default PaymentRecord;
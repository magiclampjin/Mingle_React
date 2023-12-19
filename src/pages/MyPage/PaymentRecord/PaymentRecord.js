import { useEffect, useState } from 'react';
import style from '../../MyPage/PaymentRecord/PaymentRecord.module.css';
import MypageModal from '../components/MypageModal/MypageModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import PurpleRectangleBtn from '../../../components/PurpleRectangleBtn/PurpleRectangleBtn';
import axios from 'axios';
import { selectService } from './../../Party/PartyCreate/PartyCreateList/PartyCreateList';
import LoadingSpinnerMini from '../../../components/LoadingSpinnerMini/LoadingSpinnerMini';
import { timeFormatter } from '../components/TimeFormatter/TimeFormatter';

const PaymentRecord = () =>{

    // 검색 모달 상태
    const [searchModalOpen, setSearchModalOpen] = useState(false);

    // 검색 모달 열기
    const handleSearchModalOpen = () =>{
        setSearchModalOpen(true);
    }

    // 검색 모달 닫기
    const handleSearchModalClose = () =>{
        setStartDate("");
        setEndDate("");
        setSearchModalOpen(false);
    }

    // 서비스명 저장하는 State
    const [serviceList, setServiceList] = useState([]);

    // 서비스 명 불러오기
    useEffect(()=>{
        axios.get("/api/party/getServiceNameList").then((resp)=>{
            console.log(resp.data);
            let value = resp.data;
            setServiceList(value);
        })
    },[])

    // 서비스 셀렉트 박스 변화 함수
    const handleServiceChange = (e) => {
        console.log(e.target.value);
    }

    // 결제/적립/인출 박스 변화 함수
    const handlePaymentTypeChange = (e)=>{
        console.log(e.target.value);
    }

    // 시작 날짜 입력
    const [startDate, setStartDate] = useState('');

    // 년도, 월, 일 사이에 - 하이픈 들어가도록 
    const handleStartDate = (e) =>{
        const inputDate = e.target.value.replace(/\D/g, '');
        if (inputDate.length <= 8) {
          setStartDate(inputDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
        }
    }

    // 끝 날짜 입력
    const [endDate, setEndDate] = useState('');

    const handleEndDate = (e) => {
        const inputDate = e.target.value.replace(/\D/g, '');
        if (inputDate.length <= 8) {
          setEndDate(inputDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
        }
    };

    const [payList,setPayList] = useState([{}]);

    // 정산 내역 불러오기
    useEffect(()=>{
        setLoading(true);
        axios.get("/api/payment").then((resp)=>{
            setPayList(resp.data);
            setLoading(false);
            console.log(resp.data);
        }).catch(()=>{
            setLoading(false);
            alert("문제가 발생했습니다.");
        })
    },[])

    // 로딩 State
    const [isLoading, setLoading]=useState(false);

    return(
        <>
            <div className={style.container}>
                <div className={style.container__inner}>
                    <div className={style.inner__title}>결제/적립/인출</div>
                    <div className={style.inner__line}></div>
                    <div className={style.searchBox} onClick={handleSearchModalOpen}>
                        <div className={style.searchType} >
                            검색 타입
                        </div>
                    </div>
                    <div className={style.contentBox}>
                        {
                            isLoading 
                            ?
                            <LoadingSpinnerMini
                            width={600}
                            height={250}
                            />
                            :
                            payList.map((item,i)=>{
                                return(
                                    <div key={i} className={style.content}>
                                    <div className={style.content__inner}>
                                        <div className={style.inner__left}>
                                            <div>{timeFormatter(item.date) }</div>
                                            <div>파티 요금 {item.paymentTypeId}</div>
                                        </div>
                                        <div className={style.inner__right}>
                                            {item.paymentTypeId == "적립" ? "+" :"-"}
                                            {item.price}원
                                        </div>
                                    </div>
                                    <div className={style.content__bottom}>
                                        <div>{item.service!=undefined?item.service.name:""}</div>
                                        <div>머니 잔액 13521원</div>
                                    </div>
                                </div>
                                )
                            })
                        }

                    
                    </div>
                </div>
            </div>

            {/* 검색 모달 */}
            {searchModalOpen && 
                <MypageModal
                isOpen={searchModalOpen}
                onRequestClose={handleSearchModalClose}
                width={500}
                height={400}
                >
                    <div>
                        <div className={style.closeBtn}>
                            <FontAwesomeIcon icon={faXmark} size="lg" onClick={handleSearchModalClose}/>
                        </div>
                        <div className={style.modalTitle}>보기 옵션</div>

                        <div className={style.selectBox}>
                            <div>
                                 <select id="selectService" className={style.select}
                                // value={serviceList}
                                onChange={handleServiceChange}
                                >
                                    <option value="선택">이용 서비스 전체</option>
                                        {serviceList.map((item,index)=>{
                                            return(
                                                <option key={item.name} value={index}>
                                                    {item.name}
                                                </option>
                                            )
                                        })

                                    }
                                </select>
                            </div>
                            <div>
                                <select id="paymentType" className={style.select}
                                onChange={handlePaymentTypeChange}
                                >
                                    <option value="선택">결제/적립/인출 전체</option>
                                    <option value="결제">결제</option>
                                    <option value="적립">적립</option>
                                    <option value="인출">인출</option>
                                </select>
                            </div>

                            <div className={style.dateBox}>
                                <div>조회 기간</div>
                                <div className={style.dateSelect}>
                                    <input type="text" placeholder='YYYY-MM-DD' 
                                     value={startDate}
                                    onChange={handleStartDate}
                                    />
                                    <div>ー</div>
                                    <input type="text" placeholder='YYYY-MM-DD' 
                                    value={endDate}
                                    onChange={handleEndDate}
                                    />
                                </div>
                            </div>
                           
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
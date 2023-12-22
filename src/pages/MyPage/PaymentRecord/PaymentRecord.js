import { useEffect, useState } from 'react';
import style from '../../MyPage/PaymentRecord/PaymentRecord.module.css';
import MypageModal from '../components/MypageModal/MypageModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faXmark,
    faAngleLeft,
    faAnglesLeft,
    faAngleRight,
    faAnglesRight,
    faArrowDownWideShort
} from "@fortawesome/free-solid-svg-icons";
import PurpleRectangleBtn from '../../../components/PurpleRectangleBtn/PurpleRectangleBtn';
import axios from 'axios';
import LoadingSpinnerMini from '../../../components/LoadingSpinnerMini/LoadingSpinnerMini';
import { timeFormatter } from '../components/TimeFormatter/TimeFormatter';
import Pagination from 'react-js-pagination';

const PaymentRecord = () =>{

    // 검색 모달 상태
    const [searchModalOpen, setSearchModalOpen] = useState(false);

    // 검색 모달 열기
    const handleSearchModalOpen = () =>{
        setSearchModalOpen(true);
    }

    // 검색 모달 닫기
    // 내역 초기화
    const handleSearchModalClose = () =>{
        setStartDate("");
        setEndDate("");
        setSearchService("전체");
        setSearchType("전체");
        setSearchModalOpen(false);
    }

    // 셀렉트 박스에서 서비스명 저장하는 State
    const [serviceList, setServiceList] = useState([]);

    // 셀렉트 박스에서 서비스 명 불러오기
    useEffect(()=>{
        axios.get("/api/party/getServiceNameList").then((resp)=>{
            let value = resp.data;
            setServiceList(value);
        })
    },[])

    // 선택한 서비스 저장하는 State
    const [searchService, setSearchService] = useState("전체");

    // 서비스 셀렉트 박스 변화 함수
    const handleServiceChange = (e) => {
        const valueService = e.target.value;
        console.log(valueService);
        setSearchService(valueService);
    }

    // 선택한 결제,적립,인출 저장하는 State
    const [searchType, setSearchType] = useState("전체");

    // 결제/적립/인출 박스 변화 함수
    const handlePaymentTypeChange = (e)=>{
        const valueType = e.target.value;
        console.log(valueType);
        setSearchType(valueType);
    }

    // 시작 날짜 입력
    const [startDate, setStartDate] = useState('');

    // 년도, 월, 일 사이에 - 하이픈 들어가도록 
    const handleStartDate = (e) =>{
        const inputDate = e.target.value.replace(/\D/g, '');
        if (inputDate.length <= 8) {
          setStartDate(inputDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
        }

        console.log(startDate);
    }

    // 끝 날짜 입력
    const [endDate, setEndDate] = useState('');

    const handleEndDate = (e) => {
        const inputDate = e.target.value.replace(/\D/g, '');
        if (inputDate.length <= 8) {
          setEndDate(inputDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
        }
        console.log(endDate);
    };

    // 정산 내역 State
    const [payList,setPayList] = useState([]);

    // 정산 내역 불러오기
    useEffect(()=>{
        // setLoading(true);
        // axios.get("/api/payment").then((resp)=>{
        //     setPayList(resp.data);
        //     setLoading(false);
        //     console.log(resp.data);
        // }).catch(()=>{
        //     setLoading(false);
        //     alert("문제가 발생했습니다.");
        // })

        setLoading(true);
        const queryParams = {};

        if (searchService) { queryParams.serviceId  = searchService; }
        if (searchType) { queryParams.paymentTypeId  = searchType;  }
        if (startDate) { queryParams.start = startDate; }
        if (endDate) {  queryParams.end = endDate; }

        axios.get("/api/payment/searchBy", { params: queryParams })
        .then((resp) => {
            // 성공적으로 처리된 경우의 로직
            console.log(resp.data);
            setPayList(resp.data);
            setLoading(false);
        })
        .catch((error) => {
            // 오류 발생 시의 처리 로직
            console.error(error);
            setLoading(false);
            alert("검색에 실패했습니다.");
        });

    },[])

    // 숫자를 천 단위로 콤마 찍어주는 함수
    const formatNumber = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    // 로딩 State
    const [isLoading, setLoading]=useState(false);

    // 검색 완료
    const handleSubmit = () => {

        console.log(searchService);
        console.log(searchType);
        console.log(startDate);
        console.log(endDate);

        const queryParams = {};

        if (searchService) { queryParams.serviceId  = searchService; }
        if (searchType) { queryParams.paymentTypeId  = searchType;  }
        if (startDate) { queryParams.start = startDate; }
        if (endDate) {  queryParams.end = endDate; }
    
        axios.get("/api/payment/searchBy", { params: queryParams })
        .then((resp) => {
            // 성공적으로 처리된 경우의 로직
            console.log(resp.data);
            setPayList(resp.data);
            handleSearchModalClose();
        })
        .catch((error) => {
            // 오류 발생 시의 처리 로직
            console.error(error);
            alert("검색에 실패했습니다.");
        });
    }

    // 페이지네이션
    const [currentLists, setCurrentLists] = useState(payList);
    const [page, setPage] = useState(1);
    const payListPerPage = 5; // 페이지 당 유저 출력 수
    const indexOfLastPage = page * payListPerPage;
    const indexOfFirstPage = indexOfLastPage - payListPerPage;

    const handlePageChange = (page) => {
        setPage(page);
    };

    useEffect(() => {
        setCurrentLists(payList.slice(indexOfFirstPage, indexOfLastPage));
    }, [payList, page]);

    return(
        <>
            <div className={style.container}>
                <div className={style.container__inner}>
                    <div className={style.inner__title}>결제/적립/인출</div>
                    <div className={style.inner__line}></div>
                    <div className={style.searchBox} onClick={handleSearchModalOpen}>
                        <div className={style.searchType} >
                            <div>
                               검색 타입 
                            </div>
                            <div>
                                 <FontAwesomeIcon icon={faArrowDownWideShort} />
                            </div>
                        </div>
                    </div>
                    <div className={style.contentBox}>
                        {
                            isLoading 
                            ?
                            <LoadingSpinnerMini width={600} height={250} />
                            :
                            payList.length > 0 ?(currentLists.map((item,i)=>{
                                return(
                                    <div key={i} className={style.content}>
                                        <div className={style.content__inner}>
                                            <div className={style.inner__left}>
                                                <div>{timeFormatter(item.date) }</div>
                                                <div>파티 요금 {item.paymentTypeId}</div>
                                            </div>
                                            <div className={style.inner__right}
                                            style={{color: item.paymentTypeId === "적립" ? "#7b61ff" : "black"}}
                                            >
                                                {item.paymentTypeId == "적립" ? "+" :"-"}
                                                {formatNumber(item.price)}원
                                            </div>
                                        </div>
                                        <div className={style.content__bottom}>
                                            <div>{item.service!=undefined?item.service.name:""}</div>
                                            <div>사용된 밍글 머니 {item.usedMingleMoney}원</div>
                                        </div>
                                    </div>
                                )
                            })
                            ) : (
                                <div className={style.empty}>표시할 내역이 없습니다.</div>
                            )
                        }

                    </div>
                    <div>
                        {payList.length > 0 && (
                            <Pagination
                                activePage={page}
                                itemsCountPerPage={payListPerPage}
                                totalItemsCount={payList.length}
                                pageRangeDisplayed={5}
                                prevPageText={<FontAwesomeIcon icon={faAngleLeft} />}
                                nextPageText={<FontAwesomeIcon icon={faAngleRight} />}
                                lastPageText={<FontAwesomeIcon icon={faAnglesRight} />}
                                firstPageText={<FontAwesomeIcon icon={faAnglesLeft} />}
                                onChange={handlePageChange}
                            />
                        )}
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
                                    <option value="전체">이용 서비스 전체</option>
                                        {serviceList.map((item,index)=>{
                                            return(
                                                <option key={item.name} value={index+1}>
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
                                    <option value="전체">결제/적립/인출 전체</option>
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
                                onClick={handleSubmit}
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./PartyAttend.module.css";
import {
  faCircleArrowLeft,
  faQuestion,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import WhiteRectangleBtn from "../../../../components/WhiteRectangleBtn/WhiteRectangleBtn";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AccountModal from "../../PartyCreate/PartyCreatePage/AccountModal/AccountModal";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { JoinPartyContext } from "../../../../App";
import { LoginContext } from "../../../../App";

const PartyAttend = () => {
  // 이전으로 돌아가기
  const navi = useNavigate();
  const handleBack = () => {
    navi(-1);
  };
  const { selectParty, setSelectParty, service } = useContext(JoinPartyContext);

  // 로그인하지 않았다면 접근권한 페이지로 이동
  // 미로그인 시 접근불가
  const {loginId, loginStatus} = useContext(LoginContext);
  
  // 로그인 여부
  useEffect(()=>{
      if(loginStatus!=="confirm")
          setLoading(true);
      else{
          if(loginId===""){
              navi("/denied");
          }
          setLoading(false);
      }
  },[loginId, loginStatus]);

  //뒤로가기 버튼을 통해서 들어오거나 주소를 통해서 들어왔다면 돌려보내기
  useEffect(() => {
    if (selectParty === null || service === null) {
      navi("/party/PartyJoin");
    }
  });

  // 파티 시작일 경과 여부
  const [isStartParty, setStartParty] = useState(false);
  useEffect(() => {
    if (selectParty !== null) {
      let now = new Date();
      now.setHours(0, 0, 0, 0);
      now.setHours(now.getHours() + 9);

      // 파티 이미 시작
      if (now >= new Date(selectParty.startDate)) {
        setStartParty(true);
      }
    }
  }, [selectParty]);

  // 파티 가입 가능 여부
  const [isPossible, setPossible] = useState({
    isAccount: false,
    isAgree: false,
  });

  // 필수 동의 여부
  const [agree, setAgree] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  // 동의 여부 state에 반영
  const handleAgree = (e) => {
    const { name, checked } = e.target;
    setAgree((prev) => ({ ...prev, [name]: checked }));

    let arr = Object.values(agree);
    arr[name - 1] = checked;

    const result = Object.values(arr).every((item) => item);
    setPossible((prev) => ({ ...prev, isAgree: result }));
  };

  // 전체동의 클릭
  const handelAllAgree = (e) => {
    setAgree({ 1: true, 2: true, 3: true, 4: true, 5: true });
    setPossible((prev) => ({ ...prev, isAgree: true }));
  };

  // 첫달 요금 안내 popup hover
  const [isHovering, setHovering] = useState(false);

  // 밍글 머니 우선 적용 안내 popup hover
  const [isMMHovering, setMMHovering] = useState(false);

  // 매달 내야하는 요금
  const [monthFee, setMonthFee] = useState(0);
  // 첫달 파티 요금
  const [firstMonthFee, setFirstMonthFee] = useState(0);
  // 다음 정산일 까지의 날짜
  const [calDate, setCalDate] = useState();
  // 파티 보증금
  const [deposit, setDeposit] = useState(0);
  // 합계
  const [amount, setAmount] = useState(0);
  // 최종 결제 금액
  const [totalPrice, setTotalPrice] = useState(0);
  // 사용할 밍글 머니
  const [usedMingleMoney, setUsedMingleMoney] = useState(0);
  // 보유한 밍글 머니
  const [mingleMoney, setMingleMoney] = useState(0);
  // 파티장이 받게될 금액
  const [managerReceiveMoney, setManagerReceiveMoney] = useState(0);

  // 파티 금액 계산
  useEffect(() => {
    if (selectParty !== null) {
      setMonthFee(Math.ceil(service.price / service.maxPeopleCount) + 1000);
      // 파티 보증금
      setDeposit(
        Math.ceil(service.price / service.maxPeopleCount) +
          service.commission * selectParty.monthCount
      );

      // 다음 정산일까지 남은 날짜 계산해서 하루 가격에 곱해줌 ( 첫 달 결제 금액 )
      let now = new Date();
      now.setHours(0, 0, 0, 0);
      now.setHours(now.getHours() + 9);
      let nextCal = new Date(now);

      nextCal.setDate(selectParty.calculationDate);
      if (nextCal.getDate() <= now.getDate()) {
        nextCal.setMonth(nextCal.getMonth() + 1);
      }

      // 다음 정산일 까지의 일수 구함
      let diff =
        (new Date(nextCal).getTime() - new Date(now).getTime()) /
        (1000 * 60 * 60 * 24);

      // 이때, 파티 시작 전이면 파티 요금이 오늘부터가 아닌 파티 시작일부터 측정되어야함.
      let startDate = new Date(selectParty.startDate);
      if (now < startDate) {
        diff =
          (new Date(nextCal).getTime() - new Date(startDate).getTime()) /
          (1000 * 60 * 60 * 24);
      }
      setCalDate(diff);

      let amountPrice;
      if (nextCal.getDate() === now.getDate()) {
        setFirstMonthFee(
          Math.ceil(service.price / service.maxPeopleCount) + 1000
        );
        amountPrice =
          Math.ceil(service.price / service.maxPeopleCount) +
          service.commission * selectParty.monthCount +
          Math.ceil(service.price / service.maxPeopleCount) +
          1000;
        setAmount(amountPrice);
        // 파티장이 받게 될 금액
        setManagerReceiveMoney(
          Math.ceil(service.price / service.maxPeopleCount) - service.commission
        );
      } else {
        const pricePerDay = Math.ceil(
          (service.price / service.maxPeopleCount + 1000) / 31
        );
        setFirstMonthFee(diff * pricePerDay);
        amountPrice =
          Math.ceil(service.price / service.maxPeopleCount) +
          service.commission * selectParty.monthCount +
          diff * pricePerDay;
        setAmount(amountPrice);
        // 파티장이 받게 될 금액
        setManagerReceiveMoney(
          Math.ceil(
            (service.price / service.maxPeopleCount - service.commission) / 31
          ) * diff
        );
      }

      // 현재 밍글 머니 잔액 불러오기
      axios
        .get("/api/member/getMingleMoney")
        .then((resp) => {
          setMingleMoney(resp.data);
          // 결제 금액보다 밍글 머니 잔액이 더 많거나 같은 경우
          if (resp.data >= amountPrice) {
            setUsedMingleMoney(amountPrice);
            setTotalPrice(0);

            // 결제 금액보다 밍글 머니 잔액이 더 적은 경우
          } else {
            setUsedMingleMoney(resp.data);
            setTotalPrice(amountPrice - resp.data);
          }
        })
        .catch(() => {
          alert("문제가 발생했습니다. 로그인 여부를 확인해주세요.");
        });
    }
  }, [monthFee]);

  // 숫자를 천 단위로 콤마 찍어주는 함수
  const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // 시작일이 경과했는 지 판단
  const getStartDateOver = (value) => {
    let now = new Date();
    now.setHours(0, 0, 0, 0);
    const diff =
      (new Date(value).getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    if (diff === 0) {
      return <>오늘</>;
    } else {
      return new Date(value).toISOString().slice(0, 10);
    }
  };

  // 종료일 계산하는 함수
  const getEndDate = (date, period) => {
    let endDate = new Date(date);
    endDate.setMonth(endDate.getMonth() + period);
    return endDate.toISOString().slice(0, 10);
  };

  // 파티 가입하는 함수
  const handleJoinParty = () => {
    if (isPossible.isAccount && isPossible.isAgree) {
      setLoading(true);

      // 결제수단이 여전히 존재하는 지 다시 한번 검사
      axios
        .get("/api/paymentAccount/accountSelect")
        .then((resp) => {
          setAccount(resp.data);
          if (resp.data !== "") {
            setPossible((prev) => ({ ...prev, isAccount: true }));
          }

          // 이미 시작된 파티이므로 지금 결제
          if (isStartParty) {
            // 현재 밍글 머니 잔액 불러오기
            axios
              .get("/api/member/getMingleMoney")
              .then((resp) => {
                if (resp.data !== mingleMoney) {
                  setMingleMoney(resp.data);
                  setLoading(false);
                  alert("밍글 머니 잔액이 달라져 다시 계산합니다.");
                } else {
                  const paymentData = {
                    date: new Date().toISOString(),
                    serviceId: service.id,
                    price: amount,
                    usedMingleMoney: usedMingleMoney,
                    // 사용하지 않는 속성 활용해 필요한 값 보내기
                    partyRegistrationId: managerReceiveMoney,
                  };

                  axios
                    .post(
                      `/api/party/auth/joinParty/${selectParty.id}`,
                      paymentData
                    )
                    .then((resp) => {
                      setLoading(false);
                      setSelectParty(null);
                      if (
                        window.confirm(
                          "파티 가입에 성공했습니다.\n가입한 파티 정보를 확인하시겠습니까?"
                        )
                      ) {
                        navi("/party/myParty");
                      } else {
                        navi("/");
                      }
                    })
                    .catch(() => {
                      setLoading(false);
                      alert("파티 가입에 실패했습니다.");
                    });
                }
              })
              .catch(() => {
                setLoading(false);
                alert("파티 가입에 실패했습니다. 로그인 여부를 확인해주세요.");
              });
          }

          // 나중에 파티 시작일이 되면 결제
          else {
            axios
              .post(`/api/party/auth/joinParty/${selectParty.id}`)
              .then((resp) => {
                setLoading(false);
                if (
                  window.confirm(
                    "파티 가입에 성공했습니다.\n가입한 파티 정보를 확인하시겠습니까?"
                  )
                ) {
                  navi("/party/myParty");
                } else {
                  navi("/");
                }
              })
              .catch(() => {
                setLoading(false);
                alert("파티 가입에 실패했습니다.");
              });
          }
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  // 결제 수단 ---------------------
  // 결제 계좌 정보
  const [account, setAccount] = useState();

  // 로딩
  const [isLoading, setLoading] = useState(false);

  // 계좌 등록 모달창 열림 / 닫힘
  const [accountModalIsOpen, setAccountModalIsOpen] = useState(false);

  // 계좌 등록 모달창 열기
  const openAccountModal = (e) => {
    const partyContentElement = e.currentTarget;
    const clickedElement = e.target;

    if (
      clickedElement === partyContentElement ||
      partyContentElement.contains(clickedElement)
    ) {
      // partyContent 또는 그 자식 요소를 클릭한 경우에만 처리
      setAccountModalIsOpen(true);
    }
  };

  // 계좌 등록 모달창 닫기
  const closeAccountModal = () => {
    setAccountModalIsOpen(false);
  };

  // 모달창 열 때마다 검사
  useEffect(() => {
    if (!accountModalIsOpen) {
      setLoading(true);

      // 등록된 계좌 정보 있는 지 확인
      axios
        .get("/api/paymentAccount/accountSelect")
        .then((resp) => {
          setAccount(resp.data);
          if (resp.data !== "") {
            setPossible((prev) => ({ ...prev, isAccount: true }));
          }

          // 현재 밍글 머니 잔액 불러오기
          axios
            .get("/api/member/getMingleMoney")
            .then((resp) => {
              setMingleMoney(resp.data);
              setLoading(false);
            })
            .catch(() => {
              setLoading(false);
              alert("문제가 발생했습니다. 로그인 여부를 확인해주세요.");
            });
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [accountModalIsOpen]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (selectParty === null) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {selectParty === null || service === null ? (
        <LoadingSpinner />
      ) : (
        <div className={style.body}>
          <div className={`${style.VAlign} ${style.mb50}`}>
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              onClick={handleBack}
              className={style.backIcon}
            />
            <div className={style.bigTitle}>파티 가입하기</div>
          </div>

          <div className={style.allContent}>
            <div className={style.leftAllContent}>
             <div className={`${style.contentBox}`}>
                    <div className={style.subTitle}>파티 정보</div>
                    <div className={style.contents}>
                        <div className={style.content}>
                            <div className={style.leftContent}>이용 서비스</div>
                            <div className={style.rightContent}>{service.name} {service.plan}</div>
                        </div>
                        <div className={style.content}>
                            <div className={style.leftContent}>정산 일자</div>
                            <div className={style.rightContent}>매월 {selectParty.calculationDate}일</div>
                        </div>
                        <div className={style.content}>
                            <div className={style.leftContent}>파티 기간</div>
                            <div className={style.rightContent}>{getStartDateOver(selectParty.startDate)} ~ {getEndDate(selectParty.startDate, selectParty.monthCount)}</div>
                        </div>
                        <div className={style.content}>
                            <div className={style.leftContent}>파티 요금 (월, VAT 포함)</div>
                            <div className={style.rightContent}>{formatNumber(Math.ceil((service.price)/(service.maxPeopleCount))+1000)}원</div>
                        </div>
                    </div>
                </div>
              <div className={`${style.contentBox}`}>
                <div className={`${style.subTitle}`}>결제수단</div>
                <div className={style.contents}>
                  <div className={style.content}>
                    {account ? (
                      <div className={style.accountBox}>
                        <div className={style.bank}>{account.bankId}</div>
                        <div className={style.accountNumber}>
                          {account.accountNumber}
                        </div>
                        <div className={style.accountChkIcon}>
                          <FontAwesomeIcon icon={faCheck} />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className={style.accountBtn}>
                          <WhiteRectangleBtn
                            title="+ 결제 계좌 등록하기"
                            onClick={openAccountModal}
                            width={300}
                            heightPadding={5}
                          />
                        </div>
                        <AccountModal
                          isOpen={accountModalIsOpen}
                          onRequestClose={closeAccountModal}
                          width={500}
                          height={270}
                          setAllComplete={setPossible}
                        ></AccountModal>
                      </>
                    )}
                  </div>
                  <hr></hr>
                  <div className={`${style.grayBox} ${style.mingleMoneyBox}`}>
                    <div className={style.content}>
                      <div className={style.leftContent}>보유한 밍글 머니</div>
                      <div className={style.rightContent}>
                        {formatNumber(mingleMoney)}원
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${style.contentBox}`}>
                <div className={style.subTitle}>파티 가입 필수 동의</div>
                <div className={style.contents}>
                  <div className={style.agreeContent}>
                    <div className={style.chkBox}>
                      <input
                        type="checkbox"
                        id="chk1"
                        name="1"
                        onChange={handleAgree}
                        checked={agree[1]}
                      ></input>
                    </div>
                    <label htmlFor="chk1">
                      <div className={style.leftContent}>
                        파티 시작일({selectParty.startDate.slice(0, 10)})에{" "}
                        {formatNumber(totalPrice)}원이 등록된 계좌를 통해
                        결제되는 것을 동의합니다.
                      </div>
                    </label>
                  </div>
                  <div className={style.agreeContent}>
                    <div className={style.chkBox}>
                      <input
                        type="checkbox"
                        id="chk2"
                        name="2"
                        onChange={handleAgree}
                        checked={agree[2]}
                      ></input>
                    </div>
                    <label htmlFor="chk2">
                      <div className={style.leftContent}>
                        파티 가입 시 지불하는 파티 보증금{" "}
                        {formatNumber(deposit)}원은 파티가 끝나면 100% 환급되며,
                        파티 중도 탈퇴 시 환급되지 않는 것을 동의합니다.
                      </div>
                    </label>
                  </div>
                  <div className={style.agreeContent}>
                    <div className={style.chkBox}>
                      <input
                        type="checkbox"
                        id="chk3"
                        name="3"
                        onChange={handleAgree}
                        checked={agree[3]}
                      ></input>
                    </div>
                    <label htmlFor="chk3">
                      <div className={style.leftContent}>
                        다음 정산일({selectParty.calculationDate}일) 부터는 밍글
                        수수료가 포함된 {formatNumber(monthFee)}원의 파티 요금이
                        결제되는 것을 동의합니다.
                      </div>
                    </label>
                  </div>
                  <div className={style.agreeContent}>
                    <div className={style.chkBox}>
                      <input
                        type="checkbox"
                        id="chk4"
                        name="4"
                        onChange={handleAgree}
                        checked={agree[4]}
                      ></input>
                    </div>
                    <label htmlFor="chk4">
                      <div className={style.leftContent}>
                        {service.name} 이용 시 프로필 닉네임을 밍글 닉네임으로
                        설정해야 합니다.
                      </div>
                    </label>
                  </div>
                  <div className={style.agreeContent}>
                    <div className={style.chkBox}>
                      <input
                        type="checkbox"
                        id="chk5"
                        name="5"
                        onChange={handleAgree}
                        checked={agree[5]}
                      ></input>
                    </div>
                    <label htmlFor="chk5">
                      <div className={style.leftContent}>
                        파티 가입 조건 및 서비스 이용약관을 확인했으며, 이에
                        동의합니다.
                      </div>
                    </label>
                  </div>
                </div>
                <div className={style.allAgree}>
                  <WhiteRectangleBtn
                    title={"전체 동의"}
                    heightPadding={5}
                    onClick={handelAllAgree}
                  />
                </div>
              </div>
            </div>
            <div className={style.rightAllContent}>
              <div className={`${style.partyAmount} ${style.contentBox}`}>
                <div className={style.subTitle}>첫 달 결제 금액</div>
                <div className={style.contents}>
                  <div className={style.content}>
                    <div
                      className={`${style.leftContent} ${style.centerAlign}`}
                    >
                      파티 요금(첫 달)
                      <FontAwesomeIcon
                        onMouseOver={() => {
                          setHovering(true);
                        }}
                        onMouseOut={() => {
                          setHovering(false);
                        }}
                        icon={faQuestion}
                        className={`${style.questionIcon} ${style.centerAlign}`}
                      />
                    </div>
                    <div className={style.rightContent}>
                      {formatNumber(firstMonthFee)}원
                    </div>
                  </div>
                  {isHovering ? (
                    <div className={style.infoPop}>
                      <div className={style.miniTitle}>
                        첫 달 파티 요금이란?
                      </div>
                      <div className={style.miniContent}>
                        최초 파티 가입 시 지불하는 파티 요금으로, 파티 시작일
                        혹은 시작일 이후 가입일로부터 다음 정산일까지의 파티
                        요금입니다. 파티 시작일 이전일 경우, 파티 시작일에
                        결제되며, 밍글 이용 수수료가 포함되어 있습니다.
                      </div>
                      <hr></hr>
                      <div className={style.miniContent}>
                        {" "}
                        ( 다음 파티 정산일까지 {calDate}일 ) * <br></br> ( 일
                        파티 요금 약{" "}
                        {formatNumber(
                          Math.ceil(
                            (service.price / service.maxPeopleCount + 1000) / 31
                          )
                        )}
                        원 ) = {formatNumber(firstMonthFee)}원
                      </div>
                    </div>
                  ) : null}
                  <div className={style.content}>
                    <div className={style.leftContent}>
                      파티 보증금(100% 환급)
                    </div>
                    <div className={style.rightContent}>
                      {formatNumber(deposit)}원
                    </div>
                  </div>
                  <hr className={style.hrLine}></hr>
                  <div className={style.content}>
                    <div className={style.leftContent}>합계</div>
                    <div className={style.rightContent}>
                      {formatNumber(amount)}원
                    </div>
                  </div>
                  <div className={style.content}>
                    <div
                      className={`${style.leftContent} ${style.centerAlign}`}
                    >
                      밍글 머니 우선적용
                      <FontAwesomeIcon
                        onMouseOver={() => {
                          setMMHovering(true);
                        }}
                        onMouseOut={() => {
                          setMMHovering(false);
                        }}
                        icon={faQuestion}
                        className={`${style.questionIcon} ${style.centerAlign}`}
                      />
                    </div>
                    <div className={style.rightContent}>
                      - {formatNumber(usedMingleMoney)}원
                    </div>
                    {isMMHovering ? (
                      <div className={`${style.infoPop} ${style.mmInfoPop}`}>
                        <div className={style.miniTitle}>
                          밍글 머니 우선적용?
                        </div>
                        <div className={style.miniContent}>
                          파티 시작일에 결제 시, 밍글 머니 잔액에 변동이 생기면
                          우선적용 금액이 달라질 수 있으며, 자세한 정보는
                          마이페이지 내 정산내역확인에서 확인이 가능합니다.
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <hr className={style.hrLine}></hr>
                  <div className={`${style.content} ${style.totalContent}`}>
                    <div className={style.leftContent}>최종 결제 금액</div>
                    <div className={style.rightContent}>
                      {formatNumber(totalPrice)}원
                    </div>
                  </div>
                </div>

                <div className={style.grayBox}>
                  <div className={style.content}>
                    <div className={style.leftContent}>
                      파티 종료 시 환급될 밍글 머니
                    </div>
                    <div className={style.rightContent}>
                      +{" "}
                      {formatNumber(
                        Math.ceil(service.price / service.maxPeopleCount) +
                          service.commission * selectParty.monthCount
                      )}
                      원
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={
                  isPossible.isAccount && isPossible.isAgree
                    ? `${style.joinBtn}`
                    : `${style.joinBtnNone}`
                }
              >
                <WhiteRectangleBtn
                  width={450}
                  heightPadding={10}
                  title={isStartParty ? "결제하고 파티 시작" : "파티 가입 완료"}
                  onClick={handleJoinParty}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PartyAttend;

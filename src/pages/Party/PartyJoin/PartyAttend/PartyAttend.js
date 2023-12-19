import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./PartyAttend.module.css";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import WhiteRectangleBtn from "../../../../components/WhiteRectangleBtn/WhiteRectangleBtn";

const PartyAttend = () => {
    const navi = useNavigate();

    const handleBack = () => {
        navi(-1);
    }

    return(
        <div className={style.body}>
            <div className={`${style.VAlign} ${style.mb50}`}>
                <FontAwesomeIcon icon={faCircleArrowLeft} onClick={handleBack} className={style.backIcon}/> 
                <div className={style.bigTitle}>파티 가입하기</div>
            </div>

            <div className={style.allContent}>
                <div className={style.leftAllContent}>
                    <div className={`${style.partyInfo} ${style.contentBox}`}>
                        <div className={style.subTitle}>파티 정보</div>
                        <div className={style.contents}>
                            <div className={style.content}>
                                <div className={style.leftContent}>이용 서비스</div>
                                <div className={style.rightContent}>티빙 프리미엄</div>
                            </div>
                            <div className={style.content}>
                                <div className={style.leftContent}>파티 기간</div>
                                <div className={style.rightContent}>오늘 ~ 2024.12.19</div>
                            </div>
                            <div className={style.content}>
                                <div className={style.leftContent}>파티 요금 (월, VAT 포함)</div>
                                <div className={style.rightContent}>5,250원</div>
                            </div>
                        </div>
                    </div>
                    <div className={`${style.partyInfo} ${style.contentBox}`}>
                        <div className={style.subTitle}>결제수단</div>
                        <div className={style.contents}>
                            <div className={style.content}>
                                <div className={style.leftContent}>계좌정보</div>
                                <div className={style.rightContent}>변경하기</div>
                            </div>
                            <div className={style.content}>
                                <div className={style.leftContent}>밍글 머니 우선 사용 (0원 보유)</div>
                                <div className={style.rightContent}>켜짐</div>
                            </div>
                        </div>
                    </div>
                    <div className={`${style.partyInfo} ${style.contentBox}`}>
                        <div className={style.subTitle}>파티 가입 필수 동의</div>
                        <div className={style.contents}>
                            
                        </div>
                    </div>
                </div>
                <div className={style.rightAllContent}>
                    <div className={`${style.partyInfo} ${style.contentBox}`}>
                        <div className={style.subTitle}>첫 달 결제 금액</div>
                        <div className={style.contents}>
                            <div className={style.content}>
                                <div className={style.leftContent}>파티 요금(첫 달)</div>
                                <div className={style.rightContent}>2,201원</div>
                            </div>
                            <div className={style.content}>
                                <div className={style.leftContent}>파티 보증금(100% 환급)</div>
                                <div className={style.rightContent}>오늘 ~ 2024.12.19</div>
                            </div>
                            <hr></hr>
                            <div className={style.content}>
                                <div className={style.leftContent}>합계</div>
                                <div className={style.rightContent}>11,401원</div>
                            </div>
                            <div className={style.content}>
                                <div className={style.leftContent}>밍글 머니 결제</div>
                                <div className={style.rightContent}>-0원</div>
                            </div>
                            <hr></hr>
                            <div className={style.content}>
                                <div className={style.leftContent}>최종 결제 금액</div>
                                <div className={style.rightContent}>11,401원</div>
                            </div>
                        </div>

                        <div className={style.grayBox}>
                            <div className={style.content}>
                                <div className={style.leftContent}>파티 종료 시 환급될 밍글 머니</div>
                                <div className={style.rightContent}>9,200원</div>
                            </div>
                        </div>
                    </div>
                    <div className={style.joinBtn}>
                        <WhiteRectangleBtn width={450} heightPadding={10} title={"결제하고 파티 시작"}/>    
                    </div>
                    
                   
                </div>           
            </div>
        </div>
    );
}

export default PartyAttend;
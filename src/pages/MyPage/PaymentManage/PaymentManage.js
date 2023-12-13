import PurpleRoundBtn from '../../../components/PurpleRoundBtn/PurpleRoundBtn';
import style from '../../MyPage/PaymentManage/PaymentManage.module.css';

const PaymentManage = () =>{

    return(
        <div className={style.container}>
            <div className={style.container__inner}>
                <div className={style.inner__title}>결제 수단 관리</div>
                <div className={style.inner__line}></div>

                <div className={style.inner}>
                    <div className={style.inner__left}>등록된 결제 수단이 없어요.</div>
                    <div className={style.inner__right}>
                        <PurpleRoundBtn title={"카드 등록"} activation={true}></PurpleRoundBtn>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default PaymentManage;
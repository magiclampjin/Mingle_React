import style from '../../MyPage/PaymentRecord/PaymentRecord.module.css';

const PaymentRecord = () =>{
    return(
        <div className={style.container}>
            <div className={style.container__inner}>
                <div className={style.inner__title}>결제/적립/인출</div>
                <div className={style.inner__line}></div>
                
            </div>
        </div>
    );
} 

export default PaymentRecord;
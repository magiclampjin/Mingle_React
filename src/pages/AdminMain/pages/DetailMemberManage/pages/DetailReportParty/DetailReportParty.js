import style from '../../../../AdminMain.module.css'
import ReportAccountBox from './components/ReportAccoutBox/ReportAccountBox';
import ReportNonPaymentBox from './components/ReportNonPaymentBox/ReportNonPaymentBox';

const DetailReportParty = () => {
    return (
        <div className={style.background}>
            <div className={style.body}>
                <ReportAccountBox></ReportAccountBox>
                <ReportNonPaymentBox></ReportNonPaymentBox>
            </div>
        </div>
    );
}

export default DetailReportParty;
import style from '../../../../AdminMain.module.css'
import ReportAccountBox from './components/ReportAccoutBox/ReportAccountBox';
import ReportChattingBox from './components/ReportChattingBox/ReportChattingBox';
import ReportNonPaymentBox from './components/ReportNonPaymentBox/ReportNonPaymentBox';
import ReportPartyReplyBox from './components/ReportPartyReplyBox/ReportPartyReplyBox';

const DetailReportParty = () => {
    return (
        <div className={style.background}>
            <div className={style.body}>
                <ReportAccountBox></ReportAccountBox>
                <ReportPartyReplyBox></ReportPartyReplyBox>
                <ReportNonPaymentBox></ReportNonPaymentBox>
                <ReportChattingBox></ReportChattingBox>
            </div>
        </div>
    );
}

export default DetailReportParty;
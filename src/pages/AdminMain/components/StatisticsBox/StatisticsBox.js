import 'bootstrap/dist/css/bootstrap.min.css';
import {Row} from 'reactstrap';
import VisitorsBox from "./VisitorsBox/VisitorsBox";
import ContentsUserBox from "./ContentsUserBox/ContentsUserBox";

const StatisticsBox = () => {
    return (
        <Row className="gx-3">
            <VisitorsBox></VisitorsBox>
            <ContentsUserBox></ContentsUserBox>
        </Row>
    );
}

export default StatisticsBox;
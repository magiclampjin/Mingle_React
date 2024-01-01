import 'bootstrap/dist/css/bootstrap.min.css';
import {Row} from 'reactstrap';
import ContentsUserBox from "./ContentsUserBox/ContentsUserBox";

const StatisticsBox = () => {
    return (
        <Row className="gx-3">
            <ContentsUserBox></ContentsUserBox>
        </Row>
    );
}

export default StatisticsBox;
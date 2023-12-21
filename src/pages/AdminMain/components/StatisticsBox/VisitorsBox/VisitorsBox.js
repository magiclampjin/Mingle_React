import style from '../../../AdminMain.module.css'
import {Row, Col} from 'reactstrap';

const VisitorsBox = () => {

    return (
        <Col xs={12} md={6} className={style.box}>
            <Col xs={12} className={style.componentTitle}>방문자수</Col>
            <Col xs={12} className={style.componentBox}>
                <Row className="py-2">
                    
                </Row>
            </Col>
        </Col>
    );
}

export default VisitorsBox;
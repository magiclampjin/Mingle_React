import style from "../../AdminMain.module.css"
import {Row, Col} from 'reactstrap';

const NoticeBoardBox = () => {
    return (
        <Row className={style.box}>
            <Col xs="12" className={style.componentTitle}>공지 게시판 박스</Col>
            <Col xs="12" className={style.componentBox}>
                <Row className="py-2">
                    <Col xs={10} lg={11}></Col><Col xs={2} lg={1}>더보기</Col>   
                </Row>
            </Col>
        </Row>
    );
}

export default NoticeBoardBox;
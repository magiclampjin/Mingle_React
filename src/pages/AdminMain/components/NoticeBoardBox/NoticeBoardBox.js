import style from "./NoticeBoardBox.module.css"
import {Row, Col} from 'reactstrap';

const NoticeBoardBox = () => {
    return (
        <Row className={style.body}>
            <Col xs="12" className={style.noticeBoardTitle}>공지 게시판 박스</Col>
            <Col xs="12" className={style.noticeBoardBox}>
                <Row className="py-2">
                    <Col xs={10} lg={11}></Col><Col xs={2} lg={1}>더보기</Col>   
                </Row>
            </Col>
        </Row>
    );
}

export default NoticeBoardBox;
import style from '../../../AdminMain.module.css'
import {Row, Col} from 'reactstrap';
import { useEffect, useState } from "react";
import axios from "axios";
import { ResponsivePie } from '@nivo/pie';

const ContentsUserBox = () => {
    const [service, setService] = useState([]);

    useEffect(() => {
        axios.get(`/api/admin/serviceUserCount`).then(resp => {
            setService(resp.data);
        })
    }, []);

    return (
        <Col xs={12} className={style.box}>
            <Col xs={12} className={style.componentTitle}>이용자수</Col>
            <Col xs={12} className={style.componentBox}>
                <div style={{ width: '100%', height: '100%', margin: '0 auto' }}>
                    <ResponsivePie
                        /**
                         * chart에 사용될 데이터
                         */
                        data={
                            service.map((item, i) => {
                                return {
                                    id : item.serviceName , value : item.memberCount,
                                };
                            })
                        }
                        /**
                         * chart margin
                         */
                        margin={{ top: 40, right: 120, bottom: 40, left: -60 }}
                        /**
                         * chart 중간 빈공간 반지름
                         */
                        innerRadius={0.5}
                        /**
                         * pad 간격
                         */
                        padAngle={1.8}
                        /**
                         * pad radius 설정 (pad별 간격이 있을 시 보임)
                         */
                        cornerRadius={8}
                        /**
                         * chart 색상
                         */
                        colors={
                            {scheme: 'set3'}
                        } // 커스텀하여 사용할 때
                        // colors={{ scheme: 'nivo' }} // nivo에서 제공해주는 색상 조합 사용할 때
                        /**
                         * pad border 두께 설정
                         */
                        borderWidth={2}
                        /**
                         * link label skip할 기준 각도
                         */
                        arcLinkLabelsSkipAngle={0}
                        /**
                         * link label 색상
                         */
                        arcLinkLabelsTextColor="#000000"
                        /**
                         * link label 연결되는 선 두께
                         */
                        arcLinkLabelsThickness={2}
                        /**
                         * link label 연결되는 선 색상
                         */
                        arcLinkLabelsColor={{ from: 'color' }} // pad 색상에 따라감
                        /**
                         * label (pad에 표현되는 글씨) skip할 기준 각도
                         */
                        arcLabelsSkipAngle={10}
                        theme={{
                            /**
                             * label style (pad에 표현되는 글씨)
                             */
                            labels: {
                                text: {
                                    fontSize: 14,
                                    fill: '#000000',
                                },
                            },
                            /**
                             * legend style (default로 하단에 있는 색상별 key 표시)
                             */
                            legends: {
                                text: {
                                    fontSize: 12,
                                    fill: '#000000',
                                },
                            },
                        }}
                        /**
                         * legend 설정 (default로 하단에 있는 색상별 key 표시)
                         */
                        legends={[
                            {
                                anchor: 'top', // 위치
                                direction: 'column', // item 그려지는 방향
                                justify: false, // 글씨, 색상간 간격 justify 적용 여부
                                translateX: 340, // chart와 X 간격
                                translateY: 0, // chart와 Y 간격
                                itemsSpacing: 0, // item간 간격
                                itemWidth: 100, // item width
                                itemHeight: 18, // item height
                                itemDirection: 'left-to-right', // item 내부에 그려지는 방향
                                itemOpacity: 1, // item opacity
                                symbolSize: 18, // symbol (색상 표기) 크기
                                symbolShape: 'circle', // symbol (색상 표기) 모양
                                effects: [
                                    {
                                        // 추가 효과 설정 (hover하면 textColor를 olive로 변경)
                                        on: 'hover',
                                        style: {
                                            itemTextColor: 'olive',
                                        },
                                    },
                                ],
                            },
                        ]}
                    />
                </div>
            </Col>
        </Col>
    );
}

export default ContentsUserBox;
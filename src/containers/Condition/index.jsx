import React, {useEffect} from "react";
import styles from "./Condition.module.css";
import {Container, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {condition_get} from "../../redux/actions/condition.action";

const ConditionContainer = () => {

    const conditionMain = useSelector(state => state.conditionReducer.conditionDate);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(condition_get());
    }, [])


    return (
        <>
            <section className={styles.abut_banner}>
                <Container>
                    <div className={styles.title}>
                        <h1>Վճարում և առաքում</h1>
                    </div>
                </Container>
            </section>
            <section>
                <Container>
                    <div className={styles.info_banner}>
                        {
                            conditionMain?.slice(0, 1)[0]?.map((item) => {
                                return (
                                    <Row>
                                        <Col sm={12} md={6} lg={6}>
                                            <div className={styles.banner_img}>
                                                <img src={item.image} alt="img"/>
                                            </div>
                                        </Col>
                                        <Col sm={12} md={6} lg={6}>
                                            <div className={styles.banner_text}>
                                                <h3>
                                                    {item.title_am}
                                                </h3>
                                                <p>
                                                    {item.text_am}
                                                </p>
                                            </div>
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                    </div>
                </Container>
            </section>
            <section>
                <Container>
                    {
                        conditionMain?.slice(1, 2)[0]?.map((item) => {
                            return (
                                <div className={styles.info_banners}>
                                    <p className={styles.info}>
                                        {item.text_am}
                                    </p>
                                </div>
                            )
                        })
                    }
                </Container>
            </section>
        </>
    );
};

export default ConditionContainer;

import React, {useEffect, useState} from "react";
import styles from "./About.module.css";
import {Container, Col, Row} from "react-bootstrap";
import Terev2 from "../../svg/terev2.svg";
import Terev from "../../svg/terev.svg";
import Del from "../../svg/deliv.svg";
import Hoq from "../../svg/hoga.svg";
import {useDispatch, useSelector} from "react-redux";
import {about_get_data} from "../../redux/actions/about.action";
import {useTranslation} from "next-i18next";

const AboutContianer = () => {

    const {t} = useTranslation("common");

    const [lang, setLang] = useState();

    const about_main = useSelector(state => state.aboutReducer.aboutData);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(about_get_data())
        setLang(localStorage.getItem("language"))
    }, [])

    return (
        <>
            <section className={styles.abut_banner}>
                <Container>
                    <div className={styles.title}>
                        <h1>{lang == 'am' ? "Մեր մասին" : lang == 'ru' ? "О нас" : "About us"}</h1>
                    </div>
                </Container>
            </section>
            <section>
                <Container>
                    <div className={styles.info_banner}>
                        <Row>

                            <Col sm={12} md={6} lg={6}>
                                <div className={styles.banner_img}>
                                    <img src={about_main?.about_one?.image} alt="img"/>
                                </div>
                            </Col>
                            <Col sm={12} md={6} lg={6}>

                                <div className={styles.banner_text}>
                                    <h3>
                                        {lang == "am" ? about_main?.about_one?.title_am : lang == "ru" ? about_main?.about_one?.title_ru : about_main?.about_one?.title_en}
                                    </h3>
                                    <p>
                                        {lang == "am" ? about_main?.about_one?.description_am : lang == "ru" ? about_main?.about_one?.description_ru : about_main?.about_one?.description_en}
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>
            <section className={styles.section_3}>
                <Container>
                    <Row>
                        <Col sm={12} md={6} lg={6}>
                            <div className={styles.text}>
                                <h3>
                                    {lang == "am" ? about_main?.about_two?.title_am : lang == "ru" ? about_main?.about_two?.title_ru : about_main?.about_two?.title_en}
                                </h3>
                                <p>
                                    {lang == "am" ? about_main?.about_two?.description_am : lang == "ru" ? about_main?.about_two?.description_ru : about_main?.about_two?.description_en}
                                </p>
                            </div>
                        </Col>
                        <Col sm={12} md={6} lg={6}>
                            <div className={styles.img_2_block}>
                                <img src={about_main?.about_two?.image} alt="img"/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className={styles.deliver_Section}>
                <Container>
                    <Row>
                        <Col sm={12} md={6} lg={3}>
                            <div className={styles.flip_card}>
                                <div className={styles.flip_card_inner}>
                                    <div className={styles.flip_card_front}>
                                        <Terev/>
                                    </div>
                                    <div className={styles.flip_card_back}>
                                        <p>{lang == "am" ? "Որակը երաշխավորած է" : lang == "ru" ? "Качество гарантировано" : "Quality is guaranteed"}</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col sm={12} md={6} lg={3}>
                            <div className={styles.flip_card}>
                                <div className={styles.flip_card_inner}>
                                    <div className={styles.flip_card_front}>
                                        <Terev2/>
                                    </div>
                                    <div className={styles.flip_card_back}>
                                        <p>{lang == "am" ? "Մեծ տեսականի" : lang == "ru" ? "Качество гарантировано" : "Quality is guaranteed"}</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col sm={12} md={6} lg={3}>
                            <div className={styles.flip_card}>
                                <div className={styles.flip_card_inner}>
                                    <div className={styles.flip_card_front}>
                                        <Del/>
                                    </div>
                                    <div className={styles.flip_card_back}>
                                        <p>{lang == "am" ? "Առաքում Հայաստանի ողջ տարածքով" : lang == "ru" ? "Доставка по Армении" : "Delivery throughout Armenia"}</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col sm={12} md={6} lg={3}>
                            <div className={styles.flip_card}>
                                <div className={styles.flip_card_inner}>
                                    <div className={styles.flip_card_front}>
                                        <Hoq/>
                                    </div>
                                    <div className={styles.flip_card_back}>
                                        <p>{lang == 'am' ? "Աշխատում ենք սիրով" : lang == 'ru' ? "Мы работаем с любовью" : "We work with love"}</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className={styles.section_4}>
                <Container>
                    <Row>
                        <Col sm={12} md={6} lg={6}>
                            <div className={styles.section_4_img_block}>
                                <img src={about_main?.about_three?.image} alt="img"/>
                            </div>
                        </Col>
                        <Col sm={12} md={6} lg={6}>
                            <div className={styles.text1}>
                                <h3>
                                    {lang == "am" ? about_main?.about_three?.title_am : lang == 'ru' ? about_main?.about_three?.title_ru : about_main?.about_three?.title_en}
                                </h3>
                                <p>
                                    {lang == "am" ? about_main?.about_three?.description_am : lang == 'ru' ? about_main?.about_three?.description_ru : about_main?.about_three?.description_en}
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className={styles.section_5_develope}>
                <Container>
                    <div className={styles.develope}>
                        <p>
                            {
                                lang == 'am' ?
                                    "Անդադար զարգանալ և առաջ շարժվել." +
                                    " սա այն սկզբունքն է, որ տարիներ" +
                                    " շարունակ օգնում է պահպանել մեր ձեռքբերումները:" : lang == 'ru' ? "Постоянно развиваться և двигаться вперед Это принцип, который помогает нам поддерживать наши достижения на " +
                                    "протяжении многих лет." : "To constantly develop և to move forward. " +
                                    "This is a principle that has helped us maintain our achievements for years."
                            }
                        </p>
                    </div>
                </Container>
            </section>

            <section className={styles.section_6}>
                <Container>
                    <Row>
                        <Col sm={12} md={6} lg={6}>
                            <div className={styles.text}>
                                <h3>
                                    {lang == "am" ? about_main?.about_four?.title_am : lang == 'ru' ? about_main?.about_four?.title_ru : about_main?.about_four?.title_en}
                                </h3>
                                <p>
                                    {lang == "am" ? about_main?.about_four?.description_am : lang == 'ru' ? about_main?.about_four?.description_ru : about_main?.about_four?.description_en}
                                </p>
                            </div>
                        </Col>
                        <Col sm={12} md={6} lg={6}>
                            <div className={styles.img_2_block2}>
                                <img src={about_main?.about_four?.image} alt="img"/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className={styles.section_7}>
                <Container>
                    <div className={styles.garden_info_block}>
                        <p>
                            {
                                lang == "am" ? "Այգին հիմնելիս անհրաժեշտ է հաշվի առնել տեղանքի բնակլիմայական պայմանները, լույսի և ստվերի առկայությունը, հողի տեսակը, քամու  առկայությունը և կարևորագույն պայմանը՝ բույսերի ճիշտ ոռոգումը:"
                                    : lang == 'ru' ? "При закладке сада необходимо учитывать климатические условия места, наличие света – тень, тип почвы, наличие ветра – важнейшее условие – правильный полив растений."
                                        : "When establishing a garden, it is necessary to take into account the climatic conditions of the area, the presence of light վ shade, the type of soil, the presence of wind և the most important condition - proper irrigation of plants."
                            }
                        </p>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default AboutContianer;

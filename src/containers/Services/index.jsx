import React, {useState, useEffect} from "react";
import styles from "./Services.module.css";
import {Container, Row, Col} from "react-bootstrap";
import A1 from "../../svg/a1.svg";
import A2 from "../../svg/a2.svg";
import A3 from "../../svg/a3.svg";
import A4 from "../../svg/a4.svg";
import A5 from "../../svg/a5.svg";
import Arrow from "../../svg/arrow1.svg";
import {useDispatch, useSelector} from "react-redux";
import {deleverygetAction} from './../../redux/actions/delevery.action';

const ServicesContaner = () => {

    const [toggle, setToggle] = useState(false);
    const [category, setgategory] = useState("a3");
    const [currentId, setCurrentId] = useState("Երևան");
    const [lang, setLang] = useState();

    const servicesData = useSelector(state => state.deleveryReducer.data);

    const dispatch = useDispatch();

    useEffect(() => {
        setLang(localStorage.getItem('language'))
    });

    useEffect(() => {
        dispatch(deleverygetAction())
    }, [])

    const HANDLLER_SERVICE_INFO = (name) => {
        setgategory(name);
    };

    const changeToggle = () => {
        setToggle(!toggle);
    };

    const handlerChange = (еvent) => {
        еvent.preventDefault();
        setCurrentId(еvent.target.value);
    };

    let x = servicesData?.filter((i) => {
        return currentId == i.city_am;
    });

    return (
        <>
            <section className={styles.abut_banner}>
                <Container>
                    <div className={styles.title}>
                        <h1>{lang == 'am' ? "Մեր մասին" : lang == 'ru' ? "O нас" : "About us"}</h1>
                    </div>
                </Container>
            </section>
            <section className={styles.services_second_section}>
                <Container>
                    <Row>
                        <Col md={6} lg={6}>
                            <div className={styles.img_block}>
                                <img src="/assets/6.png" alt=""/>
                                <div className={styles.items_services}>
                                    <div
                                        className={styles.a1}
                                        onClick={() => HANDLLER_SERVICE_INFO("a1")}
                                        style={
                                            category == "a1"
                                                ? {
                                                    background: "green",
                                                    transition: "all 2.3s",
                                                }
                                                : null
                                        }
                                    >
                                        <A1 className={category == "a1" ? styles.active : null}/>
                                        <p className={styles.hover}>
                                            {lang == 'am' ? "Հիվանդանոց" : lang == 'ru' ? "Больница" : "Hospital"}
                                        </p>
                                    </div>
                                    <div
                                        className={styles.a2}
                                        onClick={() => HANDLLER_SERVICE_INFO("a2")}
                                        style={
                                            category == "a2"
                                                ? {
                                                    background: "green",
                                                    transition: "all 2.3s",
                                                }
                                                : null
                                        }
                                    >
                                        <A2 className={category == "a2" ? styles.active : null}/>
                                        <p className={styles.hover2}>
                                            {lang == 'am' ? "Վարակներ" : lang == 'ru' ? "Инфекции" : "Infections"}
                                        </p>
                                    </div>
                                    <div
                                        className={styles.a3}
                                        onClick={() => HANDLLER_SERVICE_INFO("a3")}
                                        style={
                                            category == "a3"
                                                ? {
                                                    background: "green",
                                                    transition: "all 2.3s",
                                                }
                                                : null
                                        }
                                    >
                                        <A3 className={category == "a3" ? styles.active : null}/>
                                        <p className={styles.hover3}>
                                            {lang == 'am' ? "Հյուրանոց" : lang == 'ru' ? "Отель" : "Hotel"}
                                        </p>
                                    </div>
                                    <div
                                        className={styles.a4}
                                        onClick={() => HANDLLER_SERVICE_INFO("a4")}
                                        style={
                                            category == "a4"
                                                ? {
                                                    background: "green",
                                                    transition: "all 2.3s",
                                                }
                                                : null
                                        }
                                    >
                                        <A4 className={category == "a4" ? styles.active : null}/>
                                        <p className={styles.hover4}>
                                            {lang == 'am' ? "Պարարտանյութեր" : lang == 'ru' ? "Удобрения" : "Fertilizers"}
                                        </p>
                                    </div>
                                    <div
                                        className={styles.a5}
                                        onClick={() => HANDLLER_SERVICE_INFO("a5")}
                                        style={
                                            category == "a5"
                                                ? {
                                                    background: "green",
                                                    transition: "all 2.3s",
                                                }
                                                : null
                                        }
                                    >
                                        <A5 className={category == "a5" ? styles.active : null}/>
                                        <p className={styles.hover5}>
                                            {lang == 'am' ? "Վերատնկում" : lang == 'ru' ? "Пересадка" : "Replanting"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={6} lg={6}>
                            <div className={styles.info_service_block}>
                                {category == "a1" ? (
                                    <div className={styles.service_info_block}>
                                        <h1>
                                            {lang == 'am' ? "Հիվանդանոց" : lang == 'ru' ? "Больница" : "Hospital"}
                                        </h1>
                                        <ul className={styles.ul}>
                                            <li>
                                                {
                                                    lang == 'am' ?
                                                        "Մինչև 0,5լ․ ծաղկամանի մեկ օրվա արժեքը 200 դրամ"
                                                        : lang == 'ru' ? "До 0.5 л ․ Стоимость одной вазы в день 200 драм."
                                                            : "Up to 0.5 l ․ The cost of one vase per day is 200 AMD"
                                                }
                                            </li>
                                            <li>
                                                {
                                                    lang == 'am' ?
                                                        "0,5լ-ից 1լ․ ծաղկամանի մեկ օրվա արժեքը 500 դրամ"
                                                        : lang == 'ru' ? "от 0.5 л до 1 л ․ Стоимость одной вазы в день 500 драм."
                                                            : "0.5 l to 1 l ․ The cost of one vase per day is 500 AMD"
                                                }
                                            </li>
                                            <li>
                                                {
                                                    lang == 'am' ?
                                                        "1լ-ից 5լ․ ծաղկամանի մեկ օրվա արժեքը 700 դրամ"
                                                        : lang == 'ru' ? "от 1л до 5л ․ Стоимость одной вазы в день 700 драм."
                                                            : "1l to 5l ․ The cost of one vase per day is 700 AMD"
                                                }
                                            </li>
                                            <li>
                                                {
                                                    lang == 'am' ?
                                                        "5լ-ից 10լ․ ծաղկամանի մեկ օրվա արժեքը 900 դրամ"
                                                        : lang == 'ru' ? "от 5 л до 10 л ․ Стоимость одной вазы в день 900 драм."
                                                            : "5l to 10l ․ The cost of one vase per day is 900 AMD"
                                                }
                                            </li>
                                            <li>
                                                {
                                                    lang == 'am' ?
                                                        "10 լիտրից ավել ծաղկամանի մեկ օրվա արժեքը 1200 դրամ"
                                                        : lang == 'ru' ? "Стоимость вазы более 10 литров в сутки 1200 драм."
                                                            : "The cost of a vase of more than 10 liters per day is 1200 AMD"
                                                }
                                            </li>
                                            <li>

                                                {
                                                    lang == 'am' ?
                                                        "Գները նշված են առանց պարարտանյութերի, թույների և այլ միջոցների օգտագործման ծախսերի"
                                                        : lang == 'ru' ? "Цены указаны без учета стоимости удобрений, ядов и других средств"
                                                            : "Prices are quoted without the cost of fertilizers, poisons or other means"
                                                }
                                            </li>
                                        </ul>
                                    </div>
                                ) : category == "a2" ? (
                                    <div className={styles.service_info_block}>
                                        <h1>

                                            {lang == 'am' ? "Հիվանդությունների, վարակների դեմ պայքարի միջոցներ" : lang == 'ru' ? "Меры борьбы с болезнями и инфекциями" : "Measures to fight diseases and infections"}}
                                        </h1>
                                        <ul className={styles.ul}>
                                            <li>
                                                {" "}
                                                {lang == 'am' ? "Թույների և քիմիկատների լայն տեսականի։ Հմուտ մասնագետների կողմից անվճար խորհրդատվություն" : lang == 'ru' ? "Широкий спектр ядов и химикатов. Бесплатная консультация квалифицированных специалистов" : "A wide range of poisons and chemicals. Free consultation by skilled professionals"}
                                            </li>
                                        </ul>
                                    </div>
                                ) : category == "a3" ? (
                                    <div className={styles.service_info_block}>
                                        <h1>
                                            {lang == 'am' ? "Հյուրանոց" : lang == 'ru' ? "Отель" : "Hotel"}
                                        </h1>
                                        <ul className={styles.ul}>
                                            <li>
                                                {lang == 'am' ? "Մինչև 0,5լ․ ծաղկամանի մեկ օրվա արժեքը 150 դրամ"
                                                    : lang == 'ru' ? "До 0,5 л ․ Стоимость одной вазы в сутки 150 драм"
                                                        : "Up to 0.5 l ․ The cost of one vase per day is 150 drams"}
                                            </li>
                                            <li>
                                                {
                                                    lang == 'am' ? "0,5լ-ից 1լ․ ծաղկամանի մեկ օրվա արժեքը 250 դրամ"
                                                        : lang == 'ru'
                                                            ? "от 0,5 л до 1 л ․ Стоимость одной вазы в день 250 драм."
                                                            : "0.5 l to 1 l ․ The cost of one vase per day is 250 AMD"
                                                }
                                            </li>
                                            <li>
                                                {
                                                    lang == 'am' ? "1լ-ից 5լ․ ծաղկամանի մեկ օրվա արժեքը 350 դրամ"
                                                        : lang == 'ru'
                                                            ? "от 1л до 5л ․ Стоимость вазы в сутки 350 драм"
                                                            : "1l to 5l ․ The cost of a vase per day is 350 drams"
                                                }
                                            </li>
                                            <li>
                                                {
                                                    lang == 'am' ? "5լ-ից 10լ․ ծաղկամանի մեկ օրվա արժեքը 500 դրամ"
                                                        : lang == 'ru'
                                                            ? "от 5 л до 10 л ․ Стоимость одной вазы в день 500 драм."
                                                            : "5l to 10l ․ The cost of one vase per day is 500 AMD"
                                                }
                                            </li>
                                            <li>
                                                {
                                                    lang == 'am' ? "10 լիտրից ավել ծաղկամանի մեկ օրվա արժեքը 700 դրամ"
                                                        : lang == 'ru'
                                                            ? "Стоимость вазы более 10 литров в сутки 700 драм."
                                                            : "The cost of a vase of more than 10 liters per day is 700 AMD"
                                                }
                                            </li>
                                            <li>

                                                {
                                                    lang == 'am' ? "Գները նշված են առանց պարարտանյութերի, թույների և այլ միջոցների օգտագործման ծախսերի"
                                                        : lang == 'ru'
                                                            ? "Цены указаны без учета стоимости удобрений, ядов и других средств"
                                                            : "Prices are quoted without the cost of fertilizers, poisons or other means"
                                                }
                                            </li>
                                        </ul>
                                    </div>
                                ) : category == "a4" ? (
                                    <div className={styles.service_info_block}>
                                        <h1>
                                            {
                                                lang == 'am' ? "Պարարտանյութ, սնուցում"
                                                    : lang == 'ru'
                                                        ? "Удобрение, питание"
                                                        : "Fertilizer, nutrition"
                                            }
                                        </h1>
                                        <ul className={styles.ul}>
                                            <li>

                                                {
                                                    lang == 'am' ? "Պարարտանյութերի օգտագործման վերաբերյալ անվճար խորհրդատվություն։Պարարտանյութերի լայն տեսականի։"
                                                        : lang == 'ru'
                                                            ? "Бесплатная консультация по применению удобрений.Широкий ассортимент удобрений."
                                                            : "Free consultation on the use of fertilizers. A wide range of fertilizers."
                                                }
                                            </li>
                                        </ul>
                                    </div>
                                ) : category == "a5" ? (
                                    <div className={styles.service_info_block}>
                                        <h1>
                                            {lang == 'am' ? "Վերատնկում" :
                                                lang == 'ru' ? "Пересадка" : "Replanting"}
                                        </h1>
                                        <ul className={styles.ul}>
                                            <li>
                                                {lang == 'am' ?
                                                    "Մինչև 0,5լ․ ծաղկաման, վերատնկման արժեքը 200 դրամ" :
                                                    lang == 'ru' ?
                                                        "До 0,5 л ․ ваза, стоимость пересадки 200 драм"
                                                        :
                                                        "Up to 0.5 l ․ vase, the cost of replanting is 200 AMD"}
                                            </li>
                                            <li>
                                                {lang == "am" ?
                                                    "1լ-ից 5լ․ ծաղկաման, վերատնկման արժեքը 500 դրամ"
                                                    : lang == "ru" ?
                                                        "от 1л до 5л ․ ваза, стоимость пересадки 500 драм"
                                                        :
                                                        "1l to 5l ․ vase, the cost of replanting is 500 AMD"}
                                            </li>
                                            <li>
                                                {lang == 'am' ? "5լ-ից 10լ․ ծաղկաման, վերատնկման արժեքը 1000 դրամ"
                                                    : lang == 'ru' ?
                                                        'от 5 л до 10 л ․ Ваза, пересадка стоимость 1000 драм'
                                                        : '5l to 10l ․ Vase, replanting cost 1000 AMD'}
                                            </li>
                                            <li>

                                                {lang == 'am' ? "10 լիտրից ավել ծաղկամանի վերատնկման արժեքը 1200 դրամ"
                                                    : lang == 'ru' ?
                                                        'Стоимость пересадки вазы более 10 литров 1200 драм.'
                                                        : 'The cost of replanting a vase of more than 10 liters is 1200 AMD'}
                                            </li>
                                        </ul>
                                    </div>
                                ) : null}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className={styles.sitinameSectiion}>
                <Container>
                    <Row>
                        <h4 className={styles.title_deliver}>Առաքում</h4>
                        <Col sm={12} md={6} lg={6}>
                            <div className={styles.citi_block}>
                                <Arrow
                                    className={toggle ? styles.active_arrow : styles.arrow}
                                />
                                <select
                                    name=""
                                    id=""
                                    onChange={handlerChange}
                                    onClick={changeToggle}
                                >
                                    {servicesData?.map((i) => {
                                        return (
                                            <option value={i.city_am} key={i.id}>
                                                {lang == 'am' ? i.city_am : lang == 'ru' ? i.city_ru : i.city_am}
                                            </option>
                                        );
                                    })
                                    }
                                </select>
                            </div>
                        </Col>
                        <Col sm={12} md={6} lg={3}>
                            <div className={styles.displayPrice}>
                                {x?.map((i) => {
                                    return (
                                        <p key={i.id} className={styles.price_deliver}>
                                            {i.price_small}
                                            <span>
                                                {lang == 'am' ? 'Փոքր' : lang == 'ru' ? "Маленький" : "Small"}
                                            </span>
                                        </p>
                                    );
                                })
                                }
                                {x?.map((i) => {
                                    return (
                                        <p key={i.id} className={styles.price_deliver}>
                                            {i.price_big}
                                            <span>
                                                {lang == 'am' ? 'Մեծ' : lang == 'ru' ? 'Большой' : 'Big'}
                                            </span>
                                        </p>
                                    );
                                })
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default ServicesContaner;

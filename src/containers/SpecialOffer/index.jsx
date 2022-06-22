import React, {useEffect, useState} from "react";
import styles from "./Offer.module.css";
import {Container, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Spec_Offer} from "../../redux/actions/SpecialOfferAction";
import {useRouter} from "next/router";
import Date from "../../svg/date.svg";
import {NextLink} from "../../components";
import {offer_get} from "../../redux/actions/offer.action";
import Link from "next/link";

const OfferContainer = () => {

    const offerMain = useSelector(state => state.offerReducer.offerData);

    const [itemId, setItemId] = useState(undefined);
    const router = useRouter();

    const [lang, setLang] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        setLang(localStorage.getItem("language"))
    })

    useEffect(() => {
        dispatch(Spec_Offer());
        dispatch(offer_get());
    }, []);

    const GET_OFFER_ITEMS = useSelector(
        (state) => state.SPECIAL_OFFER_REDUCER.offer_items
    );
    const LEARN_MORE_HANDLER = (id) => {
        setItemId(
            offerMain?.filter((i) => {
                return i.id == id;
            })
        );
    };

    const idClear = () => {
        setItemId(undefined)
    }


    const SHOW_OFFER_ITEMS = offerMain?.map((i) => {
        return (
            <Col sm={12} md={6} lg={6} key={i.id}>
                <div className={styles.offer_big_block}>
                    <Row>
                        <Col sm={12} md={6} lg={5}>
                            <div className={styles.offer_img_block}>
                                <img src={i.image} alt=""/>
                            </div>
                        </Col>
                        <Col sm={12} md={6} lg={7}>
                            <div className={styles.offer_text_block}>
                                <h2>{lang == "am" ? i.title_am : lang == "ru" ? i.title_ru : i.title_en}</h2>
                                <div className={styles.date_block}>
                                    <Date/>
                                    <p>{i.created_at.substring(0, 10)}</p>
                                </div>
                                <button onClick={() => LEARN_MORE_HANDLER(i.id)}>

                                        {lang == "am" ? "Տեսնել ավելին" : lang == "ru" ? "Узнать больше" : "See more"}

                                </button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Col>
        );
    });


    return (
        <>
            <section
                style={{
                    backgroundImage: `url("../assets/about1.png")`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    marginTop: "1rem",
                    height: "15rem",
                    width: "100%",
                }}
            >
                <Container>
                    <div className={styles.title}>
                        <h1>{lang == 'am' ? "Հատուկ առաջարկներ" : lang == 'ru' ? "Специальные предложения" : "Special offers"}</h1>
                    </div>
                </Container>
            </section>
            {itemId == undefined ? (
                <section className={styles.second_section}>
                    <Container>
                        <Row>{SHOW_OFFER_ITEMS}</Row>
                    </Container>
                </section>
            ) : (
                <section className={styles.desc_section}>
                    <Container>
                        {itemId?.map((i) => {
                            return (
                                <div key={i.id}>
                                    <div className={styles.info_item_name}>
                                        <h2>{lang == "am" ? i.title_am : lang == "ru" ? i.title_ru : i.title_en}</h2>
                                        <div className={styles.date_blocks}>
                                            <Date/>
                                            <p>{i.created_at.substring(0, 10)}</p>
                                        </div>
                                    </div>
                                    <div className={styles.information_block}>
                                        <p>{lang == "am" ? i.text_am : lang == "ru" ? i.text_ru : i.text_en}</p>
                                    </div>
                                    <NextLink to={"/product/" + i.id}>
                                        <button
                                            className={styles.by}>{lang == "am" ? "Գնել" : lang == "ru" ? "Купить" : "Buy"}</button>
                                    </NextLink>
                                    <button className={styles.by2} onClick={idClear}>
                                        {lang == "am" ? "Հետ քայլ" : lang == "ru" ? "Шаг назад" : "Step back"}
                                    </button>
                                </div>
                            );
                        })}
                    </Container>
                </section>
            )}
        </>
    );
};

export default OfferContainer;

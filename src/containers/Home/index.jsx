import React, {useState, useEffect} from "react";
import styles from "./Home.module.css";
import {homeBanner} from "../../redux/actions/HomeSliderBannerAction";
import {buyserGet} from "../../redux/actions/product.acion";
import {HOMESLAE} from "../../redux/actions/BestSaleAction";
import {useSelector, useDispatch} from "react-redux";
import {Container, Row, Col} from "react-bootstrap";
import {SliderAll} from "../../components";
import {NextLink} from "../../components";
import settings from "./slider";
import setts from "./slide2";
import {home_get, home_get_slider} from "../../redux/actions/home.action";
import axios from "axios";
import Swal from 'sweetalert2';
import {about_get_data} from "../../redux/actions/about.action";
import css from "../Product/product.module.css";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

const HomeContianer = () => {

    const homeMain = useSelector(state => state.homeReducer.homeData);
    const homeMainSlider = useSelector(state => state.homeReducer.homeSlider);
    const about_main = useSelector(state => state.aboutReducer.aboutData);

    const [name, setName] = useState("Ամբողջ Տեսականի");

    const [lang, setLang] = useState()

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(homeBanner());
        dispatch(HOMESLAE());
        dispatch(home_get());
        dispatch(home_get_slider());
        dispatch(about_get_data())
        setLang(localStorage.getItem("language"))
        setTimeout(() => {
            axios.get('https://abionew.herokuapp.com/api/home')
                .then(function (response) {
                    response?.data?.data?.slider?.map((item) => {
                        return (
                            Swal.fire({
                                // title: 'Sweet!',
                                // text: 'Modal with a custom image.',
                                imageUrl: `${item?.image}`,
                                imageWidth: 400,
                                imageHeight: 200,
                                imageAlt: 'Custom image',
                            })
                        )
                    })
                })
                .catch(function (error) {
                    console.log(error);
                })
        }, 5000)

    }, [0]);


    const NameCategori = (id) => {
        setName(name);
    };

    const BEST_SALE_ITEMS = useSelector((state) => state.HOME_BEST_SALE.BestSale);
    const currency = useSelector(state => state.homeReducer.currencyData);
    const many = useSelector(state => state.homeReducer.many);

    let xx = BEST_SALE_ITEMS[0]?.map((item) => {
        return (
            {
                idMain: item.id,
                price: item.sale_ht == 0 && item.discount == 0 ? item.price :
                    item.sale_ht !== 0 ? item.price - item.price * item.sale_ht / 100 :
                        item.price - item.price * item.discount / 100
            }
        )
    })

    const BANNER_IMAGES = homeMainSlider?.map((i) => {
        return (
            <div key={i.id} className={styles.banner_block}>
                <img src={i.image} alt="img"/>
            </div>
        );
    });


    return (
        <>
            <section className={styles.firs_section}>
                <Container>
                    <Row>
                        <Col sm={12} md={3} lg={3}>
                            <div className={styles.categorys_block}>
                                <ul className={styles.categorys}>
                                    <NextLink to="/product">
                                        <li className={styles.first_item}>
                                            {lang == 'am' ? "Ամբողջ տեսականի" : lang == 'ru' ? "Вся теория" : "The whole theory"}
                                        </li>
                                    </NextLink>
                                    {
                                        homeMain?.map((item) => {
                                            return (
                                                <NextLink key={item.id} to={"/product/category/" + item.id}>
                                                    <li onClick={() => NameCategori(item.id)}>
                                                        {lang == "am" ? item.name_am : lang == "ru" ? item.name_ru : item.name_en}
                                                    </li>
                                                </NextLink>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </Col>
                        <Col sm={12} md={9} lg={9}>
                            <div>
                                <SliderAll settings={settings} BANNER_IMAGES={BANNER_IMAGES}/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section>
                <Container>
                    <h1 className={styles.title}>{lang == 'en' ? "Best Selling" : lang == 'ru' ? "Лучшие продажи" : "Լավագույն Վաճառք"}</h1>

                    <Row>
                        <div className={css.sliderDivs}>
                            <Slider {...setts}>
                                {
                                    BEST_SALE_ITEMS[0]?.map((i) => {
                                        return (
                                            <div key={i.id} className={styles.best_sale_box}>
                                                <Link href={"/product/" + i.id}>
                                                    <div>
                                                        <div className={css.images}>
                                                            {i.image_one !== null ?
                                                                <img src={i.image_one} alt=""/> : null}
                                                            {i.image_two !== null ?
                                                                <img src={i.image_two} alt=""/> : null}
                                                        </div>
                                                        <div className={styles.sal_img_blco}>
                                                            <img src={i.image} alt="ll"/>
                                                        </div>
                                                        <div className={styles.sale_info_block}>
                                                            <h4>{lang == 'en' ? i.name_am : lang == 'ru' ? i.name_ru : i.name_am}</h4>
                                                            <h5>
                                                                {
                                                                    i.sale_ht !== 0 || i.discount !== 0 ?
                                                                        <span
                                                                            className={css.saleSpan}>{currency !== null ? (i.price / currency).toFixed(2) : i.price + " " + many} </span> : null
                                                                }</h5>
                                                            <h5>
                                                                {
                                                                    i.sale_ht == 0 && i.discount == 0 ?
                                                                        <span>{i.price}</span> : xx?.map((item) => {
                                                                            return item.idMain == i.id && (currency !== null ? (item.price / currency).toFixed(2) : item.price)

                                                                        })
                                                                }
                                                                {" " + many}</h5>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        );
                                    })
                                }
                            </Slider>
                        </div>
                    </Row>
                </Container>
            </section>
            <section className={styles.second_section}>
                <Container>
                    <Row>
                        <Col sm={12} md={6} lg={6} className={styles.col}>
                            <div className={styles.aboutIMg_block}>
                                <img src={about_main?.about_one?.image} alt="img"/>
                            </div>
                        </Col>
                        <Col sm={12} md={6} lg={6}>
                            <div className={styles.about_big_block}>
                                <div className={styles.about_info_block}>
                                    <h2>{lang == "am" ? about_main?.about_one?.title_am : lang == "ru" ? about_main?.about_one?.title_ru : about_main?.about_one?.title_en}</h2>
                                    <p>
                                        {lang == "am" ? about_main?.about_one?.description_am : lang == "ru" ? about_main?.about_one?.description_en : about_main?.about_one?.description_ru}
                                    </p>
                                    <NextLink to="/about" className={styles.learn_more}>
                                        {lang == "am" ? "Իմանալ Ավելին" : lang == "ru" ? "Узнать больше" : "Know more"}
                                    </NextLink>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className={styles.second_section}>
                <Container>
                    <Row>
                        <Col sm={12} md={6} lg={6}>
                            <div className={styles.about_big_block1}>
                                <div className={styles.about_info_block}>
                                    <h2>
                                        {
                                            lang == "am" ? about_main?.about_two?.title_am
                                                : lang == "ru" ? about_main?.about_two?.title_ru
                                                    : about_main?.about_two?.title_en
                                        }
                                    </h2>
                                    <p>
                                        {
                                            lang == "am" ? about_main?.about_two?.description_am
                                                : lang == "ru" ? about_main?.about_two?.description_ru
                                                    : about_main?.about_two?.description_ru
                                        }
                                    </p>
                                    <div className={styles.about_info_2}>
                                        <Row>
                                            <Col sm={12} md={12} lg={4}>
                                                <div className={styles.item_info}>
                                                    <h5>27</h5>
                                                    <p>
                                                        {lang == "am" ? "Տարվա պատմություն" : lang == "ru" ? "История года" : "History of the year"}
                                                    </p>
                                                </div>
                                            </Col>
                                            <Col sm={12} md={12} lg={4}>
                                                <div className={styles.item_info}>
                                                    <h5>500․000+</h5>
                                                    <p>
                                                        {
                                                            lang == "am" ?
                                                                "Երջանիկ գնորդ"
                                                                : lang == "ru" ?
                                                                    "Счастливый покупатель"
                                                                    : "Happy buyer"
                                                        }
                                                    </p>
                                                </div>
                                            </Col>
                                            <Col sm={12} md={12} lg={4}>
                                                <div className={styles.item_info}>
                                                    <h5>5000+</h5>
                                                    <p>
                                                        {
                                                            lang == "am" ? "Երջանիկ գնորդ"
                                                                : lang == "ru" ? "Кв. м. коммерческая площадь"
                                                                    : "Sq. M. commercial area"
                                                        }
                                                    </p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col sm={12} md={6} lg={6} className={styles.col}>
                            <div className={styles.aboutIMg_block}>
                                <img src={about_main?.about_two?.image} alt="img"/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default HomeContianer;

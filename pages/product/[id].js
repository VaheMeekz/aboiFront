import React, {useState, useEffect} from "react";
import {HelmetLayout} from "../../src/layouts";
import {useRouter} from "next/router";
import {Col, Container, Row, Button} from "react-bootstrap";
import css from "./productDetail.module.css";
import Play from "../../src/svg/play.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Arrow from "../../src/svg/prevArrow.svg";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {useCart} from "react-use-cart";
import Swal from "sweetalert2";
import {Modal1} from "../../src/components";
import {NextLink} from "../../src/components";
import {suggestions_get} from "../../src/redux/actions/suggestions.action";
import {detail_get} from "../../src/redux/actions/detail.action";

const NextArrow = (props) => {
    const {onClick} = props;
    return (
        <div className={css.nextArrow} onClick={onClick}>
            <Arrow className={css.slide_arrow}/>
        </div>
    );
};

const PrevArrow = (props) => {
    const {onClick} = props;
    return (
        <div className={css.prevArrow} onClick={onClick}>
            <Arrow className={css.slide_arrow}/>
        </div>
    );
};


const ProductDetail = () => {

    const {items, addItem} = useCart();

    const showSwal = () => {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
        });
    };

    const byProduct = (item, quantity) => {
        addItem(item, quantity);
        showSwal();
    };

    const [modalShow, setModalShow] = React.useState(false);

    const [valedata, setValueData] = useState("");
    const [countPrice, setCountPrice] = useState();

    const [timeData, steTimeData] = useState("");

    const [lang, setLang] = useState()

    useEffect(() => {
        setLang(localStorage.getItem("language"))
    },)

    const router = useRouter();

    const prodId = router.query.id;

    useEffect(() => {
        if (prodId) {
            dispatch(detail_get(prodId))
        }
        if (categoryId) {
            dispatch(suggestions_get(categoryId))
        }
    }, [prodId, categoryId])

    const detailData = useSelector(state => state.detailReducer.data, shallowEqual);
    const suggestionsData = useSelector(state => state.SuggestionsReducer.suggestionsData, shallowEqual);
    const currency = useSelector(state => state.homeReducer.currencyData);
    const many = useSelector(state => state.homeReducer.many);

    const categoryId = detailData?.map((item) => item.category_id)[0];

    const fillter = detailData?.filter((i) => {
        return prodId == i.id;
    });

    const pricee = fillter.map((item) => {
        return item.sale_ht == 0 && item.discount == 0 ? item.price :
            item.sale_ht !== 0 ? item.price - item.price * item.sale_ht / 100 :
                item.price - item.price * item.discount / 100;
    });

    const dispatch = useDispatch();

    const priceJoin = Number(pricee[0]);

    const [count, setCount] = useState(1);

    useEffect(() => {
        setCountPrice(priceJoin);
    }, [priceJoin]);

    const handlerCountUp = () => {
        setCountPrice(countPrice + priceJoin);
        setCount(count + 1);
    };

    const handlerCountDown = () => {
        setCount(count - 1);
        setCountPrice(countPrice - priceJoin);
    };

    let quantity = items.map((i) => {
        return Number(i.quantity);
    });

    let salePrice = suggestionsData?.map((item) => {
        return (
            {
                idMain: item.id,
                price: item.sale_ht == 0 && item.discount == 0 ? item.price :
                    item.sale_ht !== 0 ? item.price - item.price * item.sale_ht / 100 :
                        item.price - item.price * item.discount / 100
            }
        )
    })

    let mm = fillter?.map((i) => {
        return (
            salePrice?.map((item) => {
                return item.idMain == i.id && (currency !== null ? (item.price / currency).toFixed(2) : item.price)

            })
        )
    })


    const completeData = fillter.map((data) => ({
        id: data.id,
        time: timeData,
        day: valedata,
        count: count,
        productPrice: countPrice,
        price: mm[0]?.filter((item) => item !== false)[0],
        name: lang == 'am' ? data.name_am : lang == 'ru' ? data.name_ru : data.name_en,
        image: data.image,
        size: data.size
    }));

    return (
        <div>
            <HelmetLayout title="details">
                <div>
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col className="mt-5 mb-5" lg={6} md={6} xs={12}>
                                {fillter &&
                                    fillter.map((i) => {
                                        return (
                                            <>
                                                <div className={css.detailImg} key={i.id}>
                                                    <img src={i.image} alt="image"/>
                                                </div>
                                                <div className={css.poster_block}>
                                                    <Button onClick={() => setModalShow(true)}>
                                                        <Play className={css.playIcone}/>
                                                        <img
                                                            src={`https://img.youtube.com/vi/${i.video}/0.jpg`}
                                                            className={css.poster}
                                                        />
                                                    </Button>
                                                    <Modal1 video={i.video}
                                                        show={modalShow}
                                                        onHide={() => setModalShow(false)}
                                                    />
                                                </div>
                                            </>
                                        );
                                    })}
                            </Col>
                            <Col lg={6} md={6} xs={12}>
                                <div className={css.mainProDetail}>
                                    <div className={css.mainProDetailTwo}>
                                        {fillter &&
                                            fillter.map((i) => {
                                                return (
                                                    <div className={css.ProductNamePrice} key={i.id}>
                                                        <h5>{lang == 'am' ? i.name_am : lang == 'ru' ? i.name_ru : i.name_en}</h5>
                                                    </div>
                                                );
                                            })}
                                        {
                                            fillter?.map((item) => {
                                                return (
                                                    <div className={css.model}>
                                                        <h5>{lang == 'am' ? "Կոդ" : lang == 'ru' ? "Код" : "Code"} ։</h5>
                                                        <p>{item.code}</p>
                                                    </div>
                                                )
                                            })
                                        }

                                        <div className={css.count}>
                                            <h5>
                                                {lang == "am" ? "Քանակը" : lang == "ru" ? "Считать" : "Count"}
                                            </h5>
                                            <div className={css.countFlex}>
                                                {count <= 1 ? (
                                                    <span>-</span>
                                                ) : (
                                                    <span onClick={handlerCountDown}>-</span>
                                                )}
                                                <h5>{count}</h5>
                                                <span onClick={handlerCountUp}>+</span>
                                            </div>

                                            <div className={css.price}>
                                                <p>
                                                    {(currency !== null ? (countPrice / currency).toFixed(2) : countPrice)}
                                                    {" " + many}
                                                </p>
                                            </div>
                                        </div>

                                        <div className={css.basketBtn}>
                                            {completeData &&
                                                completeData.map((item) => {
                                                    return (
                                                        <button
                                                            onClick={() =>
                                                                byProduct(item, (quantity = count))
                                                            }
                                                            key={item.id}
                                                        >
                                                            {lang == 'am' ? "Ավելացնել զամբյուղում" : lang == 'ru' ? "Добавить в корзину" : "Add to cart"}
                                                        </button>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={12} md={12} xs={12}>
                                <div>
                                    <div className={css.mainData}>
                                        <h4>
                                            {lang == 'am' ? "Նկարագրություն" : lang == 'ru' ? "Описание" : "Description"}
                                        </h4>
                                    </div>
                                    <div className={css.proData}>
                                        {fillter?.map((item) => {
                                            return (
                                                <p>
                                                    {lang == 'am' ? item.text_am : lang == 'ru' ? item.text_ru : item.text_en}
                                                </p>
                                            )
                                        })}
                                    </div>
                                </div>
                            </Col>
                            <Col lg={12} md={12} xs={12} className="mt-5">
                                <div>
                                    <h4>
                                        {lang == 'am' ? 'Առաջարկներ' : lang == 'ru' ? 'Предложения' : 'Suggestions'}
                                    </h4>
                                    <Row>
                                        {suggestionsData
                                            ? suggestionsData.slice(0, 4).map((i) => {
                                                return (
                                                    <Col sm={12} md={6} lg={3} className='m-5'>
                                                        <NextLink exact to={"/product/" + i.id} className={css.mainLink}>
                                                            <div className={css.sliderProduct} key={i.id}>
                                                                <img
                                                                    className={css.sliderMainImg}
                                                                    src={i.image}
                                                                    alt=""
                                                                />
                                                                <p>{lang == 'am' ? i.name_am : lang == 'ru' ? i.name_ru : i.name_en}</p>
                                                                <h5>
                                                                    {
                                                                        i.sale_ht !== 0 || i.discount !== 0 ?
                                                                            <span
                                                                                className={css.saleSpan}>{currency !== null ? (i.price / currency).toFixed(2) + " " + many : i.price + " " + many} </span> : null
                                                                    }
                                                                </h5>
                                                                <h5>
                                                                    {
                                                                        i.sale_ht == 0 && i.discount == 0 ?
                                                                            <span>{i.price}</span> : salePrice?.map((item) => {
                                                                                return item.idMain == i.id && (currency !== null ? (item.price / currency).toFixed(2) : item.price)

                                                                            })
                                                                    }
                                                                    {" " + many}
                                                                </h5>
                                                            </div>
                                                        </NextLink>
                                                    </Col>
                                                );
                                            })
                                            : null}
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </HelmetLayout>
        </div>
    );
};

export default ProductDetail;

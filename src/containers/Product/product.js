import React, {useEffect, useState} from "react";
import css from "./product.module.css";
import {Accordion, Col, Container, Row, Form} from "react-bootstrap";
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import { buyserGet} from "../../redux/actions/product.acion";
import Link from "next/link";
import {useRouter} from "next/router";
import {NextLink} from "../../components";
import Home from "../../svg/homik.svg";

const ProductContainer = ({productsMain, productPage}) => {

    const category = useSelector(state => state.buyserReducer.category, shallowEqual);
    const currency = useSelector(state => state.homeReducer.currencyData, shallowEqual);
    const many = useSelector(state => state.homeReducer.many, shallowEqual);
    const searchDataMain = useSelector(state => state.buyserReducer.searchData, shallowEqual);

    const [pageItem, setpageItem] = useState(1);

    let res = [...Array(productPage?.last_page)];

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(buyserGet(null, pageItem));
    }, [pageItem]);

    const [name, setName] = useState("Ամբողջ Տեսականի");

    const [sortData, setSortData] = useState("Հիմնական");

    const [lang, setLang] = useState();

    useEffect(() => {
        setLang(localStorage.getItem("language"))
        dispatch(buyserGet())
    }, []);

    const getName = (name) => {
        setName(name);
        dispatch(buyserGet(name));
    };

    const addSelect = (e) => {
        setSortData(e.target.value);
    }

    let x = productsMain?.map((item) => {
        return (
            {
                idMain: item.id,
                price: item.sale_ht == 0 && item.discount == 0 ? item.price :
                    item.sale_ht !== 0 ? item.price - item.price * item.sale_ht / 100 :
                        item.price - item.price * item.discount / 100
            }
        )
    })
    let searchXX = searchDataMain?.map((item) => {
        return (
            {
                idMain: item.id,
                price: item.sale_ht == 0 && item.discount == 0 ? item.price :
                    item.sale_ht !== 0 ? item.price - item.price * item.sale_ht / 100 :
                        item.price - item.price * item.discount / 100
            }
        )
    })


    return (
        <div>
            <div className={css.productBg}>
                <h2>
                    {lang == 'am' ? "Բույսեր" : lang == 'ru' ? "Растения" : "Plants"}
                </h2>
            </div>
            <Container>
                <Row>
                    <Col lg={12} md={9} xs={12}>
                        <div>
                            <div className={css.selectDiv}>
                                <h6 className={css.bread_path}>
                                    <NextLink exact to="/">
                    <span>
                      <Home/>
                    </span>
                                    </NextLink>
                                    <span
                                        onClick={() => getName("Ամբողջ Տեսականի")}
                                        className={css.item}
                                    >
                    {lang == 'am' ? "Տեսականի" : lang == 'ru' ? "Ассортимент" : "Assortment"}/
                  </span>
                                    <span className={css.item}>
                        {
                            lang == 'am' ? category?.name_am : lang == 'ru' ? category?.name_ru : category?.name_en
                        }

                    </span>
                                </h6>

                                <div>
                                    <Form.Select
                                        onChange={addSelect}
                                        aria-label="Default select example"
                                    >
                                        <option value="Հիմնական" name="All">
                                            {lang == "am" ? "Հիմնական" : lang == "ru" ? "Базовый" : "Basic"}
                                        </option>
                                        <option value="Անուն(A - Z)" name="minMax">
                                            {lang == 'am' ? "Անուն(A - Z)" : lang == 'ru' ? "Имя (А - Я)" : "Name (A - Z)"}
                                        </option>
                                        <option value="Անուն(Z - A)" name="maxMin">
                                            {lang == "am" ? "Անուն(Z - A)" : lang == 'ru' ? "Имя (Я - А)" : "Name (Z - A)"}
                                        </option>
                                        <option value="Գին(Ցածր Բարձր)" name="minPrice">
                                            {lang == "am" ? "Գին(Ցածր Բարձր)" : lang == 'ru' ? "Цена (Низкая Высокая)" : "Price (Low High)"}
                                        </option>
                                        <option value="Գին(Բարձր Ցածր)" name="maxPrice">
                                            {lang == "am" ? "Գին(Բարձր Ցածր)" : lang == 'ru' ? "Цена (Высокая Низкая)" : "Price (High Low)"}
                                        </option>
                                    </Form.Select>
                                </div>
                            </div>

                            <div className={css.divProductMain}>
                                <Row>
                                    {productsMain?.length > 0 ?
                                        sortData == "Անուն(A - Z)" ?
                                            productsMain?.sort(function (a, b) {
                                                let x = a.name_am ? a.name_am.toLowerCase() :
                                                    a.name_ru ? a.name_ru.toLowerCase() :
                                                        a.name_en ? a.name_en.toLowerCase() :
                                                            null;
                                                let y = b.name_am ? b.name_am.toLowerCase() :
                                                    b.name_ru ? b.name_ru.toLowerCase() :
                                                        b.name_en ? b.name_en.toLowerCase() :
                                                            null;
                                                if (x < y) {
                                                    return -1;
                                                }
                                                if (x > y) {
                                                    return 1;
                                                }
                                                return 0;
                                            }).map((i) => {
                                                return (
                                                    <Col sm={12} md={6} lg={4} key={i.id} mb={5}>
                                                        <Link href={"/product/" + i.id}>
                                                            <div className={css.divProduct}>
                                                                <div className={css.images}>
                                                                    {i.image_one !== null ?
                                                                        <img src={i.image_one} alt=""/> : null}
                                                                    {i.image_two !== null ?
                                                                        <img src={i.image_two} alt=""/> : null}
                                                                </div>
                                                                <div className={css.img_box}>
                                                                    <img src={i.image} alt=""/>
                                                                </div>
                                                                <p>
                                                                    {
                                                                        i.sale_ht !== 0 || i.discount !== 0 ?
                                                                            <span
                                                                                className={css.saleSpan}>{currency !== null ? (i.price / currency).toFixed(2) + " " + many : i.price + " " + many} </span> : null
                                                                    }
                                                                </p>
                                                                <p>
                                                                    {
                                                                        i.sale_ht == 0 && i.discount == 0 ?
                                                                            <span>{i.price}</span> : x?.map((item) => {
                                                                                return item.idMain == i.id && (currency !== null ? (item.price / currency).toFixed(2) : item.price)

                                                                            })
                                                                    }
                                                                    {" " + many}</p>
                                                                <h4>{lang == "am" ? i.name_am : lang == 'ru' ? i.name_ru : i.name_en}</h4>
                                                            </div>
                                                        </Link>
                                                    </Col>
                                                );
                                            })
                                            : sortData == "Անուն(Z - A)" ?
                                                productsMain?.sort(function (a, b) {
                                                    let x = a.name_am ? a.name_am.toLowerCase() :
                                                        a.name_ru ? a.name_ru.toLowerCase() :
                                                            a.name_en ? a.name_en.toLowerCase() :
                                                                null;
                                                    let y = b.name_am ? b.name_am.toLowerCase() :
                                                        b.name_ru ? b.name_ru.toLowerCase() :
                                                            b.name_en ? b.name_en.toLowerCase() :
                                                                null;
                                                    if (y < x) {
                                                        return -1;
                                                    }
                                                    if (y > x) {
                                                        return 1;
                                                    }
                                                    return 0;
                                                }).map((i) => {
                                                    return (
                                                        <Col sm={12} md={6} lg={4} key={i.id} mb={5}>
                                                            <Link href={"/product/" + i.id}>
                                                                <div className={css.divProduct}>
                                                                    <div className={css.images}>
                                                                        {i.image_one !== null ?
                                                                            <img src={i.image_one} alt=""/> : null}
                                                                        {i.image_two !== null ?
                                                                            <img src={i.image_two} alt=""/> : null}
                                                                    </div>
                                                                    <div className={css.img_box}>
                                                                        <img src={i.image} alt=""/>
                                                                    </div>
                                                                    <p>
                                                                        {
                                                                            i.sale_ht !== 0 || i.discount !== 0 ?
                                                                                <span
                                                                                    className={css.saleSpan}>{currency !== null ? (i.price / currency).toFixed(2) + " " + many : i.price + " " + many} </span> : null
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        {
                                                                            i.sale_ht == 0 && i.discount == 0 ?
                                                                                <span>{i.price}</span> : x?.map((item) => {
                                                                                    return item.idMain == i.id && (currency !== null ? (item.price / currency).toFixed(2) : item.price)

                                                                                })
                                                                        }
                                                                        {" " + many}</p>
                                                                    <h4>{lang == "am" ? i.name_am : lang == 'ru' ? i.name_ru : i.name_en}</h4>
                                                                </div>
                                                            </Link>
                                                        </Col>
                                                    );
                                                })
                                                :
                                                sortData == "Գին(Ցածր Բարձր)" ?
                                                    productsMain?.sort(function (a, b) {
                                                        return a.price - b.price;
                                                    }).map((i) => {
                                                        return (
                                                            <Col sm={12} md={6} lg={4} key={i.id} mb={5}>
                                                                <Link href={"/product/" + i.id}>
                                                                    <div className={css.divProduct}>
                                                                        <div className={css.images}>
                                                                            {i.image_one !== null ?
                                                                                <img src={i.image_one} alt=""/> : null}
                                                                            {i.image_two !== null ?
                                                                                <img src={i.image_two} alt=""/> : null}
                                                                        </div>
                                                                        <div className={css.img_box}>
                                                                            <img src={i.image} alt=""/>
                                                                        </div>
                                                                        <p>
                                                                            {
                                                                                i.sale_ht !== 0 || i.discount !== 0 ?
                                                                                    <span
                                                                                        className={css.saleSpan}>{currency !== null ? (i.price / currency).toFixed(2) + " " + many : i.price + " " + many} </span> : null
                                                                            }
                                                                        </p>
                                                                        <p>
                                                                            {
                                                                                i.sale_ht == 0 && i.discount == 0 ?
                                                                                    <span>{i.price}</span> : x?.map((item) => {
                                                                                        return item.idMain == i.id && (currency !== null ? (item.price / currency).toFixed(2) : item.price)

                                                                                    })
                                                                            }
                                                                            {" " + many}</p>
                                                                        <h4>{lang == "am" ? i.name_am : lang == 'ru' ? i.name_ru : i.name_en}</h4>
                                                                    </div>
                                                                </Link>
                                                            </Col>
                                                        );
                                                    })
                                                    : sortData == "Գին(Բարձր Ցածր)" ?
                                                        productsMain?.sort(function (a, b) {
                                                            return b.price - a.price;
                                                        }).map((i) => {
                                                            return (
                                                                <Col sm={12} md={6} lg={4} key={i.id} mb={5}>
                                                                    <Link href={"/product/" + i.id}>
                                                                        <div className={css.divProduct}>
                                                                            <div className={css.images}>
                                                                                {i.image_one !== null ?
                                                                                    <img src={i.image_one} alt=""/> : null}
                                                                                {i.image_two !== null ?
                                                                                    <img src={i.image_two} alt=""/> : null}
                                                                            </div>
                                                                            <div className={css.img_box}>
                                                                                <img src={i.image} alt=""/>
                                                                            </div>
                                                                            <p>
                                                                                {
                                                                                    i.sale_ht !== 0 || i.discount !== 0 ?
                                                                                        <span
                                                                                            className={css.saleSpan}>{currency !== null ? (i.price / currency).toFixed(2) + " " + many : i.price + " " + many} </span> : null
                                                                                }
                                                                            </p>
                                                                            <p>
                                                                                {
                                                                                    i.sale_ht == 0 && i.discount == 0 ?
                                                                                        <span>{i.price}</span> : x?.map((item) => {
                                                                                            return item.idMain == i.id && (currency !== null ? (item.price / currency).toFixed(2) : item.price)

                                                                                        })
                                                                                }
                                                                                {" " + many}</p>
                                                                            <h4>{lang == "am" ? i.name_am : lang == 'ru' ? i.name_ru : i.name_en}</h4>
                                                                        </div>
                                                                    </Link>
                                                                </Col>
                                                            );
                                                        })
                                                        : sortData == "Հիմնական" ?
                                                            productsMain?.sort(function (a, b) {
                                                                return a.id - b.id;
                                                            }).map((i) => {
                                                                return (
                                                                    <Col sm={12} md={6} lg={4} key={i.id} mb={5}>
                                                                        <Link href={"/product/" + i.id}>
                                                                            <div className={css.divProduct}>
                                                                                <div className={css.images}>
                                                                                    {i.image_one !== null ?
                                                                                        <img src={i.image_one} alt=""/> : null}
                                                                                    {i.image_two !== null ?
                                                                                        <img src={i.image_two} alt=""/> : null}
                                                                                </div>
                                                                                <div className={css.img_box}>
                                                                                    <img src={i.image} alt=""/>
                                                                                </div>
                                                                                <p>
                                                                                    {
                                                                                        i.sale_ht !== 0 || i.discount !== 0 ?
                                                                                            <span
                                                                                                className={css.saleSpan}>{currency !== null ? (i.price / currency).toFixed(2) + " " + many : i.price + " " + many} </span> : null
                                                                                    }
                                                                                </p>
                                                                                <p>
                                                                                    {
                                                                                        i.sale_ht == 0 && i.discount == 0 ?
                                                                                            <span>{i.price}</span> : x?.map((item) => {
                                                                                                return item.idMain == i.id && (currency !== null ? (item.price / currency).toFixed(2) : item.price)

                                                                                            })
                                                                                    }
                                                                                    {" " + many}</p>
                                                                                <h4>{lang == "am" ? i.name_am : lang == 'ru' ? i.name_ru : i.name_en}</h4>
                                                                            </div>
                                                                        </Link>
                                                                    </Col>
                                                                );
                                                            })
                                                            : productsMain?.sort(function (a, b) {
                                                                return a.id - b.id;
                                                            }).map((i) => {
                                                                return (
                                                                    <Col sm={12} md={6} lg={4} key={i.id} mb={5}>
                                                                        <Link href={"/product/" + i.id}>
                                                                            <div className={css.divProduct}>
                                                                                <div className={css.images}>
                                                                                    {i.image_one !== null ?
                                                                                        <img src={i.image_one} alt=""/> : null}
                                                                                    {i.image_two !== null ?
                                                                                        <img src={i.image_two} alt=""/> : null}
                                                                                </div>
                                                                                <div className={css.img_box}>
                                                                                    <img src={i.image} alt=""/>
                                                                                </div>
                                                                                <p>
                                                                                    {
                                                                                        i.sale_ht !== 0 || i.discount !== 0 ?
                                                                                            <span
                                                                                                className={css.saleSpan}>{currency !== null ? (i.price / currency).toFixed(2) + " " + many : i.price + " " + many} </span> : null
                                                                                    }
                                                                                </p>
                                                                                <p>
                                                                                    {
                                                                                        i.sale_ht == 0 && i.discount == 0 ?
                                                                                            <span>{i.price}</span> : x?.map((item) => {
                                                                                                return item.idMain == i.id && (currency !== null ? (item.price / currency).toFixed(2) : item.price)

                                                                                            })
                                                                                    }
                                                                                    {" " + many}</p>
                                                                                <h4>{lang == "am" ? i.name_am : lang == 'ru' ? i.name_ru : i.name_en}</h4>
                                                                            </div>
                                                                        </Link>
                                                                    </Col>
                                                                );
                                                            })
                                        :
                                        sortData == "Անուն(A - Z)" ?
                                            searchDataMain?.sort(function (a, b) {
                                                let x = a.name_am ? a.name_am.toLowerCase() :
                                                    a.name_ru ? a.name_ru.toLowerCase() :
                                                        a.name_en ? a.name_en.toLowerCase() :
                                                            null;
                                                let y = b.name_am ? b.name_am.toLowerCase() :
                                                    b.name_ru ? b.name_ru.toLowerCase() :
                                                        b.name_en ? b.name_en.toLowerCase() :
                                                            null;
                                                if (x < y) {
                                                    return -1;
                                                }
                                                if (x > y) {
                                                    return 1;
                                                }
                                                return 0;
                                            }).map((i) => {
                                                return (
                                                    <Col sm={12} md={6} lg={4} key={i.id} mb={5}>
                                                        <Link href={"/product/" + i.id}>
                                                            <div className={css.divProduct}>
                                                                <div className={css.images}>
                                                                    {i.image_one !== null ?
                                                                        <img src={i.image_one} alt=""/> : null}
                                                                    {i.image_two !== null ?
                                                                        <img src={i.image_two} alt=""/> : null}
                                                                </div>
                                                                <div className={css.img_box}>
                                                                    <img src={i.image} alt=""/>
                                                                </div>
                                                                <p>
                                                                    {
                                                                        i.sale_ht !== 0 || i.discount !== 0 ?
                                                                            <span
                                                                                className={css.saleSpan}>{currency !== null ? (i.price / currency).toFixed(2) + " " + many : i.price + " " + many} </span> : null
                                                                    }
                                                                </p>
                                                                <p>
                                                                    {
                                                                        i.sale_ht == 0 && i.discount == 0 ?
                                                                            <span>{i.price}</span> : searchXX?.map((item) => {
                                                                                return item.idMain == i.id && (currency !== null ? (item.price / currency).toFixed(2) : item.price)

                                                                            })
                                                                    }
                                                                    {" " + many}</p>
                                                                <h4>{lang == "am" ? i.name_am : lang == 'ru' ? i.name_ru : i.name_en}</h4>
                                                            </div>
                                                        </Link>
                                                    </Col>
                                                );
                                            })
                                            : sortData == "Անուն(Z - A)" ?
                                                searchDataMain?.sort(function (a, b) {
                                                    let x = a.name_am ? a.name_am.toLowerCase() :
                                                        a.name_ru ? a.name_ru.toLowerCase() :
                                                            a.name_en ? a.name_en.toLowerCase() :
                                                                null;
                                                    let y = b.name_am ? b.name_am.toLowerCase() :
                                                        b.name_ru ? b.name_ru.toLowerCase() :
                                                            b.name_en ? b.name_en.toLowerCase() :
                                                                null;
                                                    if (y < x) {
                                                        return -1;
                                                    }
                                                    if (y > x) {
                                                        return 1;
                                                    }
                                                    return 0;
                                                }).map((i) => {
                                                    return (
                                                        <Col sm={12} md={6} lg={4} key={i.id} mb={5}>
                                                            <Link href={"/product/" + i.id}>
                                                                <div className={css.divProduct}>
                                                                    <div className={css.images}>
                                                                        {i.image_one !== null ?
                                                                            <img src={i.image_one} alt=""/> : null}
                                                                        {i.image_two !== null ?
                                                                            <img src={i.image_two} alt=""/> : null}
                                                                    </div>
                                                                    <div className={css.img_box}>
                                                                        <img src={i.image} alt=""/>
                                                                    </div>
                                                                    <p>
                                                                        {
                                                                            i.sale_ht !== 0 || i.discount !== 0 ?
                                                                                <span
                                                                                    className={css.saleSpan}>{currency !== null ? (i.price / currency).toFixed(2) + " " + many : i.price + " " + many} </span> : null
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        {
                                                                            i.sale_ht == 0 && i.discount == 0 ?
                                                                                <span>{i.price}</span> : searchXX?.map((item) => {
                                                                                    return item.idMain == i.id && (currency !== null ? (item.price / currency).toFixed(2) : item.price)

                                                                                })
                                                                        }
                                                                        {" " + many}</p>
                                                                    <h4>{lang == "am" ? i.name_am : lang == 'ru' ? i.name_ru : i.name_en}</h4>
                                                                </div>
                                                            </Link>
                                                        </Col>
                                                    );
                                                })
                                                :
                                                sortData == "Գին(Ցածր Բարձր)" ?
                                                    searchDataMain?.sort(function (a, b) {
                                                        return a.price - b.price;
                                                    }).map((i) => {
                                                        return (
                                                            <Col sm={12} md={6} lg={4} key={i.id} mb={5}>
                                                                <Link href={"/product/" + i.id}>
                                                                    <div className={css.divProduct}>
                                                                        <div className={css.images}>
                                                                            {i.image_one !== null ?
                                                                                <img src={i.image_one} alt=""/> : null}
                                                                            {i.image_two !== null ?
                                                                                <img src={i.image_two} alt=""/> : null}
                                                                        </div>
                                                                        <div className={css.img_box}>
                                                                            <img src={i.image} alt=""/>
                                                                        </div>
                                                                        <p>
                                                                            {
                                                                                i.sale_ht !== 0 || i.discount !== 0 ?
                                                                                    <span
                                                                                        className={css.saleSpan}>{currency !== null ? (i.price / currency).toFixed(2) + " " + many : i.price + " " + many} </span> : null
                                                                            }
                                                                        </p>
                                                                        <p>
                                                                            {
                                                                                i.sale_ht == 0 && i.discount == 0 ?
                                                                                    <span>{i.price}</span> : searchXX?.map((item) => {
                                                                                        return item.idMain == i.id && (currency !== null ? (item.price / currency).toFixed(2) : item.price)

                                                                                    })
                                                                            }
                                                                            {" " + many}</p>
                                                                        <h4>{lang == "am" ? i.name_am : lang == 'ru' ? i.name_ru : i.name_en}</h4>
                                                                    </div>
                                                                </Link>
                                                            </Col>
                                                        );
                                                    })
                                                    : sortData == "Գին(Բարձր Ցածր)" ?
                                                        searchDataMain?.sort(function (a, b) {
                                                            return b.price - a.price;
                                                        }).map((i) => {
                                                            return (
                                                                <Col sm={12} md={6} lg={4} key={i.id} mb={5}>
                                                                    <Link href={"/product/" + i.id}>
                                                                        <div className={css.divProduct}>
                                                                            <div className={css.images}>
                                                                                {i.image_one !== null ?
                                                                                    <img src={i.image_one} alt=""/> : null}
                                                                                {i.image_two !== null ?
                                                                                    <img src={i.image_two} alt=""/> : null}
                                                                            </div>
                                                                            <div className={css.img_box}>
                                                                                <img src={i.image} alt=""/>
                                                                            </div>
                                                                            <p>
                                                                                {
                                                                                    i.sale_ht !== 0 || i.discount !== 0 ?
                                                                                        <span
                                                                                            className={css.saleSpan}>{currency !== null ? (i.price / currency).toFixed(2) + " " + many : i.price + " " + many} </span> : null
                                                                                }
                                                                            </p>
                                                                            <p>
                                                                                {
                                                                                    i.sale_ht == 0 && i.discount == 0 ?
                                                                                        <span>{i.price}</span> : searchXX?.map((item) => {
                                                                                            return item.idMain == i.id && (currency !== null ? (item.price / currency).toFixed(2) : item.price)

                                                                                        })
                                                                                }
                                                                                {" " + many}</p>
                                                                            <h4>{lang == "am" ? i.name_am : lang == 'ru' ? i.name_ru : i.name_en}</h4>
                                                                        </div>
                                                                    </Link>
                                                                </Col>
                                                            );
                                                        })
                                                        : sortData == "Հիմնական" ?
                                                            searchDataMain?.sort(function (a, b) {
                                                                return a.id - b.id;
                                                            }).map((i) => {
                                                                return (
                                                                    <Col sm={12} md={6} lg={4} key={i.id} mb={5}>
                                                                        <Link href={"/product/" + i.id}>
                                                                            <div className={css.divProduct}>
                                                                                <div className={css.images}>
                                                                                    {i.image_one !== null ?
                                                                                        <img src={i.image_one} alt=""/> : null}
                                                                                    {i.image_two !== null ?
                                                                                        <img src={i.image_two} alt=""/> : null}
                                                                                </div>
                                                                                <div className={css.img_box}>
                                                                                    <img src={i.image} alt=""/>
                                                                                </div>
                                                                                <p>
                                                                                    {
                                                                                        i.sale_ht !== 0 || i.discount !== 0 ?
                                                                                            <span
                                                                                                className={css.saleSpan}>{currency !== null ? (i.price / currency).toFixed(2) + " " + many : i.price + " " + many} </span> : null
                                                                                    }
                                                                                </p>
                                                                                <p>
                                                                                    {
                                                                                        i.sale_ht == 0 && i.discount == 0 ?
                                                                                            <span>{i.price}</span> : searchXX?.map((item) => {
                                                                                                return item.idMain == i.id && (currency !== null ? (item.price / currency).toFixed(2) : item.price)

                                                                                            })
                                                                                    }
                                                                                    {" " + many}</p>
                                                                                <h4>{lang == "am" ? i.name_am : lang == 'ru' ? i.name_ru : i.name_en}</h4>
                                                                            </div>
                                                                        </Link>
                                                                    </Col>
                                                                );
                                                            })
                                                            : searchDataMain?.sort(function (a, b) {
                                                                return a.id - b.id;
                                                            }).map((i) => {
                                                                return (
                                                                    <Col sm={12} md={6} lg={4} key={i.id} mb={5}>
                                                                        <Link href={"/product/" + i.id}>
                                                                            <div className={css.divProduct}>
                                                                                <div className={css.images}>
                                                                                    {i.image_one !== null ?
                                                                                        <img src={i.image_one} alt=""/> : null}
                                                                                    {i.image_two !== null ?
                                                                                        <img src={i.image_two} alt=""/> : null}
                                                                                </div>
                                                                                <div className={css.img_box}>
                                                                                    <img src={i.image} alt=""/>
                                                                                </div>
                                                                                <p>
                                                                                    {
                                                                                        i.sale_ht !== 0 || i.discount !== 0 ?
                                                                                            <span
                                                                                                className={css.saleSpan}>{currency !== null ? (i.price / currency).toFixed(2) + " " + many : i.price + " " + many} </span> : null
                                                                                    }
                                                                                </p>
                                                                                <p>
                                                                                    {
                                                                                        i.sale_ht == 0 && i.discount == 0 ?
                                                                                            <span>{i.price}</span> : searchXX?.map((item) => {
                                                                                                return item.idMain == i.id && (currency !== null ? (item.price / currency).toFixed(2) : item.price)

                                                                                            })
                                                                                    }
                                                                                    {" " + many}</p>
                                                                                <h4>{lang == "am" ? i.name_am : lang == 'ru' ? i.name_ru : i.name_en}</h4>
                                                                            </div>
                                                                        </Link>
                                                                    </Col>
                                                                );
                                                            })
                                    }
                                </Row>
                            </div>
                        </div>
                    </Col>
                    <Col lg={12}>
                        <div className={css.pagination}>
                            <div className={css.pagination}>
                                <div className={css.pagination_block}>
                                    {res?.map((i, index) => {
                                        return (
                                            <p
                                                onClick={() => setpageItem(index + 1)}
                                                key={index}
                                                className={
                                                    productPage?.current_page == index + 1
                                                        ? css.active
                                                        : css.noActive
                                                }
                                            >
                                                {index + 1}
                                            </p>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ProductContainer;

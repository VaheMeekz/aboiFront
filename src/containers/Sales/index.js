import React, {useEffect, useState} from "react";
import css from "./salesContainer.module.css";
import {Accordion, Col, Container, Form, Row} from "react-bootstrap";
import {sales_get, salesFilter} from "../../redux/actions/SalesFilterAction";
import {useDispatch, useSelector} from "react-redux";
import Link from "next/link";

const SalesContainer = () => {

    const [sortData, setSortData] = useState("Հիմնական");
    const mainDataSales = useSelector((state) => state.SaleFilterDataReducer.mainData);
    const currency = useSelector(state => state.homeReducer.currencyData);
    const many = useSelector(state => state.homeReducer.many);
    const [pageItem, setpageItem] = useState(1);

    let res = [...Array(mainDataSales?.last_page)];

    const [lang, setLang] = useState();

    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(sales_get(pageItem))
    }, [pageItem]);

    useEffect(() => {
        dispatch(salesFilter('Հիմնական'))
    }, []);

    useEffect(() => {
        setLang(localStorage.getItem("language"))
    });

    const addSelect = (e) => {
        setSortData(e.target.value);
    };

    let x = mainDataSales.data?.map((item) => {
        return (
            {
                idMain: item.id,
                price: item.sale_ht == 0 && item.discount == 0 ? item.price :
                    item.sale_ht !== 0 ? item.price - item.price * item.sale_ht / 100 :
                        item.price - item.price * item.discount / 100
            }
        )
    });

    return (
        <div>
            <div className={css.productBg}>
                <h1>
                    {lang == 'am' ? "Զեղչեր" : lang == 'ru' ? "Скидки" : "Discounts"}
                </h1>
            </div>
            <Container>
                <Row>
                    <Col lg={12} md={9} xs={12}>
                        <div>
                            <div className={css.selectDiv}>
                                <h2>
                                    {lang == 'am' ? "Զեղչեր" : lang == 'ru' ? "Скидки" : "Discounts"}
                                </h2>
                                <div>
                                    <Form.Select
                                        onChange={addSelect}
                                        aria-label="Default select example"
                                    >
                                        <option value="Հիմնական" name="All">
                                            {lang == 'am' ? "Հիմնական" : lang == 'ru' ? "Базовый" : "Basic"}
                                        </option>
                                        <option value="Անուն(A - Z)" name="minMax">
                                            {lang == 'am' ? "Անուն(A - Z)" : lang == 'ru' ? "Имя (А - Z)"
                                                : "Name (A - Z)"
                                            }
                                        </option>
                                        <option value="Անուն(Z - A)" name="maxMin">
                                            {lang == 'am' ? "Անուն(Z - A)" : lang == 'ru' ? "Имя (Z - A)"
                                                : "Name (Z - A)"
                                            }
                                        </option>
                                        <option value="Գին(Ցածր Բարձր)" name="minPrice">
                                            {lang == 'am' ? "Գին(Ցածր - Բարձր)" : lang == 'ru' ? "Цена (Низкая - Высокая)" : "Price (Low - High)"}
                                        </option>
                                        <option value="Գին(Բարձր Ցածր)" name="maxPrice">
                                            Գին(Բարձր Ցածր)
                                            {lang == 'am' ? "Գին(Բարձր - Ցածր )" : lang == 'ru' ? "Цена (Высокая -Низкая)" : "Price (High - Low)"}
                                        </option>
                                    </Form.Select>
                                </div>
                            </div>
                            <div className={css.divProductMain}>
                                <Row>
                                    {
                                        sortData == "Անուն(A - Z)" ? mainDataSales.data?.sort(function (a, b) {
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
                                                    <Col sm={12} md={6} lg={3} key={i.id}>
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
                                                                <h5>{lang == "am" ? i.name_am : lang == "ru" ? i.name_ru : i.name_en}</h5>
                                                                <div className={css.posit_abs}>
                                                                    <div className={css.posit_rel}></div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </Col>
                                                );
                                            })
                                            : sortData == "Անուն(Z - A)" ? mainDataSales.data?.sort(function (a, b) {
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
                                                        <Col sm={12} md={6} lg={3} key={i.id}>
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
                                                                    <h5>{lang == "am" ? i.name_am : lang == "ru" ? i.name_ru : i.name_en}</h5>
                                                                    <div className={css.posit_abs}>
                                                                        <div className={css.posit_rel}></div>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </Col>
                                                    );
                                                })
                                                : sortData == "Գին(Ցածր Բարձր)" ? mainDataSales.data?.sort(function (a, b) {
                                                        return a.price - b.price;
                                                    }).map((i) => {
                                                        return (
                                                            <Col sm={12} md={6} lg={3} key={i.id}>
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
                                                                        <h5>{lang == "am" ? i.name_am : lang == "ru" ? i.name_ru : i.name_en}</h5>
                                                                        <div className={css.posit_abs}>
                                                                            <div className={css.posit_rel}></div>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            </Col>
                                                        );
                                                    })
                                                    : sortData == "Գին(Բարձր Ցածր)" ? mainDataSales.data?.sort(function (a, b) {
                                                            return b.price - a.price;
                                                        }).map((i) => {
                                                            return (
                                                                <Col sm={12} md={6} lg={3} key={i.id}>
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
                                                                            <h5>{lang == "am" ? i.name_am : lang == "ru" ? i.name_ru : i.name_en}</h5>
                                                                            <div className={css.posit_abs}>
                                                                                <div className={css.posit_rel}></div>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                </Col>
                                                            );
                                                        })
                                                        : sortData == "Հիմնական" ? mainDataSales.data?.sort(function (a, b) {
                                                            return a.id - b.id;
                                                        }).map((i) => {
                                                            return (
                                                                <Col sm={12} md={6} lg={3} key={i.id}>
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
                                                                            <h5>{lang == "am" ? i.name_am : lang == "ru" ? i.name_ru : i.name_en}</h5>
                                                                            <div className={css.posit_abs}>
                                                                                <div className={css.posit_rel}></div>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                </Col>
                                                            );
                                                        }) : mainDataSales.data?.sort(function (a, b) {
                                                            return a.id - b.id;
                                                        }).map((i) => {
                                                            return (
                                                                <Col sm={12} md={6} lg={3} key={i.id}>
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
                                                                            <h5>{lang == "am" ? i.name_am : lang == "ru" ? i.name_ru : i.name_en}</h5>
                                                                            <div className={css.posit_abs}>
                                                                                <div className={css.posit_rel}></div>
                                                                            </div>
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
                                                    mainDataSales?.current_page == index + 1
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

export default SalesContainer;

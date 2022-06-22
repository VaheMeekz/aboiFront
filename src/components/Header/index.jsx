import React, {useState, useEffect} from "react";
import NextLink from "../NextLink";
import {useRouter} from "next/router";
import styles from "./Header.module.css";
import {Container, Row, Col, Alert, Dropdown, Button} from "react-bootstrap";
import Wp from "../../svg/wp.svg";
import Fb from "../../svg/fb.svg";
import Insta from "../../svg/insta.svg";
import Logo from "../../svg/log.svg";
import Loop from "../../svg/loop.svg";
import Basket from "../../svg/basket.svg";
import User from "../../svg/user.svg";
import AM from "../../svg/am.svg";
import RU from "../../svg/ru.svg";
import Arrow from "../../svg/arrow1.svg";
import ResponseNav from "../ResponseNav";
import EN from "../../svg/en.svg";
import {useDispatch, useSelector} from "react-redux";
import {useCart} from "react-use-cart";
import {buyserGet, buyserSalesGet} from "../../redux/actions/product.acion";
import {i18n, useTranslation} from "next-i18next";
import {currencyAction, home_get} from "../../redux/actions/home.action";
import axios from "axios";
import {TOKEN_GET} from "../../redux/reducers/homeReducer";
import {DATA_MAIN, SEARCH_GET} from "../../redux/reducers/productReducer";

const Header = () => {

    const homeMain = useSelector(state => state.homeReducer.homeData);
    const tokenKey = useSelector(state => state.homeReducer.token);
    const [translate, setTranslate] = useState();

    const [token, setToken] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        token["token"] = localStorage.getItem('token');
        setToken(token);
    }, [token])

    const {t} = useTranslation("common");

    const router = useRouter();
    const {locale} = useRouter();

    let lang;

    const selectlanguages = (e) => {
        lang = e.target.value;
        router.push(
            {pathname: router.pathname, query: router.query},
            {pathname: router.pathname, query: router.query},
            {locale: lang, scroll: false}
        );
        localStorage.setItem("language", e.target.value)
        i18n.changeLanguage(lang);
        i18n.addResourceBundle(locale, lang);
    };

    useEffect(() => {
        dispatch(home_get());
    }, [])


    const [showus, setShowus] = useState(false);
    const [anim, setAnim] = useState(false);
    const [menushow, setMenueShow] = useState(false);
    const {items, totalItems} = useCart();


    const flaganimation = () => {
        setAnim(!anim);
    };

    let a = items.map((i) => {
        return i.count;
    });

    let countMain = 1;
    for (let i = 0; i < a.length; i++) {
        countMain += a[i];
    }

    const [open_search, setOpen_search] = useState(false);

    const OPEN_SEARCH_HANDLER = () => {
        setOpen_search(!open_search);
    };

    const [show, setShow] = useState(true);

    const AlertDismissibleExample = () => {
        setShow(!show);
    };

    const [name, setName] = useState("Ամբողջ Տեսականի");

    const [categoryNamee, setCategoryNamee] = useState();

    const [currency, setCurrency] = useState()

    const getNameHeader = (id) => {
        setName(name);
        dispatch(buyserGet({id: id}));
    };

    const getCategoryNameHeader = (id, categoryNamee) => {
        setCategoryNamee(categoryNamee);
        dispatch(buyserGet({id: id}, categoryNamee));
    };

    const handlerShowMenue = () => {
        setMenueShow(!menushow);
    };

    const [user,setUser] = useState()

    useEffect(() => {
        if(!localStorage.getItem('token')) {
            setUser(false)
        } else {
            setUser(true)
        }
    },[user])

    const deleteUser = () => {
        axios.get('https://abionew.herokuapp.com/api/logout', {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        })
            .then(function (response) {
                dispatch({type: TOKEN_GET, payload: false})
                localStorage.removeItem('token')
                router.push({
                    pathname: '/',
                });
                setUser(false)
            })
            .catch(function (error) {
            });
    }

    useEffect(() => {
        setCurrency(localStorage.getItem('currency'))
        dispatch(currencyAction(localStorage.getItem('currency')))
    }, [])

    useEffect(() => {
        setTranslate(localStorage.getItem("language"));
    },)

    const changeCurrency = (e) => {
        localStorage.setItem('currency', e.target.value);
        dispatch(currencyAction(localStorage.getItem('currency')))
    }

    const [search, setSearch] = useState();

    const searchChangeMain = (e) => {
        setSearch(e.target.value)
    }

    const searchGet = () => {
        axios.get('https://abionew.herokuapp.com/api/search', {params: {search: search}})
            .then(function (response) {
                if(response.data?.length > 0) {
                    router.push({
                        pathname: '/product',
                    });
                    dispatch({type:SEARCH_GET, payload: response.data[0]})
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <>
            <section className={styles.first_section}>
                <Container>
                    <Row>
                        <Col sm={12} md={6} lg={3}>
                            <div className={styles.logo}>
                                <NextLink exact to="/">
                                    <Logo/>
                                </NextLink>
                            </div>
                        </Col>
                        <Col sm={12} md={12} lg={4}>
                            <div className={styles.top_header_left_said}>
                                <div className={styles.social_networks}>
                                    <Insta/>
                                    <Fb/>
                                    <Wp/>
                                </div>
                                <div className={styles.price_lenguage}>
                                    <select onChange={changeCurrency}>
                                        <option value="" selected disabled hidden>
                                            {currency}
                                        </option>
                                        <option value="AMD">AMD</option>
                                        <option value="RUB">RUB</option>
                                        <option value="USD">USD</option>
                                    </select>
                                    <select
                                        name=""
                                        id=""
                                        onChange={selectlanguages}
                                        className={styles.select}
                                        defaultValue={locale}
                                    >
                                        <option value="am">Arm</option>
                                        <option value="ru">Rus</option>
                                        <option value="en">Eng</option>
                                    </select>
                                    <div></div>
                                </div>
                            </div>
                        </Col>

                        <Col sm={12} md={6} lg={5}>
                            <div className={styles.top_header_right_said}>
                                <div className={styles.searc}>
                                    <input type="text" onChange={searchChangeMain} className={styles.active_open}/>
                                    <Loop className={styles.loop} onClick={searchGet}/>
                                </div>
                                <div className={styles.basket}>
                                    {countMain ? (
                                        <NextLink to="/cart">
                                            <Basket/>
                                        </NextLink>
                                    ) : (
                                        <span onClick={AlertDismissibleExample}>
                      <Basket/>
                    </span>
                                    )}

                                    <span className={styles.basketCount}>{totalItems}</span>

                                    {!show ? (
                                        <Alert variant="success" className={styles.alert}>
                                            <p>
                                                {translate == 'am' ? "ՁԵՐ ԶԱՄԲՅՈՒՂԸ ԴԱՏԱՐԿ Է!" : translate == 'ru' ? "ВАША КОРЗИНА ПУСТА!" : "YOUR BASKET IS EMPTY!"}
                                            </p>
                                        </Alert>
                                    ) : null}
                                </div>
                                {user ? (
                                    <div className={styles.user}>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                <User/>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item>
                                                    <NextLink
                                                        exact
                                                        to="/profile"
                                                        className={styles.acaunt_item}
                                                    >
                                                        {translate == 'am' ? "Հաշվի տվյալները" : translate == 'ru' ? "Детали учетной записи" : "Account details"}
                                                    </NextLink>
                                                </Dropdown.Item>
                                                <Dropdown.Item>
                                                    <NextLink
                                                        exact
                                                        to="/"
                                                        onClick={() => deleteUser()}
                                                        className={styles.acaunt_item}
                                                    >
                                                        {translate == 'am' ? "Ելք" : translate == 'ru' ? "Выход" : "Exit"}
                                                    </NextLink>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                ) : (
                                    <NextLink exact to="/login" className={styles.acaunt_item}>
                                        {translate == 'am' ? "Մուտք գործեք" : translate == 'ru' ? "Авторизоваться" : "Log in"}
                                    </NextLink>
                                )}
                            </div>
                        </Col>
                        <Col sm={12}>
                            <div className={styles.media_basket_user}>
                                <div className={styles.basket_media}>
                                    {countMain ? (
                                        <NextLink to="/cart">
                                            <Basket/>
                                        </NextLink>
                                    ) : (
                                        <span onClick={AlertDismissibleExample}>
                      <Basket/>
                    </span>
                                    )}

                                    {totalItems ? (
                                        <span className={styles.basketCount_media}>
                      {totalItems}
                    </span>
                                    ) : null}
                                    {!show ? (
                                        <Alert variant="success" className={styles.alert_media}>
                                            <p>
                                                {translate == 'am' ? "ՁԵՐ ԶԱՄԲՅՈՒՂԸ ԴԱՏԱՐԿ Է!" : translate == 'ru' ? "ВАША КОРЗИНА ПУСТА!" : "YOUR BASKET IS EMPTY!"}
                                            </p>
                                        </Alert>
                                    ) : null}
                                </div>

                                {/*<div className={styles.user_media}>*/}
                                {/*    <Dropdown>*/}
                                {/*        <Dropdown.Toggle variant="success" id="dropdown-basic">*/}
                                {/*            <User/>*/}
                                {/*        </Dropdown.Toggle>*/}

                                {/*        <Dropdown.Menu>*/}
                                {/*            <Dropdown.Item>*/}
                                {/*                <NextLink*/}
                                {/*                    exact*/}
                                {/*                    to="/account"*/}
                                {/*                    className={styles.acaunt_item}*/}
                                {/*                >*/}
                                {/*                    {translate == 'am' ? "Հաշվի տվյալները" : translate == 'ru' ? "Детали учетной записи" : "Account details"}*/}
                                {/*                </NextLink>*/}
                                {/*            </Dropdown.Item>*/}
                                {/*                <span*/}
                                {/*                    className={styles.acaunt_item}*/}
                                {/*                    onClick={removeUser}*/}
                                {/*                >*/}
                                {/*                    {translate == 'am' ? "Ելք" : translate == 'ru' ? "Выход" : "Exit"}*/}
                                {/*                </span>*/}
                                {/*        </Dropdown.Menu>*/}
                                {/*    </Dropdown>*/}
                                {/*</div>*/}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className={styles.media}>
                <ResponseNav/>
            </section>
            <section className={styles.web}>
                <Container>
                    <div className={styles.menu}>
                        <ul className={styles.menu_block}>
                            <li>
                                <NextLink to="/" activeClassName={styles.active}>
                                    {translate == "am" ? "Գլխավոր" : translate == 'ru' ? "Дом" : "Home"}
                                </NextLink>
                            </li>
                            <li>
                                <NextLink to="/about" activeClassName={styles.active}>
                                    {translate == "am" ? "Մեր մասին" : translate == 'ru' ? "О нас" : "About us"}
                                </NextLink>
                            </li>

                            <li>
                                <NextLink to="/sales" activeClassName={styles.active}>
                                    {translate == "am" ? "Վաճառք" : translate == 'ru' ? "Распродажа" : "Sale"}
                                </NextLink>
                            </li>

                            <li className={styles.dropdown} onClick={handlerShowMenue}>
                                {translate == "am" ? "Արտադրանք" : translate == 'ru' ? "Товар" : "Product"}
                                <Arrow
                                    style={
                                        menushow
                                            ? {
                                                transform: "rotate(0deg)",
                                                marginLeft: "10px",
                                                width: "15px",
                                            }
                                            : {transform: "rotate(180deg)", marginLeft: "10px"}
                                    }
                                />
                            </li>

                            <li>
                                <NextLink to="/offer" activeClassName={styles.active}>
                                    {translate == "am" ? "Առաջարկ" : translate == 'ru' ? "Предложение" : "Offer"}
                                </NextLink>
                            </li>
                            <li>
                                <NextLink to="/services" activeClassName={styles.active}>
                                    {translate == "am" ? "Ծառայություններ" : translate == 'ru' ? "Услуги" : "Services"}
                                </NextLink>
                            </li>
                        </ul>
                        <div className={styles.dropdown_content}>
                            {menushow ? (
                                <div className={styles.divMainMenue}>
                                    {
                                        homeMain?.map((item) => {
                                            return (
                                                <div>
                                                    <NextLink
                                                        className={styles.a}
                                                        to="/product"
                                                        onClick={() => getNameHeader(item.id)}
                                                    >
                                                        {translate == 'am' ? item.name_am : translate == 'ru' ? item.name_ru : item.name_en}
                                                    </NextLink>
                                                    <div className={styles.mainA}>
                                                        {
                                                            item.parent_category.map((i) => {
                                                                return (
                                                                    <NextLink
                                                                        to="/product"
                                                                        onClick={() =>
                                                                            getCategoryNameHeader(item.id)
                                                                        }
                                                                    >
                                                                        {translate == 'am' ? item.name_am : translate == 'ru' ? item.name_ru : item.name_en}
                                                                    </NextLink>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : null}
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default Header;

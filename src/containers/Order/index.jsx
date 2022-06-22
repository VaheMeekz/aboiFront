import React, {useState, useEffect} from "react";
import styles from "./Order.module.css";
import {Container, Row, Col, Table, Modal, Button} from "react-bootstrap";
import {deliverPrice} from "../../utils";
import Arrow from "../../svg/arrow1.svg";
import Clock from "../../svg/basketClock.svg";
import Day from "../../svg/day.svg";
import Star from "../../svg/star.svg";
import Close from "../../svg/close.svg";
import {useCart} from "react-use-cart";
import {Formik} from "formik";
import {AiOutlineSend} from 'react-icons/ai';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {deleverygetAction} from "../../redux/actions/delevery.action";
import {COUPON_GET, couponeReducer} from "../../redux/reducers/couponReducer";
import {useRouter} from "next/router";
import Swal from 'sweetalert2'

const OrderContainer = () => {

    const [gender, setGender] = useState("voch");
    const [toggle, setToggle] = useState(false);
    const [lang, setLang] = useState();
    const [currentId, setCurrentId] = useState("Երևան");
    const [cc, setCc] = useState([]);
    const [token, setToken] = useState()

    const router = useRouter();

    const servicesData = useSelector(state => state.deleveryReducer.data, shallowEqual);
    const couponeData = useSelector(state => state.couponeReducer.data, shallowEqual);
    const tokenKey = useSelector(state => state.homeReducer.token, shallowEqual);

    const dispatch = useDispatch();

    useEffect(() => {
        setCc()

    }, [])

    useEffect(() => {
        dispatch(deleverygetAction())
        setToken(localStorage.getItem('token'))
    }, [])


    useEffect(() => {
        setLang(localStorage.getItem("language"))
    })

    const [user,setUser] = useState()

    useEffect(() => {
        if(!localStorage.getItem('token')) {
            setUser(false)
        } else {
            setUser(true)
        }
    },[user])

    const changeToggle = () => {
        setToggle(!toggle);
    };

    const {items, cartTotal} = useCart();

    const [cartData, setSetCart] = useState(items.map((item) => {
        return {
            itemId: item.id,
            count: item.quantity,
        }
    }))

    let [codeData, setCodeData] = useState('');

    const codeChange = (e) => {
        setCodeData(e.target.value);
    }

    const handlerChange = (еvent) => {
        еvent.preventDefault();
        setCurrentId(еvent.target.value);
    };

    const addCode = async (e) => {
        e.preventDefault();
        await axios.post('https://abionew.herokuapp.com/api/coupon', {code: codeData})
            .then(function (response) {
                dispatch({type: COUPON_GET, payload: response.data})
                setCc(response.data?.map((item) => item.id)[0], 'response.data')
                setCodeData('')
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    let cityPrice = servicesData?.filter((i) => {
        return currentId == i.city_am;
    })[0];


    let bigPrice = items?.filter((item) => {
        return item.size == 'big'
    });

    let totalBigSmallPrice = bigPrice !== undefined && bigPrice?.length > 0 ? cityPrice?.price_big : cityPrice?.price_small;

    const [visaData, setVisaData] = useState('');
    const [registerData, setRegisterData] = useState('');

    const visaChange = (e) => {
        setVisaData(e.target.value)
    }

    const registerChange = (e) => {
        setRegisterData(e.target.value)
    }


    return (
        <section>
            <Container>
                <h4 className={styles.title}>Պատվիրել</h4>
                <Row className="mt-5">
                    <Col sm={12} md={6} lg={6}>
                        {user  ? null : <h5 className={styles.subtitle}>
                            {
                                lang == 'am' ? "Պատվիրատուի տվյալներ" : lang == 'ru' ? "Детали клиента" : "Customer details"
                            }
                        </h5>}

                        <Formik
                            initialValues={{
                                email: '',
                                order_time: '',
                                order_calendar: '',
                                name: '',
                                last_name: '',
                                phone: '',
                                street: '',
                                home: '',
                                house: '',
                                comment: '',
                                product: cartData,
                            }}
                            validate={values => {
                                const errors = {};
                                if (!values.email) {
                                    errors.email = `${lang == 'am' ? "պահանջվում է" : lang == 'ru' ? "требуется" : "Required"}`;
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = `${lang == 'am' ? "Անվավեր էլ․ հասցե" : lang == 'ru' ? "Неверный адрес электронной почты" : "Invalid email address"}`;
                                }
                                return errors;
                            }}
                            onSubmit={(values, {setSubmitting}) => {
                                setTimeout(() => {
                                    if(localStorage.getItem('token')) {
                                        axios.post('https://abionew.herokuapp.com/api/registered-checkout', {
                                                ...values,
                                                coupon_id: cc,
                                                register: registerData,
                                                payment_method: visaData,
                                                city: currentId,
                                            }, {
                                                headers: {
                                                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                                                }
                                            }
                                        )
                                            .then(function (response) {
                                                if(response.data.success == true) {
                                                    router.push({
                                                        pathname: '/login',
                                                    });
                                                } else {
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Oops...',
                                                        text: 'The email has already been taken.',
                                                        footer: '<a href="">Why do I have this issue?</a>'
                                                    })
                                                }
                                            })
                                            .catch(function (error) {
                                                console.log(error);
                                            });
                                    } else {
                                        axios.post('https://abionew.herokuapp.com/api/checkout', {
                                                ...values,
                                                coupon_id: cc,
                                                register: registerData,
                                                payment_method: visaData,
                                                city: currentId,
                                            }
                                        )
                                            .then(function (response) {
                                                if(response.data.success == true) {
                                                    router.push({
                                                        pathname: '/login',
                                                    });
                                                } else {
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Oops...',
                                                        text: 'The email has already been taken.',
                                                        footer: '<a href="">Why do I have this issue?</a>'
                                                    })
                                                }
                                            })
                                            .catch(function (error) {
                                                console.log(error);
                                            });
                                    }

                                    console.log({
                                        ...values,
                                        coupon_id: cc,
                                        payment_method: visaData,
                                        register: registerData,
                                        city: currentId
                                    }, 'values')
                                    setSubmitting(false);
                                }, 400);
                            }}
                        >
                            {({
                                  values,
                                  errors,
                                  touched,
                                  handleChange,
                                  handleBlur,
                                  handleSubmit,
                                  isSubmitting,
                                  /* and other goodies */
                              }) => (
                                <>
                                    {user ? null : <div className={styles.Sign_up_block}>
                                        <p>
                                            {
                                                lang == 'am' ? "Գրանցվել" : lang == 'ru' ? "Регистр" : "Register"
                                            }
                                        </p>
                                        <span className={styles.inp}>
                                        <input
                                            type="radio"
                                            id="test1"
                                            name="register"
                                            value="ayo"
                                            onChange={registerChange}
                                        />
                                        <label htmlFor="test1">
                                            {
                                                lang == 'am' ? "Այո" : lang == 'ru' ? "Да" : "Yes"
                                            }
                                        </label>
                                      </span>
                                        <span className={styles.inp}>
                                        <input
                                            type="radio"
                                            id="test2"
                                            name="register"
                                            value="voch"
                                            onChange={registerChange}
                                        />
                                        <label htmlFor="test1">
                                            {
                                                lang == 'am' ? "Ոչ" : lang == 'ru' ? "Ոչ" : "No"
                                            }
                                        </label>
                                      </span>
                                    </div> }

                                    <div className={styles.clock}>
                                        <h5>
                                            {
                                                lang == 'am' ? "Ընտրել առաքման օրն ու ժամը" : lang == 'ru' ? "Выберите дату и время доставки" : "Select the delivery date and time"
                                            }
                                        </h5>
                                        <form onSubmit={handleSubmit}>
                                            <div className={styles.divInputs}>
                                                <Row>
                                                    <Col sm={12} ms={6} lg={6}>
                                                        <input
                                                            type="date"
                                                            value={values.order_calendar}
                                                            placeholder={lang == 'am' ? "Առաքման օր" : lang == 'ru' ? "День доставки" : "Delivery day"}
                                                            name="order_calendar"
                                                            onChange={handleChange}
                                                        />
                                                    </Col>
                                                    <Col sm={12} ms={6} lg={6}>
                                                        <select
                                                            aria-label="Default select example"
                                                            name="order_time"
                                                            value={values.order_time}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="Ժամ">{
                                                                lang === 'am' ? "Ժամ" : lang == 'ru' ? "Часы" : "Hours"
                                                            }</option>
                                                            <option value="10.00-11.00">10.00-11.00</option>
                                                            <option value="11.00-12.00">11.00-12.00</option>
                                                            <option value="12.00-13.00">12.00-13.00</option>
                                                            <option value="13.00-14.00">13.00-14.00</option>
                                                            <option value="14.00-15.00">14.00-15.00</option>
                                                            <option value="15.00-16.00">15.00-16.00</option>
                                                            <option value="16.00-17.00">16.00-17.00</option>
                                                            <option value="17.00-18.00">17.00-18.00</option>
                                                            <option value="18.00-19.00">18.00-19.00</option>
                                                        </select>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className={styles.from_block}>
                                                <Row>
                                                    <Col sm={12} md={6} lg={6}>
                                                        <div className={styles.input_block}>
                                                            <input
                                                                type="text"
                                                                className={styles.input}
                                                                placeholder={lang == 'am' ? "Անուն" : lang == 'ru' ? "Имя" : "Name"}
                                                                name="name"
                                                                onChange={handleChange}
                                                                value={values.name}
                                                            />
                                                            <Star className={styles.star}/>
                                                        </div>
                                                    </Col>
                                                    <Col sm={12} md={6} lg={6}>
                                                        <div className={styles.input_block}>
                                                            <input
                                                                type="text"
                                                                className={styles.input}
                                                                placeholder={lang == 'am' ? "Ազգանուն" : lang == 'ru' ? "Фамилия" : "Last name"}
                                                                name="last_name"
                                                                onChange={handleChange}
                                                                value={values.last_name}
                                                            />
                                                            <Star className={styles.star}/>
                                                        </div>
                                                    </Col>
                                                    <Col sm={12} md={6} lg={6}>
                                                        <div className={styles.input_block}>
                                                            <input
                                                                type="number"
                                                                className={styles.input}
                                                                placeholder={lang == 'am' ? "Հեռախոսահամար" : lang == 'ru' ? "Номер телефона" : "Phone number"}
                                                                name="phone"
                                                                onChange={handleChange}
                                                                value={values.phone}
                                                            />
                                                            <Star className={styles.star}/>
                                                        </div>
                                                    </Col>
                                                    <Col sm={12} md={6} lg={6}>
                                                        <div className={styles.input_block}>
                                                            <input
                                                                type="email"
                                                                className={styles.input}
                                                                placeholder={lang == 'am' ? "ԷԼ.հասցե" : lang == 'ru' ? "Эл.адрес" : "Email"}
                                                                name="email"
                                                                onChange={handleChange}
                                                                value={values.email}
                                                            />
                                                            <Star className={styles.star}/>
                                                        </div>
                                                    </Col>
                                                    <Col sm={12} md={6} lg={6}>
                                                        <div className={styles.citi_block}>
                                                            <Arrow
                                                                className={toggle ? styles.active_arrow : styles.arrow}
                                                            />

                                                            <select
                                                                name="city"
                                                                onChange={handlerChange}
                                                                onClick={changeToggle}
                                                            >
                                                                {servicesData
                                                                    ? servicesData?.map((i) => {
                                                                        return (
                                                                            <option
                                                                                value={lang == "am" ? i.city_am : lang == 'ru' ? i.city_ru : i.city_en}
                                                                                key={i.id}>
                                                                                {lang == "am" ? i.city_am : lang == 'ru' ? i.city_ru : i.city_en}
                                                                            </option>
                                                                        );
                                                                    })
                                                                    : null}
                                                            </select>
                                                            <Star className={styles.stars}/>
                                                        </div>
                                                    </Col>
                                                    <Col sm={12} md={6} lg={6}>

                                                        <div className={styles.input_block}>
                                                            <input
                                                                type="text"
                                                                className={styles.input}
                                                                placeholder={lang == "am" ? "Փողոց" : lang == 'ru' ? "Улица" : "Street"}
                                                                name="street"
                                                                onChange={handleChange}
                                                                value={values.street}
                                                            />
                                                            <Star className={styles.star}/>
                                                        </div>
                                                    </Col>
                                                    <Col sm={12} md={6} lg={6}>
                                                        <div className={styles.input_block}>
                                                            <input
                                                                type="text"
                                                                className={styles.input}
                                                                placeholder={lang == "am" ? "Տուն" : lang == 'ru' ? "Дом" : "House"}
                                                                name="home"
                                                                onChange={handleChange}
                                                                value={values.home}
                                                            />
                                                            <Star className={styles.star}/>
                                                        </div>
                                                    </Col>
                                                    <Col sm={12} md={6} lg={6}>
                                                        <div className={styles.input_block}>
                                                            <input
                                                                type="text"
                                                                className={styles.input}
                                                                placeholder={lang == "am" ? "Շենք" : lang == 'ru' ? "Строительство" : "Building"}
                                                                name="house"
                                                                onChange={handleChange}
                                                                value={values.house}
                                                            />
                                                        </div>
                                                    </Col>
                                                    {registerData == "ayo" ? (
                                                        <>
                                                            <Col sm={12} md={6} lg={6}>
                                                                <div className={styles.input_block}>
                                                                    <input
                                                                        type="password"
                                                                        placeholder={lang == "am" ? "Գաղտնաբառ" : lang == 'ru' ? "Пароль" : "Password"}
                                                                        className={styles.input}
                                                                        onChange={handleChange}
                                                                        name="password"
                                                                        value={values.password}
                                                                    />
                                                                    <Star className={styles.star}/>
                                                                </div>
                                                            </Col>

                                                        </>
                                                    ) : null}
                                                </Row>
                                                <h5>{lang == "am" ? "Վճարման եղանակ" : lang == 'ru' ? "Метод оплаты" : "Payment method"}</h5>
                                                <Row>
                                                    <Col sm={12} md={12} lg={12}>
                                  <span className={styles.pay_block_item}>
                                    <input type="radio" value={'visa'} name='payment_method'
                                           onChange={visaChange}/>
                                    <p>{lang == "am" ? "Վճարային քարտ" : lang == 'ru' ? "Карта оплаты" : "Payment card"} ( Visa, Arca )</p>
                                  </span>
                                                    </Col>
                                                    <Col sm={12} md={12} lg={12}>
                                  <span className={styles.pay_block_item}>
                                    <input type="radio" value={'idram'} name='payment_method'
                                           onChange={visaChange}/>
                                    <p>{lang == "am" ? "ԻԴՐԱՄ վճարային համակարգ" : lang == 'ru' ? "Платежная система IDRAM" : "IDRAM payment system"}</p>
                                  </span>
                                                    </Col>
                                                    <Col sm={12} md={12} lg={12}>
                                  <span className={styles.pay_block_item}>
                                    <input type="radio" value={'cash'} name='payment_method'
                                           onChange={visaChange}/>
                                    <p>
                                        {lang == "am" ? "Վճարումը առաքման ժամանակ" : lang == 'ru' ? "Оплата по факту доставки" : "Payment upon delivery"}
                                    </p>
                                  </span>
                                                    </Col>
                                                </Row>
                                                <Col sm={12} md={12} lg={12}>
                                            <textarea
                                                name="comment"
                                                id=""
                                                cols="80"
                                                rows="5"
                                                className={styles.texteria}
                                                placeholder={lang == "am" ? "Մեկնաբանություն" : lang == 'ru' ? "Kомментарий" : "Comment"}
                                                onChange={handleChange}
                                                value={values.comment}
                                            ></textarea>
                                                </Col>
                                            </div>
                                            {errors.password && touched.password && errors.password}
                                            <button type="submit" className={styles.confirm}>
                                                {lang == "am" ? "Հաստատել" : lang == 'ru' ? "Подтвердить" : "Submit"}
                                            </button>
                                        </form>
                                    </div>
                                </>

                            )}
                        </Formik>
                    </Col>
                    <Col sm={12} md={6} lg={5}>
                        <Row>
                            <div className={styles.big_block}>
                                <Col sm={12} md={12} lg={12}>
                                    {items
                                        ? items.map((i) => {
                                            return (
                                                <div className={styles.All_contetn_info}>
                                                    <div className={styles.firste_block}>
                                                        <img src={i.image} alt="img"/>
                                                    </div>
                                                    <div className={styles.middle_block}>
                                                        <h5>{i.name}</h5>
                                                    </div>
                                                    <div className={styles.last_block}>
                                                        <p>{i.price} AMD </p>
                                                        <p>{i.quantity} հատ</p>
                                                    </div>
                                                </div>
                                            );
                                        })
                                        : "ssss"}
                                </Col>
                                <div className={styles.Total_price_blockas2}>
                                    <h4>
                                        {lang == "am" ? "Առաքում" : lang == "ru" ? "Отгрузка" : "Shipment"}
                                    </h4>
                                    <div className={styles.valuta_name}>
                                        <p className={styles.a}>
                                            {
                                                couponeData[0]?.type && couponeData[0]?.type == 3 ? 0 : totalBigSmallPrice
                                            }
                                        </p>
                                        <p>AMD</p>
                                    </div>
                                </div>
                                <div className={styles.Total_price_blockas}>
                                    <h4>
                                        {lang == "am" ? "Ընդհանուր" : lang == "ru" ? "Общий" : "General"}
                                    </h4>
                                    <div className={styles.valuta_name}>
                                        <p className={styles.a}>
                                            {
                                                couponeData?.length > 0 ? couponeData?.map((item) => {
                                                    return (
                                                        item.type == 1 ? cartTotal - (item.value * cartTotal / 100) + totalBigSmallPrice
                                                            : item.type == 2 ? (cartTotal - item.value) + totalBigSmallPrice
                                                                : item.type == 3 ? cartTotal + totalBigSmallPrice - totalBigSmallPrice : null
                                                    )
                                                }) : Number(cartTotal) + Number(totalBigSmallPrice)
                                            }
                                        </p>
                                        <p>AMD</p>
                                    </div>
                                </div>
                                <div className={styles.cupon}>

                                    <form onChange={codeChange}>
                                        <input
                                            type="text"
                                            placeholder={"Code"}
                                            name="code"
                                            value={codeData}
                                        />
                                        {
                                            codeData == '' ?
                                                <button className={styles.disbledButton}>
                                                    <AiOutlineSend/>
                                                </button>
                                                :
                                                <div className={styles.divLracnel}>
                                                    <button onClick={addCode}>
                                                        <AiOutlineSend/>
                                                    </button>
                                                    <p>
                                                        {lang == "am" ? "Խնդրումենք լրացնել նոր հաստատել" : lang == "ru" ? "Пожалуйста, заполните новое подтверждение" : "Please fill in the new confirmation"}
                                                    </p>
                                                </div>
                                        }
                                    </form>
                                </div>
                            </div>

                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default OrderContainer;

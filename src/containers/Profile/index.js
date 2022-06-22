import React, {useEffect, useState} from 'react';
import css from './profile.module.css';
import {Col, Container, Row} from "react-bootstrap";
import {Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {profile_product_get} from "../../redux/actions/profile.action";
import {i18n, useTranslation} from "next-i18next";
import {profileReducer} from "../../redux/reducers/profileReducer";
import axios from "axios";
import Swal from "sweetalert2";


const ProfileContainer = () => {

    const [show, setShow] = useState(false);
    const [lang, setLang] = useState('');


    const profileData = useSelector(state => state.profileReducer.data);
    const currency = useSelector(state => state.homeReducer.currencyData);
    const many = useSelector(state => state.homeReducer.many);

    const dispatch = useDispatch();

    const {t} = useTranslation("common");

    useEffect(() => {
        dispatch(profile_product_get());
        setLang(localStorage.getItem("language"))
    }, [])

    const clickShow = () => {
        setShow(!show)
    };

    let x = profileData?.map((i) => i.checkout_product_get).map((item) => {
        return (
            {
                idMain: item.id,
                price: item.sale_ht == 0 && item.discount == 0 ? item.price :
                    item.sale_ht !== 0 ? item.price - item.price * item.sale_ht / 100 :
                        item.price - item.price * item.discount / 100
            }
        )
    })

    const [passwordData, setPasswordData] = useState({})
    const [error, setError] = useState('')

     const mainChange = (e) => {
        passwordData[e.target.name] = e.target.value;
        setPasswordData(passwordData)
    }

    const addPassword = (e) => {
        e.preventDefault();
        if(!passwordData.oldpassword || !passwordData.newpassword) {
            setError("Not password")
            console.log(error,'error')
        } else {
            axios.post('https://abionew.herokuapp.com/api/account-change-password', passwordData, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            })
                .then(function (response) {
                    console.log(response.data);
                    if(response.data.status == false) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `${response.data.data}`,
                            footer: '<a href="">Why do I have this issue?</a>'
                        })
                    } else {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: `${response.data.data}`,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }


    return (
        <div>
            <Container>
                <Row>
                    <div className={css.main}>
                        <h1>{lang == 'ru' ? "Мой профиль" : lang == 'am' ? "Իմ էջը" : "My Profile"}</h1>
                        <div>
                            <div className={css.title}>
                                <span onClick={clickShow}
                                      className={show == false ? css.active : null}>
                                    {lang == 'ru' ? "Мои покупки" : lang == 'am' ? "Իմ գնումները" : "My purchases"}
                                </span>
                                <span onClick={clickShow}
                                      className={show == true ? css.active : null}>
                                    {lang == 'ru' ? "Личная информация" : lang == 'am' ? "Անձնական տեղեկատվություն" : "Personal Info"}
                                </span>
                            </div>

                            {
                                !show ?
                                    <div className={css.mainDivData}>
                                        {
                                            profileData?.map((i) => i.checkout_product_get).map((i) => {
                                                return (
                                                    <div key={i.id} className={css.best_sale_box}>
                                                        <div className={css.sal_img_blco}>
                                                            <img src={i.image} alt="ll"/>
                                                        </div>
                                                        <div className={css.sale_info_block}>
                                                            <h4>{lang == 'en' ? i.name_am : lang == 'ru' ? i.name_ru : i.name_am}</h4>
                                                            <h5>
                                                                {
                                                                i.sale_ht !== 0 || i.discount !== 0 ?
                                                                    <span className={css.saleSpan}>
                                                                        {currency !== null ? (i.price / currency).toFixed(2) + " " + many  : i.price + " " + many}
                                                                    </span> : null
                                                            }
                                                            </h5>
                                                            <h5>
                                                                {
                                                                i.sale_ht == 0 && i.discount == 0 ?
                                                                    <span>{i.price}</span> : x?.map((item) => {
                                                                        return item.idMain == i.id && (currency !== null ? (item.price / currency).toFixed(2)  : item.price)

                                                                    })
                                                            }
                                                            {" " + many}</h5>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    <div>
                                        <h3>General Info</h3>
                                        <Formik
                                            initialValues={{oldpassword: '', newpassword: ''}}
                                            validate={values => {
                                                const errors = {};
                                                if (!values.password) {
                                                    errors.password = "Requerid";
                                                } else if (!values.name) {
                                                    errors.name = "Requerid";
                                                } else if (!values.newPassword) {
                                                    errors.newPassword = "Requerid";
                                                } else if (!values.phone) {
                                                    errors.phone = "Requerid";
                                                } else if (
                                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                                ) {
                                                    errors.email = "Invalidemailaddress";
                                                }
                                                return errors;
                                            }}
                                            onSubmit={(values, {setSubmitting}) => {
                                                setTimeout(() => {
                                                    console.log(values,'55555')
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
                                              }) => (
                                                <form onChange={mainChange}  className={css.formikMain}>
                                                    <div>
                                                        <label
                                                            htmlFor="email">{lang == 'ru' ? "Пароль" : lang == 'am' ? "Գաղտնաբառ" : "Password"}</label>
                                                        <div className={css.inpFlex}>
                                                            <input
                                                                type="password"
                                                                name="oldpassword"
                                                                placeholder={lang == 'ru' ? "Пароль" : lang == 'am' ? "Գաղտնաբառ" : "Password"}
                                                                onBlur={handleBlur}
                                                            />
                                                            <span>{errors.email && touched.email && errors.email}</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="email">{lang == 'ru' ? "Новый пароль" : lang == 'am' ? "Նոր ծածկագիր" : "New Password"}</label>
                                                        <div className={css.inpFlex}>
                                                            <input
                                                                type="password"
                                                                name="newpassword"
                                                                placeholder={lang == 'ru' ? "Новый пароль" : lang == 'am' ? "Նոր ծածկագիր" : "New Password"}
                                                                onBlur={handleBlur}
                                                            />
                                                            <span>{errors.email && touched.email && errors.email}</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button type="submit" onClick={addPassword}>
                                                            {lang == 'ru' ? "Сохранять" : lang == 'am' ? "Պահպանել" : "Save"}
                                                        </button>
                                                    </div>
                                                </form>
                                            )}
                                        </Formik>
                                    </div>
                            }

                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default ProfileContainer;
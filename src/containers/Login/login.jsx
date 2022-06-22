import React, {useState, useEffect} from "react";
import styles from "./Login.module.css";
import {Container, Row, Col} from "react-bootstrap";
import {NextLink} from "../../components";
import axios from "axios";
import See from "../../svg/see.svg";
import {Formik} from "formik";
import {useRouter} from 'next/router'


const LoginContainer = () => {

    const [seePass, setSeePas] = useState(false);
    const [value, setValue] = useState({});
    const [lang, setLang] = useState();


    const router = useRouter();

    useEffect(() => {
        setLang(localStorage.getItem("language"))
    })

    const handlerSeePass = () => {
        setSeePas(!seePass);
    };


    return (
        <>
            <section>
                <Container>
                    <div className={styles.login_block}>
                        <div className={styles.login_info}>
                            <h2>
                                {lang == "am" ? "Մշտական հաճախորդ" : lang == 'ru' ? "Постоянный клиент" : "Regular customer"}
                            </h2>
                            <h2>
                                {lang == 'am' ? "Ես մշտական հաճախորդ եմ" : lang == 'ru' ? "Я постоянный клиент" : "I am a regular customer"}
                            </h2>
                            <Formik
                                initialValues={{email: '', password: ''}}
                                validate={values => {
                                    const errors = {};
                                    if (!values.email) {
                                        errors.email = 'Required';
                                    } else if (!values.password) {
                                        errors.password = `${lang == 'am' ? "Պահանջվում է" : lang == 'ru' ? "Необходимый" : "Required"}`;
                                    } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                    ) {
                                        errors.email = `${lang == 'am' ? "Անվավեր էլ․ հասցե" : lang == 'ru' ? "Неверный адрес электронной почты" : "Invalid email address"}`;
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, {setSubmitting}) => {
                                    setTimeout(() => {
                                        axios.post('https://abionew.herokuapp.com/api/login', values)
                                            .then(function (response) {
                                                if (response.data.token) {
                                                    localStorage.setItem("token", response.data.token)
                                                    router.push({
                                                        pathname: '/',
                                                    });
                                                }
                                            })
                                            .catch(function (error) {
                                                console.log(error);
                                            });
                                        values.email = ''
                                        values.password = ''
                                        setSubmitting(false);
                                    }, 400);
                                }}
                            >
                                {({
                                      values,
                                      errors,
                                      touched,
                                      handleChange,
                                      handleSubmit,
                                  }) => (
                                    <form onSubmit={handleSubmit}>
                                        <input
                                            type="email"
                                            placeholder={lang == 'am' ? "Էլ․ փոստի հասցե" : lang == 'ru' ? "Эл. почта" : "E-mail"}
                                            name="email"
                                            onChange={handleChange}
                                            value={values.email}
                                        />
                                        {errors.email && touched.email && errors.email}
                                        <div className={styles.pass_div}>
                                            <See className={styles.see_pas} onClick={handlerSeePass}/>
                                            {seePass ? (
                                                <input
                                                    type="text"
                                                    placeholder={lang == 'am' ? "Գաղտնաբառ" : lang == 'ru' ? "Пароль" : "Password"}
                                                    name="password"
                                                    onChange={handleChange}
                                                    value={values.password}
                                                />
                                            ) : (
                                                <input
                                                    type="password"
                                                    placeholder={lang == 'am' ? "Գաղտնաբառ" : lang == 'ru' ? "Пароль" : "Password"}
                                                    name="password"
                                                    onChange={handleChange}
                                                    value={values.password}
                                                />
                                            )}
                                            {errors.password && touched.password && errors.password}
                                            <div className={styles.links}>
                                                <NextLink to="/forget">
                                                    {lang == 'am' ? "Մոռացել եմ ծածկագիրը" : lang == 'ru' ? "Я забыл мой пароль" : "I forgot my password"}
                                                </NextLink>
                                                <button type="submit">
                                                    {lang == 'am' ? "Մուտք" : lang == 'ru' ? "Авторизоваться" : "Login"}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default LoginContainer;

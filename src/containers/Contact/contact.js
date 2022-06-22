import React, {useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap";
import css from "./contact.module.css";
import Location from "../../svg/location.svg";
import Phone from "../../svg/phone.svg";
import Mail from "../../svg/mail.svg";
import Clock from "../../svg/clock.svg";
import Iframe from "react-iframe";
import {useDispatch, useSelector} from "react-redux";
import {contact_get} from "../../redux/actions/contact.action";
import {contactReducer} from "../../redux/reducers/contactReducer";
import {Formik} from "formik";
import axios from "axios";

const ContactContainer = () => {

    const contactMain = useSelector(state => state.contactReducer.contactData);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(contact_get())
    }, []);


    return (
        <div>
            <div className={css.bgMain}>
                <h2>Հետադարձ կապ</h2>
            </div>
            <Container>
                <Row className="mb-5">
                    {
                        contactMain?.map((item) => {
                            return (
                                <Col lg={6} md={6} sm={12}>
                                    <div className={css.mainOne}>
                                        <h6>Կապ</h6>
                                        <div className={css.divLocationMain}>
                                            <div className={css.divLocation}>
                                                <Location/>
                                                <p>ABIO Այգեգործական հիպերմարկետ</p>
                                            </div>
                                            <p className={css.locP}>
                                                {item.location_am}
                                            </p>
                                        </div>
                                        <div className={css.divPhoneMain}>
                                            <div className={css.divLocation}>
                                                <Phone/>
                                                <p>Հեռախոս (Viber, WhatsApp)</p>
                                            </div>
                                            <p className={css.locP}>
                                                {item.phone}
                                            </p>
                                        </div>

                                        <div className={css.divMailMain}>
                                            <div className={css.divLocation}>
                                                <Mail/>
                                                <p>Էլ․ փոստի հասցե</p>
                                            </div>
                                            <p className={css.locP}>
                                                {item.email}
                                            </p>
                                        </div>

                                        <div className={css.divMailMain}>
                                            <div className={css.divLocation}>
                                                <Clock/>
                                                <p>Աշխ. ժամերը</p>
                                            </div>
                                            <p className={css.locP}>
                                                {item.work_hours}
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                            )
                        })
                    }
                    <Col lg={6} md={6} sm={12} className="mb-5">
                        <div className={css.divTwo}>
                            <h6>Գրեք մեզ</h6>
                            <Formik
                                initialValues={{email: '', name: '', message: ''}}
                                validate={values => {
                                    const errors = {};
                                    if (!values.email) {
                                        errors.email = 'Required';
                                    } else if (!values.name) {
                                        errors.name = 'Required'
                                    } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                    ) {
                                        errors.email = 'Invalid email address';
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, {setSubmitting}) => {
                                    setTimeout(() => {
                                        axios.post('https://abionew.herokuapp.com/api/contact-message', values)
                                            .then(function (response) {
                                            })
                                            .catch(function (error) {
                                                console.log(error);
                                            });
                                        setSubmitting(false);
                                    }, 100);
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
                                    <form onSubmit={handleSubmit}>
                                        <div className={css.divInputs}>
                                            <input
                                                type="text"
                                                name="name"
                                                onChange={handleChange}
                                                value={values.name}
                                            />
                                            <span className={css.error}>
                                            {errors.name && touched.name && errors.name}
                                            </span>
                                            <input
                                                type="email"
                                                name="email"
                                                onChange={handleChange}
                                                value={values.email}
                                            />
                                            <span className={css.error}>
                                            {errors.email && touched.email && errors.email}
                                            </span>
                                            <textarea type="text" onChange={handleChange} value={values.message} name="message"
                                                      placeholder={"Հարցում"} />
                                        </div>
                                        <div className={css.divBtn}>
                                            <button type="submit" disabled={isSubmitting}>
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </Col>
                    <Col lg={12} md={12} xs={6} className="mt-5 mb-5">
                        <Iframe
                            url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3417.514410340162!2d44.59711044453477!3d40.26110262900499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406aa1fb02482283%3A0x339ad77fd03f3065!2sABIO%20Garden%20Center!5e0!3m2!1sen!2s!4v1642499947794!5m2!1sen!2s"
                            width="100%"
                            height="330vh"
                            id="myId"
                            className="myClassname"
                            display="initial"
                            position="relative"
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ContactContainer;

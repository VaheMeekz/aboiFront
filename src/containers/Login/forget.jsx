import React, {useState} from "react";
import styles from "./Login.module.css";
import {Button, Container, Modal} from "react-bootstrap";
import axios from 'axios';
import {Formik} from 'formik';
import Swal from 'sweetalert2';
import {useRouter} from 'next/router';
import {NextLink} from "../../components";

const ForgetContainer = () => {

        const router = useRouter()

        const [modalShow, setModalShow] = React.useState(false);

        function MyVerticallyCenteredModal(props) {
            return (
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>

                    </Modal.Header>
                    <Modal.Body>
                        <div className={styles.modalMain}>
                            <h5>Чтобы найти свой аккаунт, введите ваш электронный адрес</h5>
                            <Formik
                                initialValues={{ code: '', password: '' }}
                                validate={values => {
                                    const errors = {};
                                    if (!values.code) {
                                        errors.code = 'Required';
                                    } else if (!values.password) {
                                        errors.password = 'Required';
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
                                        axios.post('https://abionew.herokuapp.com/api/reset-password/change-password', values)
                                            .then(function (response) {
                                                if (response.data.status == true) {
                                                    Swal.fire({
                                                        position: 'top-end',
                                                        icon: 'success',
                                                        title: 'Your work has been saved',
                                                        showConfirmButton: false,
                                                        timer: 1500
                                                    })
                                                    router.push("/login")
                                                } else {
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Oops...',
                                                        text: 'Something went wrong!'
                                                    })
                                                }
                                            })
                                            .catch(function (error) {
                                                console.log(error);
                                            });
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
                                    <form onSubmit={handleSubmit}>
                                        <div className={styles.errDiv}>
                                            <input
                                                type="text"
                                                name="code"
                                                placeholder={'Code'}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.code}
                                            />
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder={'New Password'}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                            />
                                           <span>
                                               {errors.code && touched.code && errors.code}
                                           </span>
                                        </div>
                                        <button type="submit" disabled={isSubmitting} className={styles.modalBtn}>
                                            Submit
                                        </button>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {/*<Button className={styles.modalBtn} onClick={sendEmail}>Send</Button>*/}
                    </Modal.Footer>
                </Modal>
            );
        }

        return (
            <>
                <section>
                    <Container>
                        <div className={styles.forget_big_block}>
                            <div className={styles.forget_info_block}>
                                <h2 className={styles.forget_pass}>Մոռացել եք գաղտնաբա՞ռը</h2>
                                <p>
                                    Մուտքագրեք Ձեր Էլ-փոստի հասցեն որով գրանցվելեք կայքում, սեղմեք
                                    հաստատել և դուք կստանաք նոր գաղտնաբառ ձեր Էլ փոստի հասցեով.
                                </p>
                                <Formik
                                    initialValues={{email: ''}}
                                    validate={values => {
                                        const errors = {};
                                        if (!values.email) {
                                            errors.email = 'Required';
                                        } else if (
                                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                        ) {
                                            errors.email = 'Invalid email address';
                                        }
                                        return errors;
                                    }}
                                    onSubmit={(values, {setSubmitting}) => {
                                        setTimeout(() => {
                                            axios.post('https://abionew.herokuapp.com/api/reset-password/email', values)
                                                .then(function (response) {
                                                    Swal.fire({
                                                        position: 'top-end',
                                                        icon: 'success',
                                                        title: 'Your work has been saved',
                                                        showConfirmButton: false,
                                                        timer: 1500
                                                    })
                                                })
                                                .catch(function (error) {
                                                    console.log(error);
                                                });
                                            // router.push("/reset")
                                            setModalShow(true)
                                            setSubmitting(false);
                                        }, 400);
                                        // values.email = ""
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
                                            <MyVerticallyCenteredModal
                                                show={modalShow}
                                                onHide={() => setModalShow(false)}
                                            />
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Էլ․ փոստի հասցե"
                                                onChange={handleChange}
                                                value={values.email}
                                            />
                                            {errors.email && touched.email && errors.email}
                                            <div className={styles.sned_block}>
                                                <button type="submit" disabled={isSubmitting}>Շարունակել</button>
                                                <NextLink to="/reset">Վերադառնալ</NextLink>
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
    }
;

export default ForgetContainer;

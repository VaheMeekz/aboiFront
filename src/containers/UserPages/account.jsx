import React, { useState, useEffect } from "react";
import styles from "./UserPage.module.css";
import { Container, Row, Col } from "react-bootstrap";
import See from "../../svg/see.svg";
import { Formik } from "formik";
import studentValidator from "./validators/studentValidator";
import Swal from "sweetalert2";

const AccountCntainer = () => {
  const count = [1, 2, 3];
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [value, setValue] = useState();
  const ValidationSchema = studentValidator;

  const handlerSignUp = (e) => {
    value[e.target.name] = e.target.value;

    setValue(value);
  };

  return (
    <>
      <Container>
        <Formik
          initialValues={{
            old_password: "",
            new_password: "",
            password_confirmation: "",
          }}
          validationSchema={ValidationSchema}
          onSubmit={(values) => {
            // values["role"] = "teacher";
            // axios
            //   .patch(`${keys.BACKEND_URI}auth/reset`, values)
            //   .then((res) => {
            //     console.log(res.data, "stugum zapros");
            //     // let localItem = {
            //     //   id: res.data.id,
            //     //   token: res.data.token,
            //     // };
            //     // localStorage.setItem(
            //     //   keys.AUTH,
            //     //   JSON.stringify(localItem)
            //     // );
            //     // window.location.href = "/profile";
            //   })
            //   .catch((e) => {
            //     alert("Սխալ տվյալների մուտքագրում");
            //   });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                Swal.fire({
                  position: "top-start",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 1000,
                });
                // const token = JSON.parse(localStorage.getItem(keys.AUTH));

                // let upd = {
                //   old_password: values.old_password,
                //   new_password: values.new_password,
                // };
                // axios
                //   .patch(`${keys.BACKEND_URI}auth/reset`, upd, {
                //     headers: {
                //       "x-access-token": token.token,
                //     },
                //   })
                //   .then((res) => {
                //     console.log(res.data, "stugum zapros");

                //     Swal.fire({
                //       position: "top-start",
                //       icon: "success",
                //       showConfirmButton: false,
                //       timer: 1000,
                //     });
                //   })
                //   .catch((e) => {
                //     Swal.fire({
                //       position: "top-start",
                //       showConfirmButton: false,
                //       timer: 1000,
                //       icon: "error",
                //     });
                //   });
              }}
              action=""
              className={styles.accountuserbox}
              onChange={handleChange}
            >
              <h2 className={styles.title}>Հաշվի տվյալներ</h2>
              <div className={styles.infoUserBlock}>
                <div className={styles.input_block}>
                  <input type="text" placeholder="Անուն" />
                  <input type="tel" placeholder="Հեռախոսահամար" />
                </div>
                <div className={styles.input_block2}>
                  <input type="text" placeholder="Ազգանուն" />
                  <input type="email" placeholder="Էլ, փոստի հասցե" />
                </div>
              </div>
              <div className={styles.password_block}>
                <div className={styles.password_input_box}>
                  <h3 className={styles.title}>Գաղտնաբառ</h3>
                  <div className={styles.inout_pass}>
                    <See
                      className={styles.see_pas}
                      onClick={() => setShow1(!show1)}
                    />
                    <input
                      type={show1 ? "text" : "password"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="old_password"
                    />
                    {touched.old_password && errors.old_password && (
                      <small className={styles.errore_messige}>
                        {errors.old_password}
                      </small>
                    )}
                  </div>
                  <div className={styles.inout_pass}>
                    <See
                      className={styles.see_pas}
                      onClick={() => setShow2(!show2)}
                    />
                    <input
                      type={show2 ? "text" : "password"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name={"new_password"}
                      id="password"
                    />
                    {touched.new_password && errors.new_password && (
                      <small className={styles.errore_messige}>
                        {errors.new_password}
                      </small>
                    )}
                  </div>
                  <div className={styles.inout_pass}>
                    <See
                      className={styles.see_pas}
                      onClick={() => setShow3(!show3)}
                    />

                    <input
                      type={show3 ? "text" : "password"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name={"password_confirmation"}
                      id="confirm"
                    />
                    {touched.password_confirmation &&
                      errors.password_confirmation && (
                        <small className={styles.errore_messige}>
                          {errors.password_confirmation}
                        </small>
                      )}
                  </div>
                </div>
                <button className={styles.saveChange}>
                  Պահպանել փոփոխությունները
                </button>
              </div>
            </form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default AccountCntainer;

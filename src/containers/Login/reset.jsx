import React, { useState } from "react";
import styles from "./Login.module.css";
import { Container } from "react-bootstrap";
import { NextLink } from "../../components";
import See from "../../svg/see.svg";

const ResetContainer = () => {
  const [seePass, setSeePas] = useState(false);
  const [seePass1, setSeePas1] = useState(false);
  const handlerSeePass = () => {
    setSeePas(!seePass);
  };

  const handlerSeePass1 = () => {
    setSeePas1(!seePass1);
  };
  return (
    <>
      <section>
        <Container>
          <div className={styles.login_block}>
            <div className={styles.login_info}>
              <h2>Գաղտնաբառի վերականգնում</h2>
              <div className={styles.pass_div}>
                <See className={styles.see_pas} onClick={handlerSeePass} />

                {seePass ? (
                  <input type="text" placeholder="Գաղտնաբառ" />
                ) : (
                  <input type="password" placeholder="Գաղտնաբառ" />
                )}
              </div>
              {/* <input type="email" placeholder="Էլ․ փոստի հասցե" /> */}
              <div className={styles.pass_div}>
                <See className={styles.see_pas} onClick={handlerSeePass1} />

                {seePass1 ? (
                  <input type="text" placeholder="Գաղտնաբառ" />
                ) : (
                  <input type="password" placeholder="Գաղտնաբառ" />
                )}
                <div className={styles.links}>
                  <NextLink to="/forget">Մոռացել եմ ծածկագիրը</NextLink>
                  <button type="submit" className={styles.send}>
                    Մուտք
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ResetContainer;

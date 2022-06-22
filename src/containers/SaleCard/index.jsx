import React from "react";
import styles from "./SaleCard.module.css";
import { Container, Row, Col } from "react-bootstrap";

const SaleCardContainer = () => {
  return (
    <>
      <section className={styles.abut_banner}>
        <Container>
          <div className={styles.title}>
            <h1>Նվեր Քարտեր</h1>
          </div>
        </Container>
      </section>
      <section>
        <Container>
          <div className={styles.info_banner}>
            <Row>
              <Col sm={12} md={6} lg={6}>
                <div className={styles.banner_img}>
                  <img src="/assets/-20.png" alt="img" />
                </div>
              </Col>
              <Col sm={12} md={6} lg={6}>
                <div className={styles.banner_text}>
                  <h3>
                    Աբիոն հանդիսանում է Հայաստանում գործող առաջատար այգեգործական
                    հիպերմարկետներից մեկը:
                  </h3>
                  <p>
                    Ընկերությունն առաջարկում է բույսերի, սերմերի,
                    հողախառնուրդների, պարարտանյութերի, ծաղկամանների,
                    այգեգործական պարագաների, կահույքի և դեկորի մեծ ընտրանի:
                  </p>
                  <div className={styles.second_img_box}>
                    <img src="/assets/ent.png" alt="" />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
        <Container>
          <Row>
            <Col sm={12} md={6} lg={6}>
              <div className={styles.gif_card_block}>
                <img src="/assets/-10.png" alt="" />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className={styles.gif_card_block}>
                <img src="/assets/-20.png" alt="" />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className={styles.gif_card_block}>
                <img src="/assets/-30.png" alt="" />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className={styles.gif_card_block}>
                <img src="/assets/-40.png" alt="" />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className={styles.gif_card_block}>
                <img src="/assets/-50.png" alt="" />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className={styles.gif_card_block}>
                <img src="/assets/-60.png" alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
export default SaleCardContainer;

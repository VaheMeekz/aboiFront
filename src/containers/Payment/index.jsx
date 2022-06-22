import Rewact from "react";
import styles from "./Payment.module.css";
import { Container, Row, Col } from "react-bootstrap";
const PaymentContainer = () => {
  return (
    <>
      <section className={styles.abut_banner}>
        <Container>
          <div className={styles.title}>
            <h1>փոխկապակցված ծրագրեր</h1>
          </div>
        </Container>
      </section>
      <section>
        <Container>
          <div className={styles.info_banner}>
            <Row>
              <Col sm={12} md={6} lg={6}>
                <div className={styles.banner_img}>
                  <img src="/assets/1.png" alt="img" />
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
                    Ընկերությունը մեծ ուշադրություն է հատկացնում մասնագիտական
                    խորհրդատվության տրամադրմանը։ Այսօր Աբիոն հանդիսանում է այս
                    ոլորտում առաջատար ընկերություններից մեկը` վայելելով
                    հաճախորդների վստահությունը: Մենք երաշխավորում ենք գնված
                    ապրանքի որակը և արդյունավետությունը՝ ակնկալելով ձեր
                    վստահությունն ու համագործակցությունը:{" "}
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
      <section>
        <Container>
          <div className={styles.info_banners}>
            <Row>
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
                    Ընկերությունը մեծ ուշադրություն է հատկացնում մասնագիտական
                    խորհրդատվության տրամադրմանը։ Այսօր Աբիոն հանդիսանում է այս
                    ոլորտում առաջատար ընկերություններից մեկը` վայելելով
                    հաճախորդների վստահությունը: Մենք երաշխավորում ենք գնված
                    ապրանքի որակը և արդյունավետությունը՝ ակնկալելով ձեր
                    վստահությունն ու համագործակցությունը:{" "}
                  </p>
                </div>
              </Col>
              <Col sm={12} md={6} lg={6}>
                <div className={styles.banner_img}>
                  <img src="/assets/1.png" alt="img" />
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </>
  );
};

export default PaymentContainer;

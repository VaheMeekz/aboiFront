import React, {useEffect} from "react";
import styles from "./GifCard.module.css";
import { Container, Row, Col } from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {giftCart_get} from "../../redux/actions/giftCat.action";
import {giftCartReducer} from "../../redux/reducers/giftCartReducer";

const GifCardContainer = () => {

  const giftCartMain = useSelector(state => state.giftCartReducer.giftCart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(giftCart_get());
  },[])


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
                  <img src="/assets/20.png" alt="img" />
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
                    <img src="/assets/21.png" alt="" />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
        <Container>
          <Row>
            {
              giftCartMain[0]?.map((item) => {
                return (
                    <Col sm={12} md={6} lg={6}>
                      <div className={styles.gif_card_block}>
                        <img src={item.image} alt="" />
                      </div>
                    </Col>
                )
              })
            }
          </Row>
        </Container>
      </section>
    </>
  );
};
export default GifCardContainer;

import React, {useEffect, useState} from "react";
import styles from "./Aprograms.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { NextLink } from "../../components";
const AprogramsContainer = () => {


  const [lang, setLang] = useState();

  useEffect(() => {
    setLang(localStorage.getItem("language"));
  });

  return (
    <>
      <section className={styles.abut_banner}>
        <Container>
          <div className={styles.title}>
            <h1>{lang == 'am' ? "Վճարում և առաքում" : lang == 'ru' ? "Оплата и доставка" : "Payment and delivery"}</h1>
          </div>
        </Container>
      </section>
      <section>
        <Container>
          <div className={styles.info_banner}>
            <Row>
              {/* <div className={styles.bg_block}> */}
              <Col sm={12} md={6} lg={8}>
                <div className={styles.banner_text}>
                  <h3>
                    {lang == 'am' ?
                     "Աբիոն հանդիսանում է Հայաստանում գործող առաջատար այգեգործական հիպերմարկետներից մեկը:"
                    : lang == "ru" ? "Abio – один из ведущих садоводческих гипермаркетов в Армении."
                    : "Abio is one of the leading horticultural hypermarkets in Armenia."
                    }
                  </h3>
                  <p>
                    
                    {
                      lang == 'am' ? 
                      "Ընկերությունն առաջարկում է բույսերի,սերմերի,հողախառնուրդների, պարարտանյութերի, ծաղկամանների, այգեգործական պարագաների, կահույքի և դեկորի մեծ ընտրանի:Ընկերությունը մեծ ուշադրություն է հատկացնում մասնագիտական  խորհրդատվության տրամադրմանը։ Այսօր Աբիոն հանդիսանում է այս ոլորտում առաջատար ընկերություններից մեկը` վայելելով հաճախորդների վստահությունը: Մենք երաշխավորում ենք գնված ապրանքի որակը և արդյունավետությունը՝ ակնկալելով ձեր  վստահությունն ու համագործակցությունը:" 
                      : lang == 'ru' ? 
                      "Компания предлагает большой выбор растений, семян, почвенных смесей, удобрений, ваз, садовых принадлежностей, мебели и декора.Компания уделяет большое внимание предоставлению профессиональных консультаций. На сегодняшний день Abio является одной из ведущих компаний в этой области, пользующейся доверием своих клиентов. Мы гарантируем качество и эффективность купленного товара, рассчитывая на ваше доверие и сотрудничество." 
                      : "The company offers a large selection of plants, seeds, soil mixtures, fertilizers, vases, gardening accessories, furniture and decor. The company pays great attention to providing professional advice. Today, Abio is one of the leading companies in this field, enjoying the trust of its customers. We guarantee the quality and efficiency of the purchased product, expecting your trust and cooperation." 
                    }
                  </p>
                  <NextLink exact to="/contact" className={styles.butt}>
                    
                    {lang == 'am' ? "Կապվեք մեզ հետ" : lang == "ru" ? "Свяжитесь с нами" : "Contact us"}
                  </NextLink>
                </div>
              </Col>
              <Col sm={12} md={6} lg={4}>
                <div className={styles.banner_img}>
                  <img src="/assets/partner.png" alt="img" />
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </>
  );
};

export default AprogramsContainer;

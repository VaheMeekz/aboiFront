import React, {useEffect, useState} from "react";
import { Col, Container, Row, Accordion } from "react-bootstrap";
import SvgFooter from "../../svg/log.svg";
import css from "./footer.module.css";
import NextLink from "../NextLink";
import Location from "../../svg/location.svg";
import Phone from "../../svg/phone.svg";
import Mail from "../../svg/mail.svg";
import {useDispatch, useSelector} from "react-redux";
import {contact_get} from "../../redux/actions/contact.action";
import {contactReducer} from "../../redux/reducers/contactReducer";

const Footer = () => {

  const [lang, setLang] = useState();

  const contactData = useSelector(state => state.contactReducer.contactData)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(contact_get())
  },[])

  useEffect(() => {
    setLang(localStorage.getItem("language"))
  });

  console.log(contactData,'contactData')

  return (
    <>
      <div className={css.footerMain}>
        <Container>
          <Row>
            <Col lg={4} md={6} xs={12}>
              <div className={css.divTexekatvutyun}>
                <div className={css.info_box}>
                  <ul>
                    <li>
                      <NextLink to="/about">
                        {lang == 'am' ? "Մեր մասին" : lang == "ru" ? "O нас" : "About"}
                      </NextLink>
                    </li>
                    <li>
                      <NextLink to="/services">
                        {lang == 'am' ? "Ծառայություններ" : lang == "ru" ? "Услуги" : "Services"}
                      </NextLink>
                    </li>
                    <li>
                      <NextLink to="/payment">
                        {lang == 'am' ? "Վճարում և առաքում" : lang == "ru" ? "Оплата и доставка" : "Payment and delivery"}
                      </NextLink>
                    </li>
                    <li>
                      <NextLink to="/contact">
                        {lang == 'am' ? "Կապ մեզ հետ" : lang == "ru" ? "Свяжитесь с нами" : "Contact us"}
                      </NextLink>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col lg={4} md={2} xs={12}>
              <div className={css.divQartez}>
                <ul>
                  <li>
                    <NextLink to="/gifCart">
                      {lang == 'am' ? "Նվեր Քարտեր" : lang == "ru" ? "Подарочные карты" : "Gift Cards"}
                    </NextLink>
                  </li>
                  <li>
                    <NextLink to="/saleCard">
                      {lang == 'am' ? "Զեղչ" : lang == "ru" ? "Скидка" : "Discount"}
                    </NextLink>
                  </li>
                  <li>
                    <NextLink to="/aprogrms">
                      {lang == 'am' ? "Գործընկերության ծրագրեր" : lang == "ru" ? "Партнерские программы" : "Partnership programs"}
                    </NextLink>
                  </li>
                  <li>
                    <NextLink to="/condition">
                      {lang == 'am' ? "Վերադարձի պայմանները" : lang == "ru" ? "Условия возврата" : "Return conditions"}
                    </NextLink>
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={4} md={3} xs={12}>
              <div className={css.divKap}>
                <div className={css.divKap2}>
                  <ul>
                    <li>
                      <Location />
                      <NextLink to="/">
                        {
                          contactData?.map((item) => {
                            return (
                                lang == 'am' ? item.location_am
                                    : lang == "ru" ? item.location_ru
                                        : item.location_en
                            )
                          })
                        }
                      </NextLink>
                    </li>
                    <li>
                      <Phone />
                      <NextLink to="/">
                        {
                          contactData?.map((item) => {
                            return item.phone
                          })
                        }
                      </NextLink>
                    </li>
                    <li>
                      <Mail />
                      <NextLink to="/career">
                        {
                          contactData?.map((item) => {
                            return item.email
                          })
                        }
                      </NextLink>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <section className={css.section}>
        <Container>
          <Row>
            <Col sm={12} md={12} lg={12}>
              <div className={css.by}>
                <p>
                  ArmCoding
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Footer;

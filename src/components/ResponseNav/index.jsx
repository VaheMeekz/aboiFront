import React, { useState } from "react";
import styles from "./ResponseNav.module.css";
import { Container, Accordion } from "react-bootstrap";
import Logo from "../../svg/log.svg";
import NextLink from "../NextLink";
import { buyserGet, buyserSalesGet } from "../../redux/actions/product.acion";
import { useDispatch, useSelector } from "react-redux";

const ResponseNav = () => {
  const [active, setActive] = useState(false);
  const [name, setName] = useState("Ամբողջ Տեսականի");
  const [categoryNamee, setCategoryNamee] = useState();

  const dispatch = useDispatch();

  const handleClick = () => {
    setActive(!active);
  };

  const getNameHeader = (name) => {
    setName(name);
    dispatch(buyserGet(name));
    setActive(!active);
  };

  const getCategoryNameHeader = (name, categoryNamee) => {
    setCategoryNamee(categoryNamee);
    dispatch(buyserGet(name, categoryNamee));
    setActive(!active);
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.burger_block}>
          <div className={styles.responseStyle}>
            <NextLink exat to="/">
              <Logo />
            </NextLink>
          </div>
          <i
            className={active ? "fas fa-times" : "fas fa-bars"}
            onClick={handleClick}
          ></i>
        </div>
        <ul className={active ? styles.activ_nav : styles.just_nav}>
          <li>
            <NextLink to="/" activeClassName={styles.active}>
              Home
            </NextLink>
          </li>
          <li>
            <NextLink to="/product" activeClassName={styles.active}>
              Տեսականի
            </NextLink>
          </li>
          <Accordion>
            <div className={styles.acard_nav}>
              <li>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Բույսեր </Accordion.Header>
                  <Accordion.Body>
                    <NextLink
                      className={styles.a}
                      to="/product"
                      onClick={() => getNameHeader("Բույսեր")}
                    >
                      Բույսեր
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      onClick={() =>
                        getCategoryNameHeader("Բույսեր", "Ֆալենոպսիս")
                      }
                      //
                    >
                      Ֆալենոպսիս
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      onClick={() =>
                        getCategoryNameHeader("Բույսեր", "Սենյակային բույսեր")
                      }
                    >
                      Սենյակային բույսեր
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      onClick={() =>
                        getCategoryNameHeader("Բույսեր", "Այգու բույսեր")
                      }
                    >
                      Այգու բույսեր
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      onClick={() =>
                        getCategoryNameHeader("Բույսեր", "Տնկիներ")
                      }
                    >
                      Տնկիներ
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      onClick={() => getCategoryNameHeader("Բույսեր", "Սերմեր")}
                    >
                      Սերմեր
                    </NextLink>
                  </Accordion.Body>
                </Accordion.Item>
              </li>
              {/* ==============2================ */}
              <li>
                {/* <Accordion> */}
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Հողախառնուրդներ </Accordion.Header>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      className={styles.a}
                      onClick={() =>
                        getNameHeader("Հողախառնուրդներ, պարարտանյութեր")
                      }
                    >
                      Հողախառնուրդներ, պարարտանյութեր
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      onClick={() =>
                        getCategoryNameHeader(
                          "Հողախառնուրդներ, պարարտանյութեր",
                          "Հողախառնուրդներ"
                        )
                      }
                    >
                      Հողախառնուրդներ
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      onClick={() =>
                        getCategoryNameHeader(
                          "Հողախառնուրդներ, պարարտանյութեր",
                          "Պարարտանյութեր"
                        )
                      }
                    >
                      Պարարտանյութեր
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      onClick={() =>
                        getCategoryNameHeader(
                          "Հողախառնուրդներ, պարարտանյութեր",
                          "Պարարտանյութեր"
                        )
                      }
                    >
                      Պարարտանյութեր
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      onClick={() =>
                        getCategoryNameHeader(
                          "Հողախառնուրդներ, պարարտանյութեր",
                          "Բնական, բուսական օրգանական միջոցներ"
                        )
                      }
                    >
                      Բնական միջոցներ
                    </NextLink>
                  </Accordion.Body>
                </Accordion.Item>
                {/* </Accordion> */}
              </li>
              {/* =========================3 */}
              <li>
                {/* <Accordion> */}
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Ծաղկամաններ </Accordion.Header>
                  <Accordion.Body>
                    <NextLink
                      className={styles.a}
                      to="/product"
                      onClick={() => getNameHeader("Ծաղկամաններ")}
                    >
                      Ծաղկամաններ
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      onClick={() =>
                        getCategoryNameHeader(
                          "Ծաղկամաններ",
                          "Պլաստմասե ծաղկամաններ"
                        )
                      }
                    >
                      Պլաստմասե ծաղկամաններ
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      onClick={() =>
                        getCategoryNameHeader(
                          "Ծաղկամաններ",
                          "Կերամիկական ծաղկամաններ"
                        )
                      }
                    >
                      Կերամիկական ծաղկամաններ
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      onClick={() =>
                        getCategoryNameHeader(
                          "Ծաղկամաններ",
                          "Գիպսոբետոնե ծաղկամաններ"
                        )
                      }
                    >
                      Գիպսոբետոնե ծաղկամաններ
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      onClick={() =>
                        getCategoryNameHeader(
                          "Ծաղկամաններ",
                          "Ֆիբրե ծաղկամաններ"
                        )
                      }
                    >
                      Ֆիբրե ծաղկամաններ
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      onClick={() =>
                        getCategoryNameHeader("Ծաղկամաններ", "Փայտյա կաշպոներ")
                      }
                    >
                      Փայտյա կաշպոներ
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      onClick={() =>
                        getCategoryNameHeader("Ծաղկամաններ", "Ծղոտե կաշպոներ")
                      }
                    >
                      Ծղոտե կաշպոներ
                    </NextLink>
                  </Accordion.Body>
                </Accordion.Item>
                {/* </Accordion> */}
              </li>
              {/* ====================4================ */}
              <li>
                {/* <Accordion> */}
                <Accordion.Item eventKey="3">
                  <Accordion.Header> Այգու գործիքներ</Accordion.Header>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      className={styles.a}
                      onClick={() => getNameHeader("Այգու գործիքներ")}
                    >
                      Այգու գործիքներ
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      onClick={() =>
                        getCategoryNameHeader(
                          "Այգու գործիքներ",
                          "Այգեգործական գործիքներ"
                        )
                      }
                    >
                      Այգեգործական գործիքներ
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      onClick={() =>
                        getCategoryNameHeader("Այգու գործիքներ", "Հագուստ")
                      }
                    >
                      Հագուստ
                    </NextLink>
                  </Accordion.Body>
                </Accordion.Item>
                {/* </Accordion> */}
              </li>
              {/* ====================5================ */}
              <li>
                {/* <Accordion> */}
                <Accordion.Item eventKey="4">
                  <Accordion.Header> Կահույք և դեկոր</Accordion.Header>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      className={styles.a}
                      onClick={() => getNameHeader("Կահույք և դեկոր")}
                    >
                      Կահույք և դեկոր
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      onClick={() =>
                        getCategoryNameHeader(
                          "Կահույք և դեկոր",
                          "Ամառանոցային կահույք"
                        )
                      }
                    >
                      Ամառանոցային կահույք
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      onClick={() =>
                        getCategoryNameHeader("Կահույք և դեկոր", "Տաղավարներ")
                      }
                    >
                      Տաղավարներ
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      onClick={() =>
                        getCategoryNameHeader(
                          "Կահույք և դեկոր",
                          "Փայտյա պահարան"
                        )
                      }
                    >
                      Փայտյա պահարան
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      onClick={() =>
                        getCategoryNameHeader("Կահույք և դեկոր", "Զարդատուփ")
                      }
                    >
                      Զարդատուփ
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      onClick={() =>
                        getCategoryNameHeader("Կահույք և դեկոր", "Ֆիբրե դեկոր")
                      }
                    >
                      Ֆիբրե դեկոր
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      onClick={() =>
                        getCategoryNameHeader(
                          "Կահույք և դեկոր",
                          "Մետաղյա դեկոր"
                        )
                      }
                    >
                      Մետաղյա դեկոր
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      onClick={() =>
                        getCategoryNameHeader("Կահույք և դեկոր", "Փայտյա դեկոր")
                      }
                    >
                      Փայտյա դեկոր
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      onClick={() =>
                        getCategoryNameHeader("Կահույք և դեկոր", "Ծղոտե դեկոր")
                      }
                    >
                      Ծղոտե դեկոր
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      onClick={() =>
                        getCategoryNameHeader("Կահույք և դեկոր", "Ապակե դեկոր")
                      }
                    >
                      Ապակե դեկոր
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      onClick={() =>
                        getCategoryNameHeader(
                          "Կահույք և դեկոր",
                          "Արհեստական դեկոր"
                        )
                      }
                    >
                      Արհեստական դեկոր
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      onClick={() =>
                        getCategoryNameHeader(
                          "Կահույք և դեկոր",
                          "Ամանորյա դեկոր"
                        )
                      }
                    >
                      Ամանորյա դեկոր
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body></Accordion.Body>
                  <Accordion.Body></Accordion.Body>
                </Accordion.Item>
                {/* </Accordion> */}
              </li>
              {/* ===================6================= */}
              <li>
                {/* <Accordion> */}
                <Accordion.Item eventKey="5">
                  <Accordion.Header>Պիկնիկի համար</Accordion.Header>

                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      className={styles.a}
                      onClick={() => getNameHeader("Պիկնիկի համար")}
                    >
                      Պիկնիկի համար
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      onClick={() =>
                        getCategoryNameHeader(
                          "Պիկնիկի համար",
                          "Պիկնիկի պարագաներ"
                        )
                      }
                    >
                      Պիկնիկի պարագաներ
                    </NextLink>
                  </Accordion.Body>
                  <Accordion.Body>
                    <NextLink
                      to="/product"
                      onClick={() =>
                        getCategoryNameHeader("Պիկնիկի համար", "Տուփ")
                      }
                    >
                      Տուփ
                    </NextLink>
                  </Accordion.Body>
                </Accordion.Item>
                {/* </Accordion> */}
              </li>
            </div>
          </Accordion>
          {/* ===================7================= */}
          <li>
            <NextLink to="/sales" activeClassName={styles.active}>
              Զեղչեր
            </NextLink>
          </li>
          <li>
            <NextLink to="/about" activeClassName={styles.active}>
              Մեր մասին
            </NextLink>
          </li>
          <li>
            <NextLink to="/offer" activeClassName={styles.active}>
              Հատուկ առաջարկներ
            </NextLink>
          </li>
          <li>
            <NextLink to="/services" activeClassName={styles.active}>
              Ծառայություններ
            </NextLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default ResponseNav;

import React, { useState, useEffect } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import css from "./cart.module.css";
// import Clock from "../../svg/basketClock.svg";
// import Calendar from "../../svg/calendarCareer.svg";
import Empty from "../../svg/empty.svg";
import Close from "../../svg/close.svg";
import { useCart } from "react-use-cart";
import NextLink from "../../components/NextLink";

const CartContainer = () => {
  const { items, updateItemQuantity, removeItem, cartTotal, totalItems } =
    useCart();

  const x = items.map((i) => {
    return i.productPrice;
  });

  const [priceData, setPriceData] = useState();

  useEffect(() => {
    setPriceData(x.length > 0 ? x.reduce((a, b) => a + b) : null);
  }, [items]);

  return (
    <>
      {items.length > 0 ? (
        <Container>
          <Row>
            <Col lg={12} md={12} sm={12} className="mt-5">
              <div className={css.divMain}>
                <Table responsive="sm" className={css.table}>
                  <thead className={css.thead}>
                    <tr className={css.tr}>
                      <th>Անվանում</th>
                      <th>Գին</th>
                      <th>Քանակ</th>
                      <th>Ընդհանուր</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items?.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td className={css.td}>
                            <div className={css.imgDiv}>
                              <img src={item.image} alt="" />
                              <div className={css.imgDivTwo}>
                                <h6>{item.name}</h6>
                              </div>
                            </div>
                          </td>
                          <td className={css.tdPricee}>
                            <h4>{item.price} AMD</h4>
                          </td>
                          <td className={css.tdPricee}>
                            <div className={css.quantity}>
                              {item.quantity <= 1 ? (
                                <span>-</span>
                              ) : (
                                <span
                                  onClick={() =>
                                    updateItemQuantity(
                                      item.id,
                                      (item.quantity -= 1),
                                      (cartTotal -= item.price)
                                    )
                                  }
                                >
                                  -
                                </span>
                              )}
                              <h5>{item.quantity}</h5>
                              <span
                                onClick={() =>
                                  updateItemQuantity(
                                    item.id,
                                    (item.quantity += 1),
                                    (cartTotal += item.price)
                                  )
                                }
                              >
                                +
                              </span>
                            </div>
                          </td>
                          <td className={css.tdPricee}>
                            <div className={css.totalPricee}>
                              <h6>{cartTotal} AMD</h6>
                              <h4>
                                <span
                                  className={css.close}
                                  onClick={() => removeItem(item.id)}
                                >
                                  <Close />
                                </span>
                              </h4>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
          <div className={css.totalblock}>
            <p>Ընդհանուր գին : {cartTotal} AMD</p>
            <NextLink exact to="/order" className={css.add}>
              Պատվիրել
            </NextLink>
          </div>
        </Container>
      ) : (
        <Container>
          <div className={css.empty}>
            <h2 className={css.title}>Զամբյուղ</h2>
            <Empty />
            <h2 className={css.subtitle}>Զամբյուղը դատարկ է</h2>
            <NextLink exact to="/product" className={css.redirect}>
              Զամբյուղը դատարկ է
            </NextLink>
          </div>
        </Container>
      )}
    </>
  );
};

export default CartContainer;

import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import css from "./career.module.css";
import Calendar from "../../svg/calendarCareer.svg";
import { careerGet } from "../../redux/actions/careerAction";
import { useDispatch, useSelector } from "react-redux";
// import Link from 'next/link'
import NextLink from "../../components/NextLink";

const CareerContainer = () => {

  const careerData = useSelector((state) => state.careerReducer.careerFakeData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(careerGet());
  }, []);

  return (
    <div>
      <div className={css.mainCarerBg}>
        <h1 className={css.title}>Աշխատատեղ</h1>
      </div>
      <Container>
        <Row className="justify-content-md-center mt-3 mb-5">
          <h4>Աշխատատեղեր</h4>
          {careerData
            ? careerData.map((i) => {
                return (
                  <Col lg={6} md={6} sm={12} key={i.id}>
                    <div className={css.carrerDiv}>
                      <div className={css.careerDivOne}>
                        <h5>Վաճառողուհի</h5>
                        <div className={css.careerDivCalendar}>
                          <Calendar />
                          <p>07.01.2022</p>
                        </div>
                      </div>
                      <div className={css.careerDivBtn}>
                        <NextLink href={"/career/" + i.id}>
                          <button>Դիմել</button>
                        </NextLink>
                      </div>
                    </div>
                  </Col>
                );
              })
            : null}
        </Row>
      </Container>
    </div>
  );
};

export default CareerContainer;

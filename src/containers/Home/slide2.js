import Arrow from "../../svg/arrow.svg";
import React from "react";
import styles from "./Home.module.css";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className={styles.nextArrow} onClick={onClick}>
      <Arrow className={styles.slide_arrow} />
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className={styles.prevArrow} onClick={onClick}>
      <Arrow className={styles.slide_arrow} />
    </div>
  );
};

let setts = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 920,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        nextArrow: false,
        prevArrow: false,
        autoplay: true,
        speed: 2500,
        autoplaySpeed: 2000,
      },
    },
  ],
};

export default setts;

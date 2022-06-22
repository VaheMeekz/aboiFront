import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import css from './SliderAll.module.css';

const SliderAll = ({ settings, BANNER_IMAGES, BEST_SALE_SLIDER }) => {
  return (
    <Slider {...settings}>
        {BANNER_IMAGES}
        {BEST_SALE_SLIDER}
    </Slider>
  );
};

export default SliderAll;

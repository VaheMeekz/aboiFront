import { HOME_SLIDER_BANNER } from "../types";

const initialState = {
  bannerSlider: [],
};

export const HOME_BANER_REDUCER = (state = initialState, action) => {
  switch (action.type) {
    case HOME_SLIDER_BANNER:
      return { ...state, bannerSlider: action.payload };

    default:
      return state;
  }
};

import { HOME_BESAT_SALE } from "../types";

const initialState = {
  BestSale: [],
};

export const HOME_BEST_SALE = (state = initialState, action) => {
  switch (action.type) {
    case HOME_BESAT_SALE:
      return { ...state, BestSale: [action.payload] };
    default:
      return state;
  }
};

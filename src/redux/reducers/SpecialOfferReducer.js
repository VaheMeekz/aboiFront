import { SPECIAL_OFFER_ITEMS } from "../types";

const initialState = {
  offer_items: [],
};

export const SPECIAL_OFFER_REDUCER = (state = initialState, action) => {
  switch (action.type) {
    case SPECIAL_OFFER_ITEMS:
      return { ...state, offer_items: action.payload };

    default:
      return state;
  }
};

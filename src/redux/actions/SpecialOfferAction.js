import { SPECIAL_OFFER_ITEMS } from "../types";
import { offer } from "../../utils";

export const Spec_Offer = () => {
  return (dispatch) => {
    dispatch({ type: SPECIAL_OFFER_ITEMS, payload: offer });
  };
};

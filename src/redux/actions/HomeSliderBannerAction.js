import { HOME_SLIDER_BANNER } from "../types";
import { banner } from "../../utils";

export const homeBanner = () => {
  return (dispatch) => {
    dispatch({ type: HOME_SLIDER_BANNER, payload: banner });
  };
};

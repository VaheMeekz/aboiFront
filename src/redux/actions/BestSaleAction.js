import { HOME_BESAT_SALE } from "../types";
import axios from "axios";

export const HOMESLAE = () => {
  return (dispatch) => {
    axios.get('https://abionew.herokuapp.com/api/product-best')
        .then(function (response) {
          dispatch({ type: HOME_BESAT_SALE, payload: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })

  };
};

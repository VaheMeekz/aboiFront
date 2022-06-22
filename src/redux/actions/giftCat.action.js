import axios from "axios";
import {GIFT_CART_GET} from "../reducers/giftCartReducer";

export const giftCart_get = () => {
    return dispatch  => {
        axios.get('https://abionew.herokuapp.com/api/gift-card')
            .then(function (response) {
                dispatch({type: GIFT_CART_GET, payload: response.data})
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}
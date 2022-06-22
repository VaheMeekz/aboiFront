import axios from "axios";
import {OFFER_GET} from "../reducers/offerReducer";

export const offer_get = () => {
    return dispatch => {
        axios.get('https://abionew.herokuapp.com/api/special-offer')
            .then(function (response) {
                dispatch({type: OFFER_GET, payload: response.data.data})
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}
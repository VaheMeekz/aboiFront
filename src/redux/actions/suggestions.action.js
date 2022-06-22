import axios from "axios";
import {Suggestions_GET} from "../reducers/suggestionsReducer";

export const suggestions_get = (prodId) => {
    return dispatch  => {
        axios.get('https://abionew.herokuapp.com/api/product-suggestions', { params: { id: prodId } })
            .then(function (response) {
                dispatch({type: Suggestions_GET, payload: response.data[0]})
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}
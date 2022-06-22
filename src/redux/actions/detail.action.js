import axios from "axios";
import {DETAIL_GET} from "../reducers/detailReducer";

export const detail_get = (id) => {
    return dispatch => {
        axios.get('https://abionew.herokuapp.com/api/product-page',{params: {id: id}})
            .then(function (response) {
                dispatch({type: DETAIL_GET, payload: response.data})
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
}
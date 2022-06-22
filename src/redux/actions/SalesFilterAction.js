import {SALES_FILTER_LOGIC} from "../types";
import axios from "axios";
import {SALES_GET} from "../reducers/SalesFilterReducer";


export const sales_get = (pageItem) => {
    return dispatch => {
        axios.get(`https://abionew.herokuapp.com/api/product-sale?page=${pageItem}`)
            .then(function (response) {
                dispatch({type: SALES_GET, payload: response.data.data});
            })
            .catch(function (error) {
                // handle error
            })
            .then(function () {
                // always executed
            });
    }
}

export const salesFilter = (name) => {
    return (dispatch) => {
        axios.get('https://abionew.herokuapp.com/api/product-sale')
            .then(function (response) {
                // handle success
                dispatch({type: SALES_FILTER_LOGIC, payload: {name, data: response.data.data}});
            })
            .catch(function (error) {
                // handle error
            })
            .then(function () {
                // always executed
            });

    };
};

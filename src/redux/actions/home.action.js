import axios from "axios";
import {CURRENCY_GET, HOME_GET, HOME_GET_SLIDER, MANY_GET} from "../reducers/homeReducer";

export const home_get = () => {
    return dispatch => {
        axios.get('https://abionew.herokuapp.com/api/category')
            .then(function (response) {
                // handle success
                dispatch({type: HOME_GET, payload: response.data.data})
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
}

export const home_get_slider = () => {
    return dispatch => {
        axios.get('https://abionew.herokuapp.com/api/home')
            .then(function (response) {
                dispatch({type: HOME_GET_SLIDER, payload: response.data.data.slider})
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}

export const currencyAction = (value) => {
    return dispatch => {
        axios.get('https://abionew.herokuapp.com/api/currency', { params: { currency: value } })
            .then(function (response) {
                dispatch({type: CURRENCY_GET, payload: {dataMain: response.data?.currency, val: value}})
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}

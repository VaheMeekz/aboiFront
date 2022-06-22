import {buyserData} from "../../utils/productData";
import {
    DATA_MAIN,
    DECREASE_QUANTITY, FILTER_DATA_MAIN,
    INCREASE_QUANTITY, PLUS,
    PRODUCT_BASKET,
    PRODUCT_SELECT, PRODUCTSALES_BUYSER
} from "../reducers/productReducer";
import axios from "axios";


export const buyserGet = (id, pageItem) => {
    return dispatch => {
        axios.get(`https://abionew.herokuapp.com/api/category-page?page=${pageItem}`, { params: id })
            .then(function (response) {
                dispatch({type: DATA_MAIN, payload: {category: response.data.category, product: response.data.product}})
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}

export const plusAction = (name) => {
    return dispatch => {
        dispatch({type: PLUS, payload: name})
    }
}


export const filterMainDataAction = (value) => {
    return dispatch => {
        dispatch({type: FILTER_DATA_MAIN, payload: value})
    }
}

export const selectFilteredItems = (value) => {
    return dispatch => {
        dispatch({type: PRODUCT_SELECT, payload: {value}})
    }
}

export const basketGet = (payload) => {
    return dispatch => {
        dispatch({type: PRODUCT_BASKET, payload})
    }
}

export const IncreaseQuantity = (index) => {
    return dispatch => {
        dispatch({type: INCREASE_QUANTITY, payload: index})
    }
}

export const DecreaseQuantity = (index) => {
    return dispatch => {
        dispatch({type: DECREASE_QUANTITY, payload: index})
    }
}


export const buyserSalesGet = (name, categoryNamee) => {
    return dispatch => {
        dispatch({type: PRODUCTSALES_BUYSER, payload: {data: buyserData, name, categoryNamee: categoryNamee}})
    }
}
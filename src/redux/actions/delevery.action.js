import axios from 'axios';
import {DELEVERY_GET} from '../reducers/deleveryReducer';

export const deleverygetAction = () => {
    return dispatch => {
        axios.get('https://abionew.herokuapp.com/api/delivery')
        .then(function (response) {
            dispatch({type: DELEVERY_GET, payload: response.data[0]})
        })
        .catch(function (error) {
            console.log(error);
        })
    }
}
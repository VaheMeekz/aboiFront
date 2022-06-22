import axios from "axios";
import {CONDITION_GET} from "../reducers/conditionReducer";

export const condition_get = () => {
    return dispatch  => {
        axios.get('https://abionew.herokuapp.com/api/return-condition')
            .then(function (response) {
                dispatch({type: CONDITION_GET, payload: response.data})
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}
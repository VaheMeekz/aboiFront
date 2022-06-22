import axios from "axios";
import {CONTACT_GET} from "../reducers/contactReducer";

export const contact_get = () => {
    return dispatch => {
        axios.get('https://abionew.herokuapp.com/api/contact')
            .then(function (response) {
                dispatch({type: CONTACT_GET, payload: response.data.data})
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}
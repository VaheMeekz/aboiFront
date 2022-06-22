import axios from "axios";
import {ABOUT_GET} from "../reducers/aboutReducer";

export const about_get_data = () => {
    return dispatch => {
        axios.get('https://abionew.herokuapp.com/api/about')
            .then(function (response) {
                dispatch({type: ABOUT_GET, payload: response.data.data})
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}
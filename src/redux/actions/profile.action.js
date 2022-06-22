import axios from "axios";
import {PROFILE_GET} from "../reducers/profileReducer";

export const profile_product_get = () => {
    return dispatch => {
        axios.get('https://abionew.herokuapp.com/api/order-view', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
            .then(function (response) {
                dispatch({type: PROFILE_GET, payload: response.data.order})
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
}
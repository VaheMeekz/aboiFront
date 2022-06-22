import {CAREER_DATA} from "../reducers/careerReducer";
import {careerData} from "../../utils/careerData";

export const careerGet = () => {
    return dispatch => {
        dispatch({type: CAREER_DATA, payload: careerData})
    }
}
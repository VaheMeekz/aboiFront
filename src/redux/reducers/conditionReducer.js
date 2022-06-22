export const CONDITION_GET = "CONDITION_GET";

const initialState = {
    conditionDate: []
}

export const conditionReducer = (state = initialState, action) => {
    switch (action.type) {

        case CONDITION_GET:

        return {...state, conditionDate: action.payload}

        default:
            return state;
    }
}
export const DELEVERY_GET = "DELEVERY_GET";

const initialState = {
    data: []
}


export const deleveryReducer = (state = initialState, action) => {
    switch(action.type) {

        case DELEVERY_GET:

        return {...state, data: action.payload}

        default:
            return state;
    }
}
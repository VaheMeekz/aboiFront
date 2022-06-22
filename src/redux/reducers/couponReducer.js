export const COUPON_GET = "COUPON_GET";

const initialState = {
    data: []
}

export const couponeReducer = (state = initialState, action) => {
    switch (action.type) {

        case COUPON_GET:

            return {...state, data: action.payload}

        default:
            return state;
    }
}
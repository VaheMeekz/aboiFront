export const GIFT_CART_GET = "GIFT_CART_GET";

const initialState = {
    giftCart: []
}

export const giftCartReducer = (state = initialState, action) => {
    switch (action.type) {

        case GIFT_CART_GET:

            return {...state, giftCart: action.payload}

        default:
            return state;
    }
}
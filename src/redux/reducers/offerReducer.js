export const OFFER_GET = 'OFFER_GET';

const initialState = {
    offerData: []
}

export const offerReducer = (state = initialState, action) => {
    switch (action.type) {

        case OFFER_GET:

            return {...state, offerData: action.payload}

        default:
            return state;
    }
}
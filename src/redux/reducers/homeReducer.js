export const HOME_GET = "HOME_GET";
export const HOME_GET_SLIDER = "HOME_GET_SLIDER";
export const CURRENCY_GET = "CURRENCY_GET";
export const MANY_GET = "MANY_GET";
export const TOKEN_GET = "TOKEN_GET";

const initialState = {
    homeData: [],
    homeSlider: [],
    currencyData: [],
    many: "",
    token: true
}

export const homeReducer = (state = initialState, action) => {
    switch (action.type) {

        case HOME_GET:

            return {...state, homeData: action.payload}

        case HOME_GET_SLIDER:

            return {...state, homeSlider: action.payload}

        case CURRENCY_GET:

            return {...state, currencyData: action.payload.dataMain, many: action.payload.val}

        case TOKEN_GET:

            return {...state, token: action.payload}

        default:
            return state;
    }
}
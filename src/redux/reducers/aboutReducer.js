export const ABOUT_GET = "ABOUT_GET";

const initialState = {
    aboutData: []
}

export const aboutReducer = (state = initialState, action) => {
    switch (action.type) {

        case ABOUT_GET:

        return {...state, aboutData: action.payload}

        default:
            return state;
    }
}
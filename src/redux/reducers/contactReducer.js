export const CONTACT_GET = "CONTACT_GET";

const initialState = {
    contactData: []
}

export const contactReducer = (state = initialState, action) => {
    switch (action.type) {

        case CONTACT_GET:
            return {...state, contactData: action.payload}
        default:
            return state;
    }
}
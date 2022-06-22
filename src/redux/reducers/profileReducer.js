export const PROFILE_GET = "PROFILE_GET";

const initialState = {
    data: []
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {

        case PROFILE_GET:
        return {...state, data:action.payload}

        default:
            return state;
    }
}
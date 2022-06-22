export const DETAIL_GET = "DETAIL_GET";

const initialState = {
    data: []
}

export const detailReducer = (state = initialState, action) => {
    switch (action.type) {
        case DETAIL_GET:
            return {...state, data: action.payload}
        default:
            return state;
    }
}
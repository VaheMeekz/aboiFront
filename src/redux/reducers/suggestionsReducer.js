export const Suggestions_GET = "Suggestions_GET";

const initialState = {
    suggestionsData: []
}

export const SuggestionsReducer = (state = initialState, action) => {
    switch (action.type) {

        case Suggestions_GET:

            return {...state, suggestionsData: action.payload}

        default:
            return state;
    }
}
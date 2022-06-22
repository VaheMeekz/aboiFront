export const CAREER_DATA = 'CAREER_DATA'

const initialState = {
    careerFakeData: []
}

export const careerReducer = (state = initialState, action) => {
    switch (action.type) {

        case CAREER_DATA:

            return {...state, careerFakeData: action.payload}

        default:
            return state;
    }
}
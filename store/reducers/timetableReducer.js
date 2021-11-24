const initialState = {
    lesson: {}
};

export const timetableReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'CHANGE_LESSON':

            return {
                ...state,
                lesson: action.payload
            }

        default:
            return state
    };
};
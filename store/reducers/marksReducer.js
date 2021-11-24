const initialState = {
    marks: '',
    term: '2',
    weekMarks: []
};

export const marksReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'LOAD_MARKS':
            
            return {
                ...state,
                marks: action.payload
            }

        case 'SET_TERM':

            return {
                ...state,
                term: action.payload
            }

        case 'SET_WEEK_MARKS':
            
            return {
                ...state,
                weekMarks: action.payload
            }

        default:
            return state
    };

};
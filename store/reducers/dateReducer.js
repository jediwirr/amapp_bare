const initialState = {
    stringDate: new Date(Date()).getDate(),
    stringMonth: '',
    stringDay: '',
    year: new Date(Date()).getFullYear(),
    month: new Date(Date()).getMonth()
};

export const dateReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'SET_DATE':

            return {
                ...state,
                stringDate: action.date
            }

        case 'SET_MONTH':

            return {
                ...state,
                month: action.month_num,
                stringMonth: action.month
            }

        case 'SET_DAY':

            return {
                ...state,
                stringDay: action.day
            }

        default:
            return state
    };
};
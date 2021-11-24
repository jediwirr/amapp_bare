const initialState = {
    openCalendar: false,
    calendarDays: []
};

export const calendarReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'TOGGLE_CALENDAR':

            return {
                ...state,
                openCalendar: !state.openCalendar
            }

        case 'ADD_DAYS':
            const newDays = [];
            newDays.push(action.payload)

            return {
                ...state,
                calendarDays: state.calendarDays.concat(newDays)
            }

        default:
            return state
    };
};
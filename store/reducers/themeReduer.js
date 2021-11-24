const initialState = {
    darkTheme: false
};

export const themeReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'CHANGE_THEME':
    
            return {
                ...state,
                darkTheme: !state.darkTheme
            }

        default:
            return state
    };
};
const initialState = {
    isSignedIn: false,
    students: [],
    user: {},
    userType: '',
    userData: ''
};

export const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'LOG_IN':
        
            return {
                ...state,
                isSignedIn: true,
                students: action.students,
                user: action.user,
                userType: action.user_type,
                userData: action.user_data
            }

        case 'ADMIN_LOG_IN':

        return {
            ...state,
            isSignedIn: true,
            userType: 'admin'
        }

        case 'SET_USER':
            let st;

            state.students.forEach(
                student =>
                    student.name === action.name && student.surname === action.surname
                    ? st = student
                    : ''
            )

            return {
                ...state,
                user: st
            }

        case 'LOG_OUT':
        
            return {
                ...state,
                isSignedIn: false
            }

        default:
            return state
    };
};
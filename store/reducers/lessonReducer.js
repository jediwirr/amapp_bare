const initialState = {
    openLesson: false,
    lessons: [],
    lesson: {},
    homework: '',
    link: ''
};

export const lessonReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'TOGGLE_LESSON_INFO':
            let arr = [];
            let links = [];
            action.lesson.homework.split(' ').map(item => {
                item.startsWith('https')
                ? links.push(item)
                : arr.push(item)
            })
            return {
                ...state,
                openLesson: !state.openLesson,
                lesson: action.lesson,
                homework: arr.join(' '),
                link: links.join()
            }

        case 'CHANGE_LESSON':

            return {
                ...state,
                lesson: action.payload
            }

        case 'SET_LESSONS':

            return {
                ...state,
                lessons: action.payload
            }

        default:
            return state
    };
};
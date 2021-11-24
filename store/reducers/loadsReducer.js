const initialState = {
    subject: [],
    subjectName: '',
    selectedLesson: {},
    isSelected: false,
    files: []
};

export const loadsReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'LOAD_SUBJECT':

            return {
                ...state,
                subject: action.payload,
                subjectName: action.name
            }

        case 'SELECT_LESSON':

            return {
                ...state,
                selectedLesson: action.payload,
                isSelected: !state.isSelected
            }

        case 'SET_FILES':
            const lesson = state.selectedLesson;

            const refreshedLesson = {
                    "answer_student": action.files,
                    "comment": lesson.comment,
                    "comment_type": lesson.comment_type,
                    "data_lesson": lesson.data_lesson,
                    "file_path": lesson.file_path,
                    "general_file": lesson.general_file,
                    "homework": lesson.homework,
                    "lesson_id": lesson.lesson_id,
                    "name_lesson": lesson.name_lesson,
                    "typeOfLesson": lesson.typeOfLesson
                }

            const idx = state.subject.indexOf(lesson);

            state.subject[idx] = refreshedLesson;

            return {
                ...state,
                selectedLesson: refreshedLesson
            }

        default:
            return state
    };
};
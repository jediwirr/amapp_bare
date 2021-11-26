const initialState = {
    data: [],
    dataItem: {},
    catList: [],
    homeName: 'Все материалы',
};

export const loadData = (payload) => ({type: 'LOAD_DATA', payload});

export const GymReducer = (state=initialState, action) => {
    switch (action.type) {

        case 'SIGN_IN':

            return {
                ...state,
                isSignedIn: true,
                userid: action.id,
                userName: action.name
            }

        case 'SIGN_OUT':

            return {
                ...state,
                isSignedIn: false,
                userid: null,
                userName: ''
            }


        case 'LOAD_CATEGORY_LIST':
            const list = state.data.filter(item => item.category === action.payload);
            const name = action.payload === '' ? 'Все материалы' : action.payload

            return {
                ...state,
                catList: list,
                homeName: name
            }

        case 'LOAD_DATA':

            return {
                ...state,
                data: action.payload
            }

        case 'LOAD_DATA_ITEM':
            let detail = state.data.find(article => article.title === action.title);

            let newDetail = {
                id: detail.id,
                web_uri: detail.web_uri,
                category: detail.category,
                title: detail.title,
                author: detail.author,
                imgPath: detail.imgPath,
                photographer: detail.photographer,
                description: detail.description,
                content: detail.content,
                sign: detail.sign,
                published: detail.published
            }

            return {
                ...state,
                dataItem: newDetail
            }
        default:
            return state
    }
}
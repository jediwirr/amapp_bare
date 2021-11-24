// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';

const initialState = {
    data: [],
    dataItem: {},
    handled: [],
    catList: [],
    homeName: 'Все материалы',
    isSignedIn: false,
    userid: null,
    userName: '',
    error: false,
    comments: []
};

export const GymReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'LOAD_COMMENTS':
            let allComments = action.content;
            let relatedComments = allComments.filter(item => item.article_id === action.id);

        return {
            ...state,
            comments: relatedComments
        }

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

        case 'LOAD_FAVORITES_LIST':
            const favs = state.data.filter(item => item.likes.includes(action.payload));

            return {
                ...state,
                catList: favs,
                homeName: 'Понравившиеся'
            }

        case 'LOAD_DATA':

            return {
                ...state,
                data: action.payload
            }

        case 'LOAD_DATA_ITEM':
            let detail = state.data.find(article => article.id === action.id);
            let tint = detail.likes.includes(action.by_user) ? 'red' : 'gray';

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
                likes: Array.from(new Set(detail.likes)).length,
                color: tint,
                published: detail.published
            }

            return {
                ...state,
                dataItem: newDetail
            }

        case 'HANDLE_LIKES':
            let article = state.data.find(article => article.id === action.id);
            let idx = state.data.findIndex(article => article.id === action.id);
            article.likes.push(action.by_user);

            let favArticle = {
                id: article.id,
                web_uri: article.web_uri,
                category: article.category,
                title:  article.title,
                author: article.author,
                imgPath: article.imgPath,
                photographer: article.photographer,
                description: article.description,
                content: article.content,
                sign: article.sign,
                likes: article.likes,
                color: 'red',
                published: article.published
            }

            const oneLike = {
                "title": article.id,
                "count": `${state.userid}liked${article.id}`,
                "who_liked": state.userid
            }

            state.data[idx] = favArticle;
            
            if (!state.handled.includes(oneLike)) {
                fetch(`http://192.168.100.249:80/api/likes/`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(oneLike)
                    }
                )
            }

            return {
                ...state,
                handled: [...state.handled, oneLike]
            }

        case 'UNHANDLE_LIKES':
            let artcl = state.data.find(article => article.id === action.id);
            let ind = state.data.findIndex(article => article.id === action.id);
            let likeIdx = artcl.likes.indexOf(action.by_user);
            artcl.likes.splice(likeIdx, 1);

            const oneHandledLike = {
                "title": artcl.id,
                "count": `${state.userid}liked${artcl.id}`,
                "who_liked": state.userid
            }

            let handledIdx = state.handled.indexOf(oneHandledLike);
            state.handled.splice(handledIdx, 1);
            
            let unFavArticle = {
                id: artcl.id,
                web_uri: artcl.web_uri,
                category: artcl.category,
                title: artcl.title,
                author: artcl.author,
                imgPath: artcl.imgPath,
                photographer: artcl.photographer,
                description: artcl.description,
                content: artcl.content,
                sign: artcl.sign,
                likes: artcl.likes,
                color: 'gray',
                published: artcl.published
            }

            state.data[ind] = unFavArticle;

            return {
                ...state,
                handled: [ ...state.handled ]
            }

        case 'SHOW_ERROR':

            return {
                ...state,
                error: true
            }

        default:
            return state;
    }
}
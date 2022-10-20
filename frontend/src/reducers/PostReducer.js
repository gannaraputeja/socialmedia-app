const postReducer = (state = {posts: [], loading: false, error: false, uploading: false},  action) => {
    switch(action.type) {
        case 'UPLOAD_START':
            return {...state, uploading: true, error: false}
        case 'UPLOAD_SUCCESS':
            return {...state, posts:[action.data, ...state.posts], uploading: false, error: false}
        case 'UPLOAD_FAIL':
            return {...state, uploading: false, error: true}
        case 'RETRIEVING_START':
            return {...state, uploading: true, error: true}
        case 'RETRIEVING_SUCCESS':
            return {...state, posts:[...action.data],uploading: false, error: false}
        case 'RETRIEVEING_FAIL':
            return {...state, uploading: false, error: true}
        case 'LOGOUT':
            return {posts: [], loading: false, error: false, uploading: false}
        default:
            return state
    }
}

export default postReducer
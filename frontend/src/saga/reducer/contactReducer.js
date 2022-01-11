import {ADD_CONTACT, CLEAR_CONTACT, DELETED_CONTACT, LOAD_CONTACT} from '../action/actionTypes';

// reducers define the content in the redux stores
// more of a table in the db(store)
const initialState = {
    contacts:[],
    loading:true,
    loadMore:true
};

function contactReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOAD_CONTACT:
            state.loadMore = payload.length > 0 ? true:false
            if(payload.length > 0){
                if(state.contacts.length <=0){
                    return {
                        ...state,contacts:[...payload], loading:false
                    }
                }else{
                    return {
                        ...state,contacts:[...state.contacts,...payload ], loading:false
                    }
                }
            }
            return {...state};
        case ADD_CONTACT:
            const newContactList = [...state.contacts]
            newContactList.unshift(payload)
            return {
                ...state,contacts:newContactList
            }
        case DELETED_CONTACT:
            const newContactListT = [...state.contacts]
            for (let i= 0, j = newContactListT.length; i < j; i++) {
                if (newContactListT[i]._id === payload) {
                    newContactListT.splice(i,1)
                    break;
                }
            }
            return {
                ...state,contacts:newContactListT
            }
        case CLEAR_CONTACT:
            return {
                ...state, contacts:[], loading:true, loadMore:true
            }
        default:
            return state;
    }
}


export default contactReducer;
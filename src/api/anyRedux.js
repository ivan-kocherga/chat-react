import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";

export const redirectStore = createStore((state, action) => {
    return {state: action.url}
}, applyMiddleware(thunk))

export function reducerRedirect(data) {
    return function (dispatch) {
        dispatch({type: 'url', url: data})
    }
}

export const alertStore = createStore((state, action) => {
    return  {
            text: action.text,
            type: action.type
    }
}, applyMiddleware(thunk))

export function reducerAlert(type, text) {
    return function (dispatch) {
        dispatch({type: type, text})
    }
}

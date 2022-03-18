import { createStore, applyMiddleware } from "redux";
import reducerChat from "./reducer";
import thunk from "redux-thunk";
import { init } from "./actions";

const store = createStore(reducerChat, applyMiddleware(thunk));

setTimeout(() => {
  if (localStorage.getItem("user") !== null) {
    store.dispatch(init(JSON.parse(localStorage.getItem("user"))));
  }
}, 0);

export default store;

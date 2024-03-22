import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { thunk } from "redux-thunk";
import {listReducer } from "./reducer/todolistReducer";

const initialState = {
  userTodoList: {
    userListItem: localStorage.getItem("todolist")
      ? JSON.parse(localStorage.getItem("todolist"))
      : [],
  },
};

const reducer = combineReducers({
  userTodoList: listReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;

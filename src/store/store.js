import { createContext } from "react";

export const initialState = {
    isAuthorised: false,
    login: '',
    userData: {},
}
  
export const reducer = (state, action) => {
    switch (action.type) {
      case "loggedIn":
        {
          return {
            isAuthorised: true,
            login: '',
            userData: action.data,
          };
        }
      

    //   case "edit":
    //     {
    //       const idx = state.todos.findIndex(t => t.id === action.id);
    //       const todo = Object.assign({}, state.todos[idx]);
    //       todo.text = action.text;
    //       const todos = Object.assign([], state.todos);
    //       todos.splice(idx, 1, todo);
    //       return {
    //         counter: state.counter,
    //         todos: todos,
    //       };
    //     }
    //   case "remove":
    //     {
    //       const idx = state.todos.findIndex(t => t.id === action.id);
    //       const todos = Object.assign([], state.todos);
    //       todos.splice(idx, 1);
    //       return {
    //         counter: state.counter,
    //         todos: todos,
    //       };
    //     }
      default:
        return state;
    }
  };

  export const AppContext = createContext(initialState);
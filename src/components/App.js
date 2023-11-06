import AppHeader from "./header";
import TasksContainer from "./tasksContainer";
import '../assets/styles/App.css';
import { createContext, useContext, useReducer, useState } from "react";
import { reducer, initialState, AppContext } from "../store/store";

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <>
      <AppContext.Provider value={{state, dispatch}}>
        <AppHeader/>
        <TasksContainer/>
      </AppContext.Provider>
    </>
  );
}

export default App;
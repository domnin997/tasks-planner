import { useReducer } from "react";
import { reducer, initialState, AppContext } from "../store/store";
import '../assets/styles/App.css';
import AppHeader from "./header";
import TasksContainer from "./tasksContainer";

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <>
      <AppContext.Provider value={{state, dispatch}}>
        <AppHeader/>
        <main className="main">
          <TasksContainer/>
        </main>
      </AppContext.Provider>
    </>
  );
}

export default App;
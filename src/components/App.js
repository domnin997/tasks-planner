import { useReducer } from "react";
import { reducer, initialState, AppContext } from "../store/store";
import '../assets/styles/App.css';
import AppHeader from "./header";
import TasksContainer from "./tasksContainer";

import checkDeadlines from "../services/notifications";

const func = checkDeadlines();
setInterval(func, 1000);
// clearInterval(checkDeadlines);

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
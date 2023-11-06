import { createContext } from "react";
import LSService from "../services/LSservice";

const {getTasks, updTasks} = LSService();

export const initialState = {
    tasks: getTasks() ? getTasks() : [],
}
  
export const reducer = (state, action) => {
    switch (action.type) {
      case 'GET_TASKS':
        {
          return {
            tasks: [...action.tasksArr, state.tasks],
          };
        }
      
        case 'ADD_TASK': 
          {
            const currTasks = state.tasks;
            currTasks.push(action.newTask);

            return {
              tasks: [...currTasks],
            }
          }

      case 'DELETE_TASK':
        {
          const index = state.tasks.findIndex((task) => {return task.id === action.id});
          const newTasksArr = state.tasks.filter((task, i) => {return i !== index});
          updTasks(newTasksArr);
          return {
            tasks: newTasksArr,
          }
        } 

    case 'EDIT_TASK':
      {
        const index = state.tasks.findIndex((task) => {return task.id === action.updTask.id});
        let newArr = state.tasks;
        
        newArr.splice(index, 1, action.updTask);

        updTasks(newArr);
        return {
          tasks: newArr,
        }
      }
    
    case 'SORT_BY_CREATED':

    {
      const sortedArr = state.tasks;
      sortedArr.sort((a,b) => {return b.createdAt - a.createdAt})

      return {
        tasks: sortedArr,
      }
    }

      default:
        return state;
    }
  };

  export const AppContext = createContext(initialState);
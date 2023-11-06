import { useContext } from "react";
import {AppContext} from '../store/store.js';
import ListManagePanel from "./listManagePanel.js";
import TasksPlaceholder from "./tasksPlaceholder.js";
import ListItem from "./listItem.js";
import '../assets/styles/tasksContainer.css';

function TasksContainer () {

    const { state } = useContext(AppContext);

    const emptyNotif = 'Ваш список пуст - добавьте новую задачу';

    function createContent () {
        if (state.tasks.length > 0) {
            
            const items = state.tasks.map((task) => {
                return <ListItem key={task.id}
                                 id={task.id}
                                 name={task.name}
                                 descr={task.descr}
                                 deadlineDate={task.deadlineDate}
                                 deadlineTime={task.deadlineTime}
                                 createdAt={task.createdAt}
                                 isDone={task.isDone}
                        />
            })
            return items;
            
        } else {
            return <TasksPlaceholder text={emptyNotif}/>
        }
    }

    const content = createContent();

    return (
        <section className="tasks-container">
            <ListManagePanel/>
            {content}
        </section>
    )
}

export default TasksContainer;
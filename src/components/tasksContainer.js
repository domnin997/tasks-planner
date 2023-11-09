import { useContext, useState, useEffect } from "react";
import {AppContext} from '../store/store.js';
import ListManagePanel from "./listManagePanel.js";
import TasksPlaceholder from "./tasksPlaceholder.js";
import ListItem from "./listItem.js";
import '../assets/styles/tasksContainer.css';

function TasksContainer () {

    const { dispatch, state } = useContext(AppContext);

    const [isDeadlineAsc, setIsDeadlineAsc] = useState();
    const [isCreatedDateAsc, setIsCreatedDateAsc] = useState();

    function onSortCreatedDate () {
        dispatch({type: 'SORT_BY_CREATED', isAscend: isCreatedDateAsc});
        setIsCreatedDateAsc(!isCreatedDateAsc);
    }

    function onDedlineSort () {
        dispatch({type: 'SORT_BY_DEADLINE', isAscend: isDeadlineAsc});
        setIsDeadlineAsc(!isDeadlineAsc);
    }

    useEffect(() => {
        setIsDeadlineAsc(false);
        setIsCreatedDateAsc(false);
      }, []);

    const emptyNotif = 'Ваш список пуст - добавьте новую задачу';
    const deadlineSortArrowClasses = isDeadlineAsc ? 'deadline-sort-arrow' : 'deadline-sort-arrow descend';
    const createdSortArrowClasses = isCreatedDateAsc ? 'created-sort-arrow' : 'created-sort-arrow descend';

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
            return <> 
                    <ul className="tasks-list">
                        <li className="tasks-list__head">
                            <div className="tasks-list__head-mark"></div>
                            <div className="tasks-list__head-name">Задача</div>
                            <div className="tasks-list__head-descr">Описание</div>
                            <div className="tasks-list__head-deadline"
                                 onClick={onDedlineSort}>
                                    <div className="head-deadline__el-wrap">
                                        <p>Срок</p><p className={deadlineSortArrowClasses}>&#8657;</p>
                                    </div>
                            </div>
                            <div className="tasks-list__head-created"
                                 onClick={onSortCreatedDate}>
                                    <div className="head-deadline__el-wrap">
                                        <p>Создана</p><p className={createdSortArrowClasses}>&#8657;</p>
                                    </div>
                            </div>
                            <div className="tasks-list__head-manage"></div>
                        </li>
                        {items}
                    </ul>
                   </>
            
        } else {
            return <TasksPlaceholder text={emptyNotif}/>   
        }
    }

    const content = createContent();

    return (
        <section className="tasks-container">
            <div className="tasks-container__h2-wrap">
                <h2 className="tasks-container__h2">Список ваших задач</h2>
            </div>
            <ListManagePanel/>
            {content}
        </section>
    )
}

export default TasksContainer;
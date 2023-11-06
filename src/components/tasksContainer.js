import { useContext } from "react";
import {AppContext} from '../store/store.js';
import ListManagePanel from "./listManagePanel.js";


function TasksContainer () {

    const { state, dispatch } = useContext(AppContext);

    function makePlaceholder () {
        return (
            <div className="placeholder-cont">
                <p className="placeholder-text">
                    Чтобы работать с планировщиком дел, войдите или зарегистрируйтесь
                </p>
            </div>
        )
    }

    function makeList () {
        return (
            // Перебирем listItems
            <div>
                <ListManagePanel></ListManagePanel>
                Ваш список
                
            </div>
        )
    }

    const content = state.isAuthorised ? makeList() : makePlaceholder();

    return (
        <section className="tasks-container">
            {content}
        </section>
    )
}

export default TasksContainer;
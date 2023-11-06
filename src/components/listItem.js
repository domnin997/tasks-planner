import '../assets/styles/listItem.css';
import { useContext, useState } from "react";
import {AppContext} from '../store/store.js';
import SetTaskModal from './setTaskModal.js';
import LSService from '../services/LSservice.js';
import changeIcon from '../assets/icons/change-icon.svg';
import deleteIcon from '../assets/icons/delete-icon.svg';
import emptyRound from '../assets/icons/empty-round.svg';
import doneRound from '../assets/icons/done-round.svg';

function ListItem (props) {
    
    const {id, name, descr, deadlineDate, deadlineTime, createdAt, isDone} = props;
    const {updTasks} = LSService();
    const {state, dispatch} = useContext(AppContext);

    const [addWinOpen, setAddWinOpen] = useState(false);

    const ModalWindow = addWinOpen ? <SetTaskModal task={{name, descr, deadlineDate, deadlineTime, id, isDone, createdAt}}
                                                   onClose={()=>{setAddWinOpen(false)}}                                                
                                                   amendMode={true}/> : null;

    function onDel () {
        dispatch({type: 'DELETE_TASK', id});
        updTasks(state.tasks);
    }

    function onFulfill () {
        const updTask = {
            id,
            name,
            descr,
            deadlineDate,
            deadlineTime,
            createdAt,
            isDone: !isDone
        }
           dispatch({type: 'EDIT_TASK', updTask})
    }

    const itemClasses = isDone ? 'task fulfilled' : 'task';
    const doneIcon = isDone ? doneRound : emptyRound;

    return (
        <>
        {ModalWindow}
        <li className={itemClasses}>
            <div className='task__name-cont'>
                <p className='task__name'>{name}</p>
            </div>
            <div className='task__descr-cont'>
                <p className='task__descr'>{descr}</p>
            </div>
            <div className='task__deadline-cont'>
                {deadlineDate}
            </div>
            <div className='task__deadline-time-cont'>
                {deadlineTime}
            </div>
            <div className='task__date-created'>
                {new Date(createdAt).getFullYear()}
            </div>
            <div className='task__change'>
                <img className='task__change-icon'
                     src={changeIcon}
                     alt='changeIcon'
                     onClick={() => {setAddWinOpen(true)}}
                />
            </div>
            <div className='task__mark'>
                <img className='task__mark-icon'
                     src={doneIcon}
                     alt='delIcon'
                     onClick={onFulfill}
                />
            </div>
            <div className='task__del'>
                <img className='task__del-icon'
                     src={deleteIcon}
                     alt='delIcon'
                     onClick={onDel}
                />
            </div>
        </li>
        </>
    )
}

export default ListItem;
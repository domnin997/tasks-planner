import '../assets/styles/listItem.css';
import { useContext, useState } from "react";
import {AppContext} from '../store/store.js';
import AddTaskWindow from './addTaskWindow.js';
import LSService from '../services/LSservice.js';
import changeIcon from '../assets/icons/change-icon.svg';
import deleteIcon from '../assets/icons/delete-icon.svg';
import emptyRound from '../assets/icons/empty-round.svg';

function ListItem (props) {
    
    const {id, name, descr, deadlineDate, deadlineTime, dateOfCreation, fulfilled} = props;
    const {updTasks} = LSService();
    const { state, dispatch } = useContext(AppContext);

    const [addWinOpen, setAddWinOpen] = useState(false);

    const ModalWindow = addWinOpen ? <AddTaskWindow task={{name, descr, deadlineDate, id, fulfilled}}
                                                    amendMode={true}
                                                    onClose={()=>{setAddWinOpen(false)}} /> : null;

    function onDel (e) {
        console.log(id);
        dispatch({type: 'DELETE_TASK', id});
        console.log(state.userData)
        updTasks(state.tasks);
    }

    function onFulfill () {
        const updTask = {
            id,
            name,
            descr,
            deadlineDate,
            deadlineTime,
            fulfilled: !fulfilled
        }
           dispatch({type: 'EDIT_TASK', updTask})
    }

    function setClasss () {if (fulfilled) {
        return 'task fulfilled';
    } else {
        return 'task';
    }}
    return (
        <>
        {ModalWindow}
        <li className={setClasss()}>
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
                {new Date(dateOfCreation).getFullYear()}
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
                     src={emptyRound}
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
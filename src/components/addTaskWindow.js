import '../assets/styles/addTaskStyle.css';
import { useContext } from "react";
import {AppContext} from '../store/store.js';
import { useEffect, useState } from 'react';
import LSService from '../services/LSservice';

function AddTaskWindow (props) {

    const {setUserDataLS, setTasks} = LSService();

    const [taskName, setTaskName] = useState('');
    const [taskDescr, setTaskDescr] = useState('');
    const [deadlineDate, setDeadlineDate] = useState('');
    const [deadlineTime, setDeadlineTime] = useState('');

    useEffect(() => {
        setTaskName(props.task.name);
        setTaskDescr(props.task.descr);
        setDeadlineDate(props.task.deadlineDate);
    },[])

    const { state, dispatch } = useContext(AppContext);
    
    function handleSubmit (e) {
        
        if (props.amendMode) {
            e.preventDefault();
            const updTask = {
             id: props.task.id,
             name: taskName,
             descr: taskDescr,
             deadlineDate: deadlineDate,
             deadlineTime: deadlineTime,
             fulfilled: props.task.fulfilled
             
            }
            dispatch({type: 'EDIT_TASK', updTask})
            
        } else {
            e.preventDefault();
            const newId = window.crypto.randomUUID();
            const newTask = {
             id: newId,
             name: taskName,
             descr: taskDescr,
             deadlineDate: deadlineDate,
             deadlineTime: deadlineTime,
             fulfilled: false
        }
        // dispatch({type: 'ADD_TASK', newTask});
        // setUserDataLS(state.login, newTask);
        setTasks(newTask);
        dispatch({type: 'ADD_TASK', newTask});
        }
        
    }

    let header;
    if (props.amendMode) {
        header = 'Редактирование задачи';
    } else {
        header = 'Добавить новую задачу';
    }

    return (
    
    <div className='modal-overlay'>
        <div className='add-task-cont'>
            <div className='add-task__header-cont'>
                <h2 className='add-task__header'>{header}</h2>
                <div className='add-task__close-cont'>
                    <p className='add-task__close-sign'
                       onClick={props.onClose}>&#10006;</p>
                </div>
            </div>
            <div className='add-task__form-cont'>
                <form className='add-task__form'
                      id='addNewTask'
                >
                    <input required
                           className='add-task__input input-name'
                           type='text'
                           placeholder='Название задачи'
                           value={taskName}
                           onChange={(e) => {setTaskName(e.target.value)}}
                    />
                    <input className='add-task__input input-descr'
                           type='text'
                           placeholder='Описание задачи'
                           value={taskDescr}
                           onChange={(e) => {setTaskDescr(e.target.value)}}
                    />
                    <div className='add-task__time-date-header'>
                        Установите срок
                    </div>
                    <div className='add-task__time-date-cont'>
                        <div className='date-input-cont'>
                            <p className='date-input__header'>Дата</p>
                            <input className='input-deadline'
                                type='date'
                                value={deadlineDate}
                                onChange={(e) => {setDeadlineDate(e.target.value)}}
                            />
                        </div>
                        <div className='time-input-cont'>
                            <p className='time-input__header'>Время</p>
                            <input className='input-deadline'
                               type='time'
                               value={deadlineTime}
                               onChange={(e) => {setDeadlineTime(e.target.value)}}
                            />
                        </div>
                        
                    </div>
                     
                </form>
                <div className='add-task__btn-cont'>
                    <button className='add-task__btn'
                            type='submit'
                            form='addNewTask'
                            // onClick={onSubmitTask}
                            onClick={handleSubmit}
                            >
                                Добавить
                    </button>
                </div> 
            </div>
        </div>
    </div>
    )
}

export default AddTaskWindow;
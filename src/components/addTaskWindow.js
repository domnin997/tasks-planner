import '../assets/styles/addTaskStyle.css';
import { useEffect, useState } from 'react';

function AddTaskWindow (props) {

    const [taskName, setTaskName] = useState('');
    const [taskDescr, setTaskDescr] = useState('');
    const [deadlineDate, setDeadlineDate] = useState('');
    const [deadlineTime, setDeadlineTime] = useState('');

    useEffect(() => {
        setTaskName(props.task.name);
        setTaskDescr(props.task.descr);
        setDeadlineDate(props.task.deadlineDate);
    },[])

    let header;
    if (props.amendMode) {
        header = 'Редактирование задачи';
    } else {
        header = 'Добавить новую задачу';
    }

    function onChangeName (e) {
        setTaskName(e.target.value);
    }

    function onChangeDescr (e) {
        setTaskDescr(e.target.value);
    }

    function onChangeDeadline (e) {
        setDeadlineDate(e.target.value);
    }

    function onChangeDeadlineTime (e) {
        setDeadlineTime(e.target.value);
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
                           onChange={onChangeName}
                    />
                    <input className='add-task__input input-descr'
                           type='text'
                           placeholder='Описание задачи'
                           value={taskDescr}
                           onChange={onChangeDescr}
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
                                onChange={onChangeDeadline}
                            />
                        </div>
                        <div className='time-input-cont'>
                            <p className='time-input__header'>Время</p>
                            <input className='input-deadline'
                               type='time'
                               value={deadlineTime}
                               onChange={onChangeDeadlineTime}
                            />
                        </div>
                        
                    </div>
                     
                </form>
                <div className='add-task__btn-cont'>
                    <button className='add-task__btn'
                            type='submit'
                            form='addNewTask'
                            // onClick={onSubmitTask}
                            // onClick={handleSubmit}
                            
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
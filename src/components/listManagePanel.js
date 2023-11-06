import '../assets/styles/listManagePanel.css';
import AddTaskWindow from "./addTaskWindow";
import StandardBtn from './standardBtn';
import { useState } from 'react';

function ListManagePanel () {

    const [addWinOpen, setAddWinOpen] = useState(false);

    const ModalWindow = addWinOpen ? <AddTaskWindow task={{name: '', descr: '', deadlineDate: ''}} /> : null;

    return (
        <>
        {ModalWindow}
        <div className="manage-panel-cont">
            <div className="manage-panel__add-btn-cont">
                <StandardBtn btnText={'Добавить'}
                             clickHandler={() => {setAddWinOpen(true)}}/>
            </div>

            <div className="manage-panel__sort-btns-cont">
                тут кнопки фильтров
            </div>
        </div>
        </>
    )
}

export default ListManagePanel;
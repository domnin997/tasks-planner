import '../assets/styles/listManagePanel.css';
import { useContext, useState } from "react";
import {AppContext} from '../store/store.js';
import SetTaskModal from "./setTaskModal";
import StandardBtn from './standardBtn';

function ListManagePanel () {

    const {state, dispatch} = useContext(AppContext);

    const [taskModalOpen, setTaskModalOpen] = useState(false);

    const ModalWindow = taskModalOpen ? <SetTaskModal task={{name: '', descr: '', deadlineDate: '', deadlineTime: ''}}
                                                      onClose={()=>{setTaskModalOpen(false)}} 
                                                      amendMode={false}/> : null;
    return (
        <>
         <div className="manage-panel-cont">
           <div className="manage-panel__add-btn-cont">
              <StandardBtn btnText={'Добавить'}
                           clickHandler={() => {setTaskModalOpen(true)}}/>
           </div>

           <div className="manage-panel__sort-btns-cont">
                 тут кнопки фильтров<button onClick={() => {dispatch({type: 'SORT_BY_CREATED'})}}>Sort by created</button>
           </div> 
         </div>
        {ModalWindow}
        </>
    )
}

export default ListManagePanel;
import '../assets/styles/listManagePanel.css';
import { useContext, useState, useEffect } from "react";
import {AppContext} from '../store/store.js';
import SetTaskModal from "./setTaskModal";
import StandardBtn from './standardBtn';

function ListManagePanel () {

  const {dispatch} = useContext(AppContext);

  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [isCreatedAscendSort, setIsCreatedAscendSort] = useState();
  const [isDeadlineAscSort, setIsDeadlineAscSort] = useState();

  useEffect(() => {
    setIsCreatedAscendSort(false)
    setIsDeadlineAscSort(false);
  }, []);
  
  let ModalWindow;

  if (taskModalOpen) {
    ModalWindow = <SetTaskModal task={{name: '', descr: '', deadlineDate: '', deadlineTime: ''}}
                                onClose={()=>{setTaskModalOpen(false)}} 
                                amendMode={false}/>
  } else {
    ModalWindow = null;
  }

  function onSort () {
    dispatch({type: 'SORT_BY_CREATED', isAscend: isCreatedAscendSort});
      setIsCreatedAscendSort(!isCreatedAscendSort);
  }

  function onDedlineSort () {
    dispatch({type: 'SORT_BY_DEADLINE', isAscend: isDeadlineAscSort});
     setIsDeadlineAscSort(!isDeadlineAscSort);
  }
   
  return (
    <>
      <div className="manage-panel-cont">
        <div className="manage-panel__add-btn-cont">
          <StandardBtn btnText={'Добавить'}
                       clickHandler={() => {setTaskModalOpen(true)}}/>
        </div>

        <div className="manage-panel__sort-btns-cont">
          <button onClick={onSort}>Сортировать по дате создания</button>
          <button onClick={onDedlineSort}>По сроку</button>

        </div> 
      </div>
      {ModalWindow}
    </>
  )
}

export default ListManagePanel;
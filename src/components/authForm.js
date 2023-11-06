import { useState, useReducer, useContext } from 'react';
import { reducer, initialState, AppContext } from "../store/store";
import LSService from '../services/LSservice';
import '../assets/styles/regAuthStyle.css';

function AuthForm (props) {
    
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isMistakeShown, setIsMistakeShown] = useState(false);

    const {regMode, authMode, onClose} = props;
    const {checkIfExists, addNewUser, getUserInfo} = LSService();

    const { state, dispatch } = useContext(AppContext);
    // const [state, dispatch] = useReducer(reducer, initialState);


    let handleSubmit,
        mistakeMsg;

    if (regMode) {
        handleSubmit = function (e) {
            e.preventDefault();
            if (checkIfExists(login)) {
                setIsMistakeShown(true);
            } else {
                setIsMistakeShown(false);
                addNewUser(login, password);
                
            }
        }

        mistakeMsg = isMistakeShown ? 'Имя занято' : null;
    } else if (authMode) {
        handleSubmit = function (e) {
            e.preventDefault();
            
            if (!checkIfExists(login)) {
                setIsMistakeShown(true);
                console.log('Нет такого пароля');
            } else {
                const userData = getUserInfo(login);
                dispatch({type: 'loggedIn', login: login, data: userData});
               
            }
        }
    }

    let headerText = regMode ? 'Регистрация' : 'Авторизация';
    let loginInputText = regMode ? 'Придумайте логин' : 'Введите логин';
    let passwordInputText = regMode ? 'Придумайте пароль' : 'Введите пароль';
    let btnText = regMode ? 'Зарегистрироваться' : 'Войти';
    
    return (
        <div className="modal-overlay">
            <div className="reg-auth-cont">
                <div className='reg-auth__header-cont'>
                    <h2 className='reg-auth__header'>{headerText}</h2>
                    <div className='reg-auth__close-cont'>
                        <p className='reg-auth__close-sign'
                           onClick={onClose}>
                            &#10006;
                        </p>
                    </div>
                </div>
            <div className='reg-auth__form-cont'>
                <form className='reg-auth__form'>
                    <div>{loginInputText}</div>
                    <input className='reg-auth__input'
                           type='text'
                           placeholder='Логин'
                           value={login}
                           onChange={(e) => setLogin(e.target.value)}
                    />
                    <div className='reg-auth__mistake-msg'>
                        {mistakeMsg}
                    </div>
                    <div>{passwordInputText}</div>
                    <input className='reg-auth__input'
                           type='password'
                           placeholder='Пароль'
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className='reg-auth__mistake-msg'>
                        Сообщение об ошибке
                    </div>
                    <button className='reg-auth__btn'
                            onClick={handleSubmit}
                    >
                        {btnText}
                    </button>
                </form>
            </div>
            </div>
        </div>
    )
}

export default AuthForm;
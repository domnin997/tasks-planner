import '../assets/styles/headerStyle.css';
import AuthForm from './authForm.js';
import { useState } from 'react';
import pencilLogo from '../assets/img/pencil_logo.png';
import profile from '../assets/img/profile_icon.svg';

function AppHeader () {

    const [regWinShown, setRegWinShown] = useState(false);
    const [authWinShown, setAuthWinShown] = useState(false);

    let ModalWindow;

    if (regWinShown || authWinShown) {
      ModalWindow = <AuthForm regMode={regWinShown}
                              authMode={authWinShown}
                              onClose={() => {setRegWinShown(false) 
                                              setAuthWinShown(false)
                                      }}/>;
    }

    return (
      <header className='app-header'>
        <div className='app-header_wrap'>

        <div className='logo'>
          <div className='logo__img-container'>
            <img className='logo__img'
                 src={pencilLogo}
                 alt='logoImg'
            />
          </div>
          <div className='logo__text-container'>
            <h1 className='logo__text'>ЗАПИСАТОР</h1>
          </div>
        </div>
        <div className='auth'>
          <div className='auth-wrap'>
            <button onClick={() => {setAuthWinShown(true)}} 
                    className='auth__text-container'>
               Войти
            </button>
            <div className='auth__icon-container'>
              <img className='auth__icon'
                   src={profile}
                   alt='profileIcon'
              />
            </div>
            <button onClick={() => setRegWinShown(true)}
                    className='auth__text-container'>
               Регистрация
            </button>
          </div>
        </div>
        </div>
      {ModalWindow}
      </header>
    )
}

export default AppHeader;
import React, {useEffect, useState} from "react";
import {registerFirebase, updateState} from "../api/auth";

function Register() {
    let classInput = ['auth__register-login', 'auth-input']

    let [login, setLogin] = useState({value: '', error: []})
    let [password, setPassword] = useState({value: '', error: []})
    let [passwordOnceMore, setPasswordOnceMore] = useState({value: '', error: []})

    let [seePassword, setSeePassword] = useState(false)

    let [valid, setValid] = useState(false)

    useEffect(() => {
        let firstBool = login.error.length === 0 && password.error.length === 0 && passwordOnceMore.error.length === 0
        let secondBool = login.value.length > 0 && password.value.length > 0 && passwordOnceMore.value.length > 0

        if(firstBool && secondBool){
            setValid(true)
        }else {
            setValid(false)
        }
    }, [login, password, passwordOnceMore])

    function submit() {
        registerFirebase({login: login.value, password: password.value})
    }

    return(
        <div className='auth__register auth'>

            <div className='auth-title'>
                <h1>Создать новый аккаунт</h1>
            </div>

            <div className={`${classInput.join(' ')} ${login.error.length > 0 ? 'error-input' : ''}`}>
                <p>Логин:</p>
                <input
                    type="text"
                    value={login.value}
                    onChange={e => updateState(e.target.value, login, setLogin, 'login')}
                    placeholder='Ваш логин'/>
                <div className='login-error error'>
                    {
                        login.error.map((elem, index) => {
                            return(
                                <div key={index}>
                                    <span>*{elem}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className={`${classInput.join(' ')} ${password.error.length > 0 ? 'error-input' : ''}`}>
                <p>Пороль:</p>
                <div className='auth-seePassword'>
                    <input
                        type={seePassword ? 'text' : 'password'}
                        value={password.value}
                        onChange={e => updateState(e.target.value, password, setPassword, 'password')}
                        placeholder='Пороль'/>
                    {
                        seePassword
                            ?
                            <div className='watch-password'>
                                <img onClick={() => setSeePassword(false)} src="https://img.icons8.com/ios/452/closed-eye.png" alt="img"/>
                            </div>
                            : <div className='watch-password'>
                                <img onClick={() => setSeePassword(true)} src="https://image.flaticon.com/icons/png/512/64/64875.png" alt="img"/>
                            </div>
                    }
                </div>
                <div className='password-error error'>
                    {
                        password.error.map((elem, index) => {
                            return(
                                <div key={index}>
                                    <span>*{elem}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className={classInput.join(' ')}>
                <p>Повторить пороль:</p>
                <input
                    type="password"
                    value={passwordOnceMore.value}
                    onChange={e => updateState(e.target.value, passwordOnceMore, setPasswordOnceMore, 'passwordOnceMore', password.value)}
                    placeholder='Пороль еще раз'/>
                <div className='password-error error'>
                    {
                        passwordOnceMore.error.map((elem, index) => {
                            return(
                                <div key={index}>
                                    <span>*{elem}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className='auth__register-submit auth-submit'>
                <button disabled={!valid} onClick={submit}>Готово</button>
            </div>

        </div>
    )
}

export default Register
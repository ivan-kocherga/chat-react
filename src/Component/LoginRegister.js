import './LoginRegister.css'
import React, { useState } from 'react'
import Register from "./Register";
import Login from "./Login";

export default function LoginRegister() {
    let [type, setType] = useState('login')

    return(
        <div className='auth'>
            {
                type === 'login' ? <Login /> : <Register />
            }
            {
                type === 'login'
                    ? <p>Нет акаутна? <span onClick={() => setType('register')}>Зарегестрируватся</span></p>
                    : <p>Есть акаутна? <span onClick={() => setType('login')}>Войти</span></p>
            }
        </div>
    )
}



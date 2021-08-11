import './Chat.css'
import React, {useEffect, useState} from 'react'
import store from "../redux/store";
import {getMessage, searchUsersFireBase, watchMainMessage} from '../api/chat';
import {redirectStore, reducerRedirect} from '../api/anyRedux';
import {useRef} from 'react';
import {Link} from 'react-router-dom';
import {date} from "../api/helper";

function Chats() {
    let user = useRef('')
    let [chats, setChats] = useState('init')
    let [alert, setAlert] = useState(false)
    let [searchUserInput, setSearchUserInput] = useState('')
    let [searchUsers, setSearchUsers] = useState('init')

    let [chatInfo, setChatInfo] = useState('init')

    useEffect(() => {
        setTimeout(() => {
            user.current = store.getState()
            getMessage(store.getState(), setChats)
        }, 1000)
    }, [])

    useEffect(() => {
        if (chats !== 'init') {
            watchMainMessage(chats, setChatInfo)
        }
    }, [chats])

    function logout() {
        localStorage.clear()
        redirectStore.dispatch(reducerRedirect('/auth'))
    }

    function searchUsersHandler() {
        setSearchUsers('search')
        searchUsersFireBase(searchUserInput, user.current, setSearchUsers)
    }

    return (
        <div className="chats">
            <header>
                <h1>React + Firebase chat</h1>
                <div className="chats__header-btn">
                    <button onClick={() => setAlert(true)}>Написать сообщение</button>
                    <button onClick={logout}>Выйти</button>
                </div>
            </header>
            <main className="chats__main">
                <div className="chats__main-chatsElements">
                    {
                        chatInfo === "init" ? <p className="info">Загрузка...</p>
                            : chats?.message.length === 1 ? <p className="info">У вас нет сообщений</p>
                            : <div className='chatsElements__iterable'>
                                {
                                    chatInfo.map((elem, i) => {
                                        return (
                                            <Link to={'/' + elem.idUser} key={i}>
                                                <div className='chatsElements__iterable-elem'>
                                                    <div className='elem-main'>
                                                        <div className='elem-user'>
                                                            <p>
                                                                Имя: {elem.name}
                                                            </p>
                                                        </div>
                                                        <div className='elem-text'>
                                                            <p>
                                                                Последнее сообщение: {elem.lastUpdate.text}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className='elem-lastUpdate'>
                                                        <p>
                                                            Время: {date(elem.lastUpdate.time)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                    }
                </div>
            </main>
            {
                alert ?
                    <div className="alert">
                        <div className="alert__elem">
                            <div className="alert__elem-input">
                                <p>Найди пользователя и все будет круто:</p>
                                <input onInput={(e) => setSearchUserInput(e.target.value)}
                                       placeholder="Найти пользователя"/>
                            </div>
                            <div className="alert__elem-serchElem">
                                {
                                    searchUsers === 'init' ? <p>Дайте инфу</p> :
                                        searchUsers === 'search' ? <p>Загрузка</p> :
                                            searchUsers.length === 0 ? <p>Ничего не найдено</p> :
                                                searchUsers.map((elem, key) => {
                                                    return (
                                                        <div key={key} className='user-search'>
                                                            <Link to={'/' + elem.id}>
                                                                <p>
                                                                    {elem.login}
                                                                </p>
                                                            </Link>
                                                        </div>
                                                    )
                                                })
                                }
                            </div>
                            <div className="alert__elem-btn">
                                <button disabled={searchUserInput.length === 0} onClick={searchUsersHandler}>
                                    Найти
                                </button>
                                <button onClick={() => {
                                    setAlert(false);
                                    setSearchUsers('init');
                                    setSearchUserInput('')
                                }}>
                                    Закрыть
                                </button>
                            </div>
                        </div>
                    </div>
                    : null
            }
        </div>
    )
}

export default Chats
import './App.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'

import Chats from './Component/Chats'
import LoginRegister from './Component/LoginRegister';

import {transitions, positions, Provider as AlertProvider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'


import {useEffect, useState} from "react";
import {useAlert} from 'react-alert'

import {alertStore, redirectStore} from "./api/anyRedux";
import ChatWithUser from './Component/ChatWithUser';


function App() {
    let [redirect, setRedirect] = useState('')

    redirectStore.subscribe(() => {
        setRedirect(redirectStore.getState().state)
    })


    const options = {
        position: positions.BOTTOM_CENTER,
        timeout: 5000,
        offset: '30px',
        transition: transitions.SCALE,
        color: '#fff'
    }

    return (
        <AlertProvider template={AlertTemplate} {...options}>
            <div className='app'>
                <Router>
                    <Switch>
                        <Route exact path='/'>
                            <Chats/>
                        </Route>
                        <Route path='/auth'>
                            <LoginRegister/>
                        </Route>
                        <Route exact path='/:id'>
                            <ChatWithUser/>
                        </Route>
                        <Route path='*'>
                            <Redirect to='/'/>
                        </Route>
                    </Switch>
                    {
                        localStorage.getItem('user') === null
                            ? <Redirect to='/auth'/>
                            : void 0
                    }
                    {
                        Boolean(redirect)
                            ? <div>
                                <Redirect to={redirect}/>
                            </div>
                            : void 0
                    }
                </Router>
                <Alert></Alert>
            </div>
        </AlertProvider>
    )
}

function Alert() {
    const alert = useAlert()

    useEffect(() => {
        alertStore.subscribe(() => {
            alert.show(alertStore.getState().text, {type: alertStore.getState().type})
        })
    }, [])

    return (
        <div></div>
    )
}

export default App

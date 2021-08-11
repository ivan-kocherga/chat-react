import firebaseApp from "../firebase/firebaseINIT";
import {alertStore, redirectStore, reducerAlert, reducerRedirect} from "./anyRedux";
import store from "../redux/store";
import {updateAction} from "../redux/actions";
import {randomInteger} from "./helper"


function checkLogin(val) {
    let arr = []

    let boolSpace = val.includes(' ')
    let boolLength = Boolean(val.length >= 5)

    if(boolSpace){
        arr.push('пробелов не может быть')
    }
    if(!boolLength){
        arr.push('логин состоит больше чем с 4 символов')
    }

    return arr
}

function checkPassword(val) {
    let arr = []

    let boolSpace = val.includes(' ')
    let boolLength = Boolean(val.length >= 6)

    if(boolSpace){
        arr.push('пробелов не может быть')
    }
    if(!boolLength){
        arr.push('пароль состоит больше чем с 5 символов')
    }

    return arr
}

function passwordOnceMore(val, password) {
    let arr = []

    if(val !== password){
        arr.push('пороли не совпадают')
    }

    return arr
}

export function updateState(val, state, setState, name = 'name', passwordVal = '') {
    let newLoginVal = {...state}

    newLoginVal.value = val
    newLoginVal.error = []

    if(name === 'login'){
        newLoginVal.error = checkLogin(val)
    }else if(name === 'password'){
        newLoginVal.error = checkPassword(val)
    }else if(name === 'passwordOnceMore'){
        newLoginVal.error = passwordOnceMore(val, passwordVal)
    }

    setState(newLoginVal)
}

export function loginFirebase(data) {
    firebaseApp.database().ref('/').once('value', snapshot => {
        const dataFire = snapshot.val().users
        let isCorrect = false
        for(let user in dataFire){
            if(dataFire[user].login === data.login && String(dataFire[user].password) === String(data.password)){
                isCorrect = true

                let newData = {
                    login: dataFire[user].login,
                    id: dataFire[user].id
                }

                localStorage.setItem('user', JSON.stringify(newData))
                setTimeout(() => store.dispatch(updateAction(newData)), 1000)
                alertStore.dispatch(reducerAlert('success', 'Отлично, пошли дальше!'))
                redirectStore.dispatch(reducerRedirect({url: '../'}))

                break
            }
        }
        if(!isCorrect) {
            alertStore.dispatch(reducerAlert('error', 'Обманувая нас - вы обманиваете сами себя!'))
        }
    })
}

export function registerFirebase(data) {
    firebaseApp.database().ref('/').once('value', snapshot => {
        const dataFire = snapshot.val().users
        let isCorrect = true
        for(let user in dataFire){
            if(dataFire[user].login === data.login){
               isCorrect = false
                break
            }
        }
        if(isCorrect){
            let id = randomInteger(100000000, 999999999)

            firebaseApp.database().ref('/users/' + data.login).set({
                login: data.login,
                id: id,
                password: data.password,
                message: [{init: 'init'}]
            })
            let newData = {
                login: data.login,
                id: id
            }
            localStorage.setItem('user', JSON.stringify(newData))
            setTimeout(() => store.dispatch(updateAction(newData)), 1000)
            redirectStore.dispatch(reducerRedirect({url: '../'}))
        }else {
            alertStore.dispatch(reducerAlert('error', 'Обманувая нас - вы обманиваете сами себя!'))
        }
    })
}
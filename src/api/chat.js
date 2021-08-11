import firebase from "firebase"
import store from "../redux/store";
import {randomInteger} from "./helper";
import firebaseApp from "../firebase/firebaseINIT";
import axios from 'axios';

export function getMessage(data, state) {
    firebase.database().ref('/users/' + data.login).on('value', snapshot => {
        const dataFire = snapshot.val()
        state(dataFire)
    })
}

export function searchUsersFireBase(text, user, state) {
    firebase.database().ref('/users').on('value', snapshot => {
        const dataFire = snapshot.val()
        let returnInfo = []
        for(let i in dataFire){
            if(i.toLowerCase().includes(text.toLowerCase()) && i.toLocaleLowerCase() !== user.login.toLowerCase()){
                returnInfo.push({login: dataFire[i].login, id: dataFire[i].id})
            }
        }
        state(returnInfo)
    })
}

export function getMessageWithUser(id, state) {
    firebase.database().ref('/users').on('value', snapshot => {
        const dataFire = snapshot.val()
        for(let i in dataFire){
            if(Number(dataFire[i].id) === Number(id)){
                state(dataFire[i])
            }
        }
    })
}

export function getIdUser(login) {
    return new Promise((resolve) => {
        firebase.database().ref('/users').once('value', snapshot => {
            const dataFire = snapshot.val()
            for(let i in dataFire){
                if(dataFire[i].login === login){
                    resolve(dataFire[i].id)
                }
            }
        })
    })

}

export function setMessage(user, text) {
    firebase.database().ref('/').once('value', snapshot => {
        const dataFire = snapshot.val()

        const id = randomInteger(100000000, 999999999)

        let isHaveId = dataFire.users[user.login].message.find(elem => elem[store.getState().login])

        if(!isHaveId) {
            dataFire.users[user.login].message.push({[store.getState().login]: id})
            dataFire.users[store.getState().login].message.push({[user.login]: id})
            let newDataUser = dataFire.users[user.login].message
            let newDataYour = dataFire.users[store.getState().login].message
            firebase.database().ref(`/users/${user.login}/message`).set(newDataUser)
            firebase.database().ref(`/users/${store.getState().login}/message`).set(newDataYour)
        }

        let messageId = dataFire.users[user.login].message.find(elem => elem[store.getState().login])

        messageId = Object.values(messageId)[0]

        let index

        let isHaveMessage = dataFire.message.find((elem, i) => {
            index = i
            return elem[messageId]
        })

        if(!isHaveMessage) {
            axios.get('https://showcase.api.linx.twenty57.net/UnixTime/tounix?date=now').then(res => {
                let obj = {
                    [`${new Date().getTime(res.data)}_${store.getState().login}`]: text
                }

                dataFire.message.push({[messageId]: obj})
                let newMessage = dataFire.message

                firebase.database().ref(`/message`).set(newMessage)
            })
        }else {
            axios.get('https://showcase.api.linx.twenty57.net/UnixTime/tounix?date=now').then(res => {
                isHaveMessage[messageId][`${new Date().getTime(res.data)}_${store.getState().login}`] = text
                firebase.database().ref(`/message/`+index).set(isHaveMessage)
            })
        }
    })
}

export function watchMainMessage(chats, setChatInfo) {
    let arr = chats.message.filter(elem => Object.values(elem)[0] !== 'init')
    firebaseApp.database().ref('/message').on('value', async (snapshot) => {
        const dataFire = snapshot.val()
        let data = []
        for (let i of dataFire) {
            for (let i2 of arr) {
                if (+Object.keys(i)[0] === +Object.values(i2)[0]) {
                    await getIdUser(Object.keys(i2)[0]).then((res) => {
                        let newElem = {
                            name: Object.keys(i2)[0],
                            id: Object.keys(i)[0],
                            idUser: res,
                            lastUpdate: {
                                text: Object.values(i[Object.keys(i)[0]])[Object.values(i[Object.keys(i)[0]]).length - 1],
                                time: Object.keys(i[Object.keys(i)[0]])[Object.values(i[Object.keys(i)[0]]).length - 1].split('_')[0]
                            },
                        }
                        data.push(newElem)
                    })
                }
            }
        }
        setChatInfo(data.reverse())
    })
}

export function watchElemMessage(info, setIdFirebaseMessage, setMessageWithUser) {
    let messageId = info.message.find(elem => elem[store.getState().login])
    setIdFirebaseMessage(messageId)
    if (messageId) {
        messageId = Object.values(messageId)[0]
        firebaseApp.database().ref('/message').on('value', snapshot => {
            const dataFire = snapshot.val()
            for (let i of dataFire) {
                if (Number(Object.keys(i)[0]) === Number(messageId)) {
                    let doneData = []
                    for (let i2 in i[messageId]) {
                        doneData.push({
                            time: i2.split('_')[0],
                            user: i2.split('_')[1],
                            text: i[messageId][i2]
                        })
                    }
                    setMessageWithUser(doneData)
                    setTimeout(() => window.scrollTo(0, document.documentElement.scrollHeight), 0)
                }
            }
        })
    }
}
function reducerChat(state = '__INIT__', action = '__INIT__') {
    switch (action.type) {
        case 'update_info':
            return action.data
        case 'set_state':
            return action.data
        default: return state
    }
}

export default reducerChat

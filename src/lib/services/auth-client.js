import client from './ApiClient'
import UserApiService from './User.api.service';


function handleUserResponse({user: {token, ...user}}) {
    window.localStorage.setItem(client.ACCESS_TOKKEN_KEY, token)
    return user
}

function getUser() {
    const response = UserApiService.me();
    response.subscribe({
        error: (error) => {
            console.log('-----------------------------------------------------');
            console.log('error', error);
            console.log('-----------------------------------------------------');
            if (error.status)
                logout();
        }
    });
    return response;
}

function login({username, password}) {
    return client('login', {body: {username, password}}).then(handleUserResponse)
}

function register({username, password}) {
    return client('register', {body: {username, password}}).then(
        handleUserResponse,
    )
}

function logout() {
    window.localStorage.removeItem(client.ACCESS_TOKKEN_KEY)
    return Promise.resolve()
}

function getToken() {
    return window.localStorage.getItem(client.ACCESS_TOKKEN_KEY)
}

function bootstrapAppData() {
    return getUser();
}



export {login, register, logout, getToken, getUser,bootstrapAppData}

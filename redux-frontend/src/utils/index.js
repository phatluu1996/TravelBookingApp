export const ROLE_ADMIN = 'ROLE_ADMIN';
export const ROLE_AIRLINE = 'ROLE_AIRLINE';
export const ROLE_HOTEL = 'ROLE_HOTEL';
export const ROLE_USER = 'ROLE_USER';




export const getUser = () => {
    return sessionStorage.getItem('user');
}

// return the token from the session storage
export var getToken = () => {
    return sessionStorage.getItem('userToken');
}

export const getUserFullName = () => {
    return sessionStorage.getItem('userName');
}

// remove the token and user from the session storage
export const removeUserSession = () => {
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userRole');
}

export const getUserId = () => {
    return sessionStorage.getItem('userId');
}

export const getRole = () => {
    return sessionStorage.getItem('userRole');
}

// set the token and user from the session storage
export const setUserSession = (token, user, name, userIndex, role) => {
    sessionStorage.setItem('userToken', token);
    sessionStorage.setItem('user', user);
    sessionStorage.setItem('userName', name);
    sessionStorage.setItem('userId', userIndex);
    sessionStorage.setItem('userRole', role);
}

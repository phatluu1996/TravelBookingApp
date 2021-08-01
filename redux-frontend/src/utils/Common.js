export default class Common {
    static getUser = () => {
        return sessionStorage.getItem('user');
    }
    
    // return the token from the session storage
    static getToken = () => {
        return sessionStorage.getItem('userToken');
    }

    static getUserFullName = () => {
        return sessionStorage.getItem('userName');
    }
    
    // remove the token and user from the session storage
    static removeUserSession = () => {
        sessionStorage.removeItem('userToken');
        sessionStorage.removeItem('user');
    }

    static getUserId = () => {
        return sessionStorage.getItem('userId');
    }

    static getRole = () => {
        return sessionStorage.getItem('userRole');
    }
    
    // set the token and user from the session storage
    static setUserSession = (token, user, name, userIndex, role) => {
        sessionStorage.setItem('userToken', token);
        sessionStorage.setItem('user', user);
        sessionStorage.setItem('userName', name);
        sessionStorage.setItem('userId', userIndex);
        sessionStorage.setItem('userRole', role);
    }

    
}

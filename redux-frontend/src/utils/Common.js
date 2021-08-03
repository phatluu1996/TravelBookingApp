export default class Common {
    static getUser = () => {
        return sessionStorage.getItem('user') || null;
    }
    
    // return the token from the session storage
    static getToken = () => {
        return sessionStorage.getItem('userToken') || null;
    }

    static getUserFullName = () => {
        return sessionStorage.getItem('userName') || null;
    }
    
    // remove the token and user from the session storage
    static removeUserSession = () => {
        sessionStorage.removeItem('userToken');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('userRole');
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

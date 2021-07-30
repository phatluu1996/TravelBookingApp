export default class Common {
    static getUser = () => {
        const userStr = sessionStorage.getItem('user');
        if (userStr) return JSON.parse(userStr);
        else return null;
    }
    
    // return the token from the session storage
    static getToken = () => {
        return sessionStorage.getItem('userToken') || null;
    }
    
    // remove the token and user from the session storage
    static removeUserSession = () => {
        sessionStorage.removeItem('userToken');
        sessionStorage.removeItem('user');
    }
    
    // set the token and user from the session storage
    static setUserSession = (token, user) => {
        sessionStorage.setItem('userToken', token);
        sessionStorage.setItem('user', JSON.stringify(user));
    }
}
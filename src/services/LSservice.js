function LSService () {

    function checkIfExists (key) {
        if (localStorage.getItem(key)) {
            return true;
        } else {
            return false;
        }
    }

    function addNewUser (login, password) {

        const newUser = {
            password: password,
            token: '',
            tasks: [], 
        }
    
        localStorage.setItem(login, JSON.stringify(newUser));
    }
    
    function getNewToken () {
        
        let chrs = 'abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789';
        let token = '';
        
        for (var i = 0; i < 5; i++) {
            const pos = Math.floor(Math.random() * chrs.length);
            token += chrs.substring(pos, pos + 1);
        }
        
        return token;
    }
    
    function makeAuthRequest (login, password) {
        if (localStorage.getItem(login)) {
            const userData = JSON.parse(localStorage.getItem(login));
            if (userData.password === password) {
                const token = getNewToken();
                    userData.token = token;
                    localStorage.setItem(login, JSON.stringify(userData));
            }
        }
    }

    function getUserData (login, token) {
        const userData = JSON.parse(localStorage.getItem(login));
              if (userData.token === token) {
                return userData.tasks;
              }
    }

    function getUserInfo (name) {
        if (localStorage.getItem(name)) {
            const userData = JSON.parse(localStorage.getItem(name));
            return userData;
        }
       
    }

    return {addNewUser, makeAuthRequest, checkIfExists, getUserInfo};
}

export default LSService;
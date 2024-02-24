const credentials = [{
    username: 'nikita', password: 'sirvi'
}, {
    username: 'deepanshu', password: 'sinha'
}, {
    username: 'admin', password: 'admin'
}, {
    username: 'user', password: 'user'
}];

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const error = document.getElementById('error');
const form = document.getElementById('form');

usernameInput.onfocus = clearError;
passwordInput.onfocus = clearError;

function clearError() {
    error.innerText = '';
}

form.onsubmit = function (event) {
    loginClicked(event);
};

function loginClicked(event) {
    event.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    const currentUser = credentials.find(credential => credential.username === username)
    if (currentUser) {
        if (currentUser.password === password) {
            window.localStorage.setItem("username", username);
            window.localStorage.setItem("password", password);
            window.location.href = "../resume.html";
        } else {
            error.innerText = "invalid password";
        }
    } else {
        error.innerText = "invalid username";
    }
}

//prevent user from comming back to login page after sccessfully logged in
function preBack() {
    window.history.forward();
}

setTimeout("preBack()", 0);
window.onunload = function () {
    null
};

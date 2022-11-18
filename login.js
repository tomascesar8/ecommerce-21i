class User {
    constructor(name, lastname, country, email, password, admin){
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.country = country;
        this.admin = admin;
    }
}

let users = [
    new User('Tomás','César', 'Argentina', 'tomcesar@hotmail.com', '123456', true),
    new User('Nicolás','César', 'Argentina', 'n_cesar@hotmail.com', '111111', false),
    new User('Gonzalo','César', 'Argentina', 'g_ces@hotmail.com', '222222', false),
    new User('María Celeste','César', 'Argentina', 'celecesar@hotmail.com', '333333', false),
    new User('Viviana Matilde','Bacha', 'Argentina', 'vmbacha7@outlock.com', '444444', false),
];

let usersLocalStorage = localStorage.getItem('users'); 
console.log(usersLocalStorage);
let dataUsersLS = JSON.parse(usersLocalStorage);
console.log(dataUsersLS);
if(!dataUsersLS){
    let usersJSON = JSON.stringify(users);
    localStorage.setItem('users', usersJSON);
}
// localStorage.clear()


function loginCheck(event){
    event.preventDefault();
    let email = document.querySelector('#email').value;
    let pass = document.querySelector('#pass').value;
    let userLogged = users.find(user=>user.email==email);
    let passUserLogged = userLogged.password == pass;
    console.log(email);
    console.log(pass);
    if(userLogged){
        console.log('Email verificado');
        if(passUserLogged){
            window.location.assign('http://127.0.0.1:5500/main.html');
            console.log('Iniciaste sesión');
        }else{
            let invalidPass = document.createElement('div');
            invalidPass.innerText = '*Contraseña incorrecta'
            invalidPass.classList.add('alert', 'alert-danger', 'p-1', 'w-fluid', 'ms-2', 'me-2');
            let parentElement = document.getElementById('login-form');
            parentElement.append(invalidPass);
            console.log('Contraseña incorrecta');
            setTimeout(() => {parentElement.removeChild(invalidPass)}, 5000);            
        }
    }else{
        let invalidEmail = document.createElement('div');
        invalidEmail.innerText = '*Email incorrecto'
        invalidEmail.classList.add('alert', 'alert-danger', 'p-1', 'w-50', 'ms-2');
        let parentElement = document.getElementById('login-form');
        parentElement.append(invalidEmail);
        console.log('El email no se corresponde con ningún usuario');
        setTimeout(() => {parentElement.removeChild(invalidEmail)}, 5000);
    }
}

function register() {
    let name = document.getElementById('register-name').value;
    let lastname = document.getElementById('register-lastname').value;
    let country = document.getElementById('register-country').value;
    let email = document.getElementById('register-email').value;
    let newUserPass = document.getElementById('register-pass').value;

    let newUser = new User(name, lastname, country, email, newUserPass);
    
    let data = localStorage.getItem('users');
    let usersLS = JSON.parse(data);
    usersLS.push(newUser);
    data = JSON.stringify(usersLS);
    localStorage.setItem('users', data);

    window.location.assign('http://127.0.0.1:5500/main.html');
}
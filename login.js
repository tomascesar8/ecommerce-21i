class User {
    constructor(name, lastname, email, password, country, admin){
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.country = country;
        this.admin = admin;
    }
}

let users = [
    new User('Tomás','César', 'tomcesar@hotmail.com', '123456', 'Argentina', true),
    new User('Nicolás','César', 'n_cesar@hotmail.com', '111111', 'Argentina', false),
    new User('Gonzalo','César', 'g_ces@hotmail.com', '222222', 'Argentina', false),
    new User('María Celeste','César', 'celecesar@hotmail.com', '333333', 'Argentina', false),
    new User('Viviana Matilde','Bacha', 'vmbacha7@outlock.com', '444444', 'Argentina', false),
]

function loginCheck(event){
    event.preventDefault();
    let email = document.querySelector('#email').value;
    let pass = document.querySelector('#pass').value;
    let userLogged = users.find(user=>user.email==email);
    let passUserLogged = users.find(user=>user.password == pass)
    console.log(email);
    console.log(pass);
    if(userLogged){
        console.log('Email verificado');
        if(passUserLogged){
            window.location.assign('http://127.0.0.1:5500/main.html')
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
const users = {
        username:"admin",
        password:"admin"
    }


function validate(){
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if(username==users.username && password==users.password){
        location="index.html";
        return false;
    }else{
        alert("Usuario ou senha invalidos");
        return false;
    }
}
var checkPassword = function() {
    //Password and message fields
    var password1 = document.getElementById('f_password');
    var password2 = document.getElementById('f_password2');
    var message = document.getElementById('confirmMessage');
    //Colours
    var matchColor = "#66cc66";
    var noMatchColor = "#ff6666";

    //Compare the values in the password fields
    if(password1.value == password2.value){
        //The passwords match
        password2.style.backgroundColor = matchColor;
        message.style.color = matchColor;
        message.innerHTML = "Passwords Match!"
        
    } else {
        //The passwords do not match
        password2.style.backgroundColor = noMatchColor;
        message.style.color = noMatchColor;
        message.innerHTML = "Passwords Do Not Match!"
    }
}

document.getElementById('f_password2').addEventListener('keyup', checkPassword);
//TODO: add login logic

import "jquery";
import {userRequester} from "userRequester";

const userController = function () {
    function register(username, emailAddress, password, secretQuestion, secretAnswer) {
        const userData = {
            username: username,
            emailAddress: emailAddress,
            // TODO: hash
            passHash: "hashed" + password + username,
            secretQuestion: secretQuestion,
            secretAnswer: secretAnswer,
        };

        return userRequester().register(userData);
    }

    function login(username, password) {
        const userData = {
            username: username,
            passHash: "hashed" + password + username
        }
    }

    $("#register-submit").on("click", function (ev) {
        const username = $("#username-register").val().trim();
        const emailAddress = $("#email").val().trim();
        const password = $("#password-register").val().trim();
        const confirmPassword = $("#confirm-password").val().trim();
        const secretQuestion = $("#secret-question").val().trim();
        const secretAnswer = $("#secret-answer").val().trim();

        try {
            validateUsername(username);
            validateEmail(emailAddress);
            validatePassword(password);
            validateConfirmPassword(confirmPassword, password);
            validateSecretQuestion(secretQuestion);
            validateSecretAnswer(secretAnswer);
            
            let msg = "You are successfully registered!";
            let htmlAlert = '<div class="alert alert-success"> <strong>Success! </strong>'+ msg +'</div>';
            $('body').prepend(htmlAlert);
            $(".alert").first().hide().fadeIn(200).delay(1000).fadeOut(1500, function () { $(this).remove(); });

            register(username, emailAddress, password, secretQuestion, secretAnswer)
                .then(function (data) {
                    //TODO : local, session storage...
                }, function (data) {
                    console.log(data);
                });
        }
        catch (err){
            let htmlAlert = '<div class="alert alert-danger"> <strong>Error! </strong>'+ err +'</div>';
            $('body').prepend(htmlAlert);
            $(".alert").first().hide().fadeIn(200).delay(1000).fadeOut(1500, function () { $(this).remove(); });
        }

    });

    function validateUsername(username) {
        const usernameMinLength = 4;
        const usernamePattern = new RegExp("^[a-zA-Z0-9]{" + usernameMinLength + ",}");

        if(!username){
            throw "Username cannot be empty!";
        }

        if(!username.match(usernamePattern)){
            throw "Username must be more than " + usernameMinLength + " letters and should contain only latin letters and digits!"
        }
    }

    function validateEmail(email) {
        let emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if(!email) {
            throw "Email cannot be empty!";
        }

        if(!email.match(emailPattern)){
            throw "Invalid email address!";
        }
    }

    function validatePassword(password) {
        const passwordMinLength = 3;
        if(!password) {
            throw "Password cannot be empty!";
        }
        if(password.length < passwordMinLength){
            throw "Password cannot be less than " + passwordMinLength + " symbols long!";
        }
    }

    function validateConfirmPassword(confirmPassword, password) {
        if(confirmPassword !== password){
            throw "Passwords do not match!";
        }
    }

    function validateSecretQuestion(secretQuestion) {
        const secretQuestionMinLength = 3;
        if(!secretQuestion){
            throw "Secret question cannot be empty";
        }

        if(secretQuestion.length < secretQuestionMinLength){
            throw "Secret question cannot be less than " + secretQuestionMinLength + " letters"
        }
    }

    function validateSecretAnswer(secretAnswer) {
        const secretAnswerMinLength = 3;
        if(!secretAnswer){
            throw "Secret answer cannot be empty";
        }

        if(secretAnswer.length < secretAnswerMinLength){
            throw "Secret answer cannot be less than " + secretAnswerMinLength + " letters";
        }
    }
};

export {userController};
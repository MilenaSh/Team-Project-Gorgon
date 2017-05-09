const userValidator = function () {
    const usernameMinLength = 4;
    const usernamePattern = new RegExp("^[a-zA-Z0-9]{" + usernameMinLength + ",}");
    const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const passwordMinLength = 3;
    const secretQuestionMinLength = 3;
    const secretAnswerMinLength = 3;   

    function validateUsername(username) {
        if (!username) {
            throw "Username cannot be empty!";
        }

        if (!username.match(usernamePattern)) {
            throw "Username must be more than " + usernameMinLength + " letters and should contain only latin letters and digits!"
        }
    }

    function validateEmail(email) {
        if (!email) {
            throw "Email cannot be empty!";
        }

        if (!email.match(emailPattern)) {
            throw "Invalid email address!";
        }
    }

    function validatePassword(password) {
        if (!password) {
            throw "Password cannot be empty!";
        }
        if (password.length < passwordMinLength) {
            throw "Password cannot be less than " + passwordMinLength + " symbols long!";
        }
    }

    function validateConfirmPassword(confirmPassword, password) {
        if (confirmPassword !== password) {
            throw "Passwords do not match!";
        }
    }

    function validateSecretQuestion(secretQuestion) {
        if (!secretQuestion) {
            throw "Secret question cannot be empty";
        }

        if (secretQuestion.length < secretQuestionMinLength) {
            throw "Secret question cannot be less than " + secretQuestionMinLength + " letters"
        }
    }

    function validateSecretAnswer(secretAnswer) {
        if (!secretAnswer) {
            throw "Secret answer cannot be empty";
        }

        if (secretAnswer.length < secretAnswerMinLength) {
            throw "Secret answer cannot be less than " + secretAnswerMinLength + " letters";
        }
    }

    function validateUser(user) {
        validateUsername(user.username);
        validateEmail(user.email);
        validatePassword(user.password);
        validateConfirmPassword(user.confirmPassword, user.password);
        validateSecretQuestion(user.secretQuestion);
        validateSecretAnswer(user.secretAnswer);
    }

    // Consider exposing only one function to validate whole user data using the above functions
    return {
        validateUser : validateUser
    };
};

export { userValidator };
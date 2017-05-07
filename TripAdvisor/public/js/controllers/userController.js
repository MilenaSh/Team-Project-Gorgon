import "jquery";
import toastr from 'toastr';

//TODO: add login logic

const userController = function (usrRequester, usrValidator) {
    const userRequester = usrRequester;
    const userValidator = usrValidator;

    function register(username, emailAddress, password, secretQuestion, secretAnswer) {
        const userData = {
            username: username,
            emailAddress: emailAddress,
            // TODO: hash
            passHash: "hashed" + password + username,
            secretQuestion: secretQuestion,
            secretAnswer: secretAnswer,
        };

        return userRequester.register(userData);
    }

    function login(username, password) {
        const userData = {
            username: username,
            passHash: "hashed" + password + username
        };
    }

    $("#register-submit").on("click", function (ev) {
        const username = $("#username-register").val().trim();
        const emailAddress = $("#email").val().trim();
        const password = $("#password-register").val().trim();
        const confirmPassword = $("#confirm-password").val().trim();
        const secretQuestion = $("#secret-question").val().trim();
        const secretAnswer = $("#secret-answer").val().trim();



        try {
            
            const user = {
                username: username,
                email: emailAddress,
                password: password,
                confirmPassword: confirmPassword,
                secretQuestion: secretQuestion,
                secretAnswer: secretAnswer
            };

            userValidator.validateUser(user);

            register(username, emailAddress, password, secretQuestion, secretAnswer)
                .then(function (data) {
                    toastr.success("You are successfully registered!");
                }, function (data) {
                    console.log(data);
                });

        }
        catch (err){
            // Replace with toastr, clear input fields
            toastr.error(err);
        }

    });
};

export { userController };

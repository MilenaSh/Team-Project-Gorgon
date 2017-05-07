import "jquery";
import toastr from 'toastr';

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

        return userRequester.login(userData);
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
                    loadProfileIcon();
                }, function (data) {
                    toastr.error("User with that name already exists");
                });

        }
        catch (err){
            toastr.error(err);
        }
    });

    $("#login-submit").on("click", function (ev) {
        const username = $("#username").val().trim();
        const password = $("#password").val().trim();

        login(username, password)
            .then(function (data) {
                toastr.success("You are successfully logged in!");
                loadProfileIcon();
                if($("#remember:checked")){
                    //TODO: finish local storage things
                    localStorage.setItem("username", username);
                    localStorage.setItem("password", password);
                }
            }, function (data) {
                toastr.error("Username with this password does not exist!");
            })

    });

    function loadProfileIcon(){
        $('.dropdown').first().remove();
        $('.dropdown').replaceWith('<a href="#"><span class="glyphicon glyphicon-user"></span></a>');
    }
};

export { userController };

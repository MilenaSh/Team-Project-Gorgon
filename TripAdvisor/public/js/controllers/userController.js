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
            passHash: CryptoJS.SHA1(password).toString(),
            secretQuestion: secretQuestion,
            secretAnswer: secretAnswer,
        };

        return userRequester.register(userData);
    }

    function login(username, password) {
        const userData = {
            username: username,
            passHash: CryptoJS.SHA1(password).toString()
        };

        return userRequester.login(userData);
    }

    $("#register-submit").on("click", function () {
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
                    loadProfileIcon(username);
                }, function (data) {
                    toastr.error("User with that name already exists");
                });

        }
        catch (err) {
            toastr.error(err);
        }
    });

    $("#login-submit").on("click", function () {
        const username = $("#username").val().trim();
        const password = $("#password").val().trim();

        login(username, password)
            .then(function (data) {
                toastr.success("You are successfully logged in!");
                loadProfileIcon(username);
                if ($("#remember").is(':checked')) {
                    localStorage.setItem("username", username);
                    localStorage.setItem("password", password);
                }
            }, function (data) {
                toastr.error("Username with this password does not exist!");
            })
    });

    (function checkIfUserIsRemembered() {
        let username = localStorage.getItem("username");
        let password = localStorage.getItem("password");

        $("#username").val(username);
        $("#password").val(password);

        if (username && password) {
            $("#login-submit").trigger('click');
        } else {
            console.log("Nothing is localstored!");
        }
    }());

    function loadProfileIcon(username) {
        $('#login-link').text('Logout').attr('id', 'logout-link');
        $('#logout-link').on("click", function () {
            localStorage.removeItem("username");
            localStorage.removeItem("password");
            location.reload();
        });
        $('#login-dropdown').remove();
        $('#register-link').text(username).attr('id', 'profile-link');
        $('#profile-link').on("click", function () {
            //TODO: open user page
        });
        $('#register-dropdown').remove();
    }
};

export {userController};

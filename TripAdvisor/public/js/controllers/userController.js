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
                if ($("#remember").is(':checked')) {
                    localStorage.setItem("username", username);
                    localStorage.setItem("password", password);
                }
                loadProfileIcon(username);
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
        const userDropdownTemplate = '' +
            '<a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-user"></span> <span id="user-dropdown"> ' + username + ' </span><span class="caret"></span></a>' +
            '<ul class="dropdown-menu">' +
                '<li id="profile-link"><a href="#">Profile <span class="glyphicon glyphicon-user"></span></a></li>' +
                '<li id="logout"><a href="#">Logout <span class="glyphicon glyphicon-off"></span></a></li>' +
                '<li id="add-item-link"><a href="#">Add item <span class="glyphicon glyphicon-plus"></span></a></li>' +
            '</ul>';

        $('.dropdown:first').remove();
        $('.dropdown').removeClass("open").html(userDropdownTemplate);

        $('#profile-link').on("click", function () {
            //TODO: open user page
        });

        $('#logout').on("click", function () {
            localStorage.removeItem("username");
            localStorage.removeItem("password");
            location.reload();
        });

        $('#add-item-link').on("click", function () {
            //TODO: add new item logic
        });
    }
};

export {userController};

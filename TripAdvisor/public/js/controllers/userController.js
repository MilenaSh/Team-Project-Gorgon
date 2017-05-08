import "jquery";
import toastr from 'toastr';

const userController = function (usrRequester, objectRequester, usrValidator, templateLoader) {
    const userRequester = usrRequester;
    const userValidator = usrValidator;
    const loader = templateLoader;
    const objRequester = objectRequester;

    function register(username, emailAddress, password, secretQuestion, secretAnswer) {
        const userData = {
            username: username,
            emailAddress: emailAddress,
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
                .then(function () {
                    toastr.success("You are successfully registered!");
                    loadProfileDropdown(username);
                }, function () {
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
            .then(function (response) {
                toastr.success("You are successfully logged in!");
                if ($("#remember").is(':checked')) {
                    localStorage.setItem("username", response.username);
                    localStorage.setItem("userID", response.userID);
                }
                else {
                    sessionStorage.setItem("username", response.username);
                    sessionStorage.setItem("userID", response.userID);
                }
                loadProfileDropdown(username);
            }, function () {
                toastr.error("Username with this password does not exist!");
            })
    });

    $("#edit-profile-link").on('click', function(ev) {

    });

    (function checkIfUserIsRemembered() {
        let username = localStorage.getItem("username");
        let userID = localStorage.getItem("userID");

        // $("#username").val(username);
        // $("#password").val(password);

        if (username && userID) {
            loadProfileDropdown(username);
        } else {
            console.log("Nothing is localstored!");
        }
    }());

    function displayEditPage(templateName, containerSelector) {
        Promise.all([
            loader.loadTemplate(templateName)
        ])
        .then(([template]) => {
            $(containerSelector).html(template);
        })
        .then(() => {
            console.log($('#edit-user-btn'));
            $('#edit-user-btn').on('click', function(ev) {
                // validations
                console.log('called');
                const location = $('#user-location').val().trim();
                const description = $('#user-description').val().trim();
                const gender = $('#user-gender').val().trim();
                const birthday = $('#user-birthday').val().trim();
                const profilePicture = $('#user-profile-picture').val().trim();

                const changes = {
                    id: localStorage.getItem('userID'),
                    username: localStorage.getItem('username'),                    
                };

                if(location.length > 0) {
                    changes.location = location;
                }

                if(description.length > 0) {
                    changes.description = description;
                }

                if(gender.length > 0) {
                    changes.gender = gender;
                }

                if(birthday.length > 0) {
                    changes.birthday = birthday;
                }

                // REGEX
                if(profilePicture.length > 0) {
                    changes.profilePicture = profilePicture;
                }

                objRequester.editSpecificObject('api/users', null, changes)
                    .then(function(response) {
                        toastr.success(response);
                    });
            });
        });
    };

    function loadProfileDropdown(username) {
        $('.dropdown').css("display", "none");
        $('#user-dropdown-text').text(username);
        $('#profile-dropdown').css("display", "block");

        // Link to profile
        $('#profile-link a').attr('href', '/#!/users/' + username);

        // Link to add item
        $('#add-item-link a').attr('href', '/#!/add');

        // Link to profile edit
        $('#edit-profile-link a').attr('href', '/#!/editUser');

        $('#logout').on("click", function () {
            localStorage.removeItem("username");
            localStorage.removeItem("userID");
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("userID");
            $('.dropdown').css("display", "block");
            $('#profile-dropdown').css("display", "none");
            location.href = '/#';
        });

        $('#add-item-link').on("click", function () {
            //TODO: add new item logic
        });
    }

    return {
        displayEditPage: displayEditPage
    };
};

export {userController};

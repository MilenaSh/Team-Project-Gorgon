import "jquery";

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
            
            // Replace with toastr
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
            // Replace with toastr, clear input fields
            let htmlAlert = '<div class="alert alert-danger"> <strong>Error! </strong>'+ err +'</div>';
            $('body').prepend(htmlAlert);
            $(".alert").first().hide().fadeIn(200).delay(1000).fadeOut(1500, function () { $(this).remove(); });
        }

    });
};

export { userController };

let $h1 = $("<h1>Get and Put test(Firebase)</h1>");
$('body').prepend($h1);

let $root = $('#root');

let $ul = $('<ul></ul>');
$root.append($ul);

$("#list-users").on('click', function (ev) {
    $ul.empty();
    $.get(
        // https://YOUR-PROJECT-NAME.firebaseio.com/DIRECTORY-TO-LOOK-INTO.json?auth=FIREBASEDB_SECRET
        "https://test-50a3e.firebaseio.com/Accounts.json?auth=aGIN53PQMVEKBep8c9cn09br8Wnf7kUsSedWrfmR",
        function (data) {
            // Iterate through every 'object'?
            for (let key in data) {
                let $li = $('<li></li>');
                $li.html(`<b>Username:</b> ${key} </br> <b>First name:</b> ${data[key].fName} </br> <b>Password</b>: ${data[key].pass}`);
                $ul.append($li);
            }
        });
});



$("#register").on('click', function(ev) {
    let username = $("#username").val();
    let fName = $("#f-name").val();
    let pass = $("#pass").val();

    $.ajax({
        // Request type
        type: "PUT",
        // https://YOUR-PROJECT-NAME.firebaseio.com/DIRECTORY-TO-ADD-TO/NAME-TO-ADD.json?auth=FIREBASEDB_SECRET
        // TODO: auth is deprecated, find the current way to get access.
        url: `https://test-50a3e.firebaseio.com/Accounts/${username}.json?auth=aGIN53PQMVEKBep8c9cn09br8Wnf7kUsSedWrfmR`,
        
        contentType: "application/json",

        // JSON object to send
        data: JSON.stringify({
            "fName" : `${fName}`, 
            "pass" : `${pass}`
        }),

        // Erase inputs values
        success: function() {
            $("#username").val("");
            $("#f-name").val("");
            $("#pass").val("");
            alert("Registration successful!");
        }
    });
});

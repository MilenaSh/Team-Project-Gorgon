const addItemValidator = function () {
    const nameMinLength = 4;
    const descriptionMinLength = 8;
    const phonePattern = new RegExp("^[0-9-/ ]{8,}");
    const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    function validateName(name) {
        if (!name) {
            throw "Name cannot be empty!";
        }

        if (name.length < nameMinLength) {
            throw "Name cannot be less than " + nameMinLength + " symbols long!";
        }
    }

    function validateDescription(description) {
        if (!description) {
            throw "Description cannot be empty!"
        }
        if (description.length < descriptionMinLength) {
            throw "Description cannot be less than " + descriptionMinLength + " symbols long!";
        }
    }

    function validatePhone(phone) {
        if (!phone) {
            throw "Phone cannot be empty!";
        }

        if (!phone.match(phonePattern)) {
            throw "Phone is invalid!";
        }
    }

    function validateAddress(address) {
        if (!address) {
            throw "Address cannot be empty!";
        }
        //validation for google map address
        //let geocoder = new google.maps.Geocoder();

        //geocoder.geocode({'address': address.value}, function (results, status) {
        //    if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
        //        console.log(results.formatted_address);
        //    }
        //    else {
        //        throw "Address should be valid google map address!";//
        //    }
        //});
        
    }
    function validateEmail(email) {
        if (!email) {
            throw "Email cannot be empty!";
        }

        if (!email.match(emailPattern)) {
            throw "Invalid email address!";
        }
    }

    function validateImageUrl(url, timeout) {
        if(!url){
            throw "Main image url cannot be empty!"
        }
        timeout = timeout || 1000;
        let timedOut = false, timer;
        let img = new Image();
        img.onerror = img.onabort = function() {
            if (!timedOut) {
                clearTimeout(timer);
                throw "Image url is not valid!";
            }
        };

        img.src = url;
        timer = setTimeout(function() {
            timedOut = true;
            img.src = "//!!!!/test.jpg";
            throw "Image failed to load!";
        }, timeout);
    }

    function validateItem(item) {
        validateName(item.name);
        validateDescription(item.description);
        validatePhone(item.phone);
        validateAddress(item.address);
        validateEmail(item["e-mail"]);
        validateImageUrl(item.imageOne);
    }

    return {
        validateItem: validateItem
    };
};

export {addItemValidator};
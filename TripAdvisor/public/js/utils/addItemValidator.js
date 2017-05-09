const addItemValidator = function () {
    const nameMinLength = 4;
    const descriptionMinLength = 8;
    const phonePattern = new RegExp("^[0-9-/ ]{8,}");

    function validateName(name) {
        if(!name){
            throw "Name cannot be empty!";
        }

        if(name.length < nameMinLength){
            throw "Name cannot be less than " + nameMinLength + " symbols long!";
        }
    }

    function validateDescription(description) {
        if(!description){
            throw "Description cannot be empty!"
        }
        if(description.length < descriptionMinLength){
            throw "Description cannot be less than " + descriptionMinLength + " symbols long!";
        }
    }
    
    function validatePhone(phone){
        if(!phone){
            throw "Phone cannot be empty!";
        }

        if(!phone.match(phonePattern)){
            throw "Phone is invalid!";
        }
    }

    function validateAddress(address) {
        if(!address){
            throw "Address cannot be empty!";
        }

        let geocoder = new google.maps.Geocoder();

        geocoder.geocode({'address': address.value}, function(results, status){
            if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
                console.log([0].formatted_address);
            }
            else {
                throw "Address should be valid google map address!"
            }
        });
    }


    function validateItem(item) {
        validateName(item.name);
        validateDescription(item.description);
        validatePhone(item.phone);
        validateAddress(item.address);
    }

    return {
        validateItem : validateItem
    };
};

export { addItemValidator };
function validateAddAddressForm () {


    const Name = document.getElementById('Name')
    const Address = document.getElementById('Address')
    const Landmark = document.getElementById('Landmark')
    const City = document.getElementById('City')
    const State = document.getElementById('State')
    const Pincode = document.getElementById('Pincode')
    const MobileNumber = document.getElementById('MobileNumber')
    const AlternativeNumber = document.getElementById('AlternativeNumber')
    const AddressType = document.getElementById('AddressType')


    const NameError= document.getElementById('NameError')
    const AddressError= document.getElementById('AddressError')
    const LandmarkError= document.getElementById('LandmarkError')
    const CityError= document.getElementById('CityError')
    const StateError= document.getElementById('StateError')
    const PincodeError= document.getElementById('PincodeError')
    const MobileNumberError= document.getElementById('MobileNumberError')
    const AlternativeNumberError= document.getElementById('AlternativeNumberError')
    const AddressTypeError= document.getElementById('AddressTypeError')


    const nameRegex = /^[A-Z]/;
    const phoneRegex = /^[0-9]{10}$/;


    let isValid = true; // A flag to track overall validation

    function clearErrorWithDelay(errorField) {
        setTimeout(() => {
           errorField.innerHTML = '';
        }, 5000); // 5000 milliseconds = 5 seconds
     }

     function validateName() {
        if (Name.value.trim() === '') {
           NameError.innerHTML = 'First name cannot be empty';
           clearErrorWithDelay(NameError);
           isValid = false;
        } else if (!nameRegex.test(Name.value)) {
           NameError.innerHTML = 'First letter should be capital';
           clearErrorWithDelay(NameError);
           isValid = false;
        } else {
           NameError.innerHTML = ''; // Clear error message
        }
     }


     function validateAddress() {
        const addressValue = Address.value.trim();
        const words = addressValue.split(/\s+/); // Split address by spaces
    
        if (addressValue === '') {
            AddressError.innerHTML = 'Address cannot be empty';
            clearErrorWithDelay(AddressError);
            isValid = false;
        } else if (words.length < 1) {
            AddressError.innerHTML = 'Address should contain at least one word';
            clearErrorWithDelay(AddressError);
            isValid = false;
        } else if (addressValue.length < 5) {
            AddressError.innerHTML = 'Address should be at least 5 characters long';
            clearErrorWithDelay(AddressError);
            isValid = false;
        } else {
            AddressError.innerHTML = ''; // Clear error message
        }
    }
    

    function validateLandmark() {
        const landmarkValue = Landmark.value.trim();
        const words = landmarkValue.split(/\s+/); // Split landmark by spaces
    
        if (landmarkValue === '') {
            LandmarkError.innerHTML = 'Landmark cannot be empty';
            clearErrorWithDelay(LandmarkError);
            isValid = false;
        } else if (words.length < 1) {
            LandmarkError.innerHTML = 'Landmark should contain at least one word';
            clearErrorWithDelay(LandmarkError);
            isValid = false;
        } else {
            LandmarkError.innerHTML = ''; // Clear error message
        }
    }
    
    function validateCity() {
        const cityValue = City.value.trim();
        const words = cityValue.split(/\s+/); // Split city by spaces
    
        if (cityValue === '') {
            CityError.innerHTML = 'City cannot be empty';
            clearErrorWithDelay(CityError);
            isValid = false;
        } else if (words.length < 1) {
            CityError.innerHTML = 'City should contain at least one word';
            clearErrorWithDelay(CityError);
            isValid = false;
        } else {
            CityError.innerHTML = ''; // Clear error message
        }
    }
    

    function validateState() {
        const stateValue = State.value.trim();
        const words = stateValue.split(/\s+/); // Split state by spaces
    
        if (stateValue === '') {
            StateError.innerHTML = 'State cannot be empty';
            clearErrorWithDelay(StateError);
            isValid = false;
        } else if (words.length < 1) {
            StateError.innerHTML = 'State should contain at least one word';
            clearErrorWithDelay(StateError);
            isValid = false;
        } else {
            StateError.innerHTML = ''; // Clear error message
        }
    }
    
    function validatePincode() {
        const pincodeValue = Pincode.value.trim();
        const pincodeRegex = /^[0-9]{6}$/;
    
        if (pincodeValue === '') {
            PincodeError.innerHTML = 'Pincode cannot be empty';
            clearErrorWithDelay(PincodeError);
            isValid = false;
        } else if (!pincodeRegex.test(pincodeValue)) {
            PincodeError.innerHTML = 'Invalid pincode format';
            clearErrorWithDelay(PincodeError);
            isValid = false;
        } else {
            PincodeError.innerHTML = ''; // Clear error message
        }
    }
    

    function validateMobileNumber() {
        const mobileNumberValue = MobileNumber.value.trim();
        const phoneRegex = /^[0-9]{10}$/;
    
        if (mobileNumberValue === '') {
            MobileNumberError.innerHTML = 'Mobile number cannot be empty';
            clearErrorWithDelay(MobileNumberError);
            isValid = false;
        } else if (!phoneRegex.test(mobileNumberValue)) {
            MobileNumberError.innerHTML = 'Invalid mobile number format';
            clearErrorWithDelay(MobileNumberError);
            isValid = false;
        } else {
            MobileNumberError.innerHTML = ''; // Clear error message
        }
    }
    
    function validateAlternativeNumber() {
        const alternativeNumberValue = AlternativeNumber.value.trim();
        const mobileNumberValue = MobileNumber.value.trim();
        const phoneRegex = /^[0-9]{10}$/;
    
        if (alternativeNumberValue === '') {
            AlternativeNumberError.innerHTML = 'Alternative number cannot be empty';
            clearErrorWithDelay(AlternativeNumberError);
            isValid = false;
        } else if (!phoneRegex.test(alternativeNumberValue)) {
            AlternativeNumberError.innerHTML = 'Invalid alternative number format';
            clearErrorWithDelay(AlternativeNumberError);
            isValid = false;
        } else if (alternativeNumberValue === mobileNumberValue) {
            AlternativeNumberError.innerHTML = 'Alternative number cannot be the same as mobile number';
            clearErrorWithDelay(AlternativeNumberError);
            isValid = false;
        } else {
            AlternativeNumberError.innerHTML = ''; // Clear error message
        }
    }
    
    function validateAddressType() {
        const selectedAddressType = AddressType.value;
    
        if (!selectedAddressType || selectedAddressType === "Type of Address") {
            AddressTypeError.innerHTML = "Please select a valid  Type of Address";
          clearErrorWithDelay(AddressTypeError);
          isValid = false;
        } else {
            AddressTypeError.innerHTML = ""; // Clear error message
        }
      }

    if (isValid) validateName();
    if (isValid) validateAddress();
    if (isValid) validateLandmark();
    if (isValid) validateCity();
    if (isValid) validateState();
    if (isValid) validatePincode();
    if (isValid) validateMobileNumber();
    if (isValid) validateAlternativeNumber();
    if (isValid) validateAddressType();

    return isValid;

}
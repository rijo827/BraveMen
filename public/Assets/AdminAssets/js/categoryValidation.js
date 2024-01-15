function CatgeoryValidation() {


    const productName = document.getElementById('product_name');
    const productDescription = document.getElementById('product_description');


    const productNameError=document.getElementById('CategoryNameError');
    const productDescriptionErr=document.getElementById('DescriptionError');



    const nameRegex = /^[A-Z]/;
    const descriptionRegex = /^(?=(?:\S*\s){0,9}\S*$)[A-Za-z\d\s]{5,}$/;


    let isValid = true;

    function clearErrorWithDelay(errorField) {
        setTimeout(() => {
           errorField.innerHTML = '';
        }, 5000); // 5000 milliseconds = 5 seconds
     }

     // Function to validate first name
    function validateCatgoryName() {
        if (productName.value.trim() === '') {
           productNameError.innerHTML = 'First name cannot be empty';
           clearErrorWithDelay(productNameError);
           isValid = false;
        } else if (!nameRegex.test(productName.value)) {
           productNameError.innerHTML = 'First letter should be capital';
           clearErrorWithDelay(productNameError);
           isValid = false;
        } else {
           productNameError.innerHTML = ''; // Clear error message
        }
     }
       // Function to validate description
// Function to validate description
function validateDescription() {
    const trimmedDescription = productDescription.value.trim();

    if (trimmedDescription === '') {
        productDescriptionErr.innerHTML = 'Description cannot be empty';
        clearErrorWithDelay(productDescriptionErr);
        isValid = false;
    } else if (!descriptionRegex.test(trimmedDescription)) {
        productDescriptionErr.innerHTML = 'Invalid description format';
        clearErrorWithDelay(productDescriptionErr);
        isValid = false;
    } else if (trimmedDescription.length > 50) {
        productDescriptionErr.innerHTML = 'Description has reached the maximum length of 50 characters';
        clearErrorWithDelay(productDescriptionErr);
        isValid = false;
    } else {
        productDescriptionErr.innerHTML = ''; // Clear error message
    }
}


 if (isValid) validateCatgoryName();
 if(isValid) validateDescription();


 return isValid
}
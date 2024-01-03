function validateLoginForm() {


    const email = document.getElementById('Email');
    const password = document.getElementById('password');


    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');


    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;


    let isValid = true; // A flag to track overall validation



    function clearErrorWithDelay(errorField) {
        setTimeout(() => {
           errorField.innerHTML = '';
        }, 5000); // 5000 milliseconds = 5 seconds
     }



      // Function to validate email
    function validateEmail() {
        if (email.value.trim() === '') {
           emailError.innerHTML = 'Email cannot be empty';
           clearErrorWithDelay(emailError);
           isValid = false;
        } else if (!emailRegex.test(email.value)) {
           emailError.innerHTML = 'Please enter a valid email';
           clearErrorWithDelay(emailError);
           isValid = false;
        } else {
           emailError.innerHTML = ''; // Clear error message
        }
     }


      // Function to validate password
    function validatePassword() {
        if (password.value.trim() === '') {
           passwordError.innerHTML = 'Password cannot be empty';
           clearErrorWithDelay(passwordError);
           isValid = false;
        } else if (!passwordRegex.test(password.value)) {
           passwordError.innerHTML = 'Enter a strong password (Must contain 8 characters; should include at least one special character, one uppercase letter, and one number)';
           clearErrorWithDelay(passwordError);
           isValid = false;
        } else {
           passwordError.innerHTML = ''; // Clear error message
        }
     }

     if (isValid) validateEmail();
     if (isValid) validatePassword();


     return isValid;
}
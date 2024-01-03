function forgotPasswordvalid(){

    //  fetch all id to a variable
    const email = document.getElementById('Email');
    const otp = document.getElementById('Otp');
    const password= document.getElementById("password1")
    const confirmPassword = document.getElementById('c1password');


    //  FOR ERROR

    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const otpError = document.getElementById('otpError');
    const emailError = document.getElementById('emailError');

    // Regex 

    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const otpRegex = /^[0-9]{6}$/;

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
  
     // Function to validate confirm password
     function validateConfirmPassword() {
        if (confirmPassword.value.trim() === '') {
           confirmPasswordError.innerHTML = 'Confirm Password cannot be empty';
           clearErrorWithDelay(confirmPasswordError);
           isValid = false;
        } else if (confirmPassword.value !== password.value) {
           confirmPasswordError.innerHTML = 'Passwords do not match';
           clearErrorWithDelay(confirmPasswordError);
           isValid = false;
        } else {
           confirmPasswordError.innerHTML = ''; // Clear error message
        }
     }

      // Function to validate OTP
    function validateOTP() {
        console.log("otpRegex.test(otp.value) ===>>>",otpRegex.test(otp.value));
        console.log("otp.value ===>>>",otp.value);
        console.log("otp ===>>>",otp);
        if (otp.value.trim() === '') {
           otpError.innerHTML = 'OTP is empty';
           clearErrorWithDelay(otpError);
           isValid = false;
        } else if (! otpRegex.test(otp.value)) {
           otpError.innerHTML = 'Invalid OTP format';
           clearErrorWithDelay(otpError);
           isValid = false;
        } else {
           otpError.innerHTML = ''; // Clear error message
        }
     }



     if (isValid) validateEmail();
    if (isValid) validateOTP();
    if (isValid) validatePassword();
    if (isValid) validateConfirmPassword();
 
    return isValid;
}


function userRegisterValidation() {
console.log("userRegisterValidation");
   // const generatedOtp = require('userController.js')
    // Input fields
    // const referalID = document.getElementById('referalID');
    const firstName = document.getElementById('Firstname');
    const lastName = document.getElementById('Lastname');
    const email = document.getElementById('Email');
    const password = document.getElementById('password');
    const phone = document.getElementById('Phone');
    const confirmPassword = document.getElementById('conPassword');
    const otp = document.getElementById('Otp');
//  console.log("firstName   ===>>>>   ",firstName.value);
//  console.log("lastName   ===>>>>   ",lastName.value);
//  console.log("email   ===>>>>   ",email.value);
//  console.log("password   ===>>>>   ",password.value);
//  console.log("phone   ===>>>>   ",phone.value);
//  console.log("confirmPassword   ===>>>>   ",confirmPassword.value);
//  console.log("otp   ===>>>>   ",otp.value);
    // Error fields
    // const referalIDError = document.getElementById('referalIDError');
    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const phoneError = document.getElementById('phoneError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const otpError = document.getElementById('otpError');
 
    // Regex
    const nameRegex = /^[A-Z]/;
    // const emailRegex = /^[a-z0-9._%+-]+@gmail+\.[a-z]{3}$/;
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const phoneRegex = /^[0-9]{10}$/;
   //  const referalIDRegex = /^[0-9]{6}$/;
    const otpRegex = /^[0-9]{6}$/;
 
    let isValid = true; // A flag to track overall validation
 
    // Function to clear error message with a delay
    function clearErrorWithDelay(errorField) {
       setTimeout(() => {
          errorField.innerHTML = '';
       }, 5000); // 5000 milliseconds = 5 seconds
    }
 
       // Function to validate first name
    //    function validateReferalID() {
    //        if (referalID.value.trim() !== '' && !referalIDRegex.test(referalID.value)) {
    //          referalIDError.innerHTML = 'Please enter a valid Referal Code';
    //          clearErrorWithDelay(referalIDError);
    //          isValid = false;
    //       } else {
    //          referalIDError.innerHTML = ''; // Clear error message
    //       }
    //    }
       
 
    // Function to validate first name
    function validateFirstName() {
       if (firstName.value.trim() === '') {
          firstNameError.innerHTML = 'First name cannot be empty';
          clearErrorWithDelay(firstNameError);
          isValid = false;
       } else if (!nameRegex.test(firstName.value)) {
          firstNameError.innerHTML = 'First letter should be capital';
          clearErrorWithDelay(firstNameError);
          isValid = false;
       } else {
          firstNameError.innerHTML = ''; // Clear error message
       }
    }
 
    // Function to validate last name
    function validateLastName() {
       if (lastName.value.trim() === '') {
          lastNameError.innerHTML = 'Last name cannot be empty';
          clearErrorWithDelay(lastNameError);
          isValid = false;
       } else if (!nameRegex.test(lastName.value)) {
          lastNameError.innerHTML = 'First letter should be capital';
          clearErrorWithDelay(lastNameError);
          isValid = false;
       } else {
          lastNameError.innerHTML = ''; // Clear error message
       }
    }
 
    // Function to validate phone number
    function validateMobile() {
       if (phone.value.trim() === '') {
          phoneError.innerHTML = 'Mobile Number cannot be empty';
          clearErrorWithDelay(phoneError);
          isValid = false;
       } else if (!phoneRegex.test(phone.value)) {
          phoneError.innerHTML = 'Please enter a valid number';
          clearErrorWithDelay(phoneError);
          isValid = false;
       } else {
          phoneError.innerHTML = ''; // Clear error message
       }
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
   //  console.log("userControler.generatedOtp  ====>>>>  ",userControler.generatedOtp);
 
    // Validate fields one by one
    // validateReferalID();
    if (isValid) validateFirstName();
    if (isValid) validateLastName();
    if (isValid) validateMobile();
    if (isValid) validateEmail();
    if (isValid) validateOTP();
    if (isValid) validatePassword();
    if (isValid) validateConfirmPassword();
 
    return isValid;
 }
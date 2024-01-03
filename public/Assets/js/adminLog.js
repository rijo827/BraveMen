function adminLog (){

console.log("its validated");
    const UserName = document.getElementById('Username');
    const password = document.getElementById('password');

     
    const UsernameError = document.getElementById('UserNameError');
    const passwordError = document.getElementById('passwordError');


    const nameRegex = /^[A-Z]/;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;


    let isValid = true; // A flag to track overall validation
   

    function clearErrorWithDelay(errorField) {
        setTimeout(() => {
           errorField.innerHTML = '';
        }, 5000); // 5000 milliseconds = 5 seconds
     }
 
     function validateUserName() {
        if (UserName.value.trim() === '') {
           UsernameError.innerHTML = 'Name cannot be empty';
           clearErrorWithDelay(UsernameError);
           isValid = false;
        } else if (!nameRegex.test(UserName.value)) {
           UsernameError.innerHTML = 'First letter should be capital';
           clearErrorWithDelay(UsernameError);
           isValid = false;
        } else {
           UsernameError.innerHTML = ''; // Clear error message
        }
     }

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
 
     
    if (isValid) validateUserName();
    if (isValid) validatePassword();

 return isValid


}
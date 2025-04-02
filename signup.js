document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    // Live validation for all fields
    nameInput.addEventListener("input", function () {
        validateField(nameInput, /^[A-Za-z ]+$/, "Name can only contain letters and spaces");
    });
    
    emailInput.addEventListener("input", function () {
        validateField(emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format");
    });

    phoneInput.addEventListener("input", function () {
        validateField(phoneInput, /^\d{10}$/, "Phone number must be 10 digits");
    });

    passwordInput.addEventListener("input", function () {
        validateField(passwordInput, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must be at least 8 characters, with uppercase, lowercase, number, and special character");
    });

    confirmPasswordInput.addEventListener("input", function () {
        validateConfirmPassword();
    });

    signupForm.addEventListener("submit", function (event) {
        let valid = true;

        document.querySelectorAll(".error-message").forEach(el => el.textContent = "");

        if (!/^[A-Za-z ]+$/.test(nameInput.value)) {
            showError(nameInput, "Name can only contain letters and spaces");
            valid = false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
            showError(emailInput, "Invalid email format");
            valid = false;
        }
        if (!/^\d{10}$/.test(phoneInput.value)) {
            showError(phoneInput, "Phone number must be 10 digits");
            valid = false;
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(passwordInput.value)) {
            showError(passwordInput, "Password must be at least 8 characters, with uppercase, lowercase, number, and special character");
            valid = false;
        }
        if (passwordInput.value !== confirmPasswordInput.value) {
            showError(confirmPasswordInput, "Passwords do not match");
            valid = false;
        }

        if (!valid) {
            event.preventDefault();
        } else {
            alert(`Welcome, ${nameInput.value}! You have successfully signed up.`);
        }
    });

    function validateField(input, regex, errorMessage) {
        if (!regex.test(input.value)) {
            showError(input, errorMessage);
        } else {
            clearError(input);
        }
    }

    function validateConfirmPassword() {
        if (passwordInput.value !== confirmPasswordInput.value) {
            showError(confirmPasswordInput, "Passwords do not match");
        } else {
            clearError(confirmPasswordInput);
        }
    }

    function showError(input, message) {
        let errorSpan = input.nextElementSibling;
        if (!errorSpan || !errorSpan.classList.contains("error-message")) {
            errorSpan = document.createElement("span");
            errorSpan.classList.add("error-message");
            input.parentNode.insertBefore(errorSpan, input.nextSibling.nextSibling);
        }
        errorSpan.textContent = message;
        errorSpan.style.color = "red";
        errorSpan.style.display = "block";
    }

    function clearError(input) {
        const errorSpan = input.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains("error-message")) {
            errorSpan.textContent = "";
        }
    }
});

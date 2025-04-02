console.log("External JS Loaded");

// Login Form Validation
const loginForm = document.querySelector(".login-form");
const signupForm = document.querySelector(".signup-form");
const profilePicInput = document.getElementById("profile-pic-upload");
const profilePic = document.getElementById("profile-pic");

// Function to show error message immediately
function showError(input, message) {
    let errorDiv = input.nextElementSibling;
    if (!errorDiv || !errorDiv.classList.contains("error-message")) {
        errorDiv = document.createElement("div");
        errorDiv.classList.add("error-message");
        input.parentNode.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
    errorDiv.style.color = "red";
}

// Function to clear error message
function clearError(input) {
    let errorDiv = input.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains("error-message")) {
        errorDiv.textContent = "";
    }
}

// Real-time validation for inputs
function enableRealTimeValidation() {
    document.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", function () {
            clearError(input);
        });
    });
}

enableRealTimeValidation();

// Function to show success message
function showSuccessMessage(message) {
    alert(message);
}

// Login Form Validation
if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        let isValid = true;

        if (email.trim() === "") {
            showError(document.getElementById("email"), "Email is required.");
            isValid = false;
        }
        if (password.trim() === "") {
            showError(document.getElementById("password"), "Password is required.");
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
        } else {
            event.preventDefault();
            showSuccessMessage("Login Successful!");
        }
    });
}

// Sign-Up Form Validation
if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^[0-9]{10}$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        let isValid = true;

        if (name.trim() === "") {
            showError(document.getElementById("name"), "Full Name is required.");
            isValid = false;
        }
        if (!emailPattern.test(email)) {
            showError(document.getElementById("email"), "Enter a valid email address.");
            isValid = false;
        }
        if (!phonePattern.test(phone)) {
            showError(document.getElementById("phone"), "Enter a valid 10-digit phone number.");
            isValid = false;
        }
        if (!passwordPattern.test(password)) {
            showError(document.getElementById("password"), "Password must be at least 8 characters with uppercase, lowercase, number, and special character.");
            isValid = false;
        }
        if (password !== confirmPassword) {
            showError(document.getElementById("confirm-password"), "Passwords do not match.");
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
        } else {
            event.preventDefault();
            showSuccessMessage("Sign-Up Successful!");
        }
    });
}

// Profile Picture Preview
if (profilePicInput) {
    profilePicInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePic.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}

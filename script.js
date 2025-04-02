console.log("External JS Loaded");

// Accessing HTML elements
const form = document.getElementById("contactForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const message = document.getElementById("message");
const date = document.getElementById("date"); // New Date Input

// Function to show error message
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

// Function for real-time validation
function enableRealTimeValidation() {
    fullName.addEventListener("input", function () {
        const namePattern = /^[A-Za-z\s]+$/;
        if (!namePattern.test(fullName.value)) {
            showError(fullName, "Full Name should contain only letters.");
        } else {
            clearError(fullName);
        }
    });

    email.addEventListener("input", function () {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
            showError(email, "Enter a valid email address.");
        } else {
            clearError(email);
        }
    });

    phone.addEventListener("input", function () {
        const phonePattern = /^(?:\+254|0)[7]\d{8}$/;
        if (phone.value.trim() !== "" && !phonePattern.test(phone.value)) {
            showError(phone, "Enter a valid phone number (e.g., +2547XXXXXXXX or 07XXXXXXXX).");
        } else {
            clearError(phone);
        }
    });

    message.addEventListener("input", function () {
        if (message.value.trim() === "") {
            showError(message, "Message cannot be empty.");
        } else {
            clearError(message);
        }
    });

    date.addEventListener("input", function () {
        let today = new Date().toISOString().split("T")[0];
        if (date.value < today) {
            showError(date, "Please select a future date.");
        } else {
            clearError(date);
        }
    });
}

// Enable real-time validation on input fields
enableRealTimeValidation();

// Form validation function
function validateForm(event) {
    let isValid = true;

    // Full Name Validation (Only letters)
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(fullName.value.trim())) {
        showError(fullName, "Full Name should contain only letters.");
        isValid = false;
    } else {
        clearError(fullName);
    }

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
        showError(email, "Enter a valid email address.");
        isValid = false;
    } else {
        clearError(email);
    }

    // Phone Validation (Kenyan Format)
    const phonePattern = /^(?:\+254|0)[7]\d{8}$/;
    if (phone.value.trim() !== "" && !phonePattern.test(phone.value.trim())) {
        showError(phone, "Enter a valid phone number (e.g., +2547XXXXXXXX or 07XXXXXXXX).");
        isValid = false;
    } else {
        clearError(phone);
    }

    // Message Validation
    if (message.value.trim() === "") {
        showError(message, "Message cannot be empty.");
        isValid = false;
    } else {
        clearError(message);
    }

    // Date Validation (No past dates allowed)
    let today = new Date().toISOString().split("T")[0];
    if (date.value < today) {
        showError(date, "Please select a future date.");
        isValid = false;
    } else {
        clearError(date);
    }

    // If validation fails, prevent form submission
    if (!isValid) {
        event.preventDefault();
    } else {
        console.log("Form Submitted Successfully!");
        alert(`Thank you, ${fullName.value.trim()}! Your message has been sent Successfully!.`);
    }
}

// Add event listener to form
form.addEventListener("submit", validateForm);

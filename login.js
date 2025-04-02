function validateLogin(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    let errorMessage = "";

    if (!email) {
        errorMessage += "Please enter your email.\n";
    }

    if (!password) {
        errorMessage += "Please enter your password.\n";
    } else {
        if (password.length < 8) {
            errorMessage += "Password must be at least 8 characters long.\n";
        }
        if (!/[A-Z]/.test(password)) {
            errorMessage += "Password must contain at least one uppercase letter.\n";
        }
    }

    if (errorMessage) {
        alert(errorMessage);
        return;
    }

    // Send login request to PHP script
    fetch("login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Store user details in sessionStorage for profile auto-population
            sessionStorage.setItem("user_id", data.id);
            sessionStorage.setItem("user_name", data.name);
            sessionStorage.setItem("user_email", data.email);
            sessionStorage.setItem("user_phone", data.phone);

            alert("Login successful!");
            window.location.href = "userprofile.html"; // Redirect to profile page
        } else {
            alert("Error: " + data.error);
        }
    })
    .catch(error => console.error("Login error:", error));
}

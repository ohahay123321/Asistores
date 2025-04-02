// Toggle between Login & Sign-Up Forms
function toggleForms() {
    document.getElementById("loginForm").style.display =
        document.getElementById("loginForm").style.display === "none" ? "block" : "none";
    document.getElementById("signUpForm").style.display =
        document.getElementById("signUpForm").style.display === "none" ? "block" : "none";
}

// Sign-Up Function
function signUp() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("signUpEmail").value;
    let password = document.getElementById("signUpPassword").value;

    if (name && email && password) {
        let user = { name, email, password };
        localStorage.setItem(email, JSON.stringify(user));
        alert("Sign-up successful! You can now log in.");
        toggleForms();
    } else {
        alert("Please fill all fields.");
    }
}

// Login Function
function login() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let user = JSON.parse(localStorage.getItem(email));

    if (user && user.password === password) {
        localStorage.setItem("loggedInUser", email);
        showProfile(user);
    } else {
        alert("Invalid email or password. Please try again.");
    }
}

// Show Profile Function
function showProfile(user) {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signUpForm").style.display = "none";
    document.getElementById("userProfile").style.display = "block";

    document.getElementById("profileName").innerText = user.name;
}

// Logout Function
function logout() {
    localStorage.removeItem("loggedInUser");
    document.getElementById("userProfile").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}

// Check if user is already logged in
window.onload = function () {
    let loggedInEmail = localStorage.getItem("loggedInUser");
    if (loggedInEmail) {
        let user = JSON.parse(localStorage.getItem(loggedInEmail));
        if (user) showProfile(user);
    }
};

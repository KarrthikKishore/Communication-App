// Check if a user is already logged in
const loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"));

// Redirect if the user is already logged in and not on the login page
if (loggedinUser && window.location.pathname.toLowerCase() !== "/login.html") {
  window.location.href = "Userlist.html"; // Redirect to the correct internal page
}

document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Validation for email and password
  if (!email || !password) {
    alert("Email and Password are mandatory.");
    return;
  }

  // Check for registered users in localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    // Set login status and user information in localStorage
    localStorage.setItem("loggedinUser", JSON.stringify(user)); 
    localStorage.setItem("isLoggedIn", "true"); // Set the isLoggedIn flag

    window.location.href = "loginSuccess.html"; // Redirect to login success page
  } else {
    const registerOption = confirm(
      "Wrong Email or Password. Would you like to register an account?"
    );
    if (registerOption) {
      window.location.href = "register.html"; // Redirect to register page
    }
  }
});

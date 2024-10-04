function checkLogin() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // If user is not logged in, redirect to the login page
  if (isLoggedIn !== "true") {
    alert("You need to be logged in to access this page.");
    window.location.href = "login.html"; // Redirect to login page
  }
}

// Call the login check function on page load
window.onload = checkLogin;

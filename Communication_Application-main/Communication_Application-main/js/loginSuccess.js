// Retrieve the logged-in user object from localStorage
const loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"));

// Check if the logged-in user exists and has an email
if (loggedinUser && loggedinUser.email) {
  document.getElementById("email").textContent = loggedinUser.email; // Display the user's email
} else {
  document.getElementById("email").textContent = "Guest"; // Default to 'Guest' if no user is logged in
}

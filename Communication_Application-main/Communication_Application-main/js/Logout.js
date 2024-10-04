// Function to confirm logout and redirect to welcome page
function confirmLogout() {
  // Confirm the logout action
  const confirmLogout = window.confirm("Are you sure you want to log out?");
  if (confirmLogout) {
    // Clear logged-in user from localStorage
    localStorage.removeItem("loggedinUser");
    // Redirect to the welcome page
    window.location.href = "Welcome.html"; // Redirect to the welcome page
  } else {
    // Do nothing or handle cancellation
    window.history.back(); // Go back to the previous page
  }
}

// Attach the confirmLogout function to the logout button
document
  .getElementById("confirmLogoutButton")
  .addEventListener("click", confirmLogout);
document
  .getElementById("cancelLogoutButton")
  .addEventListener("click", function () {
    window.history.back(); // Go back to the previous page on cancel
  });

// Close chat window
function closeChat() {
  document.querySelector(".chat-window").style.display = "none";
}

// Refresh page without clearing messages
function refreshPage() {
  window.location.reload();
}

// Get the logged-in user from localStorage
const loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"));

if (!loggedinUser) {
  // Redirect to the login page if not logged in
  window.location.href = "Login.html"; // Change to your login page path
} else {
  // Display the current logged-in user's name in the chat input bar
  document.getElementById("currentUser").textContent = `${loggedinUser.fullname}`;
}

// Load chat history from localStorage
function loadChatHistory() {
  const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
  const chatMessages = document.getElementById("chatMessages");

  chatHistory.forEach((chat) => {
    const messageElement = document.createElement("div");
    messageElement.className = "message";
    messageElement.innerHTML = `<span>[${chat.dateTime}] (${chat.user}):</span> ${chat.message}`;
    chatMessages.appendChild(messageElement);
  });
}

// Load chat history on page load
window.onload = function () {
  loadChatHistory();
};

// Function to send a message and store it in localStorage
function sendMessage() {
  const message = document.getElementById("messageInput").value;

  if (loggedinUser && message) {
    const dateTime = new Date().toLocaleString(); // Dynamic DateTime
    const chatMessages = document.getElementById("chatMessages");

    // Create a new message element
    const messageElement = document.createElement("div");
    messageElement.className = "message";
    messageElement.innerHTML = `<span>[${dateTime}] (${loggedinUser.fullname}):</span> ${message}`;
    chatMessages.appendChild(messageElement);

    // Clear the input field
    document.getElementById("messageInput").value = "";

    // Store message details in localStorage
    const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    chatHistory.push({ user: loggedinUser.fullname, message, dateTime });
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }
}

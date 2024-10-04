document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const errorMessage = document.getElementById("error-message");

    // Clear previous error message
    errorMessage.textContent = "";
    errorMessage.style.visibility = "hidden";

    // Validation for empty fields
    if (!fullname || !email || !password || !confirmPassword) {
      errorMessage.textContent = "All fields are mandatory.";
      errorMessage.style.visibility = "visible";
      return;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    if (!emailRegex.test(email)) {
      errorMessage.textContent = "Invalid Email format. Use 'name@gmail.com'.";
      errorMessage.style.visibility = "visible";
      return;
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(password)) {
      errorMessage.textContent =
        "Password must be at least 8 characters long and include an uppercase, lowercase, number, and special character.";
      errorMessage.style.visibility = "visible";
      return;
    }

    // Password match validation
    if (password !== confirmPassword) {
      errorMessage.textContent = "Passwords do not match.";
      errorMessage.style.visibility = "visible";
      return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.email === email)) {
      errorMessage.textContent = "User with this email already exists.";
      errorMessage.style.visibility = "visible";
      return;
    }

    // Register new user
    const newUserId = users.length ? users[users.length - 1].id + 1 : 1;
    users.push({ id: newUserId, fullname, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    // Redirect to success page
    window.location.href = "RegisterSuccess.html";
  });

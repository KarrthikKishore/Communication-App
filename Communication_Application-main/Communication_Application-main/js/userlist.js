let users = JSON.parse(localStorage.getItem("users")) || [];
let loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"));

function editUser(id) {
  const user = users.find((user) => user.id === id);
  if (user) {
    window.location.href = `editUser.html?id=${id}`;
  }
}

function deleteUser(id) {
  if (confirm("Are you sure you want to delete this user?")) {
    // Check if the user to delete is not the logged-in user
    if (id === loggedinUser.id) {
      alert("You cannot delete the logged-in user.");
      return;
    }

    // Remove the user from the users array
    users = users.filter((user) => user.id !== id);

    // Update localStorage with the new users list
    localStorage.setItem("users", JSON.stringify(users));

    // Refresh the display after deletion
    displayUsers();
  }
}

function displayUsers() {
  let userTableBody = document.getElementById("userTableBody");
  userTableBody.innerHTML = "";

  users.forEach(function (user) {
    let row = document.createElement("tr");
    row.innerHTML = `
            <td>${user.fullname}</td>
            <td>${user.email}</td>
            <td>
                <div class="action-btns">
                    <button class="edit-btn" onclick="editUser(${
                      user.id
                    })">Edit</button>
                    ${
                      user.id !== loggedinUser.id
                        ? `<button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>`
                        : ""
                    }
                </div>
            </td>
        `;
    userTableBody.appendChild(row);
  });
}

// Display users on page load
displayUsers();

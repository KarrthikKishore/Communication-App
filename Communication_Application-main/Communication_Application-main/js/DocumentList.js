// Array to hold uploads data from localStorage
let uploads = JSON.parse(localStorage.getItem("uploads")) || [];
let editingIndex = -1;
let deleteIndex = -1; // Store index for deletion

// Render the uploads table
function renderUploads() {
  const uploadsTable = document.getElementById("uploadsTable");
  uploadsTable.innerHTML = "";
  uploads.forEach((upload, index) => {
    uploadsTable.innerHTML += `
      <tr>
        <td>${upload.label}</td>
        <td>${upload.fileName}</td>
        <td>
          <a onclick="openEditModal(${index})">Edit</a> |
          <a onclick="confirmDelete(${index})">Delete</a>
        </td>
      </tr>
    `;
  });
}

// Open the upload modal
function openUploadModal() {
  document.getElementById("uploadModal").style.display = "flex";
}

// Close the upload modal
function closeUploadModal() {
  document.getElementById("uploadModal").style.display = "none";
  document.getElementById("fileLabel").value = ""; // Clear input field
  document.getElementById("fileNameDisplay").textContent = ""; // Clear file name display
}

// Display file name after choosing file
function displayFileName() {
  const fileInput = document.getElementById("fileInput");
  const fileNameDisplay = document.getElementById("fileNameDisplay");
  fileNameDisplay.textContent =
    fileInput.files.length > 0 ? fileInput.files[0].name : "";
}

// Add a new upload
function addUpload() {
  const fileLabel = document.getElementById("fileLabel").value;
  const fileInput = document.getElementById("fileInput");
  if (!fileLabel || fileInput.files.length === 0) {
    alert("Please provide both file description and file.");
    return;
  }
  const fileName = fileInput.files[0].name;

  // Save upload details to local storage
  uploads.push({ label: fileLabel, fileName: fileName });
  localStorage.setItem("uploads", JSON.stringify(uploads));

  // Close modal and re-render table
  closeUploadModal();
  renderUploads();
}

// Open the edit modal
function openEditModal(index) {
  editingIndex = index;
  const upload = uploads[index];
  document.getElementById("editLabel").value = upload.label;
  document.getElementById("editModal").style.display = "flex";
}

// Close the edit modal
function closeEditModal() {
  document.getElementById("editModal").style.display = "none";
}

// Save the edited label
function saveEdit() {
  const newLabel = document.getElementById("editLabel").value;
  if (newLabel.trim()) {
    uploads[editingIndex].label = newLabel;
    localStorage.setItem("uploads", JSON.stringify(uploads));
    renderUploads();
    closeEditModal();
  } else {
    alert("Label cannot be empty.");
  }
}

// Confirm delete modal
function confirmDelete(index) {
  deleteIndex = index;
  document.getElementById("deleteModal").style.display = "flex";
}

// Close the delete modal
function closeDeleteModal() {
  document.getElementById("deleteModal").style.display = "none";
}

// Delete an upload
function deleteUpload() {
  uploads.splice(deleteIndex, 1);
  localStorage.setItem("uploads", JSON.stringify(uploads));
  renderUploads();
  closeDeleteModal();
}

// Initial render
renderUploads();

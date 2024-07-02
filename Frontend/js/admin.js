document.addEventListener('DOMContentLoaded', function() {
  fetchUsers();

  document.getElementById('addUserButton').addEventListener('click', function() {
    openAddUserModal();
  });

  document.getElementById('logoutButton').addEventListener('click', function() {
    window.location.href = 'index.html';
  });

  document.getElementById('addUserForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addUser();
  });

  document.getElementById('editUserForm').addEventListener('submit', function(event) {
    event.preventDefault();
    updateUser();
  });

  document.getElementById('addRole').addEventListener('change', function() {
    const adminKeyField = document.getElementById('addAdminKeyField');
    const chevronIcon = this.nextElementSibling;
    if (this.value === 'admin') {
      adminKeyField.style.display = 'block';
    } else {
      adminKeyField.style.display = 'none';
    }
    chevronIcon.classList.toggle('fa-chevron-up', this.value === 'admin');
    chevronIcon.classList.toggle('fa-chevron-down', this.value !== 'admin');
  });

  document.getElementById('editRole').addEventListener('change', function() {
    const adminKeyField = document.getElementById('editAdminKeyField');
    const chevronIcon = this.nextElementSibling;
    if (this.value === 'admin') {
      adminKeyField.style.display = 'block';
    } else {
      adminKeyField.style.display = 'none';
    }
    chevronIcon.classList.toggle('fa-chevron-up', this.value === 'admin');
    chevronIcon.classList.toggle('fa-chevron-down', this.value !== 'admin');
  });
});

function togglePasswordVisibility(inputId, icon) {
  const input = document.getElementById(inputId);
  const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
  input.setAttribute('type', type);
  icon.classList.toggle('fa-eye');
  icon.classList.toggle('fa-eye-slash');
}

async function fetchUsers() {
  try {
    const response = await fetch('./Backend/read_user.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const userDetails = await response.json();
    renderUserDetails(userDetails);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

const renderUserDetails = (users) => {
  const userTableBody = document.getElementById('userTableBody');
  userTableBody.innerHTML = '';
  users.forEach(user => {
    userTableBody.innerHTML += `
      <tr>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td class="d-flex justify-content-evenly align-items-center">
          <button class="btn btn-warning btn-sm" onclick="openEditUserModal('${user.username}')">Update</button>
          <button class="btn btn-danger btn-sm" onclick="deleteUser('${user.username}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

function openAddUserModal() {
  const addUserModal = new bootstrap.Modal(document.getElementById('addUserModal'));
  const addUserForm = document.getElementById('addUserForm');
  addUserForm.reset();
  document.getElementById('addAdminKeyField').style.display = 'none';
  addUserModal.show();
}

async function openEditUserModal(username) {
  const editUserModal = new bootstrap.Modal(document.getElementById('editUserModal'));
  const editUserForm = document.getElementById('editUserForm');

  try {
    const response = await fetch(`./Backend/read_user.php?username=${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const user = await response.json();
    document.getElementById('editUserId').value = user.username;
    document.getElementById('editUsername').value = user.username;
    document.getElementById('editEmail').value = user.email;
    document.getElementById('editPassword').value = '';
    document.getElementById('editRole').value = user.role;
    if (user.role === 'admin') {
      document.getElementById('editAdminKeyField').style.display = 'block';
    } else {
      document.getElementById('editAdminKeyField').style.display = 'none';
    }
    editUserModal.show();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

async function addUser() {
  const username = document.getElementById('addUsername').value;
  const email = document.getElementById('addEmail').value;
  const password = document.getElementById('addPassword').value;
  const role = document.getElementById('addRole').value;
  const adminKey = document.getElementById('addAdminKey').value;

  const data = { username, email, password, role, adminKey };

  if (!await validateUserData(data)) return;

  try {
    const response = await fetch('./Backend/create_user.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    alert(result.message);
    if (result.success) {
      fetchUsers();
      const addUserModal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
      addUserModal.hide();
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function updateUser() {
  const userId = document.getElementById('editUserId').value;
  const username = document.getElementById('editUsername').value;
  const email = document.getElementById('editEmail').value;
  const password = document.getElementById('editPassword').value;
  const role = document.getElementById('editRole').value;
  const adminKey = document.getElementById('editAdminKey').value;

  const data = { userId, username, email, password, role, adminKey };

  if (!await validateUserData(data, true)) return;

  try {
    const response = await fetch('./Backend/update_user.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    alert(result.message);
    if (result.success) {
      fetchUsers();
      const editUserModal = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
      editUserModal.hide();
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function validateUserData(data, isUpdate = false) {
  if (data.username.length < 5) {
    alert("Username should have at least 5 characters.");
    return false;
  }
  if (!await validateEmail(data.email, isUpdate, data.userId)) {
    alert("Please enter a valid and unique email!");
    return false;
  }
  if (!isUpdate && !validatePassword(data.password)) {
    alert("Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
    return false;
  }
  if (data.role === 'admin' && data.adminKey !== 'adm_K3y_2024_$ecur3_Ex4mpl3_9876543210') {
    alert("Invalid Admin Key.");
    return false;
  }
  return true;
}

async function validateEmail(email, isUpdate = false, currentUsername = '') {
  const emailPattern1 = /^[^\s@]+@(qq\.com|163\.com|gmail\.com|yahoo\.com|hotmail\.com|live\.com|outlook\.com)$/;
  const emailPattern2 = /^[^\s@]+@graduate\.utm\.my$/;
  const isValid = emailPattern1.test(email) || emailPattern2.test(email);

  if (!isValid) return false;

  const response = await fetch('./Backend/check_email.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, isUpdate, currentUsername })
  });
  const result = await response.json();
  if (isUpdate && email === currentUsername) return true;
  return result.available || (isUpdate && email === currentUsername);
}

function validatePassword(password) {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return passwordPattern.test(password);
}

function deleteUser(username) {
  if (confirm('Are you sure you want to delete this user? Please enter the admin key to confirm.')) {
    const adminKey = prompt('Enter admin key:');
    fetch('./Backend/delete_user.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, adminKey })
    })
    .then(response => response.json())
    .then(result => {
      alert(result.message);
      if (result.success) {
        fetchUsers();
      }
    });
  }
}

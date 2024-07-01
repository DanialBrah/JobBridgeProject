document.addEventListener('DOMContentLoaded', function() {
  fetchUsers();

  document.getElementById('addUserButton').addEventListener('click', function() {
    openUserModal();
  });

  document.getElementById('logoutButton').addEventListener('click', function() {
    window.location.href = 'index.html';
  });

  document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    saveUser();
  });

  document.getElementById('role').addEventListener('change', function() {
    const adminKeyField = document.getElementById('adminKeyField');
    if (this.value === 'admin') {
      adminKeyField.style.display = 'block';
    } else {
      adminKeyField.style.display = 'none';
    }
  });
});

async function fetchUsers() {
  try {
      const response = await fetch('./Backend/read_user.php', {
          method: 'GET',
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
              <td>
                <button class="btn btn-warning btn-sm" onclick="openUserModal('${user.username}')">Update</button>
                <button class="btn btn-danger btn-sm" onclick="deleteUser('${user.username}')">Delete</button>
              </td>
          </tr>
      `;
  });
}

function openUserModal(username = '') {
  const userModal = new bootstrap.Modal(document.getElementById('userModal'));
  const userForm = document.getElementById('userForm');
  
  if (username) {
    fetch(`./Backend/read_users.php?username=${username}`)
      .then(response => response.json())
      .then(user => {
        document.getElementById('userId').value = user.username;
        document.getElementById('username').value = user.username;
        document.getElementById('email').value = user.email;
        document.getElementById('password').value = '';
        document.getElementById('role').value = user.role;
        if (user.role === 'admin') {
          document.getElementById('adminKeyField').style.display = 'block';
        } else {
          document.getElementById('adminKeyField').style.display = 'none';
        }
      });
  } else {
    userForm.reset();
    document.getElementById('userId').value = '';
    document.getElementById('adminKeyField').style.display = 'none';
  }

  userModal.show();
}

function saveUser() {
  const userId = document.getElementById('userId').value;
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;
  const adminKey = document.getElementById('adminKey').value;

  const data = { username, email, password, role, adminKey };
  const url = userId ? './Backend/update_user.php' : './Backend/create_user.php';

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    alert(result.message);
    if (result.success) {
      fetchUsers();
      const userModal = bootstrap.Modal.getInstance(document.getElementById('userModal'));
      userModal.hide();
    }
  });
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

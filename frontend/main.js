const apiUrl = 'http://localhost:3000/user';
let editingUserId = null;

document.getElementById('bookingForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  try {
    if (editingUserId) {
      // Edit User
      const response = await axios.put(`${apiUrl}/edit-user/${editingUserId}`, { name, email, phone });
      
      if (response.data && response.data.success) {
        // Refresh the list
        fetchUsers();
        
        // Reset form and state
        document.getElementById('bookingForm').reset();
        editingUserId = null;
        document.querySelector('button[type="submit"]').textContent = 'Submit';
      } else {
        console.error('Failed to update user');
      }
    } else {
      // Add User
      const response = await axios.post(`${apiUrl}/add-user`, { name, email, phone });
      
      if (response.data && response.data.success) {
        displayUser(response.data.user);
        document.getElementById('bookingForm').reset();
      } else {
        console.error('Failed to add user');
      }
    }
  } catch (error) {
    console.error('Error:', error);
    if (error.response && error.response.data && error.response.data.error) {
      alert('A booking has already been made with this email id.');
    } else {
      alert('Failed to save the appointment. Please try again.');
    }
  }
});

async function fetchUsers() {
  try {
    const response = await axios.get(`${apiUrl}/get-users`);
    
    if (response.data && response.data.success) {
      const usersList = document.getElementById('usersList');
      usersList.innerHTML = '';
      response.data.users.forEach(user => {
        displayUser(user);
      });
    }
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}
 
function displayUser(user) {
  const usersList = document.getElementById('usersList');
  const li = document.createElement('li');
  
  li.className = 'list-group-item d-flex justify-content-between align-items-center shadow-sm mb-2 rounded border-0';
  li.id = `user-${user.id}`;
  
  const userInfo = document.createElement('span');
  userInfo.textContent = `${user.name} - ${user.email} - ${user.phone}`;
  
  // Container for buttons
  const btnGroup = document.createElement('div');
  
  // Edit Button
  const editBtn = document.createElement('button');
  editBtn.className = 'btn btn-outline-primary btn-sm me-2';
  editBtn.textContent = 'Edit';
  editBtn.onclick = () => populateEditForm(user.id, user.name, user.email, user.phone);
  
  // Delete Button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-outline-danger btn-sm';
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = () => deleteUser(user.id);
  
  btnGroup.appendChild(editBtn);
  btnGroup.appendChild(deleteBtn);
  
  li.appendChild(userInfo);
  li.appendChild(btnGroup);
  
  usersList.appendChild(li);
}

function populateEditForm(id, name, email, phone) {
  document.getElementById('name').value = name;
  document.getElementById('email').value = email;
  document.getElementById('phone').value = phone;
  
  editingUserId = id;
  document.querySelector('button[type="submit"]').textContent = 'Update User';
  
  // Scroll to top of the page so the user sees the form
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function deleteUser(id) {
  try {
    const response = await axios.delete(`${apiUrl}/delete-user/${id}`);
    
    if (response.data && response.data.success) {
      const li = document.getElementById(`user-${id}`);
      if (li) {
        li.remove();
      }
    } else {
      console.error('Failed to delete user');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}

// Fetch users on load
window.addEventListener('DOMContentLoaded', fetchUsers);

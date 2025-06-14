const form = document.getElementById('userForm');
const userList = document.getElementById('userList');
const users = [];

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const ageInput = document.getElementById('age').value.trim();

  if (!firstName || !lastName || !ageInput) {
    alert('All fields are required!');
    return;
  }

  const age = Number(ageInput);

  if (isNaN(age)) {
    alert('Age must be a number!');
    return;
  }

  if (age < 18) {
    alert('User must be at least 18 years old.');
    form.reset();
    return;
  }

  const fullName = `${firstName} ${lastName}`;
  const ageGroup = age < 30 ? 'Below 30' : 'Above 30';

  users.push({ fullName, ageGroup });
  renderUsers();
  form.reset();
});

function renderUsers() {
  userList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = `${user.fullName} - ${user.ageGroup}`;
    userList.appendChild(li);
  });
}

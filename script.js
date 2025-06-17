const form = document.getElementById('secret-form');
const input = document.getElementById('secret-input');
const list = document.getElementById('secrets-list');

// Simulate async
const fakeAsync = (callback, ms = 250) => new Promise(resolve => {
  setTimeout(() => resolve(callback()), ms);
});

// Load secrets
async function loadSecrets() {
  const secrets = JSON.parse(localStorage.getItem('secrets')) || [];
  await fakeAsync(() => {
    list.innerHTML = '';
    secrets.forEach((secret, index) => {
      const div = document.createElement('div');
      div.className = 'secret-card';
      div.innerHTML = `
        <div>${secret}</div>
        <div class="actions">
          <button onclick="editSecret(${index})">✏️</button>
          <button onclick="deleteSecret(${index})">🗑️</button>
        </div>
      `;
      list.appendChild(div);
    });
  });
}

// Create
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const secret = input.value.trim();
  if (!secret) return;

  const secrets = JSON.parse(localStorage.getItem('secrets')) || [];
  await fakeAsync(() => {
    secrets.push(secret);
    localStorage.setItem('secrets', JSON.stringify(secrets));
    input.value = '';
    loadSecrets();
  });
});

// Edit
async function editSecret(index) {
  const secrets = JSON.parse(localStorage.getItem('secrets')) || [];
  const updated = prompt('Edit your secret:', secrets[index]);
  if (updated !== null && updated.trim()) {
    await fakeAsync(() => {
      secrets[index] = updated.trim();
      localStorage.setItem('secrets', JSON.stringify(secrets));
      loadSecrets();
    });
  }
}

// Delete
async function deleteSecret(index) {
  const secrets = JSON.parse(localStorage.getItem('secrets')) || [];
  await fakeAsync(() => {
    secrets.splice(index, 1);
    localStorage.setItem('secrets', JSON.stringify(secrets));
    loadSecrets();
  });
}

// On page load
loadSecrets();

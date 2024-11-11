javascript:(function() {
  if (document.getElementById('bookmarklet-container')) {
    alert('The text area is already open.');
    return;
  }

  function createElement(tag, { attributes = {}, styles = {}, text = '' } = {}) {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    Object.assign(element.style, styles);
    element.textContent = text;
    return element;
  }

  const container = createElement('div', {
    attributes: { id: 'bookmarklet-container' },
    styles: {
      position: 'fixed', top: '20px', right: '20px', width: '300px', padding: '15px',
      backgroundColor: '#2C2C2C', border: '1px solid #555', borderRadius: '8px',
      zIndex: '10000', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)', fontFamily: 'Arial, sans-serif',
      color: 'white'
    }
  });

  const nameInput = createElement('input', {
    attributes: { type: 'text', placeholder: 'Enter user name' },
    styles: { width: '100%', marginBottom: '10px', padding: '8px', backgroundColor: '#444', color: 'white', border: '1px solid #666' }
  });

  const textArea = createElement('textarea', {
    styles: { width: '100%', height: '100px', marginBottom: '10px', backgroundColor: '#444', color: 'white', border: '1px solid #666' },
    attributes: { placeholder: 'Enter text to store for this user' }
  });

  const userSelect = createElement('select', {
    styles: { width: '100%', marginBottom: '10px', padding: '8px', backgroundColor: '#444', color: 'white', border: '1px solid #666' }
  });

  // Load user names from localStorage into the select dropdown
  const loadUserNames = function() {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    userSelect.innerHTML = ''; // Clear the existing options
    Object.keys(users).forEach(userName => {
      const option = createElement('option', { attributes: { value: userName }, text: userName });
      userSelect.appendChild(option);
    });
  };

  userSelect.addEventListener('change', function() {
    const selectedUser = userSelect.value;
    if (selectedUser) {
      const users = JSON.parse(localStorage.getItem('users')) || {};
      textArea.value = users[selectedUser] || ''; // Load the selected user's data into the textarea
    }
  });

  const saveButton = createElement('button', {
    text: 'Save to localStorage',
    styles: {
      width: '100%', padding: '8px', backgroundColor: '#4CAF50',
      color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'
    }
  });

  saveButton.onclick = function() {
    const userName = nameInput.value.trim();
    if (userName === '') {
      alert('Please enter a user name.');
      return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || {};
    users[userName] = textArea.value;
    localStorage.setItem('users', JSON.stringify(users));
    alert('Data saved for user "' + userName + '" to localStorage.');
    loadUserNames(); // Refresh the user select options
  };

  const closeButton = createElement('button', {
    text: 'Close',
    styles: {
      marginTop: '10px', width: '100%', padding: '8px', backgroundColor: '#f44336',
      color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'
    }
  });

  closeButton.onclick = function() {
    document.body.removeChild(container);
  };

  container.appendChild(nameInput);
  container.appendChild(userSelect);
  container.appendChild(textArea);
  container.appendChild(saveButton);
  container.appendChild(closeButton);
  document.body.appendChild(container);

  loadUserNames(); // Initial load of user names into the select dropdown
})();

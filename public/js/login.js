const createAccountHandler = async () => {
  const email = document.querySelector('#email-create').value.trim();
  const password = document.querySelector('#password-create').value.trim();

  if (email && password) {
    try {
      // Disable the button and show a loading spinner
      document.getElementById('createAccountBtn').disabled = true;
      // Optionally show a loading spinner or other indication

      const response = await fetch('/api/users/create', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Server response:', response);  // Add this line

      if (response.ok) {
        // Clear form fields on success
        document.querySelector('#email-create').value = '';
        document.querySelector('#password-create').value = '';

        // Redirect to the login page or another relevant page
        window.location.replace('/login');
      } else {
        const errorData = await response.json();

        if (errorData && errorData.message) {
          alert(`Failed to create an account: ${errorData.message}`);
        } else {
          alert('Failed to create an account. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error creating account:', error);

      // Log the server response for more details
      if (error instanceof Response) {
        console.error('Server response:', await error.text());
      }

      alert('An unexpected error occurred. Please try again.');
    } finally {
      // Re-enable the button and hide the loading spinner
      document.getElementById('createAccountBtn').disabled = false;
      // Optionally hide the loading spinner
    }
  } else {
    alert('Please enter both email and password.');
  }
};


const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    try {
      // Disable the button and show a loading spinner
      document.getElementById('loginBtn').disabled = true;
      // Optionally show a loading spinner or other indication

      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // Redirect to the home page or another relevant page
        window.location.replace('/');
      } else {
        alert('Failed to log in');
      }
    } catch (error) {
  
      console.error('Error creating account or logging in:', error);
      alert('An unexpected error occurred. Please check the console for more information.');
    
    } finally {
      // Re-enable the button and hide the loading spinner
      document.getElementById('loginBtn').disabled = false;
      // Optionally hide the loading spinner
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .getElementById('createAccountBtn')
  .addEventListener('click', createAccountHandler);

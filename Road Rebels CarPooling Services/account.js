// account.js

// Function to fetch user data from the backend
async function fetchUserData() {
    try {
        const response = await fetch('/api/user'); // Replace '/api/user' with your backend endpoint
        if (response.ok) {
            const userData = await response.json();
            populateUserData(userData);
        } else {
            console.error('Failed to fetch user data:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

// Function to populate user data into form fields
function populateUserData(userData) {
    // Populate form fields with userData
}

// Function to save changes to the backend
async function saveChanges() {
    try {
        const formData = {}; // Collect form data here
        const response = await fetch('/api/user/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            alert('Changes saved successfully!');
        } else {
            console.error('Failed to save changes:', response.statusText);
        }
    } catch (error) {
        console.error('Error saving changes:', error);
    }
}

// Fetch user data when the page loads
window.onload = fetchUserData;

// Event listener for Save Changes button
document.querySelector('#save-changes-btn').addEventListener('click', saveChanges);

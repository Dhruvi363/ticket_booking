// Import the saveContactDetails function from firebaseApi.js
import { saveContactDetails } from './firebaseApi.js';

document.addEventListener('DOMContentLoaded', function(event) {
    var form = document.getElementById('booking-form');
    const thankYouMessage = document.getElementById('thank-you-message');

    form.addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevent default form submission

        // Retrieve form data
        var name = document.getElementById('name').value;
        var passes = document.getElementById('passes').value;
        var mobile = document.getElementById('mobile').value;

        

        // Validate form data
        if (!name || !passes || !mobile) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            // Call the function to save contact details in Firestore
            const docId = await saveContactDetails(name, passes, mobile);

            form.style.display = 'none';
            thankYouMessage.style.display = 'block';

            // Reset the form
            form.reset();
        } catch (error) {
            console.error('Error adding document:', error);
            alert('Error submitting your form. Please try again later.');
        }
    });
});

import { saveCODDetails } from './firebaseApi.js';

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const amount = urlParams.get('amount');
    const date = urlParams.get('date');
    const contact = urlParams.get('contact');

    document.getElementById('name').value = name;
    document.getElementById('amount').value = amount;
    document.getElementById('passDate').value = date;
    document.getElementById('contactNumber').value = contact;

    document.getElementById('codForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const amount = document.getElementById('amount').value;
        const passDate = document.getElementById('passDate').value;
        const contactNumber = document.getElementById('contactNumber').value;

        if (!name || !amount || !passDate || !contactNumber) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            await saveCODDetails(name, amount, passDate, contactNumber);
            showThankYouMessage(passDate, contactNumber);
        } catch (error) {
            alert('Error submitting your form. Please try again later.');
        }
    });
});

function showThankYouMessage(date, contact) {
    document.getElementById('codForm').classList.add('hidden');
    document.getElementById('thankYouMessage').classList.remove('hidden');
    document.getElementById('confirmationDate').textContent = date;
    document.getElementById('confirmationContact').textContent = contact;
}
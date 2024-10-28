import { savePaymentDetails } from './firebaseApi.js';

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);

const name = urlParams.get('name');
const persons = parseInt(urlParams.get('persons')) || 1;
const amount = persons * 250;
const date = urlParams.get('date');
const contactNumber = urlParams.get('contact');

// new button 
const upiField = document.getElementById('upirefid');
const paidBtn = document.getElementById('paidBtn');

// Format date
function formatDate(dateString) {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

const formattedDate = formatDate(date);

// Set initial values
document.getElementById('userName').textContent = name;
document.getElementById('amountToPay').textContent = amount;
document.getElementById('passDate').textContent = formattedDate;
document.getElementById('name').value = name;
document.getElementById('amount').value = amount;
document.getElementById('contactNumberInput').value = contactNumber;
document.getElementById('confirmationDate').textContent = formattedDate;
document.getElementById('confirmationContact').textContent = contactNumber;
document.getElementById('passDateInput').value = formattedDate;
// document.getElementById('refidinput').value = 0;

// Timer functionality
let timeLeft = 120; 
const timerElement = document.getElementById('timer');

const timerInterval = setInterval(() => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  if (timeLeft === 0) {
    clearInterval(timerInterval);
    showPaymentForm();
  }
  timeLeft--;
}, 1000);

//here is the UPI ID INPUT IS PAID BUTTON
function validateUPIField() {
  const upiValue = upiField.value;
  const alertBox = document.getElementById('alertBox'); // Assuming you have an alert box element
  const isValid = /^\d{12}$/.test(upiValue); // Check if exactly 12 digits

  if (!upiValue) {
    // If the field is empty, show a yellow alert
    alertBox.textContent = 'Please fill the UPI Transaction ID';
    alertBox.style.backgroundColor = 'transparent';
    alertBox.style.display = 'block';
    paidBtn.disabled = true;
  } else if (!isValid) {
    // If the UPI ID is invalid (not 12 digits), show a yellow alert
    alertBox.textContent = 'Please Input the Valid UPI ID';
    alertBox.style.backgroundColor = 'transparent';
    alertBox.style.display = 'block';
    paidBtn.disabled = true;
  } else {
    // If the UPI ID is valid, hide the alert and enable the button
    alertBox.style.display = 'none';
    paidBtn.disabled = false;
  }
}

// Add event listener to UPI field for input validation
upiField.addEventListener('input', validateUPIField);


// Button event listeners
document.getElementById('paidBtn').addEventListener('click', showPaymentForm);
document.getElementById('codBtn').addEventListener('click', handleCOD);

function showPaymentForm() {
    document.getElementById('qrSection').classList.add('hidden');
    document.getElementById('paymentForm').classList.remove('hidden');
    clearInterval(timerInterval);
}

function handleCOD() {
    // Redirect to COD details page with necessary information
    const codUrl = `../cod.html?name=${encodeURIComponent(name)}&amount=${amount}&date=${encodeURIComponent(date)}&contact=${encodeURIComponent(contactNumber)}`;
    window.location.href = codUrl;
}

document.getElementById('paymentForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Retrieve form data
    var name = document.getElementById('name').value;
    var amountPaid = document.getElementById('amount').value;
    let dateOfPasses = document.getElementById('passDateInput').value;
    var contactNumber = document.getElementById('contactNumberInput').value;
    var upirefid = document.getElementById('upirefid').value;

    // Validate form data
    if (!name || !amountPaid || !dateOfPasses || !contactNumber || !upirefid) {
        alert('Please fill in all fields.');
        return;
    }

    try {
        // Call the function to save payment details in Firestore
        const docId = await savePaymentDetails(name, amountPaid, dateOfPasses, contactNumber, upirefid);
        showThankYouMessage();
    } catch (error) {
        alert('Error submitting your form. Please try again later.');
    }
});

function showThankYouMessage() {
    document.getElementById('paymentForm').classList.add('hidden');
    document.getElementById('thankYouMessage').classList.remove('hidden');
}
    document.getElementById('paymentForm').addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevent default form submission

        // Retrieve form data
        var name = document.getElementById('name').value;
        var amountPaid =  document.getElementById('amount').value; 
        let dateOfPasses =  document.getElementById('passDateInput').value;
        var contactNumber = document.getElementById('contactNumberInput').value;
        var upirefid = document.getElementById('upirefid').value;
        

        // Validate form data
        if (!name || !amountPaid || !dateOfPasses || !contactNumber || !upirefid) {
            alert('Please fill in all fields.');
            return;
        }

        try {
             // Call the function to save contact details in Firestore
            const docId = await savePaymentDetails(name, amountPaid, dateOfPasses, contactNumber, upirefid);
            
        } catch (error) {
            // console.error('Error adding document:', error);
            // alert('Error submitting your form. Please try again later.');
        }
    });
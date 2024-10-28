document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('bookingForm');
    const contactInput = document.getElementById('contact');
    const errorMessage = document.createElement('span');
    errorMessage.id = 'error-message';
    errorMessage.style.color = 'red';
    errorMessage.style.display = 'none';
    errorMessage.innerText = 'Please enter exactly 10 digits.';
    contactInput.parentNode.appendChild(errorMessage);

    // Add oninput event to validate contact length in real time
    contactInput.addEventListener('input', function () {
        validateLength(contactInput);
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const contact = document.getElementById('contact').value;
        const persons = parseInt(document.getElementById('persons').value);
        const date = document.getElementById('date').value;
        const totalPrice = persons * 250; // Total price (280 per person)

        // Validate the contact number before submitting the form
        if (contact.length !== 10) {
            errorMessage.style.display = 'inline';
            return; // Stop form submission if the contact number is not valid
        } else {
            errorMessage.style.display = 'none';
        }

        const ticketNumber = generateTicketNumber(date, persons, totalPrice / 280); // Generate ticket number

        // Redirect to payment.html with the required parameters
        redirectToPayment(name, contact, persons, date, totalPrice, ticketNumber);
    });

    // Function to validate length of contact number
    function validateLength(input) {
        input.value = input.value.replace(/\D/g, ''); // Remove any non-digit characters
        const contactValue = input.value;
        
        // Show or hide error message based on length
        if (contactValue.length !== 10) {
            errorMessage.style.display = 'inline';
        } else {
            errorMessage.style.display = 'none';
        }
    }

    // Function to generate the ticket number
    function generateTicketNumber(date, persons, totalPrice) {
        const eventDate = new Date(date);
        const day = String(eventDate.getDate()).padStart(2, '0');
        const month = String(eventDate.getMonth() + 1).padStart(2, '0');
        const year = String(eventDate.getFullYear()).slice(-2);

        const ticketDay = `${day}${month}`;
        const ticketDate = `${year}${persons.toString().padStart(2, '0')}`;
        const ticketAmount = totalPrice.toString().padStart(4, '0');

        return `${ticketDay}-${ticketDate}-00-${ticketAmount}`;
    }

    // Function to redirect to payment.html
    function redirectToPayment(name, contact, persons, date, totalPrice, ticketNumber) {
        const url = `payment.html?name=${encodeURIComponent(name)}&contact=${encodeURIComponent(contact)}&persons=${persons}&date=${date}&totalPrice=${totalPrice}&ticketNumber=${ticketNumber}`;
        window.location.href = url;
    }
});

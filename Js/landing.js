document.addEventListener('DOMContentLoaded', function() {
    function updateEventStatus() {
        const now = new Date();
        const eventStart = new Date(now);
        eventStart.setHours(19, 0, 0, 0); // 7:00 PM
        const eventEnd = new Date(now);
        eventEnd.setHours(22, 30, 0, 0); // 10:30 PM

        const countdownElement = document.getElementById("countdown");
        const eventMessageElement = document.getElementById("event-message");

        if (now >= eventStart && now < eventEnd) {
            // Event is ongoing
            countdownElement.style.display = "The Event has Ended";
            eventMessageElement.textContent = "The Event has Ended";
        } else {
            // Event is not ongoing, show countdown
            countdownElement.style.display = "flex";
            eventMessageElement.textContent = "Let's Meet at ULC in";

            let targetTime;
            if (now < eventStart) {
                targetTime = eventStart;
            } else {
                targetTime = new Date(eventStart);
                targetTime.setDate(targetTime.getDate() + 1);
            }

            const timeDiff = targetTime - now;
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
            document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
            document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
        }
    }

    // Update event status every second
    setInterval(updateEventStatus, 1000);

    // Function to update current IST date and time
    function updateISTDateTime() {
        const now = new Date();
        const istTime = new Date(now.getTime() + (330 + now.getTimezoneOffset()) * 60000);

        // Format options for date and time
        const options = {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };

        const formattedDateTime = istTime.toLocaleString('en-US', options);
        document.getElementById("event-date").textContent = `📅 ${formattedDateTime} IST`;
    }

    // Update IST date and time every second
    setInterval(updateISTDateTime, 1000);

    // Initial calls to display time and event status immediately
    updateISTDateTime();
    updateEventStatus();
});
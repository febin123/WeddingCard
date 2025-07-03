
document.addEventListener('DOMContentLoaded', () => {
    const addToCalendarLink = document.querySelector('.add-to-calendar');
    if (addToCalendarLink) {
        addToCalendarLink.addEventListener('click', (e) => {
            e.preventDefault();
            // In a real scenario, you'd generate an .ics file or link to a service.
            // This is a placeholder. You might use a library like 'add-to-calendar-button'
            // or generate a Google Calendar link.
            // Using a custom modal for messages instead of alert()
            showModal('Add to Calendar functionality would go here! (e.g., download an .ics file)');

            // Example for Google Calendar (simplified - needs proper formatting for real use):
            // const eventTitle = encodeURIComponent("Christin & Febin Wedding");
            // const eventDetails = encodeURIComponent("Join us for the wedding of Christin and Febin.");
            // const eventLocation = encodeURIComponent("Nithya sahaya matha church, Punalur, Kerala, India.");
            // const eventStartTime = '20260214T150000Z'; //YYYYMMDDTHHMMSSZ (UTC time) - Adjust time zone
            // const eventEndTime = '20260214T180000Z'; // Adjust end time

            // const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${eventStartTime}/${eventEndTime}&details=${eventDetails}&location=${eventLocation}&sf=true&output=xml`;
            // window.open(googleCalendarUrl, '_blank');
        });
    }

    const rsvpButton = document.querySelector('.rsvp-button');
    if (rsvpButton) {
        rsvpButton.addEventListener('click', (e) => {
            e.preventDefault();
            // In a real scenario, this would likely lead to an RSVP form.
            // For now, it could be a modal or a link.
            showModal('Redirecting to RSVP form!');
            // Example: window.location.href = 'your-rsvp-form-url.html';
        });
    }

    // Function to show a custom modal instead of alert()
    function showModal(message) {
        let modal = document.getElementById('custom-alert-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'custom-alert-modal';
            modal.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                z-index: 1000;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 15px;
                max-width: 300px;
                text-align: center;
                font-family: 'Open Sans', sans-serif;
            `;
            const messageElement = document.createElement('p');
            messageElement.id = 'custom-alert-message';
            modal.appendChild(messageElement);

            const closeButton = document.createElement('button');
            closeButton.textContent = 'OK';
            closeButton.style.cssText = `
                padding: 8px 20px;
                background-color: #f7a000;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 1em;
                transition: background-color 0.3s ease;
            `;
            closeButton.onmouseover = () => closeButton.style.backgroundColor = '#e09000';
            closeButton.onmouseout = () => closeButton.style.backgroundColor = '#f7a000';
            closeButton.onclick = () => modal.remove();
            modal.appendChild(closeButton);

            document.body.appendChild(modal);
        }
        document.getElementById('custom-alert-message').textContent = message;
        modal.style.display = 'flex';
    }
});

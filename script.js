// Sample events - you can modify these dates and details
const events = [
    { date: new Date(2026, 4, 15), title: "Spring Festival Event", description: "Community celebration featuring Japanese culture", location: "St. Marys Park" },
    { date: new Date(2026, 4, 22), title: "Japanese Language Workshop", description: "Learn basic Japanese phrases and customs", location: "St. Marys Community Center" },
    { date: new Date(2026, 5, 10), title: "Photo Mini Sessions Fundraiser", description: "Professional photos to support delegation costs", location: "Downtown St. Marys" },
    { date: new Date(2026, 5, 28), title: "Summer Picnic & Fundraiser Brunch", description: "Community gathering and fundraising event", location: "St. Marys Park" },
    { date: new Date(2026, 7, 5), title: "Delegation Meeting", description: "Information session for 2025 Awaji City trip", location: "St. Marys Community Center" },
    { date: new Date(2026, 7, 20), title: "Cultural Exchange Dinner", description: "Traditional Japanese cuisine and cultural performance", location: "Local Restaurant" },
    { date: new Date(2026, 8, 15), title: "Fall Festival Booth", description: "Sister Cities booth at St. Marys Fall Festival", location: "Downtown St. Marys" },
    { date: new Date(2026, 9, 10), title: "Delegation Departure", description: "2025 Delegation travels to Awaji City", location: "St. Marys to Awaji City" }
];

let currentDate = new Date();

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Update header
    document.getElementById('monthYear').textContent = 
        currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    
    const firstDayOfWeek = firstDay.getDay();
    const lastDayDate = lastDay.getDate();
    const prevLastDayDate = prevLastDay.getDate();
    const nextDays = 7 - lastDay.getDay() - 1;

    let html = '';

    // Day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        html += `<div class="day-header">${day}</div>`;
    });

    // Previous month days
    for (let x = firstDayOfWeek; x > 0; x--) {
        html += `<div class="calendar-day other-month">${prevLastDayDate - x + 1}</div>`;
    }

    // Current month days
    for (let day = 1; day <= lastDayDate; day++) {
        const date = new Date(year, month, day);
        const hasEvent = events.some(e => 
            e.date.getDate() === day && 
            e.date.getMonth() === month && 
            e.date.getFullYear() === year
        );

        const isToday = date.toDateString() === new Date().toDateString();
        
        let className = 'calendar-day';
        if (isToday) className += ' today';
        if (hasEvent) className += ' event';

        let eventIndicator = '';
        if (hasEvent) {
            eventIndicator = '<div class="day-event-indicator">Event</div>';
        }

        html += `<div class="${className}"><div class="day-number">${day}</div>${eventIndicator}</div>`;
    }

    // Next month days
    for (let day = 1; day <= nextDays; day++) {
        html += `<div class="calendar-day other-month">${day}</div>`;
    }

    document.getElementById('calendar').innerHTML = html;
    renderEventsList();
}

function renderEventsList() {
    // Get all upcoming events sorted by date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const upcomingEvents = events
        .filter(e => e.date >= today)
        .sort((a, b) => a.date - b.date)
        .slice(0, 2); // Limit to next 2 events

    let html = '';
    if (upcomingEvents.length === 0) {
        html = '<p style="color: #999; text-align: center; padding: 2rem;">No upcoming events scheduled.</p>';
    } else {
        upcomingEvents.forEach(event => {
            html += `
                <div class="event-item">
                    <div class="event-date">${event.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                    <div class="event-title">${event.title}</div>
                    <div class="event-description">${event.description}</div>
                    <div class="event-location">📍 ${event.location}</div>
                </div>
            `;
        });
    }
    document.getElementById('eventsList').innerHTML = html;
}

function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

function handleSubmit(event) {
    event.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    event.target.reset();
}

// Initial render
renderCalendar();

// Initialize the page based on URL path
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializePartyDetails();
    initializeCountdown();
    initializeForm();
});

// Detect URL path and apply theme
function initializeTheme() {
    const path = window.location.pathname;
    const body = document.body;
    const titleElement = document.getElementById('party-title');
    
    // Remove any existing theme classes
    body.classList.remove('theme-jenna', 'theme-charlie', 'theme-both');
    
    if (path.includes('/jenna&charlie') || path.includes('/jenna%26charlie')) {
        // Mutual friends - both themes
        body.classList.add('theme-both');
        titleElement.textContent = "Jenna & Charlie's 1st Birthday Party!";
        document.title = "Jenna & Charlie's 1st Birthday Party";
    } else if (path.includes('/jenna')) {
        // Jenna's theme
        body.classList.add('theme-jenna');
        titleElement.textContent = "Jenna's 1st Birthday Party!";
        document.title = "Jenna's 1st Birthday Party";
    } else if (path.includes('/charlie')) {
        // Charlie's theme
        body.classList.add('theme-charlie');
        titleElement.textContent = "Charlie's 1st Birthday Party!";
        document.title = "Charlie's 1st Birthday Party";
    } else {
        // Default to both if no specific path
        body.classList.add('theme-both');
        titleElement.textContent = "Jenna & Charlie's 1st Birthday Party!";
        document.title = "Jenna & Charlie's 1st Birthday Party";
    }
}

// Initialize party details from config
function initializePartyDetails() {
    if (typeof CONFIG !== 'undefined') {
        const dateElement = document.querySelector('.party-date');
        const timeElement = document.querySelector('.party-time');
        const locationElement = document.querySelector('.party-location');
        const noteElement = document.querySelector('.party-note');
        const noteTextElement = document.querySelector('.party-note-text');
        
        if (CONFIG.partyTime) {
            timeElement.innerHTML = `🕐 <strong>Time:</strong> ${CONFIG.partyTime}`;
        }
        
        if (CONFIG.partyLocation) {
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.partyLocation)}`;
            locationElement.innerHTML = `📍 <strong>Location:</strong> <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" class="location-link">${CONFIG.partyLocation}</a>`;
        }
        
        if (CONFIG.partyNote) {
            noteTextElement.textContent = CONFIG.partyNote;
            noteElement.style.display = 'block';
        }
        
        if (CONFIG.partyDate) {
            // Parse date correctly to avoid timezone issues
            const partyDate = new Date(CONFIG.partyDate + 'T12:00:00');
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = partyDate.toLocaleDateString('en-US', options);
            dateElement.innerHTML = `📅 <strong>Date:</strong> ${formattedDate} <button id="add-to-calendar-btn" class="add-to-calendar-btn">📅 Add to Calendar</button>`;
        }
    }
}

// Countdown timer
function initializeCountdown() {
    if (typeof CONFIG === 'undefined' || !CONFIG.enableCountdown || !CONFIG.partyDate) {
        document.getElementById('countdown').style.display = 'none';
        return;
    }
    
    const partyDate = new Date(CONFIG.partyDate + 'T14:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = partyDate - now;
        
        if (distance < 0) {
            document.getElementById('countdown').innerHTML = '<p>🎉 The party is today! 🎉</p>';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute
}

// Form initialization and submission
function initializeForm() {
    const form = document.getElementById('rsvp-form');
    const submitBtn = document.getElementById('submit-btn');
    const formMessage = document.getElementById('form-message');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate form
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        // Collect form data
        const formData = {
            timestamp: new Date().toISOString(),
            name: document.getElementById('guest-name').value.trim(),
            attending: document.querySelector('input[name="attending"]:checked').value,
            adults: document.getElementById('adult-count').value,
            kids: document.getElementById('kid-count').value,
            dietary: document.getElementById('dietary-restrictions').value.trim(),
            page: getCurrentPage()
        };
        
        // Show loading state
        submitBtn.disabled = true;
        document.querySelector('.btn-text').style.display = 'none';
        document.querySelector('.btn-loader').style.display = 'inline';
        formMessage.style.display = 'none';
        
        try {
            // Send to Google Sheets
            await submitToGoogleSheets(formData);
            
            // Show success message
            showMessage('success', '🎉 Thank you for your RSVP! We\'re excited to celebrate with you!');
            form.reset();
            
            // Optional: Add confetti effect here if you include a confetti library
            
        } catch (error) {
            // Show error message
            showMessage('error', '❌ Oops! Something went wrong. Please try again or contact us directly.');
            console.error('Form submission error:', error);
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            document.querySelector('.btn-text').style.display = 'inline';
            document.querySelector('.btn-loader').style.display = 'none';
        }
    });
}

// Get current page (for tracking which invitation was used)
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('/jenna&charlie') || path.includes('/jenna%26charlie')) {
        return 'jenna&charlie';
    } else if (path.includes('/jenna')) {
        return 'jenna';
    } else if (path.includes('/charlie')) {
        return 'charlie';
    }
    return 'unknown';
}

// Submit to Google Sheets
async function submitToGoogleSheets(data) {
    if (typeof CONFIG === 'undefined' || !CONFIG.googleSheetsURL) {
        console.warn('Google Sheets URL not configured');
        throw new Error('Google Sheets URL not configured');
    }
    
    if (CONFIG.googleSheetsURL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        console.warn('Please configure your Google Sheets URL in config.js');
        // For demo purposes, we'll simulate success
        return new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    const response = await fetch(CONFIG.googleSheetsURL, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    
    // Note: With no-cors mode, we can't check the response status
    // We'll assume success if no error is thrown
    return Promise.resolve();
}

// Show form message
function showMessage(type, message) {
    const formMessage = document.getElementById('form-message');
    formMessage.className = 'form-message ' + type;
    formMessage.textContent = message;
    formMessage.style.display = 'block';
    
    // Auto-hide success message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Add some extra floating motion to avatars on scroll
window.addEventListener('scroll', function() {
    const avatars = document.querySelectorAll('.floating-avatar');
    const scrollPos = window.scrollY;
    
    avatars.forEach((avatar, index) => {
        const speed = 0.1 + (index * 0.05);
        avatar.style.transform = `translateY(${scrollPos * speed}px)`;
    });
});

// Add to calendar functionality
function addToCalendar() {
    if (typeof CONFIG === 'undefined' || !CONFIG.partyDate) {
        alert('Party date not configured');
        return;
    }
    
    // Parse the party date and time
    const partyDate = new Date(CONFIG.partyDate + 'T12:00:00');
    
    // Extract time from CONFIG.partyTime (e.g., "11:00 AM - 2:00 PM")
    let startTime = '11:00';
    let endTime = '14:00';
    
    if (CONFIG.partyTime) {
        // Match both start and end times
        const timeRangeMatch = CONFIG.partyTime.match(/(\d+):(\d+)\s*(AM|PM)\s*-\s*(\d+):(\d+)\s*(AM|PM)/i);
        if (timeRangeMatch) {
            // Parse start time
            let startHours = parseInt(timeRangeMatch[1]);
            const startMinutes = timeRangeMatch[2];
            const startPeriod = timeRangeMatch[3].toUpperCase();
            
            if (startPeriod === 'PM' && startHours !== 12) {
                startHours += 12;
            } else if (startPeriod === 'AM' && startHours === 12) {
                startHours = 0;
            }
            
            // Parse end time
            let endHours = parseInt(timeRangeMatch[4]);
            const endMinutes = timeRangeMatch[5];
            const endPeriod = timeRangeMatch[6].toUpperCase();
            
            if (endPeriod === 'PM' && endHours !== 12) {
                endHours += 12;
            } else if (endPeriod === 'AM' && endHours === 12) {
                endHours = 0;
            }
            
            startTime = `${startHours.toString().padStart(2, '0')}:${startMinutes}`;
            endTime = `${endHours.toString().padStart(2, '0')}:${endMinutes}`;
        }
    }
    
    // Format dates for .ics file
    const year = partyDate.getFullYear();
    const month = (partyDate.getMonth() + 1).toString().padStart(2, '0');
    const day = partyDate.getDate().toString().padStart(2, '0');
    
    const startDateTime = `${year}${month}${day}T${startTime.replace(':', '')}00`;
    const endDateTime = `${year}${month}${day}T${endTime.replace(':', '')}00`;
    
    // Create .ics file content
    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Birthday Party//EN',
        'BEGIN:VEVENT',
        `DTSTART:${startDateTime}`,
        `DTEND:${endDateTime}`,
        `SUMMARY:Jenna & Charlie's 1st Birthday Party`,
        `DESCRIPTION:Join us for Jenna & Charlie's 1st Birthday celebration!`,
        `LOCATION:${CONFIG.partyLocation || ''}`,
        'STATUS:CONFIRMED',
        'SEQUENCE:0',
        'BEGIN:VALARM',
        'TRIGGER:-PT24H',
        'DESCRIPTION:Reminder: Birthday Party Tomorrow',
        'ACTION:DISPLAY',
        'END:VALARM',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');
    
    // Create a blob and download link
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'birthday-party.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Attach calendar click handler after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait for the element to be created by initializePartyDetails
    setTimeout(() => {
        const calendarBtn = document.getElementById('add-to-calendar-btn');
        if (calendarBtn) {
            calendarBtn.addEventListener('click', function(e) {
                e.preventDefault();
                showCalendarOptions();
            });
        }
    }, 100);
});

// Show calendar options dropdown
function showCalendarOptions() {
    // Create dropdown menu if it doesn't exist
    let dropdown = document.getElementById('calendar-dropdown');
    if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.id = 'calendar-dropdown';
        dropdown.className = 'calendar-dropdown';
        dropdown.innerHTML = `
            <div class="calendar-option" onclick="addToGoogleCalendar()">
                <span class="calendar-icon">📅</span> Google Calendar
            </div>
            <div class="calendar-option" onclick="addToAppleCalendar()">
                <span class="calendar-icon">🍎</span> Apple Calendar
            </div>
            <div class="calendar-option" onclick="downloadICS()">
                <span class="calendar-icon">📥</span> Download .ics file
            </div>
        `;
        document.body.appendChild(dropdown);
        
        // Close dropdown when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function closeDropdown(e) {
                if (!e.target.closest('.calendar-dropdown') && !e.target.closest('#add-to-calendar-btn')) {
                    dropdown.remove();
                    document.removeEventListener('click', closeDropdown);
                }
            });
        }, 0);
    }
    
    // Position dropdown near the button
    const btn = document.getElementById('add-to-calendar-btn');
    const rect = btn.getBoundingClientRect();
    dropdown.style.top = (rect.bottom + window.scrollY + 5) + 'px';
    dropdown.style.left = (rect.left + window.scrollX) + 'px';
}

// Add to Google Calendar
function addToGoogleCalendar() {
    if (typeof CONFIG === 'undefined' || !CONFIG.partyDate) {
        alert('Party date not configured');
        return;
    }
    
    const partyDate = new Date(CONFIG.partyDate + 'T12:00:00');
    const year = partyDate.getFullYear();
    const month = (partyDate.getMonth() + 1).toString().padStart(2, '0');
    const day = partyDate.getDate().toString().padStart(2, '0');
    
    // Parse time
    let startTime = '11:00';
    let endTime = '13:00';
    if (CONFIG.partyTime) {
        const timeRangeMatch = CONFIG.partyTime.match(/(\d+):(\d+)\s*(AM|PM)\s*-\s*(\d+):(\d+)\s*(AM|PM)/i);
        if (timeRangeMatch) {
            let startHours = parseInt(timeRangeMatch[1]);
            const startMinutes = timeRangeMatch[2];
            const startPeriod = timeRangeMatch[3].toUpperCase();
            
            if (startPeriod === 'PM' && startHours !== 12) startHours += 12;
            else if (startPeriod === 'AM' && startHours === 12) startHours = 0;
            
            let endHours = parseInt(timeRangeMatch[4]);
            const endMinutes = timeRangeMatch[5];
            const endPeriod = timeRangeMatch[6].toUpperCase();
            
            if (endPeriod === 'PM' && endHours !== 12) endHours += 12;
            else if (endPeriod === 'AM' && endHours === 12) endHours = 0;
            
            startTime = `${startHours.toString().padStart(2, '0')}:${startMinutes}`;
            endTime = `${endHours.toString().padStart(2, '0')}:${endMinutes}`;
        }
    }
    
    const startDateTime = `${year}${month}${day}T${startTime.replace(':', '')}00`;
    const endDateTime = `${year}${month}${day}T${endTime.replace(':', '')}00`;
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Jenna & Charlie's 1st Birthday Party")}&dates=${startDateTime}/${endDateTime}&details=${encodeURIComponent("Join us for Jenna & Charlie's 1st Birthday celebration!")}&location=${encodeURIComponent(CONFIG.partyLocation || '')}&sf=true&output=xml`;
    
    window.open(googleCalendarUrl, '_blank');
    document.getElementById('calendar-dropdown').remove();
}

// Add to Apple Calendar (download .ics)
function addToAppleCalendar() {
    downloadICS();
}

// Download ICS file
function downloadICS() {
    addToCalendar();
    document.getElementById('calendar-dropdown').remove();
}


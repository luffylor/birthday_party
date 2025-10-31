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
        
        if (CONFIG.partyTime) {
            timeElement.innerHTML = `🕐 <strong>Time:</strong> ${CONFIG.partyTime}`;
        }
        
        if (CONFIG.partyLocation) {
            locationElement.innerHTML = `📍 <strong>Location:</strong> ${CONFIG.partyLocation}`;
        }
        
        if (CONFIG.partyDate) {
            const partyDate = new Date(CONFIG.partyDate);
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = partyDate.toLocaleDateString('en-US', options);
            dateElement.innerHTML = `📅 <strong>Date:</strong> ${formattedDate}`;
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
            email: document.getElementById('guest-email').value.trim(),
            attending: document.querySelector('input[name="attending"]:checked').value,
            guests: document.getElementById('guest-count').value,
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


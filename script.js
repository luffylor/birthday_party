const path = window.location.pathname.toLowerCase();
const isBirthdayRoute = path.includes('/jenna') || path.includes('/charlie');
// The farewell invite is the main page as well as the dedicated /farewell link.
const isFarewell = !isBirthdayRoute || new URLSearchParams(window.location.search).get('invitation') === 'farewell';
const eventConfig = isFarewell ? CONFIG.farewell : CONFIG.birthday;

document.addEventListener('DOMContentLoaded', () => {
  populateInvitation();
  initializeForm();
  document.getElementById('add-to-calendar-btn').addEventListener('click', downloadCalendar);
});

function populateInvitation() {
  document.title = eventConfig.calendarTitle;
  setText('party-title', eventConfig.title);
  setText('eyebrow', eventConfig.eyebrow || 'Celebrate with us');
  setText('party-intro', eventConfig.intro || 'Join us for a special celebration.');
  setText('party-date', formatDate(eventConfig.date));
  setText('party-time', eventConfig.time || 'To be announced');
  const location = document.getElementById('party-location');
  location.textContent = eventConfig.location || 'To be announced';
  if (eventConfig.location) {
    location.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(eventConfig.location)}`;
    location.target = '_blank';
    location.rel = 'noopener noreferrer';
  } else location.removeAttribute('href');
  const note = document.getElementById('party-note');
  note.textContent = eventConfig.note || '';
  note.hidden = !eventConfig.note;
  const calendar = document.getElementById('add-to-calendar-btn');
  calendar.hidden = !(eventConfig.date && parseTimeRange(eventConfig.time));
  if (isFarewell) loadPhoto(eventConfig.photo);
}

function setText(id, value) { document.getElementById(id).textContent = value; }
function formatDate(date) {
  if (!date) return 'To be announced';
  return new Date(`${date}T12:00:00`).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

function loadPhoto(src) {
  if (!src) return;
  const image = document.getElementById('family-photo');
  image.onload = () => { image.hidden = false; document.getElementById('photo-placeholder').hidden = true; };
  image.src = src;
}

function initializeForm() {
  const form = document.getElementById('rsvp-form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) return form.reportValidity();
    const submitButton = document.getElementById('submit-btn');
    submitButton.disabled = true;
    document.querySelector('.btn-text').hidden = true;
    document.querySelector('.btn-loader').hidden = false;
    try {
      await submitToGoogleSheets({
        timestamp: new Date().toISOString(),
        name: document.getElementById('guest-name').value.trim(),
        attending: document.querySelector('input[name="attending"]:checked').value,
        adults: document.getElementById('adult-count').value,
        kids: document.getElementById('kid-count').value,
        dietary: document.getElementById('dietary-restrictions').value.trim(),
        page: isFarewell ? 'farewell' : 'birthday'
      });
      showMessage('success', "Thank you — we can't wait to celebrate together!");
      form.reset();
    } catch (error) {
      console.error('RSVP submission error:', error);
      showMessage('error', 'We could not send your RSVP. Please try again or contact us directly.');
    } finally {
      submitButton.disabled = false;
      document.querySelector('.btn-text').hidden = false;
      document.querySelector('.btn-loader').hidden = true;
    }
  });
}

async function submitToGoogleSheets(data) {
  if (!CONFIG.googleSheetsURL || CONFIG.googleSheetsURL.includes('YOUR_GOOGLE')) throw new Error('Google Sheets URL not configured');
  await fetch(CONFIG.googleSheetsURL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
}

function showMessage(type, message) {
  const box = document.getElementById('form-message');
  box.className = `form-message ${type}`;
  box.textContent = message;
  box.hidden = false;
}

function downloadCalendar() {
  const range = parseTimeRange(eventConfig.time);
  if (!eventConfig.date || !range) return;
  const date = eventConfig.date.replaceAll('-', '');
  const escapeICS = (value) => (value || '').replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Family Invitation//EN', 'BEGIN:VEVENT', `DTSTART:${date}T${range.start}00`, `DTEND:${date}T${range.end}00`, `SUMMARY:${escapeICS(eventConfig.calendarTitle)}`, `DESCRIPTION:${escapeICS(eventConfig.calendarDescription)}`, `LOCATION:${escapeICS(eventConfig.location)}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
  link.download = isFarewell ? 'farewell-party.ics' : 'birthday-party.ics';
  link.click();
  URL.revokeObjectURL(link.href);
}

function parseTimeRange(value) {
  const match = (value || '').match(/(\d{1,2}):(\d{2})\s*(AM|PM)\s*-\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return null;
  const to24 = (hour, minute, period) => `${String((Number(hour) % 12) + (period.toUpperCase() === 'PM' ? 12 : 0)).padStart(2, '0')}${minute}`;
  return { start: to24(match[1], match[2], match[3]), end: to24(match[4], match[5], match[6]) };
}

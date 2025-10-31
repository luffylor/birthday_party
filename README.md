# 🎉 Jenna & Charlie's 1st Birthday Party Invitation Website

A beautiful, interactive birthday party invitation website with dynamic themes, floating avatars, and RSVP functionality connected to Google Sheets.

## ✨ Features

- **Dynamic Routes**: Three different invitation versions
  - `/jenna` - Pink theme for Jenna's friends
  - `/charlie` - Blue theme for Charlie's friends
  - `/jenna&charlie` - Split theme for mutual friends
- **Floating Avatars**: Animated circular avatars that float around the page
- **RSVP Form**: Collects guest information with validation
- **Google Sheets Integration**: Automatically saves RSVPs to Google Sheets
- **Countdown Timer**: Shows time remaining until the party
- **Fully Responsive**: Works beautifully on desktop, tablet, and mobile

## 📋 Setup Instructions

### Step 1: Customize Party Details

Edit `config.js` and update the following:

```javascript
partyDate: '2025-12-15',  // Change to your party date (YYYY-MM-DD)
partyTime: '2:00 PM - 5:00 PM',  // Your party time
partyLocation: '123 Party Street, Fun City, CA 12345',  // Your venue
```

### Step 2: Replace Avatar Images

The website comes with placeholder avatars. Follow these steps to add real photos:

#### Option A: Use Online Tools (Recommended for beginners)

1. **Remove Background**:
   - Go to [remove.bg](https://www.remove.bg/)
   - Upload your photo
   - Download the PNG with transparent background

2. **Create Circular Crop**:
   - Go to [Crop Circle](https://crop-circle.imageonline.co/) or [iloveimg](https://www.iloveimg.com/crop-image/crop-circle)
   - Upload your background-removed image
   - Download the circular image

3. **Resize (if needed)**:
   - Recommended size: 200x200 pixels
   - Use [Simple Image Resizer](https://www.simpleimageresizer.com/)

4. **Save Files**:
   - Save Jenna's photo as `images/jenna-avatar.png`
   - Save Charlie's photo as `images/charlie-avatar.png`

#### Option B: Use Photo Editing Software

If you have Photoshop, GIMP, or similar:
1. Open your photo
2. Create a circular selection (ellipse tool with fixed 1:1 ratio)
3. Crop or mask to circle
4. Resize to 200x200 pixels
5. Export as PNG
6. Save to the `images/` folder

### Step 3: Set Up Google Sheets Integration

#### Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "Birthday Party RSVPs"
3. In the first row, add these column headers:
   ```
   Timestamp | Name | Email | Attending | Guests | Dietary Restrictions | Page
   ```

#### Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code and paste this:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email,
      data.attending,
      data.guests,
      data.dietary,
      data.page
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'RSVP recorded successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click the **Save** icon (💾)
4. Click **Deploy** → **New deployment**
5. Click the gear icon ⚙️ next to "Select type"
6. Choose **Web app**
7. Configure:
   - **Description**: Birthday RSVP Handler
   - **Execute as**: Me
   - **Who has access**: Anyone
8. Click **Deploy**
9. **Authorize access** when prompted
10. **Copy the Web App URL** - it will look like:
    ```
    https://script.google.com/macros/s/ABC123.../exec
    ```

#### Update Your Website

1. Open `config.js`
2. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your Web App URL:
   ```javascript
   googleSheetsURL: 'https://script.google.com/macros/s/YOUR_ACTUAL_URL/exec',
   ```

### Step 4: Test Locally

1. Open `index.html` in a web browser
2. Test each route:
   - `file:///path/to/birthday_invite/index.html#/jenna`
   - `file:///path/to/birthday_invite/index.html#/charlie`
   - `file:///path/to/birthday_invite/index.html#/jenna&charlie`
3. Submit a test RSVP and check if it appears in your Google Sheet

## 🚀 Deployment

Choose one of these free hosting options:

### Option 1: Vercel (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign up (free)
2. Click **Add New** → **Project**
3. Import your project (from Git) or drag and drop your folder
4. Click **Deploy**
5. Your site will be live at `https://your-project-name.vercel.app`

**Custom Routes**: Create a `vercel.json` file:
```json
{
  "rewrites": [
    { "source": "/jenna", "destination": "/index.html" },
    { "source": "/charlie", "destination": "/index.html" },
    { "source": "/jenna&charlie", "destination": "/index.html" }
  ]
}
```

### Option 2: Netlify

1. Go to [netlify.com](https://netlify.com) and sign up (free)
2. Drag and drop your folder into Netlify
3. Your site will be live at `https://your-site-name.netlify.app`

**Custom Routes**: Create a `_redirects` file:
```
/jenna           /index.html   200
/charlie         /index.html   200
/jenna&charlie   /index.html   200
```

### Option 3: GitHub Pages

1. Create a GitHub repository
2. Push your code to the repository
3. Go to **Settings** → **Pages**
4. Select your branch and click **Save**
5. Your site will be at `https://yourusername.github.io/repository-name/`

**Custom Routes**: Create a `404.html` file (copy of `index.html`)

## 📤 Sharing Invitations

Once deployed, share these links:

- **Jenna's friends**: `https://your-site.com/jenna`
- **Charlie's friends**: `https://your-site.com/charlie`
- **Mutual friends**: `https://your-site.com/jenna&charlie`

### Create QR Codes (Optional)

1. Go to [qr-code-generator.com](https://www.qr-code-generator.com/)
2. Create QR codes for each link
3. Add to physical invitations or WhatsApp/email

## 🎨 Customization

### Change Colors

Edit `styles.css` and modify the CSS variables:

```css
:root {
    --pink: #FFB6C1;        /* Jenna's theme color */
    --blue: #87CEEB;        /* Charlie's theme color */
    /* ... more colors ... */
}
```

### Add Confetti Effect

Want celebratory confetti when someone RSVPs?

1. Add this before `</body>` in `index.html`:
```html
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
```

2. In `script.js`, add this to the success message function:
```javascript
confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
});
```

### Disable Countdown Timer

In `config.js`:
```javascript
enableCountdown: false
```

## 📱 File Structure

```
birthday_invite/
├── index.html          # Main HTML structure
├── styles.css          # All styling and themes
├── script.js           # JavaScript functionality
├── config.js           # Configuration settings
├── README.md           # This file
├── images/
│   ├── jenna-avatar.png    # Jenna's photo
│   └── charlie-avatar.png  # Charlie's photo
└── vercel.json         # (Optional) Vercel config
```

## 🐛 Troubleshooting

### RSVPs Not Saving to Google Sheets

1. Check that `googleSheetsURL` in `config.js` is correct
2. Make sure Google Apps Script is deployed as "Anyone" can access
3. Check the browser console (F12) for error messages
4. Re-deploy the Google Apps Script if you made changes

### Avatars Not Showing

1. Ensure image files are named exactly: `jenna-avatar.png` and `charlie-avatar.png`
2. Check that images are in the `images/` folder
3. Try clearing your browser cache

### Wrong Theme Showing

1. Check that you're using the correct URL path (`/jenna`, `/charlie`, or `/jenna&charlie`)
2. For localhost testing, you may need to use hash routing: `index.html#/jenna`
3. Ensure routing configuration is set up on your hosting platform

### Countdown Not Working

1. Make sure `partyDate` in `config.js` is in YYYY-MM-DD format
2. Check that `enableCountdown` is set to `true`
3. The date must be in the future

## 📞 Support

If you encounter any issues, check:
1. Browser console for JavaScript errors (F12)
2. Network tab for failed requests
3. Google Sheets script execution logs

## 🎈 Tips for Success

- **Test all three routes** before sharing
- **Send test RSVPs** to make sure Google Sheets is working
- **Check mobile view** - most guests will view on phones
- **Create short URLs** using bit.ly or similar for easy sharing
- **Track which route** guests use by checking the "Page" column in Google Sheets

---

Made with ❤️ for Jenna & Charlie's 1st Birthday! 🎂


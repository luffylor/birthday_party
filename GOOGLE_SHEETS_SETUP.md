# 📊 Google Sheets Setup Guide

This guide provides detailed, step-by-step instructions for setting up Google Sheets to collect RSVP responses.

## Part 1: Create Your Google Sheet

### Step 1: Create a New Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click the **+ Blank** button to create a new spreadsheet
3. Name your spreadsheet: "Birthday Party RSVPs" (click on "Untitled spreadsheet" at the top)

### Step 2: Set Up Column Headers

In Row 1, add these exact headers (in columns A through G):

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| Timestamp | Name | Attending | Adults | Kids | Dietary Restrictions | Page |

These columns will automatically fill when someone submits the RSVP form.

### Step 3: Format Your Sheet (Optional)

- Make the header row bold
- Add a light background color to the header row
- Freeze the header row: View → Freeze → 1 row
- Auto-resize columns: Select all → Format → Column width → Fit to data

## Part 2: Create Google Apps Script

### Step 1: Open Apps Script Editor

1. In your Google Sheet, click **Extensions** in the menu bar
2. Select **Apps Script**
3. A new tab will open with the Apps Script editor

### Step 2: Add the Script Code

1. You should see a file called `Code.gs` with some default code
2. **Delete all the existing code**
3. Copy and paste this entire script:

```javascript
/**
 * Birthday Party RSVP Handler
 * This script receives form submissions and saves them to the Google Sheet
 */

function doPost(e) {
  try {
    // Get the active spreadsheet and sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Append a new row with the RSVP data
    sheet.appendRow([
      data.timestamp,           // Column A: Timestamp
      data.name,               // Column B: Guest name
      data.attending,          // Column C: Yes/No
      data.adults,             // Column D: Number of adults
      data.kids,               // Column E: Number of kids
      data.dietary,            // Column F: Dietary restrictions
      data.page                // Column G: Which page they visited
    ]);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'RSVP recorded successfully',
      'row': sheet.getLastRow()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Test function to verify the script is working
 * Run this from the Apps Script editor to test
 */
function testScript() {
  const testData = {
    timestamp: new Date().toISOString(),
    name: 'Test Guest',
    attending: 'yes',
    adults: '2',
    kids: '1',
    dietary: 'None',
    page: 'test'
  };
  
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([
    testData.timestamp,
    testData.name,
    testData.attending,
    testData.adults,
    testData.kids,
    testData.dietary,
    testData.page
  ]);
  
  Logger.log('Test entry added successfully!');
}
```

4. Click the **Save** icon (💾) or press `Ctrl+S` (Windows) / `Cmd+S` (Mac)
5. Give your project a name: "Birthday RSVP Handler"

### Step 3: Test the Script (Optional but Recommended)

1. In the Apps Script editor, find the function dropdown (it says "Select function")
2. Select **testScript** from the dropdown
3. Click the **Run** button (▶️)
4. You may need to authorize the script:
   - Click **Review Permissions**
   - Choose your Google account
   - Click **Advanced** → **Go to Birthday RSVP Handler (unsafe)**
   - Click **Allow**
5. Go back to your Google Sheet and verify a test row was added
6. Delete the test row if desired

## Part 3: Deploy the Web App

### Step 1: Create New Deployment

1. In the Apps Script editor, click **Deploy** in the top right
2. Select **New deployment** from the dropdown

### Step 2: Configure Deployment Settings

1. Click the **gear icon** (⚙️) next to "Select type"
2. Choose **Web app**
3. Fill in the settings:

   **Description:** (optional)
   ```
   Birthday RSVP Form Handler v1
   ```

   **Execute as:**
   - Select **Me (your email address)**
   - This means the script runs with your permissions

   **Who has access:**
   - Select **Anyone**
   - ⚠️ Important: This must be "Anyone" for the form to work without login

4. Click **Deploy**

### Step 3: Authorize the Deployment

1. A popup will ask you to authorize access
2. Click **Authorize access**
3. Choose your Google account
4. If you see a warning screen:
   - Click **Advanced**
   - Click **Go to Birthday RSVP Handler (unsafe)**
   - Click **Allow**

### Step 4: Copy the Web App URL

1. After authorization, you'll see a success screen
2. **IMPORTANT:** Copy the **Web app URL**
3. It will look like this:
   ```
   https://script.google.com/macros/s/AKfycbz.../exec
   ```
4. Save this URL somewhere safe - you'll need it in the next step!
5. Click **Done**

## Part 4: Connect to Your Website

### Update config.js

1. Open the `config.js` file in your website folder
2. Find this line:
   ```javascript
   googleSheetsURL: 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE',
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your actual URL:
   ```javascript
   googleSheetsURL: 'https://script.google.com/macros/s/AKfycbz.../exec',
   ```
4. Save the file

## Part 5: Test the Integration

### Local Testing

1. Open `index.html` in your web browser
2. Fill out the RSVP form with test data:
   - Name: Test User
   - Email: test@example.com
   - Attending: Yes
   - Guests: 1
   - Dietary: None
3. Click **Send RSVP**
4. You should see a success message
5. Check your Google Sheet - a new row should appear with your test data!

### If It Doesn't Work

1. **Check the browser console** (press F12):
   - Look for any error messages
   - Common issues:
     - Wrong URL format
     - Script not deployed
     - Missing permissions

2. **Verify the script deployment**:
   - Go back to Apps Script
   - Click **Deploy** → **Manage deployments**
   - Confirm "Who has access" is set to "Anyone"

3. **Check the Apps Script execution logs**:
   - In Apps Script editor, click **Executions** (clock icon on left)
   - Look for recent execution attempts
   - Click on any failed executions to see error details

## Part 6: Make Changes (If Needed)

### If You Need to Update the Script

1. Make your changes in the Apps Script editor
2. Click **Deploy** → **Manage deployments**
3. Click the **pencil icon** (✏️) next to your current deployment
4. Change the version to **New version**
5. Add a description (e.g., "Fixed bug with dietary restrictions")
6. Click **Deploy**
7. The URL stays the same - no need to update `config.js`!

### If You Need to Redeploy from Scratch

1. Click **Deploy** → **Manage deployments**
2. Click **Archive** next to your current deployment
3. Create a new deployment following Part 3 again
4. Update the URL in `config.js` with the new deployment URL

## Viewing and Managing RSVPs

### Viewing Responses

- All RSVPs will automatically appear in your Google Sheet
- Each submission creates a new row
- The "Page" column shows which invitation link they used:
  - `jenna` - Used Jenna's invitation
  - `charlie` - Used Charlie's invitation
  - `jenna&charlie` - Used mutual friends invitation

### Organizing Responses

You can add additional columns for tracking:
- Column H: Invitation Sent? (Yes/No)
- Column I: Gift Received? (Yes/No)
- Column J: Notes

### Filtering and Sorting

- Use Google Sheets filters to view:
  - Only "Yes" responses: Filter Attending = "yes"
  - By invitation type: Filter Page = "jenna" or "charlie"
  - By dietary restrictions: Filter Dietary Restrictions ≠ empty

### Export Data

- **Download as Excel**: File → Download → Microsoft Excel (.xlsx)
- **Download as CSV**: File → Download → Comma Separated Values (.csv)
- **Print guest list**: File → Print

## Security Notes

⚠️ **Important Security Information**:

- The script runs with "Anyone" access, but this is safe because:
  - It only accepts data (can't read or delete)
  - Data is validated by the form
  - No sensitive information is transmitted
- Your Google Sheet itself is still private
- Only people with the link to your sheet can view the responses
- Consider sharing the sheet in "View only" mode if you want others to see responses

## Troubleshooting

### "Access Denied" Errors

- Make sure "Who has access" is set to **Anyone** (not "Anyone with Google account")
- Try redeploying the script

### RSVPs Not Appearing

- Check that column headers match exactly
- Verify the script code was copied completely
- Look at the Executions log in Apps Script

### Multiple Test Entries

- It's normal to have test entries while setting up
- You can delete rows directly in Google Sheet
- Real RSVPs will append to the bottom

### Form Shows "URL Not Configured"

- Check that `config.js` has the correct URL
- Make sure you replaced `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE`
- Verify there are no extra spaces or quotes

## Advanced: Email Notifications (Optional)

Want to receive an email when someone RSVPs? Add this to your script:

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
    
    // Send email notification
    MailApp.sendEmail({
      to: 'your-email@gmail.com',  // Change this to your email
      subject: '🎉 New Birthday Party RSVP',
      body: `New RSVP received!\n\nName: ${data.name}\nEmail: ${data.email}\nAttending: ${data.attending}\nGuests: ${data.guests}\nDietary: ${data.dietary}\nPage: ${data.page}`
    });
    
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

---

🎈 That's it! Your Google Sheets RSVP system is now ready to collect responses!


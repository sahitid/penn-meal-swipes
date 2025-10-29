# How to Deploy Google Apps Script as Web App

## Visual Step-by-Step Guide

### Step 1: Open Apps Script Editor

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1ioLhZ6zvFgUro4eiQe7ro7jJe20J6gL6kEgHCelDS-8/edit
2. Click **Extensions** → **Apps Script**
3. A new tab will open

### Step 2: Add the Script

1. **Select all** existing code (Ctrl+A) and delete it
2. **Copy ALL the code** from `google-apps-script.js`
3. **Paste** it into the Apps Script editor
4. Click **File → Save** (or Ctrl+S)
5. Name it: "Penn Meal Swipe Script"

### Step 3: Deploy as Web App

1. Click **Deploy** button (top right corner)
2. Click **"New deployment"**
3. You'll see a deployment configuration screen

### Step 4: Configure the Deployment

Click the **⚙️ gear icon** next to "Select type" and choose **"Web app"**

Fill in these settings:

- **Description**: `Penn Meal Swipe API`
- **Execute as**: Select **"Me (your email)"**
- **Who has access**: Select **"Anyone"** (this is important!)

### Step 5: Deploy

1. Click the blue **"Deploy"** button
2. You'll see a popup asking for authorization
3. Click **"Authorize access"**

### Step 6: Grant Permissions

You'll see a Google authorization screen:

1. Select your Penn email account
2. You might see "This app isn't verified" - Click **"Advanced"**
3. Click **"Go to Penn Meal Swipe Script (unsafe)"** (it's safe - it's YOUR script!)
4. Review permissions and click **"Allow"**

### Step 7: Copy the Web App URL

After authorization, you'll see a success screen with:

- **Web app URL**: `https://script.google.com/macros/s/AKfycbz...long-string.../exec`

**COPY THIS ENTIRE URL!** ← This is what you need!

### Step 8: Add URL to script.js

1. Open `script.js` in your code editor
2. Find the `CONFIG` object at the top (around line 2-8)
3. Replace `'YOUR_WEB_APP_URL_HERE'` with your actual URL:

**BEFORE:**
```javascript
const CONFIG = {
    offerFormUrl: 'https://forms.gle/L77FXngX4refmx6r8',
    requestFormUrl: 'https://forms.gle/iwvJteS8xT8HyqKR7',
    spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/1ioLhZ6zvFgUro4eiQe7ro7jJe20J6gL6kEgHCelDS-8/edit?usp=sharing',
    apiUrl: 'YOUR_WEB_APP_URL_HERE' // ← UPDATE THIS
};
```

**AFTER:**
```javascript
const CONFIG = {
    offerFormUrl: 'https://forms.gle/L77FXngX4refmx6r8',
    requestFormUrl: 'https://forms.gle/iwvJteS8xT8HyqKR7',
    spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/1ioLhZ6zvFgUro4eiQe7ro7jJe20J6gL6kEgHCelDS-8/edit?usp=sharing',
    apiUrl: 'https://script.google.com/macros/s/AKfycbzXXXXXXXXXXXXXXXXX/exec' // ← YOUR ACTUAL URL
};
```

4. **Save** the file

### Step 9: Test It!

1. Open `index.html` in a web browser
2. Scroll down to "Browse Available Meal Swipes"
3. You should see either:
   - ✅ Real data from your spreadsheet (if you have submissions)
   - ✅ "No meal swipes available yet" (if sheet is empty)
   - ❌ Error message (if something went wrong)

---

## Troubleshooting

### "API not configured" still shows?

- Make sure you saved `script.js` after adding the URL
- Refresh your browser (Ctrl+F5 for hard refresh)
- Check that the URL ends with `/exec` not `/dev`

### "Authorization required" error?

- Go back to Apps Script
- Click **Deploy → Manage deployments**
- Make sure "Who has access" is set to **"Anyone"**
- If not, click Edit (pencil icon) → Change to "Anyone" → Update

### Seeing "Script error" or "Permission denied"?

- Go back to Apps Script
- Click the ▶️ **Run** button at the top
- Select the `doGet` function from dropdown
- Click Run to authorize it manually
- Grant permissions

### Cards not showing up?

1. **Check if you have data in the sheet:**
   - Go to your Google Sheet
   - Make sure the "Offer Swipes Responses" sheet has data rows (not just headers)

2. **Test the API directly:**
   - Copy your Web App URL
   - Paste it in your browser address bar
   - You should see JSON data like: `{"success":true,"offers":[...]}`
   - If you see `{"success":true,"offers":[],"count":0}` - your sheet is empty
   - If you see an error - check the deployment settings

3. **Check browser console:**
   - Press F12 to open developer tools
   - Click "Console" tab
   - Look for error messages
   - Share them if you need help

### Need to update the script later?

If you make changes to `google-apps-script.js`:

1. Paste the new code in Apps Script editor
2. Save it
3. Go to **Deploy → Manage deployments**
4. Click the **✏️ pencil icon** next to your deployment
5. Under "Version": select **"New version"**
6. Click **Update**
7. The URL stays the same (no need to update script.js again!)

---

## Important Notes

- **URL ends with `/exec`** - this is the production URL
- **Don't use `/dev`** - that's for testing and requires authentication
- **"Anyone" access is safe** - the script only returns public offer data (no sensitive info)
- **Email addresses are NOT exposed** - the API doesn't share them publicly
- **Free tier limits**: 
  - 100 emails per day
  - 20,000 URL fetches per day
  - Plenty for a student project!

---

## Quick Reference

**Where to find things:**

- **Apps Script Editor**: Extensions → Apps Script (in Google Sheet)
- **Deploy button**: Top right in Apps Script editor
- **Manage deployments**: Deploy → Manage deployments
- **Execution log**: Left sidebar → Executions (to debug errors)
- **Your Web App URL**: Deploy → Manage deployments → Click (i) icon

---

## What This Does

Once configured, your website will:

1. Load → JavaScript calls your Web App URL
2. Google Apps Script reads your Google Sheet
3. Returns data as JSON
4. JavaScript creates cards dynamically
5. Users see real, live data from your spreadsheet!

No backend server needed - Google Sheets IS your database! 🎉

---

**Questions? Check `DYNAMIC_DATA_SETUP.md` for more details!**


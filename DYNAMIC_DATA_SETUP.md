# Dynamic Data Display Setup Guide

This guide will help you set up the website to dynamically pull and display data from your Google Sheet.

## What Changed

✅ **Added:** API endpoint in Google Apps Script that serves data as JSON  
✅ **Updated:** JavaScript now fetches real data from your spreadsheet  
✅ **Removed:** Hardcoded sample cards  
✅ **Added:** Loading states, error handling, and empty states  

---

## Setup Steps

### Step 1: Update Google Apps Script

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1ioLhZ6zvFgUro4eiQe7ro7jJe20J6gL6kEgHCelDS-8/edit
2. Go to **Extensions → Apps Script**
3. **Replace all the code** with the updated code from `google-apps-script.js`
4. Click **File → Save** (or Ctrl+S)

### Step 2: Deploy as Web App

1. In Apps Script, click **Deploy → New deployment**
2. Click the **gear icon** next to "Select type" → Choose **"Web app"**
3. Configure the deployment:
   - **Description:** "Penn Meal Swipe API"
   - **Execute as:** "Me"
   - **Who has access:** "Anyone"
4. Click **Deploy**
5. Click **Authorize access** and grant the necessary permissions
6. **Copy the Web App URL** (it will look like: `https://script.google.com/macros/s/AKfycbz.../exec`)

### Step 3: Update script.js

1. Open `script.js`
2. Find the `CONFIG` object at the top
3. Replace `'YOUR_WEB_APP_URL_HERE'` with your actual Web App URL:

```javascript
const CONFIG = {
    offerFormUrl: 'https://forms.gle/L77FXngX4refmx6r8',
    requestFormUrl: 'https://forms.gle/iwvJteS8xT8HyqKR7',
    spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/1ioLhZ6zvFgUro4eiQe7ro7jJe20J6gL6kEgHCelDS-8/edit?usp=sharing',
    apiUrl: 'https://script.google.com/macros/s/YOUR_ACTUAL_URL_HERE/exec' // ← UPDATE THIS
};
```

### Step 4: Test It!

1. Open `index.html` in your browser
2. Scroll down to the "Browse Available Meal Swipes" section
3. You should see:
   - A loading spinner (briefly)
   - Real data cards from your spreadsheet, OR
   - "No meal swipes available yet" if the sheet is empty

---

## What the API Returns

The Google Apps Script `doGet()` function returns JSON data in this format:

```json
{
  "success": true,
  "offers": [
    {
      "timestamp": "2024-10-29 10:30:00",
      "email": "student@upenn.edu",
      "name": "John Doe",
      "year": "Sophomore",
      "school": "Wharton",
      "swipesAvailable": "5-7",
      "diningHalls": "Commons, Hill House",
      "availability": "Weekday evenings, Weekend brunch",
      "about": "Love to talk about business and basketball!",
      "phone": "215-555-0123"
    }
  ],
  "count": 1
}
```

---

## Features Included

### 1. **Privacy Protection**
- Only shows first name + last initial (e.g., "John D.")
- Email addresses are NOT displayed publicly
- Full contact info only shared via match emails

### 2. **Loading States**
- Shows spinner while fetching data
- Displays helpful error messages if something goes wrong
- Shows empty state when no offers exist

### 3. **Error Handling**
- If API URL is not configured: Shows setup instructions
- If fetch fails: Shows error with link to view spreadsheet directly
- All errors logged to console for debugging

### 4. **Responsive Cards**
- Mobile-friendly grid layout
- Hover effects on desktop
- Clean, Penn-branded design

---

## Troubleshooting

### Cards aren't loading?

**Check 1:** Is the API URL correct in `script.js`?
- It should end with `/exec` not `/dev`
- Copy it exactly from the Apps Script deployment

**Check 2:** Did you deploy as "Anyone" can access?
- Go back to Apps Script → Deploy → Manage deployments
- Make sure "Who has access" is set to "Anyone"

**Check 3:** Open browser console (F12) and look for errors
- The error message will tell you what's wrong

### Getting "API not configured" message?

- You need to deploy the Google Apps Script as a web app (see Step 2 above)
- Then add the URL to `script.js` (see Step 3 above)

### Seeing old/wrong data?

- Sometimes Apps Script caches responses
- In Apps Script: Deploy → Manage deployments → Edit (pencil icon) → Version: New Version → Deploy
- This forces a refresh

### Need to update the data structure?

If your form columns are in a different order, update the `doGet()` function in `google-apps-script.js`:

```javascript
return {
  timestamp: row[0],  // Column A
  email: row[1],      // Column B
  name: row[2],       // Column C
  // ... adjust indices to match your sheet
};
```

---

## Next Steps

After this is working:

1. **Test with real data:** Submit a test offer via the form and verify it appears
2. **Deploy to production:** Push to Netlify/Vercel/GitHub Pages
3. **Share with students:** Promote via social media, email lists, etc.
4. **Monitor usage:** Check the Google Sheet regularly for new submissions

---

## Questions?

See the full setup documentation in:
- `SETUP_GUIDE.md` - Complete platform setup
- `EMAIL_TEMPLATES.md` - Email customization
- `QUICKSTART.md` - Quick start guide

**Good luck! 🔴🔵**


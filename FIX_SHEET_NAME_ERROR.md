# Fix: "Cannot read properties of null (reading 'getDataRange')" Error

## What This Error Means

The Google Apps Script is looking for a sheet named **"Offer Swipes Responses"** in your Google Sheet, but it can't find it. This means your actual sheet name is different.

---

## How to Fix

### Step 1: Find Your Actual Sheet Names

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1ioLhZ6zvFgUro4eiQe7ro7jJe20J6gL6kEgHCelDS-8/edit
2. Look at the **tabs at the bottom** of the spreadsheet
3. Write down the EXACT names (spelling, spaces, capitalization matter!)

Common names Google Forms creates:
- "Form Responses 1"
- "Form responses 1" 
- Or the custom name you set when creating the form

### Step 2: Update CONFIG in Apps Script

1. Go to **Extensions → Apps Script** (in your Google Sheet)
2. Find the `CONFIG` object at the top (lines 8-24)
3. Update the sheet names to match YOUR actual sheet names:

**Find this section:**

```javascript
const CONFIG = {
  // Email settings
  senderEmail: "sahitid@wharton.upenn.edu",
  senderName: "Penn Meal Swipe Share",
  
  // Sheet names
  offersSheetName: "Offer Swipes Responses",    // ← UPDATE THIS
  requestsSheetName: "Request Meals Responses",  // ← UPDATE THIS
  matchesSheetName: "Matches",                   // ← This is created automatically
  
  // ... rest of config
};
```

**Change to your actual sheet names:**

```javascript
const CONFIG = {
  // Email settings
  senderEmail: "sahitid@wharton.upenn.edu",
  senderName: "Penn Meal Swipe Share",
  
  // Sheet names - MUST MATCH EXACTLY (case-sensitive!)
  offersSheetName: "Form Responses 1",    // ← Your actual sheet name
  requestsSheetName: "Form Responses 2",  // ← Your actual sheet name
  matchesSheetName: "Matches",            // This will be created if it doesn't exist
  
  // ... rest of config
};
```

### Step 3: Save and Redeploy

1. Click **File → Save** (or Ctrl+S)
2. Go to **Deploy → Manage deployments**
3. Click the **✏️ pencil icon** next to your deployment
4. Under "Version": select **"New version"**
5. Click **"Update"**

### Step 4: Test Again

1. Refresh your website (Ctrl+F5 for hard refresh)
2. Scroll to "Browse Available Meal Swipes"
3. Should now load correctly!

---

## Common Sheet Name Scenarios

### Scenario 1: You have ONE form feeding responses

**Your sheet might look like:**
- Tab 1: "Form Responses 1" (has ALL responses - both offers and requests mixed)

**Problem:** You can't easily separate offers from requests in one sheet.

**Solution:** Use two separate Google Forms:
- Form 1: "Offer Swipes" → creates "Offer Swipes (Responses 1)"
- Form 2: "Request Meals" → creates "Request Meals (Responses 1)"

### Scenario 2: You have TWO separate forms (recommended)

**Your sheet might look like:**
- Tab 1: Name of first form responses (e.g., "Offer Swipes")
- Tab 2: Name of second form responses (e.g., "Request Meals")

**Solution:** Update CONFIG with these exact tab names.

### Scenario 3: Using same form for both

**Not recommended**, but if you want offers and requests in one sheet:

You'll need to modify the `doGet()` function to filter by a field (like "I want to: Offer / Request")

---

## Alternative: Rename Your Sheets to Match

Instead of updating the code, you can rename your sheets:

1. In Google Sheets, **right-click** the sheet tab
2. Click **"Rename"**
3. Change it to: **"Offer Swipes Responses"** (exact match)
4. Do the same for your requests sheet: **"Request Meals Responses"**
5. Refresh your website

This way the code will work without changes!

---

## How to Check if It's Fixed

**Method 1: Test the API directly**

1. Copy your Web App URL from `script.js`
2. Paste it in your browser address bar
3. You should see JSON data like:

```json
{
  "success": true,
  "offers": [],
  "count": 0
}
```

If you see an error message, the sheet names still don't match.

**Method 2: Check Apps Script Execution Log**

1. In Apps Script, click **Executions** (left sidebar, clock icon)
2. Find the most recent execution
3. Click on it to see error details
4. It will tell you exactly what went wrong

---

## Still Getting Errors?

### Error: "offersSheet is null"
→ Sheet name doesn't match CONFIG.offersSheetName

### Error: "Cannot read property of undefined"
→ Your form might not have responses yet, or column structure is different

### No error but no data showing
→ Check if your Google Form is actually sending responses to this sheet

---

## Need More Help?

Share with me:
1. What are your actual sheet tab names? (screenshot or list them)
2. Do you have one form or two forms?
3. Do you have any data in the sheets?

I'll give you the exact CONFIG settings to use!


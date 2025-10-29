# Penn Meal Swipe Share - Complete Setup Guide

## 🎯 Overview
This system uses Google Forms to collect data and Google Sheets as a database. No coding backend needed!

## 📋 Setup Steps

### Step 1: Create Google Forms

#### Form 1: Offer Meal Swipes (For Underclassmen)

1. Go to forms.google.com
2. Create a new form titled "Penn Meal Swipe Share - Offer Swipes"
3. Add the following questions:

**Questions:**

1. **Penn Email Address**
   - Type: Short answer
   - Required: Yes
   - Validation: Email, must end with "@upenn.edu"

2. **Full Name**
   - Type: Short answer
   - Required: Yes

3. **Year**
   - Type: Multiple choice
   - Required: Yes
   - Options: Freshman, Sophomore

4. **School/Major**
   - Type: Short answer
   - Required: Yes
   - Example: "Wharton - Finance" or "College - Biology"

5. **How many meal swipes can you offer per week?**
   - Type: Multiple choice
   - Required: Yes
   - Options: 1-2, 3-4, 5-7, 8+

6. **Preferred Dining Halls** (Check all that apply)
   - Type: Checkboxes
   - Required: Yes
   - Options:
     * Commons (1920)
     * Hill House
     * English House
     * Kings Court
     * McClelland
     * Falk at Penn Hillel
     * Houston Market
     * Other (please specify)

7. **Your Availability** (Check all that apply)
   - Type: Checkboxes
   - Required: Yes
   - Options:
     * Weekday Breakfast (7-10am)
     * Weekday Lunch (11am-2pm)
     * Weekday Dinner (5-8pm)
     * Weekend Brunch (10am-2pm)
     * Weekend Dinner (5-8pm)

8. **Tell us about yourself and your interests**
   - Type: Paragraph
   - Required: Yes
   - Description: "This helps upperclassmen find compatible dining partners! (hobbies, clubs, favorite topics, etc.)"

9. **What are you hoping to get from this experience?**
   - Type: Paragraph
   - Required: No
   - Description: "e.g., networking, meeting new people, mentorship, casual conversation"

10. **Phone Number (for coordination)**
    - Type: Short answer
    - Required: No

---

#### Form 2: Request Meals (For Upperclassmen)

1. Go to forms.google.com
2. Create a new form titled "Penn Meal Swipe Share - Request Meals"
3. Add the following questions:

**Questions:**

1. **Penn Email Address**
   - Type: Short answer
   - Required: Yes
   - Validation: Email, must end with "@upenn.edu"

2. **Full Name**
   - Type: Short answer
   - Required: Yes

3. **Year**
   - Type: Multiple choice
   - Required: Yes
   - Options: Junior, Senior, Graduate Student

4. **School/Major**
   - Type: Short answer
   - Required: Yes

5. **How many meals per week are you looking for?**
   - Type: Multiple choice
   - Required: Yes
   - Options: 1-2, 3-4, 5+

6. **Preferred Dining Halls** (Check all that apply)
   - Type: Checkboxes
   - Required: Yes
   - Options: (same as Form 1)

7. **Your Availability** (Check all that apply)
   - Type: Checkboxes
   - Required: Yes
   - Options: (same as Form 1)

8. **Would you prefer to be matched with someone in a specific school/major?**
   - Type: Short answer
   - Required: No
   - Description: "Leave blank if no preference"

9. **Tell us about yourself and your interests**
   - Type: Paragraph
   - Required: Yes

10. **What topics would you enjoy discussing over meals?**
    - Type: Paragraph
    - Required: No
    - Description: "e.g., career advice, courses, campus life, hobbies"

11. **Phone Number (for coordination)**
    - Type: Short answer
    - Required: No

---

### Step 2: Set Up Google Sheets

1. **Open each form** → Click on "Responses" tab → Click the Google Sheets icon
2. This creates a spreadsheet that auto-populates with form responses
3. You'll have two sheets:
   - "Offer Swipes Responses"
   - "Request Meals Responses"

#### Optional: Create a Master Dashboard Sheet

In the same workbook, create a new sheet called "Dashboard" with these tabs:

**Tab 1: Active Offers**
- Manually or automatically pull from "Offer Swipes Responses"
- Columns: Name, Email, Year, School, Swipes/Week, Availability, Interests

**Tab 2: Active Requests**
- Pull from "Request Meals Responses"
- Same column structure

**Tab 3: Matches**
- Track successful pairings
- Columns: Offer Name, Request Name, Match Date, Status, Notes

---

### Step 3: Configure Privacy Settings

#### For Google Forms:
1. Open each form → Settings (gear icon)
2. Under "Responses":
   - ✓ Collect email addresses
   - ✓ Limit to 1 response
   - ✓ Require Penn sign-in (if possible)

#### For Google Sheets:
1. Click "Share" button
2. Set sharing to:
   - **Option A (More Private):** "Restricted - Only people added can access"
     - Add team members who will manage the system
   - **Option B (More Open):** "Anyone with the link can view"
     - Allows students to browse without requesting access

---

### Step 4: Connect Forms to Website

1. Get your Google Form embed URLs:
   - Open each form → Click "Send" → Click "<>" (embed icon)
   - Copy the URL from the `src="..."` part
   - Example: `https://docs.google.com/forms/d/e/FORM_ID/viewform?embedded=true`

2. Get your Google Sheet URL:
   - Open the responses spreadsheet
   - Copy the URL from the browser
   - Example: `https://docs.google.com/spreadsheets/d/SHEET_ID/edit`

3. Open `script.js` in the website files
4. Replace the placeholder URLs in the CONFIG object:

```javascript
const CONFIG = {
    offerFormUrl: 'YOUR_OFFER_FORM_EMBED_URL',
    requestFormUrl: 'YOUR_REQUEST_FORM_EMBED_URL',
    spreadsheetUrl: 'YOUR_SPREADSHEET_URL'
};
```

---

### Step 5: Deploy the Website

#### Option A: GitHub Pages (Free & Easy)
1. Create a GitHub account at github.com
2. Create a new repository called "penn-meal-swipes"
3. Upload all files (index.html, script.js)
4. Go to Settings → Pages
5. Select "Deploy from branch" → main branch
6. Your site will be live at: `https://yourusername.github.io/penn-meal-swipes`

#### Option B: Netlify (Free & Easy)
1. Go to netlify.com
2. Drag and drop your project folder
3. Site goes live instantly with a custom URL

#### Option C: Penn Web Hosting
1. Check if Penn offers student web hosting
2. Upload files via FTP/SFTP

---

### Step 6: Matching Process

Since we're using Google Sheets, matching can be done in several ways:

#### Manual Matching (Simplest)
1. Review the two response sheets weekly
2. Look for compatible availability, dining halls, and interests
3. Send intro emails connecting both students
4. Record matches in the "Matches" tab

#### Semi-Automated Matching
Use Google Sheets formulas to highlight potential matches:
- VLOOKUP to find overlapping availability
- FILTER to show compatible pairs
- Conditional formatting to highlight good matches

#### Email Template for Matches
```
Subject: Penn Meal Swipe Match - [Underclassman Name] & [Upperclassman Name]

Hi [Names],

Great news! We've matched you two for Penn Meal Swipe Share!

[Underclassman Name] (Offering Swipes):
- Year: [Year]
- Availability: [Times]
- Interests: [Interests]
- Email: [Email]

[Upperclassman Name] (Requesting Meals):
- Year: [Year]
- Availability: [Times]
- Interests: [Interests]
- Email: [Email]

You both have overlapping availability and shared interests! We encourage you to:
1. Email each other to introduce yourselves
2. Find a mutually convenient time
3. Pick a dining hall you both like
4. Enjoy your meal together!

Tips for a great first meal:
- Confirm the date/time 24 hours in advance
- Exchange phone numbers for day-of coordination
- Be open to conversation and making a new friend!

Happy dining!
The Penn Meal Swipe Share Team
```

---

## 🔧 Advanced Features (Optional)

### Google Apps Script for Automation

You can add Google Apps Script to automate matching:

1. In Google Sheets → Extensions → Apps Script
2. Write scripts to:
   - Send automatic confirmation emails when forms are submitted
   - Match students based on criteria
   - Send weekly digest emails of new offers/requests

### Calendar Integration

Add a question to both forms:
- "Link to your Google Calendar availability" (optional)
- Students can use calendly.com or similar tools

---

## 📊 Monitoring & Management

### Weekly Tasks:
1. Review new form submissions
2. Identify potential matches
3. Send introduction emails
4. Follow up with matched pairs
5. Update the matches spreadsheet

### Monthly Tasks:
1. Survey users for feedback
2. Clean up inactive profiles
3. Promote the service to new students
4. Share success stories

---

## 🚀 Promotion Ideas

1. **Instagram Account**: Share match success stories
2. **Flyers**: Post in dining halls and dorms
3. **Class Facebook Groups**: Post in Penn class groups
4. **Email Lists**: Reach out to residential advisors
5. **Tabling**: Set up a table during NSO or Student Activities Fair

---

## 🛡️ Safety & Guidelines

Include these rules on your website and in confirmation emails:

1. Always meet in public dining halls
2. Share your plans with a friend
3. Use Penn email addresses only
4. Report any inappropriate behavior
5. No-show policy: Contact the other person ASAP if you can't make it

---

## 📈 Success Metrics to Track

In your spreadsheet, track:
- Total offers submitted
- Total requests submitted
- Number of successful matches
- Average response time
- User satisfaction ratings

---

## 🆘 Support

Create a support email: pennmealswipes@gmail.com

Or set up a Google Form for feedback and questions.

---

## ✅ Launch Checklist

- [ ] Create both Google Forms
- [ ] Set up Google Sheets
- [ ] Test form submissions
- [ ] Update website with correct URLs
- [ ] Deploy website
- [ ] Test website on mobile and desktop
- [ ] Create social media accounts
- [ ] Design promotional materials
- [ ] Recruit initial users
- [ ] Send first match emails!

---

## 🎉 You're Ready to Launch!

Once everything is set up, start promoting to get your first 10-20 users. The system will grow from there!

Good luck building community at Penn! 🔴🔵

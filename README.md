# 🍽️ Penn Meal Swipe Share

**Connect underclassmen with meal swipes to upperclassmen for shared dining experiences at Penn**

![Penn Colors](https://img.shields.io/badge/Penn-Red%20%26%20Blue-990000)
![Status](https://img.shields.io/badge/Status-Ready%20to%20Launch-brightgreen)

## Overview

Penn Meal Swipe Share is a community-driven platform that connects underclassmen who have extra meal swipes with upperclassmen who would love to share a meal. It's about building connections and mentorship (one meal at a time).

## ✨ Features

- **Easy Sign-Up**: Simple Google Forms for both offers and requests
- **Smart Matching**: Algorithm considers availability, dining hall preferences, and shared interests
- **Automatic Notifications**: Email alerts when matches are found
- **No App Required**: Works through web browser on any device
- **Privacy-Focused**: Uses Penn email addresses only
- **Zero Backend Complexity**: Runs entirely on Google Forms and Sheets

## 🚀 Quick Start

### For Students

**If You Have Meal Swipes (Underclassmen):**
1. Visit the website
2. Click "Offer Meal Swipes"
3. Fill out the form with your info and availability
4. Wait for a match notification via email
5. Connect with your match and schedule a meal!

**If You Need Meal Swipes (Upperclassmen):**
1. Visit the website
2. Click "Request a Meal"
3. Fill out the form with your preferences
4. Wait for a match notification via email
5. Reach out to your match and enjoy a meal together!

### Installation Steps

1. **Clone or Download This Repository**
   ```bash
   git clone [your-repo-url]
   cd penn-meal-swipes
   ```

2. **Set Up Google Forms**
   - Follow the detailed instructions in `SETUP_GUIDE.md`
   - Create two forms: one for offers, one for requests
   - Link forms to Google Sheets

3. **Configure the Website**
   - Open `script.js`
   - Update the `CONFIG` object with your Google Form URLs and Sheet URL
   
   ```javascript
   const CONFIG = {
       offerFormUrl: 'YOUR_OFFER_FORM_URL',
       requestFormUrl: 'YOUR_REQUEST_FORM_URL',
       spreadsheetUrl: 'YOUR_SHEET_URL'
   };
   ```

4. **Set Up Automated Matching (Optional)**
   - Open your Google Sheet
   - Go to Extensions → Apps Script
   - Copy the code from `google-apps-script.js`
   - Set up triggers as described in the script comments

5. **Deploy the Website**
   - Upload to GitHub Pages, Netlify, or your preferred host
   - Test all forms and links
   - Share with the Penn community!

### Detailed Setup Documentation
See `SETUP_GUIDE.md` for comprehensive step-by-step instructions.

## 📁 Project Structure

```
penn-meal-swipes/
├── index.html              # Main website
├── script.js               # Website functionality
├── google-apps-script.js   # Automated matching & emails
├── SETUP_GUIDE.md          # Complete setup instructions
├── README.md               # This file
├── promotional-content.md  # Marketing materials
└── templates/              # Email templates
```

## 🎯 How It Works

1. **Student Sign-Up**
   - Students fill out Google Forms
   - Data automatically populates Google Sheets

2. **Automated Matching**
   - Google Apps Script analyzes responses
   - Matches based on:
     - Schedule compatibility
     - Dining hall preferences
     - Shared interests
     - Availability overlap

3. **Connection**
   - Both students receive match emails
   - Email includes partner's contact info and interests
   - Students coordinate directly via email/text

4. **Meeting**
   - Students meet at agreed dining hall
   - Underclassman uses their meal swipe
   - Both enjoy a meal and conversation!

---

## 🔄 Complete User Flow

### Landing Page Experience

When users first visit the website, they see:

1. **Hero Section**
   - Two primary call-to-action buttons:
     - **"Offer Meal Swipes"** (for underclassmen)
     - **"Request a Meal"** (for upperclassmen)
   - Navigation menu with: Home, How It Works, Browse

2. **How It Works Section**
   - Explains the 3-step process visually
   - Builds trust and understanding

3. **Browse Section**
   - Dynamically loads available meal swipe offers
   - Displays cards with student profiles
   - Each card has a "Request to Connect" button

### User Path A: Underclassmen Offering Swipes

**Step-by-Step Journey:**

1. **Landing** → User arrives at homepage
2. **Click "Offer Meal Swipes"** → Form section appears
3. **Fill Out Form** → Google Form embedded via iframe
   - Enter name, email, year, school
   - Specify number of swipes available
   - Select preferred dining halls
   - Indicate availability (days/times)
   - Add interests/About Me section
4. **Submit Form** → Data saved to Google Sheets
5. **Confirmation Email** → Receives automated confirmation
6. **Profile Goes Live** → Appears in Browse section
7. **Matching Algorithm Runs** → Searches for compatible requests
8. **Match Found** → Receives match notification email with:
   - Upperclassman's contact info
   - Their availability and interests
   - Next steps for coordination
9. **Connect** → Emails upperclassman to schedule meal
10. **Meet & Eat** → Enjoy meal together at dining hall

### User Path B: Upperclassmen Requesting Meals

**Step-by-Step Journey:**

1. **Landing** → User arrives at homepage
2. **Option A**: Click "Request a Meal" → Form section appears
   **Option B**: Browse available offers → Click "Request to Connect" on a card
3. **Fill Out Form** → Google Form embedded via iframe
   - Enter name, email, year, school
   - Specify dining hall preferences
   - Indicate availability (days/times)
   - Add interests/About Me section
4. **Submit Form** → Data saved to Google Sheets
5. **Confirmation Email** → Receives automated confirmation
6. **Matching Algorithm Runs** → Searches for compatible offers
7. **Match Found** → Receives match notification email with:
   - Underclassman's contact info
   - Their availability and interests
   - Next steps for coordination
8. **Connect** → Emails underclassman to schedule meal
9. **Meet & Eat** → Enjoy meal together at dining hall

### Browse Section Functionality

- **Dynamic Loading**: On page load, `loadAvailableSwipes()` function:
  - Fetches data from Google Apps Script API
  - Displays loading state while fetching
  - Creates card elements for each offer
  - Handles empty states and errors gracefully

- **Card Display**: Each offer card shows:
  - Name (first name + last initial for privacy)
  - Year and school
  - Number of swipes available
  - Availability (first preference shown)
  - Preferred dining hall (first preference shown)
  - About/interests section (if provided)
  - "Request to Connect" button

- **Interaction**: Clicking "Request to Connect" scrolls to and shows the request form

### Data Flow Architecture

```
User submits form
    ↓
Google Forms receives submission
    ↓
Data saved to Google Sheets
    ↓
Google Apps Script trigger fires
    ↓
Confirmation email sent
    ↓
Matching algorithm runs
    ↓
If match found (score ≥ 60%):
    ├─→ Match notification emails sent
    ├─→ Match recorded in Matches sheet
    └─→ Both students can now connect
```

---

## 🧮 Matching Algorithm

### Overview

The matching algorithm is a **weighted scoring system** that runs automatically whenever a new form submission is received. It compares the new submission against all existing submissions of the opposite type (offers vs. requests) and calculates a compatibility score.

### When Matching Occurs

Matching is triggered automatically by two functions:

1. **`onOfferSubmit(e)`** - Runs when an underclassman submits an offer
2. **`onRequestSubmit(e)`** - Runs when an upperclassman submits a request

Both functions:
- Send a confirmation email to the submitter
- Immediately run the matching algorithm
- Search for compatible matches in the opposite pool

### Matching Process

#### Step 1: Load Candidate Pool

- **For new offers**: Load all existing requests from the "Request Meals Responses" sheet
- **For new requests**: Load all existing offers from the "Offer Swipes Responses" sheet

#### Step 2: Calculate Match Score

For each potential match, the algorithm calls `calculateMatchScore(offer, request)` which computes a score from 0.0 to 1.0 using three weighted factors:

```javascript
Total Score = (Availability Score × 40%) 
            + (Dining Hall Score × 30%) 
            + (Interests Score × 30%)
```

**A. Availability Match (40% weight)**
- **Purpose**: Ensures students can actually meet
- **Method**: Compares time slots (e.g., "Monday lunch, Tuesday dinner")
- **Calculation**: Uses `calculateOverlap()` function
  - Splits availability strings by commas/semicolons
  - Counts overlapping time slots (substring matching)
  - Score = `overlapping_items / max(items_in_either_list)`
- **Example**: 
  - Offer: "Monday lunch, Tuesday dinner, Friday lunch"
  - Request: "Monday lunch, Wednesday dinner"
  - Overlap: 1 item (Monday lunch)
  - Score: 1/3 = 0.33 → Weighted: 0.33 × 0.4 = 0.132

**B. Dining Hall Match (30% weight)**
- **Purpose**: Ensures students prefer compatible locations
- **Method**: Compares preferred dining halls (e.g., "Hill, Commons")
- **Calculation**: Uses same `calculateOverlap()` function
- **Requirement**: At least one shared dining hall for meaningful match
- **Example**:
  - Offer: "Hill, Commons"
  - Request: "Hill"
  - Overlap: 1 item (Hill)
  - Score: 1/2 = 0.5 → Weighted: 0.5 × 0.3 = 0.15

**C. Interests Similarity (30% weight)**
- **Purpose**: Increases likelihood of good conversation
- **Method**: Compares "About Me" text fields
- **Calculation**: Uses `calculateTextSimilarity()` function
  - Splits text into words
  - Finds common words (length > 3 characters, substring matching)
  - Score = `common_words / max(words_in_either_text)`
- **Example**:
  - Offer: "I love basketball and entrepreneurship"
  - Request: "Basketball player, interested in startups"
  - Common words: "basketball", "entrepreneurship/startups"
  - Score: 2/5 = 0.4 → Weighted: 0.4 × 0.3 = 0.12

#### Step 3: Filter and Rank

- **Threshold**: Only matches with score ≥ **0.6 (60%)** are considered valid
- **Ranking**: All valid matches are sorted by score (highest first)
- **Selection**: Only the **top match** is processed (prevents notification overload)

#### Step 4: Notify and Record

If a valid match exists:

1. **Send Match Notifications**:
   - Both students receive personalized emails via `sendMatchNotification()`
   - Email includes:
     - Partner's name, year, school
     - Contact information (email)
     - Availability preferences
     - Interests/About Me section
     - Next steps for coordination

2. **Record Match**:
   - Match saved to "Matches" sheet via `recordMatch()`
   - Records:
     - Match date/timestamp
     - Both students' names and emails
     - Match score (for analytics)
     - Status: "Pending" (can be updated to "Completed" manually)

### Helper Functions

**`calculateOverlap(str1, str2)`**
```javascript
// Purpose: Find overlapping items between two comma-separated strings
// Returns: Score from 0.0 to 1.0
// Example: "Hill, Commons" vs "Hill" → 0.5
```

**`calculateTextSimilarity(text1, text2)`**
```javascript
// Purpose: Find common words between two text fields
// Returns: Score from 0.0 to 1.0
// Filters: Only words longer than 3 characters
// Example: "basketball entrepreneurship" vs "basketball startups" → 0.4
```

### Example Match Calculation

**Scenario**: New offer submitted, checking against existing requests

**New Offer:**
- Availability: "Monday lunch, Tuesday dinner, Friday lunch"
- Dining halls: "Hill, Commons"
- Interests: "I love basketball and entrepreneurship"

**Existing Request:**
- Availability: "Monday lunch, Wednesday dinner"
- Dining halls: "Hill"
- Interests: "Basketball player, interested in startups"

**Score Calculation:**

1. **Availability**: 
   - Overlap: 1 (Monday lunch)
   - Max items: 3
   - Score: 1/3 = 0.33
   - Weighted: 0.33 × 0.4 = **0.132**

2. **Dining Halls**:
   - Overlap: 1 (Hill)
   - Max items: 2
   - Score: 1/2 = 0.5
   - Weighted: 0.5 × 0.3 = **0.15**

3. **Interests**:
   - Common words: "basketball", "entrepreneurship/startups" (2 words)
   - Max words: 5
   - Score: 2/5 = 0.4
   - Weighted: 0.4 × 0.3 = **0.12**

**Total Score**: 0.132 + 0.15 + 0.12 = **0.402 (40.2%)**

**Result**: ❌ **No match** (below 60% threshold)

**Better Match Example:**

**Offer:**
- Availability: "Monday lunch, Tuesday dinner"
- Dining halls: "Hill, Commons"
- Interests: "Basketball, startups, tech"

**Request:**
- Availability: "Monday lunch, Tuesday dinner"
- Dining halls: "Hill"
- Interests: "Love basketball and tech startups"

**Score Calculation:**

1. **Availability**: 2/2 = 1.0 → 1.0 × 0.4 = **0.4**
2. **Dining Halls**: 1/2 = 0.5 → 0.5 × 0.3 = **0.15**
3. **Interests**: 3/5 = 0.6 → 0.6 × 0.3 = **0.18**

**Total Score**: 0.4 + 0.15 + 0.18 = **0.73 (73%)**

**Result**: ✅ **Match!** (above 60% threshold)

### Algorithm Configuration

The matching weights can be adjusted in `google-apps-script.js`:

```javascript
const CONFIG = {
  weights: {
    availabilityMatch: 0.4,    // 40% - Schedule compatibility
    diningHallMatch: 0.3,       // 30% - Location preference
    interestsSimilarity: 0.3    // 30% - Shared interests
  }
};
```

**Current Threshold**: 0.6 (60%) - can be modified in `findMatchesForNewOffer()` and `findMatchesForNewRequest()`

### Manual Matching

The script includes `runManualMatching()` function for:
- **Bulk matching**: Check all offers against all requests
- **Catching missed matches**: Useful if algorithm wasn't running
- **Testing**: Verify matching logic works correctly

**Usage**: Run manually in Apps Script editor to find and send all possible matches.

### Design Decisions

1. **60% Threshold**: Balances match quality with match rate
   - Too low → Poor quality matches
   - Too high → Too few matches

2. **Weighted Factors**: Prioritizes schedule compatibility (40%)
   - Most important for successful meetings
   - Dining halls and interests are nice-to-haves

3. **Top Match Only**: Prevents notification overload
   - Students get one match at a time
   - Can request another match after meeting

4. **Automatic Execution**: Runs on every submission
   - No manual intervention needed
   - Immediate matching for new users

5. **Match Recording**: All matches saved for analytics
   - Track success rates
   - Identify patterns
   - Improve algorithm over time

## 📊 Tech Stack

- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Backend**: Google Forms (data collection)
- **Database**: Google Sheets
- **Automation**: Google Apps Script
- **Email**: Gmail via Apps Script
- **Hosting**: GitHub Pages / Netlify / Custom

## 🤝 Contributing

This is a community project! Ways to contribute:
- Report bugs or suggest features (create an issue)
- Improve documentation
- Share your success story
- Help match students manually
- Spread the word!

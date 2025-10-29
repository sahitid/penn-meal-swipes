// Penn Meal Swipe Share - Google Apps Script
// This script should be added to your Google Sheets via Extensions → Apps Script

// ========================================
// CONFIGURATION
// ========================================

const CONFIG = {
  // Email settings
  senderEmail: "pennmealswipes@gmail.com", // Change this to your email
  senderName: "Penn Meal Swipe Share",
  
  // Sheet names
  offersSheetName: "Offer Swipes Responses",
  requestsSheetName: "Request Meals Responses",
  matchesSheetName: "Matches",
  
  // Matching criteria weights
  weights: {
    availabilityMatch: 0.4,
    diningHallMatch: 0.3,
    interestsSimilarity: 0.3
  }
};

// ========================================
// FORM SUBMISSION TRIGGERS
// ========================================

// This function runs automatically when the "Offer Swipes" form is submitted
function onOfferSubmit(e) {
  const timestamp = new Date();
  const response = e.values;
  
  // Extract form data
  const email = response[1]; // Assuming email is in column B
  const name = response[2];
  
  // Send confirmation email to the student who offered swipes
  sendOfferConfirmationEmail(email, name);
  
  // Try to find matches
  findMatchesForNewOffer(response);
}

// This function runs automatically when the "Request Meals" form is submitted
function onRequestSubmit(e) {
  const timestamp = new Date();
  const response = e.values;
  
  // Extract form data
  const email = response[1];
  const name = response[2];
  
  // Send confirmation email
  sendRequestConfirmationEmail(email, name);
  
  // Try to find matches
  findMatchesForNewRequest(response);
}

// ========================================
// EMAIL CONFIRMATION FUNCTIONS
// ========================================

function sendOfferConfirmationEmail(email, name) {
  const subject = "Thanks for Offering Meal Swipes! 🍽️";
  const body = `
Hi ${name},

Thank you for signing up to share your meal swipes with upperclassmen through Penn Meal Swipe Share!

Your profile is now live, and upperclassmen can see your availability. We'll notify you as soon as we find a great match for you.

In the meantime:
• Keep an eye on your email for match notifications
• Make sure your schedule stays up to date
• Reach out if you have any questions

We're excited to help you make new connections at Penn!

Best,
The Penn Meal Swipe Share Team

---
Questions? Reply to this email or check out our website.
  `;
  
  MailApp.sendEmail({
    to: email,
    subject: subject,
    body: body
  });
}

function sendRequestConfirmationEmail(email, name) {
  const subject = "Your Meal Request is Active! 🍴";
  const body = `
Hi ${name},

Thanks for joining Penn Meal Swipe Share! Your meal request has been received.

We're now searching for underclassmen with meal swipes who match your preferences and availability. We'll email you as soon as we find a good match!

What happens next:
1. We'll review your preferences and availability
2. Match you with compatible underclassmen
3. Send you both an introduction email with each other's contact info
4. You coordinate directly to schedule your meal

Typical response time: 24-48 hours

Looking forward to connecting you with a great dining partner!

Best,
The Penn Meal Swipe Share Team

---
Questions? Reply to this email or check out our website.
  `;
  
  MailApp.sendEmail({
    to: email,
    subject: subject,
    body: body
  });
}

// ========================================
// MATCHING ALGORITHM
// ========================================

function findMatchesForNewOffer(offerData) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const requestsSheet = ss.getSheetByName(CONFIG.requestsSheetName);
  const matchesSheet = ss.getSheetByName(CONFIG.matchesSheetName);
  
  // Get all requests
  const requestsData = requestsSheet.getDataRange().getValues();
  
  // Skip header row
  const requests = requestsData.slice(1);
  
  // Find best matches
  const matches = [];
  
  for (let i = 0; i < requests.length; i++) {
    const request = requests[i];
    const matchScore = calculateMatchScore(offerData, request);
    
    if (matchScore >= 0.6) { // 60% compatibility threshold
      matches.push({
        offer: offerData,
        request: request,
        score: matchScore,
        requestRowIndex: i + 2 // +2 for header and 0-indexing
      });
    }
  }
  
  // Sort by score (highest first)
  matches.sort((a, b) => b.score - a.score);
  
  // Send match notification for top match (if exists)
  if (matches.length > 0) {
    const topMatch = matches[0];
    sendMatchNotification(topMatch.offer, topMatch.request);
    recordMatch(topMatch.offer, topMatch.request, topMatch.score);
  }
}

function findMatchesForNewRequest(requestData) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const offersSheet = ss.getSheetByName(CONFIG.offersSheetName);
  
  // Get all offers
  const offersData = offersSheet.getDataRange().getValues();
  const offers = offersData.slice(1);
  
  // Find best matches
  const matches = [];
  
  for (let i = 0; i < offers.length; i++) {
    const offer = offers[i];
    const matchScore = calculateMatchScore(offer, requestData);
    
    if (matchScore >= 0.6) {
      matches.push({
        offer: offer,
        request: requestData,
        score: matchScore,
        offerRowIndex: i + 2
      });
    }
  }
  
  matches.sort((a, b) => b.score - a.score);
  
  if (matches.length > 0) {
    const topMatch = matches[0];
    sendMatchNotification(topMatch.offer, topMatch.request);
    recordMatch(topMatch.offer, topMatch.request, topMatch.score);
  }
}

function calculateMatchScore(offer, request) {
  // Assuming column structure:
  // [0]=Timestamp, [1]=Email, [2]=Name, [3]=Year, [4]=School, [5]=Swipes/Meals, [6]=Dining Halls, [7]=Availability, [8]=Interests...
  
  let score = 0;
  
  // 1. Availability match (40%)
  const offerAvailability = offer[7] || "";
  const requestAvailability = request[7] || "";
  const availabilityScore = calculateOverlap(offerAvailability, requestAvailability);
  score += availabilityScore * CONFIG.weights.availabilityMatch;
  
  // 2. Dining hall match (30%)
  const offerDiningHalls = offer[6] || "";
  const requestDiningHalls = request[6] || "";
  const diningHallScore = calculateOverlap(offerDiningHalls, requestDiningHalls);
  score += diningHallScore * CONFIG.weights.diningHallMatch;
  
  // 3. Interests similarity (30%)
  const offerInterests = offer[8] || "";
  const requestInterests = request[8] || "";
  const interestsScore = calculateTextSimilarity(offerInterests, requestInterests);
  score += interestsScore * CONFIG.weights.interestsSimilarity;
  
  return score;
}

function calculateOverlap(str1, str2) {
  if (!str1 || !str2) return 0;
  
  // Split by common separators
  const items1 = str1.toLowerCase().split(/[,;]+/).map(s => s.trim());
  const items2 = str2.toLowerCase().split(/[,;]+/).map(s => s.trim());
  
  let matches = 0;
  for (let item1 of items1) {
    for (let item2 of items2) {
      if (item1.includes(item2) || item2.includes(item1)) {
        matches++;
        break;
      }
    }
  }
  
  return matches / Math.max(items1.length, items2.length);
}

function calculateTextSimilarity(text1, text2) {
  if (!text1 || !text2) return 0;
  
  // Simple word-based similarity
  const words1 = text1.toLowerCase().split(/\s+/);
  const words2 = text2.toLowerCase().split(/\s+/);
  
  let commonWords = 0;
  for (let word1 of words1) {
    if (word1.length > 3 && words2.some(word2 => word2.includes(word1) || word1.includes(word2))) {
      commonWords++;
    }
  }
  
  return commonWords / Math.max(words1.length, words2.length);
}

// ========================================
// MATCH NOTIFICATION
// ========================================

function sendMatchNotification(offer, request) {
  // Extract data (adjust column indices based on your actual form structure)
  const offerEmail = offer[1];
  const offerName = offer[2];
  const offerYear = offer[3];
  const offerSchool = offer[4];
  const offerAvailability = offer[7];
  const offerInterests = offer[8];
  
  const requestEmail = request[1];
  const requestName = request[2];
  const requestYear = request[3];
  const requestSchool = request[4];
  const requestAvailability = request[7];
  const requestInterests = request[8];
  
  // Email to underclassman (offering swipes)
  const offerSubject = `You've Been Matched! Meet ${requestName} 🎉`;
  const offerBody = `
Hi ${offerName},

Great news! We've found a great match for you!

You've been paired with ${requestName}, a ${requestYear} in ${requestSchool} who would love to share a meal with you.

About ${requestName}:
• Year: ${requestYear}
• School/Major: ${requestSchool}
• Availability: ${requestAvailability}
• Interests: ${requestInterests}
• Email: ${requestEmail}

Next Steps:
1. Email ${requestName} at ${requestEmail} to introduce yourself
2. Compare schedules and find a time that works for both of you
3. Pick a dining hall you both like
4. Meet up and enjoy your meal together!

Tips for a great first meeting:
• Confirm the time and place 24 hours before
• Exchange phone numbers for day-of coordination
• Be yourself and have fun!

Looking forward to hearing how it goes!

Best,
The Penn Meal Swipe Share Team
  `;
  
  // Email to upperclassman (requesting meal)
  const requestSubject = `You've Been Matched! Meet ${offerName} 🎉`;
  const requestBody = `
Hi ${requestName},

Exciting news! We've found a perfect dining partner for you!

You've been paired with ${offerName}, a ${offerYear} in ${offerSchool} who wants to share their meal swipes.

About ${offerName}:
• Year: ${offerYear}
• School/Major: ${offerSchool}
• Availability: ${offerAvailability}
• Interests: ${offerInterests}
• Email: ${offerEmail}

Next Steps:
1. Email ${offerName} at ${offerEmail} to introduce yourself
2. Compare schedules and find a time that works for both of you
3. Pick a dining hall you both like
4. Meet up and enjoy your meal together!

Remember: ${offerName} is generously sharing their meal swipes with you, so be respectful of their time and appreciative of their generosity!

Have a great meal together!

Best,
The Penn Meal Swipe Share Team
  `;
  
  // Send emails
  MailApp.sendEmail({
    to: offerEmail,
    subject: offerSubject,
    body: offerBody
  });
  
  MailApp.sendEmail({
    to: requestEmail,
    subject: requestSubject,
    body: requestBody
  });
}

// ========================================
// RECORD MATCHES
// ========================================

function recordMatch(offer, request, score) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let matchesSheet = ss.getSheetByName(CONFIG.matchesSheetName);
  
  // Create matches sheet if it doesn't exist
  if (!matchesSheet) {
    matchesSheet = ss.insertSheet(CONFIG.matchesSheetName);
    matchesSheet.appendRow([
      "Match Date",
      "Offer Name",
      "Offer Email",
      "Offer Year",
      "Request Name",
      "Request Email",
      "Request Year",
      "Match Score",
      "Status"
    ]);
  }
  
  // Add match record
  matchesSheet.appendRow([
    new Date(),
    offer[2], // Name
    offer[1], // Email
    offer[3], // Year
    request[2], // Name
    request[1], // Email
    request[3], // Year
    score.toFixed(2),
    "Pending"
  ]);
}

// ========================================
// MANUAL MATCHING FUNCTION
// ========================================

// Run this manually to find and send all possible matches
function runManualMatching() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const offersSheet = ss.getSheetByName(CONFIG.offersSheetName);
  const requestsSheet = ss.getSheetByName(CONFIG.requestsSheetName);
  
  const offersData = offersSheet.getDataRange().getValues().slice(1);
  const requestsData = requestsSheet.getDataRange().getValues().slice(1);
  
  let matchCount = 0;
  
  for (let offer of offersData) {
    for (let request of requestsData) {
      const score = calculateMatchScore(offer, request);
      
      if (score >= 0.6) {
        sendMatchNotification(offer, request);
        recordMatch(offer, request, score);
        matchCount++;
      }
    }
  }
  
  Logger.log(`Found and sent ${matchCount} matches`);
  
  // Send summary email to admin
  MailApp.sendEmail({
    to: CONFIG.senderEmail,
    subject: "Manual Matching Complete",
    body: `Manual matching process completed. ${matchCount} matches were found and notifications sent.`
  });
}

// ========================================
// SETUP INSTRUCTIONS
// ========================================

/*
TO SET UP THIS SCRIPT:

1. Open your Google Sheet with form responses
2. Go to Extensions → Apps Script
3. Delete any existing code and paste this entire script
4. Update the CONFIG section at the top with your email and sheet names
5. Save the script (File → Save or Ctrl+S)

TO SET UP AUTOMATIC TRIGGERS:

1. In Apps Script, click on the clock icon (Triggers) on the left
2. Click "+ Add Trigger" (bottom right)
3. Configure trigger for onOfferSubmit:
   - Function: onOfferSubmit
   - Event source: From spreadsheet
   - Event type: On form submit
   - Select the "Offer Swipes" form
4. Click "+ Add Trigger" again for onRequestSubmit:
   - Function: onRequestSubmit
   - Event source: From spreadsheet
   - Event type: On form submit
   - Select the "Request Meals" form
5. Authorize the script when prompted

TO RUN MANUAL MATCHING:

1. In Apps Script, select the function "runManualMatching" from the dropdown
2. Click the Run button (▶️)
3. Check your email for the summary

TROUBLESHOOTING:

- If emails aren't sending, check your email quota (100 emails/day for free accounts)
- Check the Executions log for errors (left sidebar in Apps Script)
- Make sure sheet names in CONFIG match your actual sheet names
- Ensure form column order matches the assumptions in the code
*/

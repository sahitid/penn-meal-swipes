// Penn Meal Swipe Share - Google Apps Script
// This script should be added to your Google Sheets via Extensions → Apps Script

// ========================================
// CONFIGURATION
// ========================================

const CONFIG = {
  // Sheet names
  offersSheetName: "Offer Swipes Responses",
  requestsSheetName: "Request Meals Responses",
  matchesSheetName: "Meal Swipes System",

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

// UNIVERSAL TRIGGER - Detects which form was submitted by checking the sheet name
// Set this as your single trigger (Function: onFormSubmit, Event: On form submit)
function onFormSubmit(e) {
  const sheet = e.range.getSheet();
  const sheetName = sheet.getName();

  Logger.log('onFormSubmit triggered - Sheet: ' + sheetName);

  if (sheetName === CONFIG.offersSheetName) {
    Logger.log('Detected as Offer form submission');
    onOfferSubmit(e);
  } else if (sheetName === CONFIG.requestsSheetName) {
    Logger.log('Detected as Request form submission');
    onRequestSubmit(e);
  } else {
    Logger.log('Unknown sheet: ' + sheetName + ' - No action taken');
  }
}

// Handles offer form submissions
function onOfferSubmit(e) {
  const response = e.values;
  Logger.log('onOfferSubmit triggered - Offer form submitted');
  findMatchesForNewOffer(response);
}

// Handles request form submissions
function onRequestSubmit(e) {
  const response = e.values;
  Logger.log('onRequestSubmit triggered - Request form submitted');
  findMatchesForNewRequest(response);
}

// ========================================
// MATCHING ALGORITHM
// ========================================

function findMatchesForNewOffer(offerData) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const requestsSheet = ss.getSheetByName(CONFIG.requestsSheetName);

  const requestsData = requestsSheet.getDataRange().getValues();
  const requests = requestsData.slice(1);

  const matches = [];

  for (let i = 0; i < requests.length; i++) {
    const request = requests[i];

    // Prevent self-matching
    const offerEmail = (offerData[1] || '').toLowerCase().trim();
    const requestEmail = (request[1] || '').toLowerCase().trim();
    if (offerEmail === requestEmail) continue;

    const matchScore = calculateMatchScore(offerData, request);

    if (matchScore >= 0.6) {
      matches.push({
        offer: offerData,
        request: request,
        score: matchScore
      });
    }
  }

  matches.sort((a, b) => b.score - a.score);

  if (matches.length > 0) {
    const topMatch = matches[0];
    recordMatch(topMatch.offer, topMatch.request, topMatch.score);
    Logger.log('Match recorded: ' + topMatch.offer[2] + ' <-> ' + topMatch.request[2] + ' (score: ' + topMatch.score.toFixed(2) + ')');
  }
}

function findMatchesForNewRequest(requestData) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const offersSheet = ss.getSheetByName(CONFIG.offersSheetName);

  const offersData = offersSheet.getDataRange().getValues();
  const offers = offersData.slice(1);

  const matches = [];

  for (let i = 0; i < offers.length; i++) {
    const offer = offers[i];

    // Prevent self-matching
    const offerEmail = (offer[1] || '').toLowerCase().trim();
    const requestEmail = (requestData[1] || '').toLowerCase().trim();
    if (offerEmail === requestEmail) continue;

    const matchScore = calculateMatchScore(offer, requestData);

    if (matchScore >= 0.6) {
      matches.push({
        offer: offer,
        request: requestData,
        score: matchScore
      });
    }
  }

  matches.sort((a, b) => b.score - a.score);

  if (matches.length > 0) {
    const topMatch = matches[0];
    recordMatch(topMatch.offer, topMatch.request, topMatch.score);
    Logger.log('Match recorded: ' + topMatch.offer[2] + ' <-> ' + topMatch.request[2] + ' (score: ' + topMatch.score.toFixed(2) + ')');
  }
}

function calculateMatchScore(offer, request) {
  // Column structure:
  // [0]=Timestamp, [1]=Email, [2]=Name, [3]=Year, [4]=School, [5]=Swipes/Meals, [6]=Dining Halls, [7]=Availability, [8]=Interests

  let score = 0;

  // 1. Availability match (40%)
  const availabilityScore = calculateOverlap(offer[7] || "", request[7] || "");
  score += availabilityScore * CONFIG.weights.availabilityMatch;

  // 2. Dining hall match (30%)
  const diningHallScore = calculateOverlap(offer[6] || "", request[6] || "");
  score += diningHallScore * CONFIG.weights.diningHallMatch;

  // 3. Interests similarity (30%)
  const interestsScore = calculateTextSimilarity(offer[8] || "", request[8] || "");
  score += interestsScore * CONFIG.weights.interestsSimilarity;

  return score;
}

function calculateOverlap(str1, str2) {
  if (!str1 || !str2) return 0;

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

  matchesSheet.appendRow([
    new Date(),
    offer[2],  // Name
    offer[1],  // Email
    offer[3],  // Year
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

// Run this manually in Apps Script to match all existing offers and requests
function runManualMatching() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const offersData = ss.getSheetByName(CONFIG.offersSheetName).getDataRange().getValues().slice(1);
  const requestsData = ss.getSheetByName(CONFIG.requestsSheetName).getDataRange().getValues().slice(1);

  let matchCount = 0;

  for (let offer of offersData) {
    for (let request of requestsData) {
      // Prevent self-matching
      const offerEmail = (offer[1] || '').toLowerCase().trim();
      const requestEmail = (request[1] || '').toLowerCase().trim();
      if (offerEmail === requestEmail) continue;

      const score = calculateMatchScore(offer, request);

      if (score >= 0.6) {
        recordMatch(offer, request, score);
        matchCount++;
      }
    }
  }

  Logger.log('Manual matching complete. ' + matchCount + ' matches recorded.');
}

// ========================================
// WEB APP API - Serve data to website
// ========================================

function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const offersSheet = ss.getSheetByName(CONFIG.offersSheetName);

    const offersData = offersSheet.getDataRange().getValues();
    const offers = offersData.slice(1);

    const offersJson = offers.map(row => {
      return {
        timestamp: row[0],
        email: row[1],
        name: row[2],
        year: row[3],
        school: row[4],
        swipesAvailable: row[5],
        diningHalls: row[6],
        availability: row[7],
        about: row[8],
        phone: row[9] || ""
      };
    });

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        offers: offersJson,
        count: offersJson.length
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ========================================
// SETUP INSTRUCTIONS
// ========================================

/*
TO SET UP THIS SCRIPT:

1. Open your Google Sheet with form responses
2. Go to Extensions → Apps Script
3. Delete any existing code and paste this entire script
4. Update CONFIG.offersSheetName and CONFIG.requestsSheetName to match your exact sheet tab names
5. Save the script (Ctrl+S)

TO DEPLOY AS WEB APP (for displaying cards on the website):

1. In Apps Script, click "Deploy" → "New deployment"
2. Click the gear icon next to "Select type" → Choose "Web app"
3. Configure:
   - Execute as: "Me"
   - Who has access: "Anyone"
4. Click "Deploy" and copy the Web App URL
5. Paste the URL into CONFIG.apiUrl in script.js on your website

TO SET UP THE TRIGGER:

1. In Apps Script, click the clock icon (Triggers) on the left sidebar
2. Delete any existing triggers
3. Click "+ Add Trigger"
4. Configure:
   - Function to run: onFormSubmit
   - Event source: From spreadsheet
   - Event type: On form submit
5. Click Save and authorize when prompted

This single trigger handles both forms automatically by detecting which sheet was updated.

TO RUN MANUAL MATCHING:

1. In Apps Script, select "runManualMatching" from the function dropdown
2. Click Run (▶️)
3. Check the Matches sheet in your spreadsheet for results
*/

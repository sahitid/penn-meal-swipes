# 🍽️ Penn Meal Swipe Share

**Connect underclassmen with meal swipes to upperclassmen for shared dining experiences at Penn**

![Penn Colors](https://img.shields.io/badge/Penn-Red%20%26%20Blue-990000)
![Status](https://img.shields.io/badge/Status-Ready%20to%20Launch-brightgreen)

## 📖 Overview

Penn Meal Swipe Share is a community-driven platform that connects underclassmen who have extra meal swipes with upperclassmen who would love to share a meal. It's about building connections, mentorship, and community—one meal at a time.

### The Problem
- Underclassmen often have leftover meal swipes
- Upperclassmen miss having meal plans
- Students want to meet people across class years
- Making new friends can be challenging

### The Solution
A simple web platform that:
1. Lets underclassmen offer their extra meal swipes
2. Allows upperclassmen to request meals
3. Matches compatible pairs based on schedules and interests
4. Facilitates connections through shared dining experiences

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

## 🛠️ Setup for Administrators

### Prerequisites
- Google Account
- Basic understanding of Google Forms and Sheets
- Web hosting (GitHub Pages, Netlify, or Penn hosting)

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

## 📊 Tech Stack

- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Backend**: Google Forms (data collection)
- **Database**: Google Sheets
- **Automation**: Google Apps Script
- **Email**: Gmail via Apps Script
- **Hosting**: GitHub Pages / Netlify / Custom

### Why This Stack?

✅ **No coding required** for basic setup
✅ **Free** to run (within Google's quotas)
✅ **Easy to maintain** - visual interface
✅ **Scales** to hundreds of users
✅ **Familiar** - everyone knows Google Forms
✅ **Reliable** - Google's infrastructure

## 🔒 Privacy & Safety

- **Penn Email Only**: Requires @upenn.edu addresses
- **Public Dining Halls**: All meetings in public campus locations
- **Voluntary**: Participation is completely optional
- **No Monetary Exchange**: Meal swipes are shared freely
- **Reporting System**: Easy way to report concerns

## 📈 Success Metrics

Track these metrics in your Google Sheet:
- Total offers submitted
- Total requests submitted
- Number of successful matches
- Response time to matches
- User satisfaction ratings
- Repeat usage rate

## 🎨 Customization

### Branding
- Update colors in `index.html` (currently Penn red and blue)
- Replace logo/icons as needed
- Modify text to match your school's voice

### Matching Algorithm
- Adjust weights in `google-apps-script.js`
- Change compatibility threshold (default: 60%)
- Add new matching criteria

### Forms
- Add/remove questions in Google Forms
- Update script column references if you change form structure

## 📣 Marketing Your Platform

1. **Social Media**
   - Create Instagram/Facebook page
   - Share success stories
   - Post weekly match stats

2. **On-Campus**
   - Flyers in dining halls and dorms
   - Tabling at student activities fair
   - Reach out to residential advisors

3. **Email**
   - Contact class Facebook groups
   - Email student organization leaders
   - Partner with Penn Dining

4. **Word of Mouth**
   - Encourage users to invite friends
   - Share positive experiences
   - Create referral incentives

See `promotional-content.md` for ready-to-use marketing materials.

## 🤝 Contributing

This is a community project! Ways to contribute:
- Report bugs or suggest features (create an issue)
- Improve documentation
- Share your success story
- Help match students manually
- Spread the word!

## 📧 Support

- **Technical Issues**: [your-email@upenn.edu]
- **General Questions**: [support-email]
- **Report Concerns**: [safety-email]

## 📝 License

This project is open source and available for any university to adapt and use.

## 🙏 Acknowledgments

Built for Penn students, by Penn students. Special thanks to:
- Penn Dining Services
- Student volunteers who help with matching
- Everyone who shares their meal swipes

## 🚦 Roadmap

**Phase 1** (Current)
- ✅ Basic matching system
- ✅ Google Forms integration
- ✅ Automated email notifications

**Phase 2** (Coming Soon)
- [ ] Mobile app
- [ ] Calendar integration
- [ ] User profiles with photos
- [ ] Rating system
- [ ] Group meals (3-4 people)

**Phase 3** (Future)
- [ ] AI-powered matching
- [ ] Integration with Penn's authentication system
- [ ] Meal planning features
- [ ] Analytics dashboard

## 📞 Contact

Have questions? Want to bring this to your school?

📧 Email: pennmealswipes@gmail.com
🌐 Website: [Your Website URL]
📱 Instagram: @pennmealswipes

---

**Made with ❤️ for the Penn community**

🔴 🔵 **Go Quakers!** 🔵 🔴

# 🚀 Penn Meal Swipe Share - QUICK START

## ⚡ Get Your Platform Running in Under 1 Hour!

---

## 📋 What You Have

All files needed for a complete meal swipe sharing platform:
- ✅ Beautiful website (index.html)
- ✅ Google Forms integration (script.js)
- ✅ Automated matching system (google-apps-script.js)
- ✅ Complete setup guides
- ✅ Marketing materials
- ✅ Email templates

---

## 🎯 3 Steps to Launch

### STEP 1: Create Google Forms (15 minutes)

1. **Go to forms.google.com**

2. **Create Form #1: "Offer Meal Swipes"**
   - Add these questions:
     * Penn Email (required, validate @upenn.edu)
     * Full Name
     * Year (Freshman/Sophomore)
     * School/Major
     * Swipes available per week
     * Preferred dining halls (checkboxes)
     * Availability (checkboxes)
     * About yourself (paragraph)
   - Click Send → Get embed URL (looks like: `https://docs.google.com/forms/d/e/...`)
   - Save this URL!

3. **Create Form #2: "Request Meals"**
   - Add same questions but:
     * Year: Junior/Senior/Grad Student
     * Meals needed per week
   - Click Send → Get embed URL
   - Save this URL!

4. **Link to Google Sheets**
   - In each form → Responses tab → Click green Sheets icon
   - This creates a spreadsheet that auto-fills

5. **Share the Spreadsheet**
   - Click "Share" → "Anyone with the link can view"
   - Copy the URL

✅ **You now have:**
- Form #1 URL for offering swipes
- Form #2 URL for requesting meals  
- Google Sheet URL with all responses

---

### STEP 2: Deploy Website (15 minutes)

**Option A: Netlify (Easiest!)**
1. Go to netlify.com
2. Sign up (free)
3. Drag and drop the `penn-meal-swipes` folder
4. Done! You get a URL like: `random-name.netlify.app`

**Option B: GitHub Pages**
1. Create account at github.com
2. New repository → name it "penn-meal-swipes"
3. Upload `index.html` and `script.js`
4. Settings → Pages → Deploy from main branch
5. Your URL: `yourusername.github.io/penn-meal-swipes`

---

### STEP 3: Connect Everything (5 minutes)

1. **Open `script.js`** in a text editor

2. **Update the CONFIG section:**
   ```javascript
   const CONFIG = {
       offerFormUrl: 'PASTE_OFFER_FORM_URL_HERE',
       requestFormUrl: 'PASTE_REQUEST_FORM_URL_HERE',
       spreadsheetUrl: 'PASTE_GOOGLE_SHEET_URL_HERE'
   };
   ```

3. **Re-upload to your host**
   - Netlify: Just drag the updated file
   - GitHub: Upload to replace old file

4. **Test it!**
   - Visit your website URL
   - Click each button
   - Make sure forms load

---

## 🎉 YOU'RE LIVE!

Your platform is now fully functional! Students can:
- Sign up through the website
- Get matched (manually by you, or automatically with Apps Script)
- Coordinate meals directly

---

## 🔥 Optional: Add Automated Matching (15 minutes)

Want the system to auto-match students and send emails?

1. **Open your Google Sheet**

2. **Go to Extensions → Apps Script**

3. **Delete existing code**

4. **Copy everything from `google-apps-script.js`**

5. **Paste it in Apps Script**

6. **Update CONFIG at top:**
   ```javascript
   const CONFIG = {
     senderEmail: "your-email@gmail.com",
     offersSheetName: "Form Responses 1",
     requestsSheetName: "Form Responses 2",
     matchesSheetName: "Matches"
   };
   ```

7. **Save (Ctrl+S)**

8. **Set up triggers:**
   - Click clock icon (Triggers)
   - Add trigger → onOfferSubmit → From spreadsheet → On form submit
   - Add trigger → onRequestSubmit → From spreadsheet → On form submit

9. **Authorize** when prompted

Now the system will:
- ✅ Send confirmation emails automatically
- ✅ Match students based on compatibility
- ✅ Send introduction emails to both parties
- ✅ Track all matches in your spreadsheet

---

## 📢 Promote Your Platform

### Day 1: Social Media
- Create Instagram: @pennmealswipes
- Post announcement (use content from `promotional-content.md`)
- Share in class GroupChats

### Day 2: Campus Outreach  
- Print flyers (templates in `promotional-content.md`)
- Post in dining halls
- Email student organizations

### Day 3: Word of Mouth
- Tell friends
- Post in Penn subreddit
- Share in Facebook groups

---

## 📊 Managing Matches

### Manual Matching (Simple)
1. Check both response sheets weekly
2. Look for compatible students (same availability, dining halls)
3. Send intro email (template in `EMAIL_TEMPLATES.md`)
4. Record match in "Matches" tab

### Automatic Matching (Advanced)
- If you set up Google Apps Script, this happens automatically!
- Check your "Matches" sheet to see who's been paired
- Monitor for any issues

---

## 🆘 Troubleshooting

**Forms not loading?**
- Check URLs in script.js are correct
- Make sure forms are set to "Anyone can respond"

**Sheet not opening?**
- Check sharing settings (Anyone with link can view)
- Verify URL in script.js

**Automated emails not sending?**
- Check Apps Script executions log for errors
- Verify email quota (100/day for free Gmail)
- Make sure triggers are set up

---

## 📁 File Reference

- `README.md` - Full project overview
- `SETUP_GUIDE.md` - Detailed setup instructions  
- `DEPLOYMENT.md` - Hosting options explained
- `google-apps-script.js` - Automated matching code
- `EMAIL_TEMPLATES.md` - Ready-to-use emails
- `promotional-content.md` - Marketing materials
- `index.html` - Your website
- `script.js` - Website functionality

---

## ✅ Launch Checklist

Before announcing to campus:

- [ ] Both Google Forms created and working
- [ ] Google Sheet linked to forms
- [ ] Website deployed and accessible
- [ ] Forms load correctly on website
- [ ] Test submission works end-to-end
- [ ] Mobile version looks good
- [ ] Social media account created
- [ ] First promotional post ready
- [ ] Support email set up (pennmealswipes@gmail.com)
- [ ] At least 5 friends signed up to test

---

## 🎯 Success Metrics

Track in your Google Sheet:
- Week 1: 20-50 sign-ups
- Month 1: 50-100 students, 20+ matches
- Semester: 200+ students, 100+ successful meals

---

## 💡 Pro Tips

1. **Start Small**: Get 10-20 users first, make sure it works
2. **Personal Touch**: Manually review first matches
3. **Gather Feedback**: Survey users after meals
4. **Share Stories**: Post success stories on Instagram
5. **Be Responsive**: Answer emails within 24 hours
6. **Update Often**: Keep availability fresh each semester

---

## 📞 Support Resources

**Documentation:**
- Full Setup: `SETUP_GUIDE.md`
- Deployment: `DEPLOYMENT.md`
- Marketing: `promotional-content.md`
- Emails: `EMAIL_TEMPLATES.md`

**External Help:**
- Google Forms: support.google.com/forms
- Google Sheets: support.google.com/sheets
- Apps Script: developers.google.com/apps-script
- Netlify: docs.netlify.com
- GitHub Pages: docs.github.com/pages

---

## 🚀 Ready to Launch?

1. ✅ Set up Google Forms (15 min)
2. ✅ Deploy website (15 min)
3. ✅ Connect everything (5 min)
4. ✅ Test thoroughly (10 min)
5. ✅ Announce to campus (5 min)

**Total time: Under 1 hour to a working platform!**

---

## 🎊 What's Next?

After launch:
- Week 1: Monitor closely, fix any issues
- Week 2: Gather feedback, make improvements
- Week 3: Scale up promotion
- Month 2: Add features based on user requests

---

**You've got this! Let's build community at Penn, one meal at a time! 🔴🔵**

Questions? Check the detailed docs or email [your-email]

Good luck! 🚀

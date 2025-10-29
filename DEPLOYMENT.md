# 🚀 Quick Deployment Guide

## Overview
Your Penn Meal Swipe Share website needs to be hosted online so students can access it. Here are the easiest ways to deploy it for FREE.

---

## Option 1: GitHub Pages (Recommended for Beginners)

### Step-by-Step:

1. **Create a GitHub Account**
   - Go to github.com
   - Sign up (it's free!)

2. **Create a New Repository**
   - Click the "+" in the top right → "New repository"
   - Name it: `penn-meal-swipes`
   - Make it Public
   - Click "Create repository"

3. **Upload Your Files**
   - Click "uploading an existing file"
   - Drag and drop:
     - `index.html`
     - `script.js`
   - Click "Commit changes"

4. **Enable GitHub Pages**
   - Go to Settings (in your repository)
   - Click "Pages" in the left sidebar
   - Under "Source", select "main" branch
   - Click "Save"

5. **Get Your URL**
   - Wait 1-2 minutes
   - Your site will be live at: `https://yourusername.github.io/penn-meal-swipes`

### Updating Your Site:
- Just upload new files to replace old ones
- Changes appear within 1-2 minutes

---

## Option 2: Netlify (Easiest!)

### Step-by-Step:

1. **Go to Netlify**
   - Visit netlify.com
   - Sign up (free account)

2. **Deploy Your Site**
   - Click "Add new site" → "Deploy manually"
   - Drag your entire project folder
   - Wait 30 seconds

3. **Your Site is Live!**
   - You'll get a URL like: `random-name-123.netlify.app`
   - You can change this in Site settings → Site details → Change site name

4. **Custom Domain (Optional)**
   - Site settings → Domain management
   - Add your own domain like `pennmealswipes.com`

### Updating Your Site:
- Drag and drop new files to replace
- Changes are instant!

---

## Option 3: Vercel

### Step-by-Step:

1. **Create Account**
   - Go to vercel.com
   - Sign up with GitHub (easiest)

2. **Import Project**
   - Click "Add New" → "Project"
   - Connect your GitHub repository
   - Click "Deploy"

3. **Done!**
   - Your site is live instantly
   - URL: `penn-meal-swipes.vercel.app`

---

## Option 4: Penn Student Web Hosting

### Check if Penn Offers Hosting:

1. **Contact Penn IT**
   - Ask if students get free web hosting
   - Some universities offer `www.upenn.edu/~yourusername`

2. **Upload via FTP**
   - Use FileZilla or similar FTP client
   - Upload `index.html` and `script.js`

3. **Access Your Site**
   - Usually at: `www.upenn.edu/~yourusername/penn-meal-swipes`

---

## After Deployment

### 1. Update Your Website URLs

In `script.js`, update the CONFIG section:
```javascript
const CONFIG = {
    offerFormUrl: 'YOUR_GOOGLE_FORM_OFFER_URL',
    requestFormUrl: 'YOUR_GOOGLE_FORM_REQUEST_URL',
    spreadsheetUrl: 'YOUR_GOOGLE_SHEET_URL'
};
```

### 2. Test Everything

- [ ] Open your website URL
- [ ] Click "Offer Meal Swipes" → Does the form load?
- [ ] Click "Request a Meal" → Does the form load?
- [ ] Click "View All Offers & Requests" → Does the sheet open?
- [ ] Test on mobile phone
- [ ] Submit a test form

### 3. Share Your Link!

Once everything works:
- Add link to Instagram bio
- Share in class GroupChats
- Post on Penn Reddit/Facebook
- Email student organizations

---

## Troubleshooting

### Forms Not Loading?
- Make sure URLs in `script.js` are correct
- Check that forms are set to "Anyone with the link can respond"
- Try the form URLs directly in a browser

### Sheet Not Opening?
- Check sharing settings (should be "Anyone with the link can view")
- Make sure the URL is correct in `script.js`

### Website Looks Broken?
- Make sure BOTH `index.html` and `script.js` are uploaded
- Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser console for errors (F12)

### Changes Not Showing?
- GitHub Pages: Wait 1-2 minutes
- Netlify/Vercel: Should be instant
- Try hard refresh (Ctrl+Shift+R)

---

## Custom Domain (Optional)

Want `pennmealswipes.com` instead of a random URL?

### 1. Buy a Domain
- Namecheap.com (~$10/year for .com)
- Google Domains (~$12/year)
- Choose: `pennmealswipes.com`

### 2. Connect to Your Host

**For GitHub Pages:**
- Add a file named `CNAME` with your domain
- Update DNS records at your domain registrar

**For Netlify/Vercel:**
- Go to domain settings
- Follow their setup wizard (super easy!)
- They'll give you DNS records to add

### 3. Wait
- DNS changes take 1-48 hours
- Usually works within 1 hour

---

## Security & Privacy

### SSL Certificate (HTTPS)
All these platforms give you FREE SSL:
- GitHub Pages: Automatic
- Netlify: Automatic
- Vercel: Automatic

Your site will be `https://` (secure) automatically!

### Google Forms Security
- Require Penn email addresses
- Set to "1 response per person"
- Don't share edit links publicly

---

## Maintenance

### Weekly Tasks:
- Check for new form submissions
- Review matches
- Respond to emails

### Monthly Tasks:
- Update promotional materials
- Share statistics
- Clean up old data

### When Classes Change:
- Promote at start of semester
- Update for new freshmen
- Archive old data

---

## Need Help?

### During Setup:
- GitHub Pages: docs.github.com/pages
- Netlify: docs.netlify.com
- Vercel: vercel.com/docs

### For This Project:
- Check README.md
- Review SETUP_GUIDE.md
- Email: [your-support-email]

---

## 🎉 Launch Checklist

Before you announce to campus:

- [ ] Website is live and working
- [ ] Both forms are functional
- [ ] Google Sheet is viewable
- [ ] Test submission works end-to-end
- [ ] Mobile version looks good
- [ ] SSL certificate is active (https://)
- [ ] Updated all links in promotional materials
- [ ] Created social media accounts
- [ ] Designed flyers
- [ ] Contacted student organizations
- [ ] Set up support email
- [ ] Tested email notifications (if using Apps Script)

**When all boxes are checked, you're ready to launch! 🚀**

---

## Estimated Time

- Deployment: 15-30 minutes
- Testing: 15 minutes
- Going live: Immediate!

**Total: Under 1 hour from files to live website**

---

Good luck with your launch! 🔴🔵

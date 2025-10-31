# 🚀 Quick Start Guide

Get your birthday invitation website up and running in 15 minutes!

## 📦 What You Have

Your complete birthday invitation website is ready! Here's what's included:

### Core Files
- ✅ `index.html` - Main website with RSVP form
- ✅ `styles.css` - Beautiful pink/blue themes with animations
- ✅ `script.js` - Interactive functionality and form handling
- ✅ `config.js` - Easy configuration for party details

### Images
- ✅ `images/jenna-avatar.png` - Placeholder (replace with real photo)
- ✅ `images/charlie-avatar.png` - Placeholder (replace with real photo)

### Documentation
- ✅ `README.md` - Complete documentation
- ✅ `GOOGLE_SHEETS_SETUP.md` - Step-by-step Google Sheets guide
- ✅ `IMAGE_PREPARATION_GUIDE.md` - How to prepare avatar photos

### Deployment Config
- ✅ `vercel.json` - For Vercel deployment
- ✅ `_redirects` - For Netlify deployment
- ✅ `.gitignore` - Git configuration

## ⚡ 3-Step Setup (15 minutes)

### Step 1: Update Party Details (2 minutes)

Open `config.js` and change:

```javascript
partyDate: '2025-12-15',              // Your party date
partyTime: '2:00 PM - 5:00 PM',       // Your party time
partyLocation: '123 Party Street...',  // Your venue address
```

### Step 2: Replace Avatar Photos (5 minutes)

1. Follow the [IMAGE_PREPARATION_GUIDE.md](IMAGE_PREPARATION_GUIDE.md)
2. Create circular 200x200px images of Jenna and Charlie
3. Save as `images/jenna-avatar.png` and `images/charlie-avatar.png`

**Quick method**: Use [remove.bg](https://remove.bg) + [crop-circle.imageonline.co](https://crop-circle.imageonline.co/)

### Step 3: Set Up Google Sheets (8 minutes)

Follow the [GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md) guide to:
1. Create a Google Sheet for RSVPs
2. Set up Google Apps Script
3. Get your deployment URL
4. Add URL to `config.js`

## 🌐 Deploy Your Website (5 minutes)

### Option A: Vercel (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Sign up (free)
3. Drag and drop your `birthday_invite` folder
4. Done! Your site is live at `https://your-name.vercel.app`

### Option B: Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up (free)
3. Drag and drop your folder
4. Done! Your site is live at `https://your-name.netlify.app`

## 📤 Share Invitations

Once deployed, share these links:

- **Jenna's friends**: `https://your-site.com/jenna`
- **Charlie's friends**: `https://your-site.com/charlie`
- **Mutual friends**: `https://your-site.com/jenna&charlie`

## ✅ Test Checklist

Before sharing, test:

- [ ] Visit all three URLs (/jenna, /charlie, /jenna&charlie)
- [ ] Verify correct titles appear for each
- [ ] Check avatars display correctly
- [ ] Submit a test RSVP
- [ ] Confirm RSVP appears in Google Sheet
- [ ] Test on mobile phone
- [ ] Check party details are correct

## 🎨 What Each Route Shows

### `/jenna` - Pink Theme
- Title: "Jenna's 1st Birthday Party!"
- Background: Pink gradient
- Avatar: Jenna's photo floating
- Button: Pink

### `/charlie` - Blue Theme
- Title: "Charlie's 1st Birthday Party!"
- Background: Blue gradient
- Avatar: Charlie's photo floating
- Button: Blue

### `/jenna&charlie` - Dual Theme
- Title: "Jenna & Charlie's 1st Birthday Party!"
- Background: Pink-to-blue gradient
- Avatars: Both photos floating
- Button: Pink-to-blue gradient

## 📊 View RSVPs

All responses automatically save to your Google Sheet with:
- Timestamp
- Guest name
- Email
- Attending (Yes/No)
- Number of guests
- Dietary restrictions
- Which page they used (jenna/charlie/both)

## 🆘 Need Help?

1. **Can't see avatars?** → Check [IMAGE_PREPARATION_GUIDE.md](IMAGE_PREPARATION_GUIDE.md)
2. **RSVPs not saving?** → Check [GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md)
3. **General questions?** → See [README.md](README.md)

## 🎯 Next Steps

1. ✅ Complete the 3-step setup above
2. ✅ Deploy to Vercel or Netlify
3. ✅ Test all three invitation links
4. ✅ Submit a test RSVP
5. ✅ Share links with your guests!

## 💡 Pro Tips

- **QR Codes**: Create QR codes for each link to add to physical invitations
- **Short URLs**: Use bit.ly or tinyurl to create memorable links
- **Track Responses**: The "Page" column in Google Sheets shows which invitation each guest used
- **Mobile First**: Most guests will view on phones - it's fully responsive!

---

🎉 You're all set! Have an amazing birthday party! 🎂✨


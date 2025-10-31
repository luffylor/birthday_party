# 📸 Avatar Image Preparation Guide

This guide will help you create perfect circular avatar images for Jenna and Charlie's birthday invitation website.

## Quick Overview

You need to create two circular images:
- **Size**: 200x200 pixels (minimum)
- **Format**: PNG with transparency
- **Shape**: Perfect circle
- **Files**: `jenna-avatar.png` and `charlie-avatar.png`

## Method 1: Free Online Tools (Easiest - No Software Required)

### Step-by-Step Process

#### 1. Remove Background (Optional but Recommended)

**Tool**: [remove.bg](https://www.remove.bg/)

1. Go to https://www.remove.bg/
2. Click **Upload Image** and select Jenna's or Charlie's photo
3. Wait 5 seconds for automatic background removal
4. Click **Download** (free for personal use)
5. Save the file as `photo-no-bg.png`

**Why?** A transparent background looks much better when the avatar floats!

**Alternative Tools**:
- [Adobe Express Background Remover](https://www.adobe.com/express/feature/image/remove-background) - Free, no signup
- [Pixlr Remove BG](https://pixlr.com/remove-background/) - Free online

#### 2. Create Circular Crop

**Tool**: [Crop Circle](https://crop-circle.imageonline.co/)

1. Go to https://crop-circle.imageonline.co/
2. Click **Choose File** and upload your image
3. Adjust the circle position if needed
4. Click **CROP CIRCLE**
5. Download the result
6. Rename to `jenna-avatar.png` or `charlie-avatar.png`

**Alternative Tools**:
- [iloveimg Circle Crop](https://www.iloveimg.com/crop-image/crop-circle)
- [Canva](https://www.canva.com/) - Create 200x200 design, upload image, use circle frame

#### 3. Resize (If Needed)

**Tool**: [Simple Image Resizer](https://www.simpleimageresizer.com/)

1. Go to https://www.simpleimageresizer.com/
2. Upload your circular image
3. Set width: 200 pixels
4. Set height: 200 pixels
5. Click **Resize Image**
6. Download the resized version

**Why resize?** Smaller files = faster website loading!

#### 4. Save to Project

1. Place the files in your project's `images/` folder
2. Make sure they're named exactly:
   - `jenna-avatar.png`
   - `charlie-avatar.png`

## Method 2: Using Your Phone

### iPhone (iOS)

1. **Markup Tool**:
   - Open the photo in Photos app
   - Tap **Edit** → **⋯** (three dots) → **Markup**
   - Use the cropping tool to center the face
   - Save the cropped photo
   - Use one of the online tools above to make it circular

2. **Using Shortcuts App**:
   - Search App Store for "Photo to Circle" shortcuts
   - Many free shortcuts available
   - Follow the shortcut instructions

### Android

1. **Google Photos**:
   - Open photo
   - Tap **Edit** → **Crop**
   - Select square crop (1:1)
   - Center the face
   - Save
   - Use online tools to make circular

2. **Photo Editor Apps**:
   - **PicsArt** (Free): Has circle crop tool
   - **Photo Editor Pro** (Free): Has shape masks
   - **Background Eraser** (Free): For removing background

## Method 3: Using Desktop Software

### Photoshop

1. Open your image
2. Select **Ellipse Marquee Tool** (shortcut: M)
3. Hold **Shift** to make a perfect circle
4. Draw selection around the face
5. **Select** → **Inverse** (Ctrl/Cmd + Shift + I)
6. Press **Delete** to remove background
7. **Image** → **Trim** to remove excess space
8. **Image** → **Image Size** → Set to 200x200 pixels
9. **File** → **Export** → **Export As** → PNG
10. Save as `jenna-avatar.png` or `charlie-avatar.png`

### GIMP (Free Photoshop Alternative)

1. Download GIMP from https://www.gimp.org/
2. Open your image
3. Right-click layer → **Add Alpha Channel**
4. Select **Ellipse Select Tool** (shortcut: E)
5. Hold **Shift** while dragging to make perfect circle
6. **Select** → **Invert**
7. Press **Delete**
8. **Image** → **Crop to Selection**
9. **Image** → **Scale Image** → 200x200 pixels
10. **File** → **Export As** → Choose PNG format

### Canva (Free, Online)

1. Go to https://www.canva.com/
2. Create custom size: 200x200 pixels
3. Click **Elements** → Search "circle frame"
4. Drag a circle frame onto canvas
5. Click **Uploads** → Upload your photo
6. Drag photo into the circle frame
7. Adjust position and zoom
8. **Download** → PNG format

## Method 4: Using Preview (Mac Only)

1. Open image in **Preview**
2. Click **Show Markup Toolbar** (toolbox icon)
3. Hold **Shift** and drag to select circular area
4. **Tools** → **Crop**
5. **File** → **Export** → PNG format
6. Use online circle crop tool for perfect circle

## Photo Tips for Best Results

### 1. Choose the Right Photo

✅ **Good photos**:
- Clear, well-lit face
- Subject centered
- Minimal background clutter
- High resolution
- Smiling or happy expression

❌ **Avoid**:
- Blurry or dark photos
- Subject at edge of frame
- Low resolution/pixelated
- Too much background detail

### 2. Face Positioning

- The face should be centered in the circular crop
- Leave a little space around the head
- Eyes should be in the upper third of the circle
- Avoid cutting off the top of the head

### 3. Photo Quality

- **Minimum resolution**: 400x400 pixels (will resize to 200x200)
- **Ideal resolution**: 800x800 pixels or higher
- **Format**: JPG or PNG (will be converted to PNG)

## Troubleshooting

### Image Looks Pixelated or Blurry

**Problem**: Original photo was too small
**Solution**: Use a higher resolution source photo (at least 400x400px)

### Background Shows Through

**Problem**: PNG transparency not preserved
**Solution**: 
- Make sure you download as PNG (not JPG)
- Use remove.bg before cropping
- Check "transparent background" option when exporting

### Image Appears Squashed or Stretched

**Problem**: Original photo wasn't square
**Solution**:
- Crop to square (1:1 ratio) before making circular
- Center the important part (face) in the square crop

### File Size Too Large

**Problem**: High-resolution image creating large file
**Solution**:
- Resize to exactly 200x200 pixels
- Use online image compressor: [TinyPNG](https://tinypng.com/)
- Should be under 100KB per image

### Wrong File Name

**Problem**: Website can't find the image
**Solution**: 
- Must be exactly `jenna-avatar.png` or `charlie-avatar.png`
- Lowercase only
- Check spelling
- Must be in `images/` folder

## Quick Reference Checklist

Before using your images, verify:

- [ ] Image is circular (not square)
- [ ] Size is 200x200 pixels (or larger, will scale down)
- [ ] Format is PNG
- [ ] Background is transparent (optional but better)
- [ ] Face is centered and clearly visible
- [ ] File is named correctly: `jenna-avatar.png` or `charlie-avatar.png`
- [ ] File is in the `images/` folder
- [ ] File size is reasonable (under 200KB)

## Advanced: Batch Processing (Multiple Photos)

If you want to create multiple versions or test different photos:

### Using Photoshop Actions
1. Record an action while processing one image
2. Apply to multiple images via Batch Processing

### Using Online Batch Tools
- [Bulk Image Resizer](https://bulkresizephotos.com/)
- [ILoveIMG Batch](https://www.iloveimg.com/crop-image)

## Example Workflow (Recommended)

For best results, follow this complete workflow:

1. **Choose photo** (high resolution, clear face) → 2 minutes
2. **Remove background** at remove.bg → 1 minute
3. **Create circle crop** at crop-circle.imageonline.co → 1 minute
4. **Resize to 200x200** at simpleimageresizer.com → 1 minute
5. **Save with correct name** in `images/` folder → 1 minute

**Total time**: ~6 minutes per photo

## Need Help?

Common issues and solutions:

1. **"I don't have good photos"**: Use recent phone photos, birthday photos, or professional photos
2. **"Tools aren't working"**: Try alternative tools listed above
3. **"Images look bad on website"**: Start with higher resolution source photos
4. **"Can't find the images folder"**: It's in the same folder as `index.html`

---

Happy photo editing! Your avatars will look amazing floating on the invitation website! 🎈✨


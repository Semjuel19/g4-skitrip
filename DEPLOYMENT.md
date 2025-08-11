# G4 Skitrip - Deployment Guide

## 📦 Minified Production Build

Your project has been successfully minified and optimized for production deployment.

### 🎯 Compression Results

- **CSS**: 15.50KB → 10.46KB (32.5% reduction)
- **JavaScript**: 10.68KB → 5.26KB (50.8% reduction)  
- **HTML**: 13.75KB → 8.28KB (39.8% reduction)

### 📁 Deployment Package

**File**: `g4-skitrip-deployment.zip` (9.3MB)

This zip file contains everything needed for deployment:

```
dist/
├── index.html          (minified)
├── styles.css          (minified)
├── script.js           (minified)
└── assets/
    ├── bg_1.jpg
    ├── G4_biele-logo-biele.png
    ├── nav-bar-scroll.png
    ├── nav-bar-top.png
    ├── gallery/
    │   └── [14 gallery images - Lyžovačka 2025]
    └── gallery_2/
        └── [18 gallery images - Lyžovačka 2024]
```

### 🚀 Deployment Instructions

1. **Extract the zip file** on your web server
2. **Point your web server** to the `dist/` folder as the document root
3. **Ensure proper MIME types** are configured for:
   - `.html` → `text/html`
   - `.css` → `text/css`
   - `.js` → `application/javascript`
   - `.jpg/.jpeg` → `image/jpeg`
   - `.png` → `image/png`

### 🔧 Build Commands

For future updates, use these commands:

```bash
# Install dependencies (first time only)
npm install

# Build minified version
npm run build

# Clean build (removes old dist folder first)
npm run build:clean

# Create deployment package (includes clean build)
npm run package

# Clean up build files
npm run clean
```

### 🌐 Production Features

- ✅ Minified HTML, CSS, and JavaScript
- ✅ Optimized file sizes for faster loading
- ✅ All assets included and organized
- ✅ Form integration with Formspree
- ✅ Responsive design for all devices
- ✅ Dual gallery system (2024 & 2025) with modal functionality
- ✅ Clickable G4 logo linking to https://g4.sk
- ✅ Smooth scrolling and animations

### 📸 Gallery Structure

The site now includes two separate photo galleries:

- **Lyžovačka 2025**: 14 photos from `assets/gallery/`
- **Lyžovačka 2024**: 17 photos from `assets/gallery_2/`

Each gallery displays as a card with a 2x2 mosaic preview. Clicking opens a full-screen lightbox with navigation controls, keyboard shortcuts, and mobile swipe support.

### 📋 Deployment Checklist

- [ ] Upload `dist/` folder contents to web server
- [ ] Test form submission with Formspree
- [ ] Verify all images load correctly
- [ ] Test responsive design on mobile devices
- [ ] Check gallery modal functionality
- [ ] Confirm success page redirect works

### 🔗 Live URL Configuration

Make sure to update the Formspree redirect URL to match your production domain:
- Current: `https://semjuel19.github.io/g4-skitrip?success=true`
- Update to: `https://your-domain.com?success=true`

---

**Ready for deployment!** 🎉
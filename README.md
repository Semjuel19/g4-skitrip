# G4 Skitrip 2026 - Investor Retreat Landing Page

A multilingual landing page for G4 Investments' exclusive ski retreat event in Schladming-Planai, January 22-25, 2026.

## Features

- **Multilingual Support**: Slovak, English, and German with flag-based language selector
- **Responsive Design**: Mobile-first approach with glassmorphism effects
- **Contact Form**: Integrated with Formspree for email submissions
- **Modern UI**: Dark theme with G4 branding and ski-themed animations
- **Accessibility**: Semantic HTML and proper ARIA attributes

## File Structure

```
skitrip/
├── index.html          # Main HTML file
├── styles.css          # CSS styles with responsive design
├── script.js           # JavaScript for language switching and form handling
├── assets/
│   ├── G4_biele-logo-biele.png  # G4 logo
│   └── bg_1.jpg        # Background image
└── README.md           # This file
```

## Setup Instructions

### 1. Formspree Configuration

The contact form is configured to use Formspree. To set up:

1. Go to [formspree.io](https://formspree.io)
2. Create an account and verify your email
3. The form is already configured to send to `skitrip@g4.sk`
4. Formspree will send a verification email to this address

### 2. Local Development

To test locally:

```bash
# Navigate to project directory
cd skitrip

# Start a local server (Python 3)
python3 -m http.server 8000

# Or use Node.js
npx serve .

# Open in browser
open http://localhost:8000
```

### 3. GitHub Pages Deployment

1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to Settings > Pages
4. Select "Deploy from a branch" and choose "main"
5. Your site will be available at `https://username.github.io/repository-name`

### 4. Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file with your domain name
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings to use the custom domain

## Languages

The site supports three languages with complete translations:

- **Slovak (SK)** - Default language
- **English (EN)** - Full translation
- **German (DE)** - Full translation

Language preference is saved in localStorage and persists across sessions.

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contact

For questions about the event: [skitrip@g4.sk](mailto:skitrip@g4.sk)

## License

© 2025 G4 Investments. All rights reserved.
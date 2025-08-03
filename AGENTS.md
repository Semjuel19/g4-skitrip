# AGENTS.md - Development Guide for Agentic Coding Agents

## Project Type
Static HTML/CSS/JS website for G4 Investments ski trip event landing page. No build system or package manager.

## Commands
- **No build/lint/test commands** - Pure HTML/CSS/JS project
- **Testing**: Open `index.html` in browser for manual testing
- **Deployment**: Static files ready for GitHub Pages or any web server

## Code Style Guidelines

### HTML
- Use semantic HTML5 elements with 4-space indentation
- Include `data-translate` attributes for multilingual content (sk/en/de)
- Use proper accessibility attributes (alt, aria-labels)
- Form actions use Formspree.io with hidden fields for configuration

### CSS
- Use CSS custom properties and modern features (Grid, Flexbox, backdrop-filter)
- Follow BEM-like naming conventions (.detail-item, .nav-container)
- Mobile-first responsive design with breakpoints: 768px, 480px
- Dark theme with glassmorphism effects (rgba backgrounds with backdrop-filter)
- Consistent spacing scale and Inter font family

### JavaScript
- Use modern ES6+ syntax with const/let, arrow functions
- camelCase naming (currentLanguage, switchLanguage)
- Add event listeners after DOMContentLoaded
- Implement proper error handling and form validation
- Use localStorage for language persistence
- Intersection Observer for scroll-based navigation updates

### Design System
- Dark theme with G4 branding colors (#4a9eff primary)
- Ski-themed icons (🎿, ⛷️, 🏔️) and bounce animations
- Glassmorphism cards with rgba(255,255,255,0.1) backgrounds
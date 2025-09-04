# Contributing to tanyanxi.github.io

Thank you for your interest in contributing to this project! This guide will help you get started and ensure your contributions align with the project's standards and goals.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Workflow](#contributing-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Community](#community)

## 📜 Code of Conduct

This project adheres to a Code of Conduct that we expect all contributors to follow. Please read and follow these guidelines to ensure a welcoming environment for everyone.

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behaviors include:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behaviors include:**
- Use of sexualized language or imagery
- Personal attacks or insulting/derogatory comments
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Git**: Version control system
- **Node.js**: (if adding JavaScript functionality) Version 16.x or higher
- **Text Editor**: VS Code, Vim, or your preferred editor
- **Modern Browser**: For testing changes

### First Contribution

1. **Look for good first issues**: Check issues labeled `good first issue` or `help wanted`
2. **Read the documentation**: Familiarize yourself with the project structure
3. **Start small**: Begin with documentation improvements or small bug fixes
4. **Ask questions**: Don't hesitate to ask for clarification in issues or discussions

## 💻 Development Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/tanyanxi.github.io.git
cd tanyanxi.github.io

# Add the original repository as upstream
git remote add upstream https://github.com/tanyanxi/tanyanxi.github.io.git
```

### 2. Local Development

```bash
# For simple HTML/CSS/JS changes, you can open files directly
# or use a local server for better development experience

# Option 1: Simple file opening
open index.html

# Option 2: Python server (if you have Python installed)
python -m http.server 8000

# Option 3: Node.js server (if you have Node.js installed)
npx http-server -p 8000

# Option 4: VS Code Live Server extension
# Install the Live Server extension and right-click on index.html
```

### 3. Environment Setup

If the project evolves to include build tools:

```bash
# Install dependencies (future implementation)
npm install

# Start development server (future implementation)
npm run dev

# Run tests (future implementation)
npm test

# Build for production (future implementation)
npm run build
```

## 🔄 Contributing Workflow

### 1. Create a Branch

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create a new branch for your feature/fix
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
```

### Branch Naming Conventions

- `feature/feature-name`: New features
- `fix/issue-description`: Bug fixes
- `docs/update-description`: Documentation updates
- `style/component-name`: Style/CSS changes
- `refactor/component-name`: Code refactoring
- `test/test-description`: Test additions/updates

### 2. Make Changes

- Write clean, readable code
- Follow the project's coding standards
- Add appropriate comments
- Update documentation if needed
- Test your changes thoroughly

### 3. Commit Changes

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add responsive navigation menu

- Implement mobile-friendly hamburger menu
- Add smooth transitions and animations
- Ensure accessibility with ARIA labels
- Test across different screen sizes

Closes #123"
```

### Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat: add dark mode toggle
fix: resolve mobile navigation overflow issue
docs: update API documentation with new endpoints
style: improve button hover animations
refactor: optimize image loading performance
test: add unit tests for contact form validation
chore: update dependencies to latest versions
```

### 4. Push Changes

```bash
# Push your branch to your fork
git push origin feature/your-feature-name
```

## 📏 Coding Standards

### HTML Guidelines

```html
<!-- Use semantic HTML5 elements -->
<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/" aria-current="page">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>

<!-- Include proper meta tags -->
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Page description">
  <title>Page Title</title>
</head>

<!-- Use ARIA attributes for accessibility -->
<button aria-label="Close modal" aria-expanded="false">
  <span aria-hidden="true">&times;</span>
</button>
```

### CSS Guidelines

```css
/* Use BEM methodology for class naming */
.header {}
.header__logo {}
.header__nav {}
.header__nav-item {}
.header__nav-item--active {}

/* Use CSS custom properties for theming */
:root {
  --color-primary: #3b82f6;
  --color-secondary: #6b7280;
  --font-family: 'Inter', sans-serif;
  --border-radius: 0.375rem;
}

/* Mobile-first responsive design */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 0 2rem;
  }
}

/* Use logical properties when appropriate */
.card {
  margin-block: 1rem;
  padding-inline: 1.5rem;
}
```

### JavaScript Guidelines

```javascript
// Use modern ES6+ syntax
const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
};

// Use descriptive variable names
const isUserAuthenticated = checkAuthStatus();
const userProfileData = await fetchUserData(userId);

// Add JSDoc comments for functions
/**
 * Validates an email address format
 * @param {string} email - The email address to validate
 * @returns {boolean} True if email is valid, false otherwise
 */
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Use event delegation for better performance
document.addEventListener('click', (event) => {
  if (event.target.matches('.btn--primary')) {
    handlePrimaryButtonClick(event);
  }
});
```

### Accessibility Standards

- **Semantic HTML**: Use appropriate HTML elements
- **ARIA attributes**: Add labels, roles, and states
- **Keyboard navigation**: Ensure all interactive elements are keyboard accessible
- **Color contrast**: Maintain WCAG AA compliance (4.5:1 ratio)
- **Focus management**: Visible focus indicators
- **Screen reader support**: Test with screen readers

```html
<!-- Good accessibility example -->
<form role="form" aria-labelledby="contact-title">
  <h2 id="contact-title">Contact Form</h2>
  
  <label for="name">Name (required)</label>
  <input 
    type="text" 
    id="name" 
    name="name" 
    required 
    aria-describedby="name-error"
    aria-invalid="false"
  >
  <div id="name-error" class="error-message" aria-live="polite"></div>
  
  <button type="submit" aria-describedby="submit-help">
    Send Message
  </button>
  <div id="submit-help" class="help-text">
    Your message will be sent to our support team
  </div>
</form>
```

## 🧪 Testing Guidelines

### Manual Testing Checklist

Before submitting a PR, ensure:

- [ ] **Cross-browser compatibility**: Test in Chrome, Firefox, Safari, Edge
- [ ] **Responsive design**: Test on mobile, tablet, and desktop
- [ ] **Accessibility**: Test with keyboard navigation and screen readers
- [ ] **Performance**: Check loading times and smooth animations
- [ ] **Links and forms**: Verify all interactive elements work correctly

### Browser Testing

| Browser | Version | Priority |
|---------|---------|----------|
| Chrome | Latest 2 | High |
| Firefox | Latest 2 | High |
| Safari | Latest 2 | High |
| Edge | Latest 2 | Medium |
| iOS Safari | Latest | High |
| Chrome Mobile | Latest | High |

### Performance Testing

```bash
# Use Lighthouse for performance auditing
npx lighthouse https://tanyanxi.github.io --view

# Check Core Web Vitals
# - Largest Contentful Paint (LCP): < 2.5s
# - First Input Delay (FID): < 100ms
# - Cumulative Layout Shift (CLS): < 0.1
```

### Accessibility Testing

```bash
# Use axe-core for accessibility testing
npm install -g @axe-core/cli
axe https://tanyanxi.github.io

# Manual testing checklist:
# - Tab through all interactive elements
# - Test with screen reader (NVDA, JAWS, VoiceOver)
# - Verify color contrast ratios
# - Check focus indicators
```

## 📚 Documentation

### Documentation Requirements

- **Code comments**: Explain complex logic and algorithms
- **README updates**: Update if adding new features or changing setup
- **API documentation**: Document any new APIs or functions
- **Component documentation**: Document new UI components
- **Examples**: Provide usage examples for new features

### Documentation Style

```javascript
/**
 * Calculates the total price including tax
 * 
 * @param {number} basePrice - The base price before tax
 * @param {number} taxRate - The tax rate as a decimal (e.g., 0.08 for 8%)
 * @returns {number} The total price including tax
 * 
 * @example
 * const total = calculateTotalPrice(100, 0.08);
 * console.log(total); // 108
 */
const calculateTotalPrice = (basePrice, taxRate) => {
  return basePrice * (1 + taxRate);
};
```

## 🔍 Pull Request Process

### Before Submitting

1. **Self-review**: Review your own changes first
2. **Test thoroughly**: Run all tests and manual testing
3. **Update documentation**: Ensure docs are up to date
4. **Rebase if needed**: Keep commit history clean

```bash
# Rebase your branch on the latest main
git fetch upstream
git rebase upstream/main
```

### PR Title and Description

**Title Format:**
```
<type>: brief description of changes
```

**Description Template:**
```markdown
## Description
Brief description of what this PR does.

## Changes Made
- [ ] Added responsive navigation menu
- [ ] Implemented dark mode toggle
- [ ] Updated documentation

## Testing
- [ ] Tested on Chrome, Firefox, Safari
- [ ] Verified responsive design on mobile/tablet
- [ ] Checked accessibility with keyboard navigation
- [ ] Validated HTML and CSS

## Screenshots
[Add screenshots for UI changes]

## Related Issues
Closes #123
Relates to #456

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests pass
- [ ] No breaking changes (or breaking changes documented)
```

### Review Process

1. **Automated checks**: Ensure all CI checks pass
2. **Code review**: Address reviewer feedback promptly
3. **Testing**: Reviewers will test functionality
4. **Documentation review**: Ensure docs are accurate
5. **Final approval**: Maintainer approval required for merge

### After PR is Merged

```bash
# Update your local main branch
git checkout main
git pull upstream main

# Delete the feature branch
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

## 🐛 Issue Guidelines

### Before Creating an Issue

1. **Search existing issues**: Check if the issue already exists
2. **Check documentation**: Ensure it's not a documentation issue
3. **Reproduce the bug**: Provide clear reproduction steps
4. **Check browser compatibility**: Test in multiple browsers

### Issue Templates

#### Bug Report

```markdown
**Bug Description**
A clear description of what the bug is.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g., macOS, Windows, Linux]
- Browser: [e.g., Chrome 96, Firefox 94]
- Device: [e.g., iPhone 12, Desktop]
- Screen size: [e.g., 1920x1080, 375x667]

**Additional Context**
Any other context about the problem.
```

#### Feature Request

```markdown
**Feature Description**
A clear description of what you want to happen.

**Problem Statement**
What problem does this feature solve?

**Proposed Solution**
Describe the solution you'd like.

**Alternatives Considered**
Describe alternatives you've considered.

**Additional Context**
Any other context or screenshots about the feature request.
```

## 🎯 Project Goals and Roadmap

### Current Focus

- **Performance**: Fast loading and smooth interactions
- **Accessibility**: WCAG AA compliance
- **Mobile-first**: Responsive design for all devices
- **SEO**: Search engine optimization
- **User Experience**: Intuitive and engaging interface

### Future Roadmap

- [ ] **Interactive Portfolio**: Dynamic project showcases
- [ ] **Blog System**: Content management and publishing
- [ ] **Contact Integration**: Form handling and email notifications
- [ ] **Analytics**: User behavior tracking and insights
- [ ] **Progressive Web App**: Offline functionality and app-like experience

## 🤝 Community

### Getting Help

- **GitHub Discussions**: For general questions and ideas
- **GitHub Issues**: For bug reports and feature requests
- **Email**: Direct contact for sensitive matters

### Recognition

Contributors will be recognized in:
- **README.md**: Contributors section
- **Changelog**: Feature and fix attributions
- **GitHub**: Contributor graphs and statistics

### Mentorship

New contributors can request mentorship for:
- First-time contributions
- Complex feature development
- Best practices guidance
- Career development advice

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

Thank you for contributing to tanyanxi.github.io! Your efforts help make this project better for everyone. 🚀
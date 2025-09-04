# Component Documentation

This document provides comprehensive documentation for all reusable components in the tanyanxi.github.io project.

## 📋 Table of Contents

- [Overview](#overview)
- [Component Architecture](#component-architecture)
- [Component Guidelines](#component-guidelines)
- [Base Components](#base-components)
- [Layout Components](#layout-components)
- [UI Components](#ui-components)
- [Form Components](#form-components)
- [Navigation Components](#navigation-components)
- [Content Components](#content-components)
- [Utility Components](#utility-components)
- [Testing](#testing)
- [Performance](#performance)

## 🔍 Overview

Currently, this project is a static website without complex components. This documentation serves as a template and guide for future component implementations.

As the project evolves to include interactive features, all components will be documented here with examples, props, and usage instructions.

## 🏗 Component Architecture

### Design Principles

- **Reusability**: Components should be modular and reusable across different contexts
- **Accessibility**: All components must follow WCAG guidelines
- **Performance**: Optimized for fast loading and smooth interactions
- **Consistency**: Unified design language and behavior patterns
- **Documentation**: Each component includes comprehensive documentation

### File Structure

```
components/
├── base/              # Base/primitive components
│   ├── Button/
│   ├── Input/
│   └── Text/
├── layout/            # Layout components
│   ├── Header/
│   ├── Footer/
│   └── Container/
├── ui/                # UI components
│   ├── Modal/
│   ├── Dropdown/
│   └── Tooltip/
├── forms/             # Form components
│   ├── ContactForm/
│   └── SearchForm/
├── navigation/        # Navigation components
│   ├── NavBar/
│   └── Breadcrumb/
├── content/           # Content components
│   ├── BlogPost/
│   └── ProjectCard/
└── utils/             # Utility components
    ├── ErrorBoundary/
    └── LazyLoader/
```

## 📏 Component Guidelines

### Naming Conventions

- Use PascalCase for component names: `MyComponent`
- Use descriptive, clear names: `NavigationHeader` instead of `NavHead`
- Prefix with context when needed: `BlogPostCard`, `UserProfileImage`

### Props Interface

```typescript
interface ComponentProps {
  // Required props first
  title: string;
  content: string;
  
  // Optional props with defaults
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  
  // Event handlers
  onClick?: (event: MouseEvent) => void;
  onSubmit?: (data: FormData) => void;
  
  // Style and className
  className?: string;
  style?: CSSProperties;
  
  // Children for compound components
  children?: ReactNode;
}
```

### Documentation Template

Each component should include:

1. **Purpose**: What the component does
2. **Props**: All available props with types and descriptions
3. **Examples**: Usage examples with code snippets
4. **Accessibility**: ARIA attributes and keyboard navigation
5. **Styling**: CSS classes and customization options
6. **Testing**: How to test the component

## 🧱 Base Components

### Button

A versatile button component with multiple variants and states.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'danger' \| 'ghost'` | `'primary'` | Button style variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `disabled` | `boolean` | `false` | Whether button is disabled |
| `loading` | `boolean` | `false` | Show loading state |
| `fullWidth` | `boolean` | `false` | Make button full width |
| `onClick` | `(event: MouseEvent) => void` | - | Click handler |
| `children` | `ReactNode` | - | Button content |

#### Examples

```html
<!-- Basic button -->
<button class="btn btn--primary">
  Click me
</button>

<!-- Secondary button -->
<button class="btn btn--secondary">
  Secondary Action
</button>

<!-- Disabled button -->
<button class="btn btn--primary" disabled>
  Can't click
</button>

<!-- Loading button -->
<button class="btn btn--primary btn--loading">
  <span class="btn__spinner"></span>
  Loading...
</button>
```

```javascript
// JavaScript usage
const button = new Button({
  variant: 'primary',
  size: 'large',
  onClick: () => console.log('Button clicked!'),
  children: 'Click me'
});
```

#### CSS Classes

```css
.btn {
  /* Base button styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.btn--primary {
  background-color: #3b82f6;
  color: white;
}

.btn--secondary {
  background-color: #f3f4f6;
  color: #374151;
}

.btn--danger {
  background-color: #ef4444;
  color: white;
}

.btn--small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.btn--large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Input

A flexible input component with validation and various types.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'text' \| 'email' \| 'password' \| 'number'` | `'text'` | Input type |
| `placeholder` | `string` | - | Placeholder text |
| `value` | `string` | - | Input value |
| `required` | `boolean` | `false` | Whether input is required |
| `disabled` | `boolean` | `false` | Whether input is disabled |
| `error` | `string` | - | Error message |
| `onChange` | `(value: string) => void` | - | Change handler |

#### Examples

```html
<!-- Basic input -->
<div class="input-group">
  <input type="text" class="input" placeholder="Enter your name">
</div>

<!-- Input with label -->
<div class="input-group">
  <label for="email" class="input-label">Email</label>
  <input type="email" id="email" class="input" placeholder="your@email.com">
</div>

<!-- Input with error -->
<div class="input-group">
  <input type="text" class="input input--error" placeholder="Required field">
  <span class="input-error">This field is required</span>
</div>
```

## 🏢 Layout Components

### Header

The main navigation header component.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logo` | `string` | - | Logo image URL |
| `title` | `string` | - | Site title |
| `navigation` | `NavItem[]` | `[]` | Navigation items |
| `sticky` | `boolean` | `true` | Whether header is sticky |

#### Examples

```html
<header class="header header--sticky">
  <div class="container">
    <div class="header__content">
      <div class="header__brand">
        <img src="/logo.svg" alt="Logo" class="header__logo">
        <span class="header__title">Site Title</span>
      </div>
      
      <nav class="header__nav">
        <a href="/" class="nav-link nav-link--active">Home</a>
        <a href="/about" class="nav-link">About</a>
        <a href="/projects" class="nav-link">Projects</a>
        <a href="/contact" class="nav-link">Contact</a>
      </nav>
      
      <button class="header__menu-toggle" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </div>
</header>
```

### Container

A responsive container component for content layout.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'medium' \| 'large' \| 'full'` | `'medium'` | Container max-width |
| `padding` | `boolean` | `true` | Whether to add padding |
| `children` | `ReactNode` | - | Container content |

#### Examples

```html
<div class="container container--medium">
  <h1>Page Title</h1>
  <p>Page content goes here...</p>
</div>
```

## 🎨 UI Components

### Modal

A flexible modal dialog component.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Whether modal is open |
| `title` | `string` | - | Modal title |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Modal size |
| `onClose` | `() => void` | - | Close handler |
| `children` | `ReactNode` | - | Modal content |

#### Examples

```html
<div class="modal-overlay" style="display: none;">
  <div class="modal modal--medium">
    <div class="modal__header">
      <h2 class="modal__title">Modal Title</h2>
      <button class="modal__close" aria-label="Close modal">×</button>
    </div>
    <div class="modal__body">
      <p>Modal content goes here...</p>
    </div>
    <div class="modal__footer">
      <button class="btn btn--secondary">Cancel</button>
      <button class="btn btn--primary">Confirm</button>
    </div>
  </div>
</div>
```

```javascript
// JavaScript usage
const modal = new Modal({
  title: 'Confirm Action',
  size: 'small',
  onClose: () => console.log('Modal closed'),
  children: `
    <p>Are you sure you want to delete this item?</p>
    <div class="modal-actions">
      <button class="btn btn--danger">Delete</button>
      <button class="btn btn--secondary">Cancel</button>
    </div>
  `
});

modal.open();
```

### Card

A versatile card component for displaying content.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'outlined' \| 'elevated'` | `'default'` | Card style |
| `padding` | `'none' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Card padding |
| `hover` | `boolean` | `false` | Enable hover effects |
| `children` | `ReactNode` | - | Card content |

#### Examples

```html
<div class="card card--elevated card--hover">
  <div class="card__header">
    <h3 class="card__title">Project Title</h3>
    <span class="card__subtitle">Subtitle</span>
  </div>
  <div class="card__body">
    <p>Project description goes here...</p>
  </div>
  <div class="card__footer">
    <button class="btn btn--primary">Learn More</button>
  </div>
</div>
```

## 📝 Form Components

### ContactForm

A complete contact form component with validation.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSubmit` | `(data: ContactData) => void` | - | Form submit handler |
| `loading` | `boolean` | `false` | Whether form is submitting |

#### Examples

```html
<form class="contact-form">
  <div class="form-group">
    <label for="name" class="form-label">Name *</label>
    <input type="text" id="name" name="name" class="form-input" required>
  </div>
  
  <div class="form-group">
    <label for="email" class="form-label">Email *</label>
    <input type="email" id="email" name="email" class="form-input" required>
  </div>
  
  <div class="form-group">
    <label for="subject" class="form-label">Subject</label>
    <input type="text" id="subject" name="subject" class="form-input">
  </div>
  
  <div class="form-group">
    <label for="message" class="form-label">Message *</label>
    <textarea id="message" name="message" class="form-textarea" rows="5" required></textarea>
  </div>
  
  <button type="submit" class="btn btn--primary btn--full-width">
    Send Message
  </button>
</form>
```

## 🧪 Testing

### Testing Guidelines

1. **Unit Tests**: Test individual components in isolation
2. **Integration Tests**: Test component interactions
3. **Accessibility Tests**: Verify ARIA attributes and keyboard navigation
4. **Visual Tests**: Screenshot testing for visual regression

### Example Test

```javascript
// Example component test
describe('Button Component', () => {
  test('renders with correct text', () => {
    const button = document.createElement('button');
    button.className = 'btn btn--primary';
    button.textContent = 'Click me';
    
    expect(button.textContent).toBe('Click me');
    expect(button.classList.contains('btn--primary')).toBe(true);
  });
  
  test('handles click events', () => {
    const mockClick = jest.fn();
    const button = document.createElement('button');
    button.addEventListener('click', mockClick);
    
    button.click();
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
  
  test('is accessible', () => {
    const button = document.createElement('button');
    button.setAttribute('aria-label', 'Submit form');
    
    expect(button.getAttribute('aria-label')).toBe('Submit form');
  });
});
```

## ⚡ Performance

### Performance Guidelines

1. **Lazy Loading**: Load components only when needed
2. **Code Splitting**: Split components into separate bundles
3. **Memoization**: Cache expensive computations
4. **Optimization**: Minimize DOM manipulation

### Example Performance Optimizations

```javascript
// Lazy loading component
const LazyModal = lazy(() => import('./Modal'));

// Memoized component
const MemoizedCard = memo(Card, (prevProps, nextProps) => {
  return prevProps.title === nextProps.title &&
         prevProps.content === nextProps.content;
});

// Debounced input
const debouncedOnChange = debounce((value) => {
  // Handle change
}, 300);
```

## 🎯 Accessibility

### Accessibility Checklist

- [ ] Proper ARIA labels and roles
- [ ] Keyboard navigation support
- [ ] Focus management
- [ ] Color contrast compliance
- [ ] Screen reader compatibility
- [ ] Semantic HTML structure

### Example Accessible Component

```html
<button 
  class="btn btn--primary"
  aria-label="Submit contact form"
  aria-describedby="submit-help"
  tabindex="0"
>
  Submit
</button>
<div id="submit-help" class="sr-only">
  This will send your message to our support team
</div>
```

## 🔄 Component Lifecycle

### Creation Checklist

When creating a new component:

1. [ ] Define clear purpose and scope
2. [ ] Design props interface
3. [ ] Implement base functionality
4. [ ] Add accessibility features
5. [ ] Write comprehensive tests
6. [ ] Create documentation
7. [ ] Add usage examples
8. [ ] Optimize for performance

### Maintenance

- Regular accessibility audits
- Performance monitoring
- User feedback incorporation
- Documentation updates
- Breaking change management

---

*This component documentation is updated with each new component addition. For questions or suggestions, please open an issue on GitHub.*
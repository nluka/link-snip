# Code Style Conventions

## General

### 1. All code files should use 2 spaces for indentation

---

## HTML

### 1. Classes should be dash-separated and include the element name as the first word

eg. div-container, button-action

### 2. ID's should be camelCase and include the element name as the first word

eg. buttonCreateNewUrl, inputNewUrlName

---

## CSS

### 1. Selectors should be ordered by the selected element(s) position in the DOM

### 2. Standard selector properties should be in alphabetical order

### 3. Any vendor-specific selectors that relate to a standard selector should appear under their respective standard selector

eg.

```CSS
.something {
  transform: rotate(10deg);
  -webkit-transform: rotate(10deg); /* relates to the standard `transform` property, therefore appears underneath it */
  width: 100px;
  z-index: 10;
}
```

### 4. Any vendor-specific selectors that do not relate to a standard selector should appear after all standard selectors (at the bottom) in alphabetical order

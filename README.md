# Teaching & Learning — Episcopal High School

A modern, professional multi-page React site framework for the EHS
Teaching &amp; Learning department.

## Stack

- **React 18** with **react-router-dom 6**
- **Vite** for dev server + bundling
- Plain CSS with design tokens drawn from the EHS brand style guide
  (maroon `#7a1e46`, gray `#54565b`, light blue `#C4DCEB`, dark blue `#006890`)

## Pages / Routes

| Route                        | Page                            |
| ---------------------------- | ------------------------------- |
| `/`                          | Home                            |
| `/teaching-learning`         | Teaching &amp; Learning         |
| `/community-equity`          | Office of Community and Equity  |
| `/portrait-of-a-graduate`    | Portrait of a Graduate          |
| `/ai`                        | AI                              |
| `/resources`                 | Resources                       |

Every page currently renders the shared `Placeholder` component, which
shows a large `Placeholder` heading, the page name, and an
**Under Construction** card.

## Getting Started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into /dist
npm run preview  # preview the production build
```

## Responsive Design

- Sticky navbar with desktop links at ≥ 900px
- Hamburger menu with slide-down drawer below 900px
- Body scroll is locked while the mobile menu is open
- Escape closes the mobile menu

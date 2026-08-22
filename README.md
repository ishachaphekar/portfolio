# Isha Chaphekar — UI/UX Designer & Researcher Portfolio

[![Live Portfolio](https://img.shields.io/badge/Live%20Website-isha--chaphekar--portfolio.vercel.app-ADEFD1?style=for-the-badge&logo=vercel&logoColor=00203F)](https://isha-chaphekar-portfolio.vercel.app/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

A premium, interactive personal portfolio website for **Isha Chaphekar** — UI/UX Designer, UX Researcher, and Visual Thinker. Built with React, TypeScript, Tailwind CSS, and Vite, featuring custom micro-animations, scroll-driven project stacking cards, interactive tactile sticky notes, and a responsive full-screen mobile navigation menu.

🌐 **Live Website**: [https://isha-chaphekar-portfolio.vercel.app/](https://isha-chaphekar-portfolio.vercel.app/)

---

## 🌟 Key Features

### 1. Interactive Hero Section
- **Tactile Draggable Sticky Notes**: Desktop view features custom draggable sticky notes with realistic tilt, depth shadows, tape/pin textures, and scroll-driven parallax effects.
- **Responsive Layout**: Sticky notes gracefully step aside on mobile and portrait tablet viewports (`< 768px`) for an ultra-clean hero presentation.
- **Live IST Clock**: Displays current India Standard Time (IST) live in the top navigation bar.

### 2. Folder-Tab Selected Work Section
- **Scroll-Driven Card Stacking**: Projects stack smoothly as the user scrolls, complete with folder-style navigation tabs.
- **Featured UX Case Studies**:
  - 🕉️ **KarmaQuest**: Narrative mobile game reimagining Mahapuranic morals for a digital generation (21-week end-to-end design & research).
  - 💡 **Beacon**: Comprehensive mobile platform measuring IQ, EQ & PQ to guide students in grades 8–12 (4-week Figma interactive design).
  - 🏥 **Nirogya**: End-to-end healthcare fulfillment platform connecting tier-3 and rural patients to doctors and licensed local pharmacies.

### 3. Responsive Navigation & Mobile Overlay Menu
- **Desktop Navigation**: Floating sticky top bar with blur backdrop, section auto-highlighting, and direct links to Work, About, Archives, and Resume.
- **Mobile & Tablet Full-Screen Overlay**: On screens smaller than `768px`, navigation shifts to a clean hamburger menu toggle opening an opaque full-screen dark blue overlay menu with mint typography.

### 4. Interactive Case Study Deep-Dives
- Comprehensive project pages detailing problem statements, research methodologies, wireframes, user personas, design iterations, high-fidelity prototypes, and design systems.
- Dynamic interactive phone frame prototypes and image lightbox zoom modals.

### 5. Archives & Design Gallery
- Dedicated gallery showcasing branding, visual design, illustrations, and exploratory UX work with responsive grid layouts and full-screen preview modals.

### 6. About & Research Publications
- Auto-cycling interactive stacking photo card gallery.
- Research publication showcase with interactive modal readouts.
- Testimonial cards featuring industry recommendations.

---

## 🛠️ Technology Stack

| Domain | Technologies Used |
| :--- | :--- |
| **Core Framework** | React 18, TypeScript, Vite |
| **Styling & Utilities** | Tailwind CSS v3, Vanilla CSS, `clsx`, `tailwind-merge` |
| **Icons & Media** | Lucide React Icons |
| **Fonts & Typography** | Space Grotesk (Headlines), Mulish (Body), Dancing Script (Script accents) |
| **Deployment** | Vercel |

---

## 📁 Project Directory Structure

```
isha-portfolio/
├── public/                     # Static assets, images, & previews
├── src/
│   ├── components/             # Reusable UI Components
│   │   ├── Navigation.tsx      # Main sticky header & full-screen mobile menu
│   │   ├── HeroSection.tsx     # Hero section with interactive sticky notes
│   │   ├── SelectedWorkSection.tsx # Scroll-driven project stacking cards
│   │   ├── AboutSection.tsx    # Bio, stacking photo gallery & publications
│   │   ├── TestimonialsSection.tsx # Client & peer recommendations
│   │   ├── ArchiveGrid.tsx     # Archives gallery grid
│   │   ├── ImageModal.tsx      # High-res image lightbox preview
│   │   ├── PhoneFrame.tsx      # Interactive mobile prototype container
│   │   └── Footer.tsx          # Site footer & contact links
│   ├── pages/                  # Full Page Case Studies & Views
│   │   ├── KarmaQuestPage.tsx  # KarmaQuest case study
│   │   ├── BeaconPage.tsx      # Beacon case study
│   │   └── ArchivesPage.tsx    # Archives visual gallery page
│   ├── data/
│   │   └── portfolioData.ts    # Centralized portfolio data, case studies, & text
│   ├── types/                  # TypeScript interface definitions
│   ├── App.tsx                 # Root application router & shell
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles, typography & animations
├── index.html                  # HTML entry point
├── package.json                # Dependencies & script configurations
├── tailwind.config.js          # Tailwind theme & color tokens
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite configuration
```

---

## 🚀 Getting Started (Local Development)

Follow these steps to run the portfolio locally on your machine:

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ishachaphekar/isha-portfolio.git
   cd isha-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

---

## 📦 Scripts Overview

- `npm run dev`: Runs the app in development mode with Hot Module Replacement (HMR).
- `npm run build`: Type-checks with `tsc` and compiles the production bundle using Vite.
- `npm run preview`: Locally previews the production build output.
- `npm run lint`: Performs TypeScript static type checking.

---

## 🌐 Deployment

The project is optimized for instant deployment on **Vercel**:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

---

## 📄 License & Credits

- Designed & Created by **Isha Chaphekar**
- All rights reserved © 2026 Isha Chaphekar.

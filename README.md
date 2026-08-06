# Yakshamitraru Germany e.V. Website

Official website for **Yakshamitraru Germany e.V.**, a cultural organization dedicated to preserving, promoting, and presenting the traditional Indian art form **Yakshagana** across Germany and Europe.

The website provides a digital platform to showcase Yakshagana performances, artists, events, cultural history, and the journey of Yakshamitraru Germany e.V.

---

# Project Overview

This project is a modern, responsive website built with **Next.js 15** following a mobile-first approach.

The website focuses on:

- Presenting Yakshamitraru Germany e.V.'s history and mission
- Showcasing upcoming and past performances
- Highlighting artists and performers
- Sharing performance galleries
- Introducing Yakshagana traditions
- Providing a foundation for future content management capabilities

---

# Tech Stack

## Frontend

- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Framer Motion
- Lucide React Icons

## Development Tools

- Git
- GitHub
- GitHub Actions
- ESLint

## Deployment

Recommended:

- Vercel

---

# Project Structure

```
src/
│
├── app/
│   ├── about/
│   ├── artists/
│   ├── events/
│   ├── gallery/
│   ├── learn/
│   ├── tradition/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   └── site/
│       ├── Hero.tsx
│       ├── SiteHeader.tsx
│       ├── SiteFooter.tsx
│       ├── AboutSection.tsx
│       ├── Mission.tsx
│       ├── UpcomingPerformance.tsx
│       └── reusable components
│
├── lib/
│   └── utility functions
│
└── assets/
    └── project assets
```

---

# Getting Started

## Prerequisites

Install the following:

- Node.js 22+
- npm

Verify installation:

```bash
node -v
npm -v
```

---

# Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project:

```bash
cd yakshamitraru-germany
```

Install dependencies:

```bash
npm install
```

---

# Running the Project

## Development Server

Start the development server:

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

# Available Scripts

## Development

```bash
npm run dev
```

Runs the local development server.

---

## Production Build

```bash
npm run build
```

Creates an optimized production build.

---

## Start Production Server

```bash
npm run start
```

Runs the production build locally.

---

## Type Checking

```bash
npm run type-check
```

Checks TypeScript errors without generating files.

---

## Linting

```bash
npm run lint
```

Runs ESLint checks.

---

# Code Quality

The project follows:

- Next.js App Router architecture
- TypeScript strict typing
- Component-based development
- Mobile-first responsive design
- Reusable UI patterns
- Automated CI validation

Before merging changes, GitHub Actions verifies:

- TypeScript validation
- ESLint checks
- Production build

---

# Git Workflow

The project follows a feature branch workflow.

Example:

```
main
│
├── feature/new-feature
│
├── fix/bug-fix
│
└── refactor/code-improvements
```

## Development Process

1. Create a new branch
2. Implement changes
3. Run quality checks
4. Commit changes
5. Push branch
6. Create Pull Request
7. Review CI checks
8. Merge into main

---

# Content Management

Currently, website content is managed through project files.

Examples:

- Artist details
- Event information
- Gallery content
- Hero carousel slides

Content is structured to allow future migration to a CMS or admin dashboard.

---

# Images and Assets

Images are stored inside:

```
public/images/
```

Recommended structure:

```
public/
└── images/
    ├── logos/
    ├── hero/
    ├── artists/
    ├── events/
    ├── gallery/
    └── tradition/
```

## Image Guidelines

Recommended:

- Use WebP format where possible
- Optimize image size before uploading
- Use meaningful filenames

Example:

```
yaksha-sankranthi-2025-frankfurt.webp
```

---

# Deployment

The recommended deployment platform is:

## Vercel

Deployment process:

1. Connect GitHub repository
2. Select Next.js framework
3. Configure required settings
4. Deploy

Deployment flow:

```
Feature Branch
       |
       ↓
Pull Request
       |
       ↓
GitHub Actions CI Check
       |
       ↓
Merge to Main
       |
       ↓
Production Deployment
```

---

# Environment Variables

Currently, the project does not require environment variables.

Future integrations may require:

- Database credentials
- Authentication keys
- Storage configuration
- Admin dashboard configuration

---

# Future Roadmap

## Admin Dashboard

Future versions may include an admin panel for managing:

- Events
- Performances
- Artists
- Gallery images
- Announcements

---

## Backend Integration

Possible future technologies:

- Supabase
- Database storage
- Authentication
- Cloud storage

---

# Maintenance Guidelines

Before creating a Pull Request, run:

```bash
npm run type-check
npm run lint
npm run build
```

Ensure all checks pass before merging.

---

# Production Account Ownership

For client handover, production accounts should belong to the client.

Recommended ownership:

| Service             | Owner                              |
| ------------------- | ---------------------------------- |
| GitHub Repository   | Client GitHub account/organization |
| Vercel              | Client account                     |
| Domain              | Client domain account              |
| Google Drive Assets | Client account                     |

Developer access should be provided through collaborator permissions.

---

# Current Project Status

Completed:

- Next.js 15 migration
- App Router architecture
- Responsive mobile-first design
- Tailwind CSS implementation
- shadcn/ui integration
- Framer Motion animations
- GitHub Actions CI setup
- Code quality refactoring

---

# Contact

**Yakshamitraru Germany e.V.**

Website:

```
yakshamitrarugermany.com
```

# SkillHigh Frontend Product Overview

## Purpose

This document explains the SkillHigh frontend clearly from a product and implementation point of view. It covers:

- Landing page experience
- Course detail flow
- Student dashboard
- Mentor dashboard
- Auth and payment flow
- Supporting pages
- Tech stack and architecture

The codebase is a React + TypeScript + Vite frontend for a learning platform with public marketing pages, student learning flows, and mentor review workflows.

---

## High-Level Product Areas

The app is organized into 3 main surfaces:

1. Public marketing and discovery
2. Student learning workspace
3. Mentor review workspace

There is also a demo mode for course previews, plus support flows like auth, certificate verification, blogs, careers, and contact.

---

## Route Overview

### Public routes

- `/` - landing page
- `/course/:courseSlug` - course details page
- `/all-courses` - full course listing
- `/contact-us` - contact page
- `/careers` - careers page
- `/blogs` - blog listing
- `/blogs/:slug` - blog detail
- `/check-certificate` - certificate lookup
- `/certificate/verify/:cid` - public certificate verification
- `/signup` - login, signup, forgot password, OTP flow
- `/mentor/login` - mentor login

### Public demo routes

- `/course/:slug/demo` - demo dashboard overview
- `/course/:slug/demo/lessons` and `/course/:slug/demo/play` - demo lessons
- `/course/:slug/demo/quiz` and `/course/:slug/demo/quiz/:quizId` - demo quizzes
- `/course/:slug/demo/projects` - demo projects
- `/course/:slug/demo/bounties` - demo bounties
- `/course/:slug/demo/learn-in-public` - demo learn-in-public page
- `/course/:slug/demo/resume` - demo resume builder

### Protected student routes

- `/profile` - student profile
- `/course-dashboard/:slug` - real student dashboard
- `/course-dashboard/:slug/lessons` - lesson player/workspace
- `/course-dashboard/:slug/quiz` - quiz list
- `/course-dashboard/:slug/quiz/:quizId` - quiz play
- `/course-dashboard/:slug/projects` - project submission flow
- `/course-dashboard/:slug/bounties` - bounty flow
- `/course-dashboard/:slug/resume` - resume builder
- `/course-dashboard/learn-in-public` - learn-in-public page
- `/course-dashboard/:slug/download-certificates` - certificate generation/download

### Protected mentor routes

- `/mentor/dashboard` - mentor project dashboard
- `/mentor/projects/solutions` - project solution review
- `/mentor/questions` - answer student questions
- `/mentor/performance` - student performance tracking

---

## Landing Page

The landing page is composed in `src/features/landing/pages/Landing.tsx` and is built as a sequence of focused sections.

### Main sections

- Hero section
  - Primary messaging
  - CTA actions
  - partner/credibility highlights
- Certificate partners section
  - shows certification/partner branding
- Recognized by section
  - recognition and trust signals
- Courses section
  - featured course discovery
  - entry point into course detail pages
- Benefits section
  - why SkillHigh is valuable for learners
- Learning journey section
  - visual explanation of how the learner progresses
- Testimonials section
  - social proof from learners
- Stats section
  - platform counters and credibility metrics
- FAQ section
  - common learner questions
- Book call section
  - call booking CTA
- Mentors section
  - mentor showcase and trust building

### Landing page goals

- Explain the product quickly
- Build trust
- Drive users into course detail pages
- Push users toward sign-up, mentor calls, or payment

---

## Course Detail Page

The course detail page is the public pre-purchase page for an individual course.

### Route

- `/course/:courseSlug`

### Major sections

- Course overview / hero
- Curriculum preview
- Demo dashboard preview
- Tools section
- Pricing section
- Certificates section
- Mentor call section

### What this page enables

- Understand course scope
- Review modules and curriculum
- Preview the learning dashboard before purchase
- See pricing options
- Understand certification value
- Book a call before enrolling

### Important behavior

- The page supports scrolling directly to pricing
- It also supports scrolling to the demo section
- This makes it a key conversion page between marketing and purchase

---

## All Courses Page

The all-courses experience is a broader catalog view.

### Route

- `/all-courses`

### Features

- course grid
- search/filter flow
- CTA blocks
- reusable course cards

This page is the wider discovery surface beyond the home page’s featured course sections.

---

## Authentication Experience

The auth page combines several flows into one screen.

### Route

- `/signup`

### Supported flows

- student login
- student sign-up
- OTP verification
- forgot password
- password reset initiation
- Google login entry

### Key UX details

- login and sign-up share one UI
- sign-up includes password strength feedback
- forgot password is a dedicated sub-flow
- OTP verification is shown as a next-step screen

### Auth model

- cookie-based authentication
- axios is configured with `withCredentials: true`
- frontend checks session on app load using `/auth/check`
- protected flows rely on backend role and course-access checks

---

## Student Profile

The profile area is the student account hub.

### Route

- `/profile`

### Main sections

- profile header
- sidebar navigation
- enrolled/owned courses
- settings/profile form
- logout

### What it does

- fetches current student profile
- shows owned courses
- acts as a re-entry point after successful payment
- allows switching between course view and settings

---

## Student Dashboard

The student dashboard is the main learning workspace for enrolled users.

### Main route

- `/course-dashboard/:slug`

### Dashboard overview features

- course header
- progress section
  - topic progress
  - quiz progress
  - project progress
  - mentor percentage when available
- learn-in-public section
- curriculum/module breakdown

### Dashboard navigation

The student sidebar exposes:

- Dashboard
- Quiz
- Projects
- Bounties
- Resume
- Logout

### Demo vs real mode

The dashboard is built to support both:

- `demo` mode for public preview
- `real` mode for enrolled students

Demo mode reuses the same product structure while locking protected actions and showing demo notices.

---

## Lesson Workspace

The lesson player/workspace is handled by the playground feature.

### Route

- `/course-dashboard/:slug/lessons`
- demo equivalent under `/course/:slug/demo/...`

### Features

- lesson list sidebar
- mobile lesson drawer
- current lesson content area
- lesson completion toggling
- tabbed content area
- lesson switching

### Product value

This is the day-to-day study environment where students consume lessons and track progress.

---

## Quiz System

The quiz module provides practice and course validation.

### Routes

- `/course-dashboard/:slug/quiz`
- `/course-dashboard/:slug/quiz/play`
- `/course-dashboard/:slug/quiz/:quizId`

### Features

- quiz listing page
- total/open/locked counters
- per-quiz card UI
- question flow
- answer submission
- result handling
- locked state support
- demo compatibility

### Product value

- reinforces learning after lessons
- gives visible progress checkpoints
- supports staged unlocking

---

## Projects Module

The projects area is where students submit real work for review.

### Route

- `/course-dashboard/:slug/projects`

### Features

- project listing
- project statistics
  - total
  - submitted
  - approved
  - failed
  - reviewing
- project submission modal
- update existing submission
- GitHub link validation
- explanation validation
- review-state aware UI

### Product value

- moves students from theory to implementation
- creates reviewable portfolio-style work
- connects directly with mentor review workflows

---

## Bounties Module

The bounties feature adds task-based challenge work with rewards.

### Route

- `/course-dashboard/:slug/bounties`

### Features

- available bounties tab
- applied bounties tab
- bounty cards with reward/deadline/slot information
- apply flow
- cancel application flow
- submit work flow
- review-state tracking
- reward pool statistics
- session-based notes persistence for application notes

### Demo behavior

- application and submission actions are locked in demo mode

### Product value

- adds motivation and urgency
- gives students extra execution opportunities
- introduces reward-driven engagement

---

## Resume Builder

The resume builder helps students create a structured resume inside the platform.

### Route

- `/course-dashboard/:slug/resume`

### Features

- personal information
- objective section
- experience section
- skills section
- projects section
- extracurricular section
- form reset
- typed validation schema

### Tech notes

- built with Formik
- validation uses Yup

---

## Learn In Public

This page encourages learners to share progress publicly.

### Routes

- `/course-dashboard/learn-in-public`
- demo equivalent under `/course/:slug/demo/learn-in-public`

### Features

- header card
- steps grid
- share composer

### Product value

- encourages accountability
- supports social proof and learner momentum
- helps learners communicate their progress externally

---

## Certificate Experience

The certificate flow supports both private generation and public verification.

### Routes

- `/course-dashboard/:slug/download-certificates`
- `/check-certificate`
- `/certificate/verify/:cid`

### Features

- certificate generation for enrolled students
- certificate preview/download flow
- public certificate search
- public certificate verification by ID

### Product value

- creates an end-of-course completion artifact
- allows public proof of learning

---

## Mentor Dashboard

The mentor side is a dedicated review workspace.

### Entry route

- `/mentor/dashboard`

### Dashboard features

- project submission overview
- total project count
- pending review count
- approved count
- projects needing review
- urgency-focused review queue
- quick navigation to questions and performance pages

### Product value

- centralizes mentor review work
- helps mentors focus on pending items first

---

## Mentor Project Review

This is the mentor’s detailed project-solution review page.

### Route

- `/mentor/projects/solutions`

### Features

- solution list per project
- filter by review state
  - reviewing
  - successful
  - failed
  - all
- per-solution detail modal
- GitHub link access
- explanation review
- review notes
- state updates

### Review states used in product

- `REVIEWING`
- `SUCCESSFUL`
- `FAILED`

This page is tightly connected to the student projects module.

---

## Mentor Questions

Mentors can answer learner doubts directly from their workspace.

### Route

- `/mentor/questions`

### Features

- question list
- unanswered/answered/all filters
- topic context
- student metadata
- verified/unverified status badges
- inline answer editor
- edit existing answer

### Product value

- closes the loop between lesson consumption and mentor help
- reduces student friction inside the learning flow

---

## Mentor Performance Tracking

This page helps mentors monitor and update learner progress percentages.

### Route

- `/mentor/performance`

### Features

- learner leaderboard summary
- average performance
- high/on-track/needs-attention segmentation
- search by name or email
- filter by performance band
- sorting options
- pagination
- per-student progress bars
- update modal with percentage slider and numeric input

### Product value

- gives mentors a fast view of student health
- supports intervention for weak performers

---

## Mentor Profile

Mentors have a separate profile page rendered when the authenticated role is `mentor`.

### Features

- profile fetch from mentor API
- mentor identity details
- assigned course display when available
- logout flow

---

## Other Supporting Features

### Blogs

- blog listing and blog detail pages
- markdown rendering support
- search/share components

### Careers

- public careers listing page

### Contact / Lead Capture

- public contact page
- lead form submission to backend

### Popup / CTA behavior

- global popup shown on eligible public pages
- popup mode changes based on authenticated vs demo state

### Offline handling

- global offline alert component
- axios request interceptor checks network availability

### SEO / site utility

- sitemap generation script after build
- robots and sitemap files in `public/`

---

## Tech Stack

### Core frontend

- React 19
- TypeScript
- Vite
- React Router DOM

### Styling and UI

- Tailwind CSS v4
- Radix UI primitives
- custom reusable UI components
- custom font loading

### Data fetching and state

- Axios for API requests
- TanStack React Query for server state
- Zustand for client/global state

### Animation and UX polish

- Framer Motion
- Motion
- Lenis for smooth scrolling

### Forms and validation

- Formik
- Yup

### Payments and documents

- Razorpay checkout integration
- pdf-lib
- jsPDF
- file-saver

### Notifications and feedback

- Sonner toasts

### Other notable libraries

- Embla carousel
- react-markdown
- remark-gfm

---

## State Management Approach

The app mixes server-state and local-state patterns.

### React Query is used for

- API-driven page data
- mentor data
- courses
- quizzes
- bounties
- projects
- certificates
- blogs

### Zustand is used for

- auth state
- dashboard route context
- sidebar open/close state
- public content stores
- profile-related UI state

This split is appropriate for a product with many backend-backed flows plus lightweight global UI state.

---

## API and Integration Notes

### Backend expectations

- base API prefix is `/api/v2`
- auth is cookie-based
- axios uses `withCredentials: true`
- student routes often require both:
  - authentication
  - course access

### Important backend-backed product areas

- auth
- courses
- dashboard
- demo dashboard
- blogs
- payments
- certificates
- projects
- bounties
- contact leads
- FAQ
- testimonials
- careers
- mentors

### Known implementation note

There are existing docs in this repo that note a route mismatch risk around auth-check naming. The canonical documentation in this project treats `/api/v2/auth/check` as the correct backend path.

---

## Folder Structure Summary

### Main folders

- `src/features`
  - domain-based features like landing, dashboard, mentor, quiz, projects, bounties, certificate
- `src/components`
  - shared UI and common building blocks
- `src/layouts`
  - app shells and wrappers
- `src/services`
  - API service functions
- `src/hooks`
  - reusable hooks
- `src/store`
  - Zustand stores
- `src/types`
  - shared TypeScript models
- `docs`
  - implementation and integration docs

### Architecture style

This frontend is feature-oriented. Product areas are grouped into dedicated feature folders instead of putting everything in a single page/component tree. That makes the codebase easier to grow across multiple app surfaces.

---

## Major User Journeys

### Public learner journey

1. User lands on home page
2. User explores courses
3. User opens course detail page
4. User reviews curriculum, demo, pricing, and certificate information
5. User signs up or logs in
6. User purchases course
7. User returns to profile/dashboard

### Student learning journey

1. Open course dashboard
2. Track progress
3. Study lessons
4. Take quizzes
5. Submit projects
6. Apply to bounties
7. Build resume
8. Generate certificate

### Mentor workflow

1. Mentor logs in
2. Opens mentor dashboard
3. Reviews pending project submissions
4. Answers learner questions
5. Updates learner performance

---

## Key Strengths of This Frontend

- Clear separation between public, student, and mentor experiences
- Reusable demo mode for pre-purchase previews
- Strong course progression model
- Built-in mentor review loop
- Certificate and verification support
- Payment integration connected to the product flow
- Good fit for a learning platform with guided progression

---

## File Pointers

Useful starting points in the codebase:

- `src/App.tsx`
- `src/main.tsx`
- `src/features/landing/pages/Landing.tsx`
- `src/features/landing/pages/AboutCourse.tsx`
- `src/features/dashboard/pages/CourseDashboard.tsx`
- `src/features/playground/PlayGround.tsx`
- `src/features/quiz/QuizList.tsx`
- `src/features/projects/components/Project.tsx`
- `src/features/bounties/Bounties.tsx`
- `src/features/resume/Resume.tsx`
- `src/features/certificate/Certificate.tsx`
- `src/features/mentor/pages/Dashboard.tsx`
- `src/features/mentor/pages/ProjectSolutionsPage.tsx`
- `src/features/mentor/pages/Questions.tsx`
- `src/features/mentor/pages/StudentPerformancePage.tsx`
- `docs/frontend-api-map.md`
- `docs/frontend-auth-flow.md`
- `docs/frontend-backend-integration.md`

---

## Summary

This frontend is not only a landing page. It is a multi-surface product application with:

- a public marketing site
- a course sales funnel
- a student dashboard
- a mentor operations dashboard
- payment, certificate, and profile flows

It is best understood as the frontend for a full learning platform, not just a promotional site.

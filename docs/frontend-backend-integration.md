# Frontend to Backend Integration Guide

This guide is for frontend engineers integrating the SkillHigh frontend with the active backend.

V1 is disabled and should be ignored completely. The only active API surface is `V2` under the base prefix `/api/v2`.

## Backend Overview

SkillHigh's backend is a monolithic Express API written in TypeScript. It uses:

- MongoDB via Prisma
- Cookie-based JWT authentication
- Redis-backed rate limiting
- Razorpay for payments
- Bunny Storage / Bunny Stream for media
- Zod validation for request payloads

For frontend work, the main things that matter are:

- all API calls should target `/api/v2`
- auth is cookie-based, not Bearer-token based
- many student flows are gated by both auth and course access
- some live route names intentionally contain unusual spellings and should be used exactly as implemented

## Base Path And Client Setup

Frontend requests should be sent to:

- Base API prefix: `/api/v2`
- Frontend axios client: `withCredentials: true`

The current frontend already does this in [src/config/axiosConfig.ts](C:/Users/neela/OneDrive/Desktop/Company/skillhigh/Skillhigh/skillhigh-apps/landing/src/config/axiosConfig.ts).

Practical integration rules:

- Always send cookies by enabling `withCredentials: true`.
- Do not build new integrations against `/api/v1`.
- Keep route names exactly as implemented, including `testimonals`, `curriculam`, and `demodashboard`.
- Prefer backend-implemented route shapes over inferred frontend patterns.

## Roles

The backend defines these roles:

- `admin`
- `student`
- `mentor`
- `user`

Frontend impact:

- `student` is the main role for course purchase, dashboard, lessons, quizzes, projects, bounties, and certificate generation.
- `mentor` uses dedicated mentor routes and a separate mentor login flow.
- `admin` is mainly relevant for admin/dashboard tooling, not this landing frontend.
- `user` is an authenticated non-student/general-user role that can pass some auth checks and profile flows.

## Public Vs Protected Route Groups

| Route group | Base path | Default access | Frontend notes |
| --- | --- | --- | --- |
| Auth | `/api/v2/auth` | Mixed | Login/signup/public recovery endpoints are public; profile/check/logout require cookie context |
| Courses | `/api/v2/courses` | Mostly public | Public catalog; admin write routes are protected |
| Dashboard | `/api/v2/dashboard` | Protected | Student-only and course-access gated |
| Demo dashboard | `/api/v2/demodashboard` | Public-ish | No student auth, but still requires a real course slug |
| Blogs | `/api/v2/blogs` | Mostly public | Public reads, admin writes |
| Payments | `/api/v2/purchases` | Protected | Student-only purchase and verify flow |
| Certificates | `/api/v2/certificate` | Mixed | Generate is student-only; fetch/verify are public |
| Projects | `/api/v2/projects` | Mixed | Student course project routes are protected; admin routes also exist |
| Bounties | `/api/v2/course-bounties` | Mixed | Student flows protected; admin flows also exist |
| Contacts | `/api/v2/contacts` | Mixed | Lead submission is public |
| FAQ | `/api/v2/faqs` | Mostly public | Public read, admin write |
| Testimonals | `/api/v2/testimonals` | Mostly public | Public read; write paths exist |
| Careers | `/api/v2/careers` | Mostly public | Public job listing; admin write |
| Mentors | `/api/v2/mentors` | Mixed | Mentor login/profile/review flows are separate from student auth |

## Auth Model

Auth is cookie-based JWT auth.

- The backend reads a cookie named `token`.
- Frontend should not store access tokens in local storage for this API.
- The browser sends the cookie automatically when `withCredentials: true` is enabled.
- Protected routes rely on backend middleware to derive `req.userId`, `req.userRole`, and for mentors sometimes `courseId`.

High-level auth behavior:

1. Public login/signup endpoints authenticate or create the user.
2. Backend sets the auth cookie.
3. Frontend calls auth-check/profile endpoints to resolve the current session and role.
4. Protected student routes then rely on that cookie automatically.

## Course Access Restrictions

Student content access is not just "logged in vs not logged in".

Many course-related routes also run a course-access guard that checks:

- the course exists
- the user has an enrolled course record
- the enrollment/access has not expired

Frontend implication:

- a logged-in student can still receive `403` if they do not own the course or their access expired
- dashboard, lessons, quizzes, projects, certificates, and bounty flows may fail even with a valid auth cookie if course access is invalid

Demo dashboard routes are different:

- they do not require student auth
- they still require a valid course slug
- they expose demo-safe content only

## Payment Flow

High-level purchase flow for frontend:

1. Ensure the user is logged in as `student`.
2. Read Razorpay config from `/api/v2/purchases/config`.
3. Create an order using `/api/v2/purchases/create-payment`.
4. Open Razorpay checkout on the frontend.
5. Submit Razorpay response data to `/api/v2/purchases/verify-payment`.
6. On success, refresh course access or dashboard state.

There is also a pending-payment path:

1. Create pending record via `/api/v2/purchases/create-pending-payment`.
2. Verify later via `/api/v2/purchases/verify-pending-payment`.

Frontend expectations:

- all payment routes are student-only
- validation failures should be handled cleanly in checkout UI
- do not assume course access is granted until backend verification succeeds

## Certificate Flow

High-level certificate flow:

1. Student opens a completed course.
2. Frontend calls `/api/v2/certificate/generate-certificate/:slug`.
3. Backend checks student auth and course access before generating/returning certificate details.
4. Frontend can then render/download/share the returned certificate data.
5. Public verification pages can use `/api/v2/certificate/verify-certificate/:cid`.

Important distinction:

- `generate-certificate` is protected
- `fetch-certificate/:cid` is public
- `verify-certificate/:cid` is public

That means public certificate pages can be built without auth, but generation cannot.

## Validation And Rate Limiting

The backend validates many payloads with Zod and rate-limits with Redis.

Frontend should expect:

- `400` when body/params/query validation fails
- field-level validation style errors from schema validation
- `401` or `403` on protected routes when auth/role is missing or invalid
- `403` for course-access failures
- rate limiting on login, OTP, blog reads/writes, student reads/writes, mentor routes, and certificate verification

Practical frontend handling:

- show user-friendly validation messages for known form fields
- treat `403` on dashboard/course routes as "no access / expired / not enrolled"
- treat repeated auth form failures as possibly rate-limited
- expect public certificate verification and auth flows to have separate rate limits

## Route Group Usage Summary

### Auth

Used for student login, signup, password recovery, Google auth, session check, profile, and logout.

Important frontend usage:

- signup/login forms
- password reset flow
- current-user bootstrap after app load
- Google login callback handoff

### Courses

Used for catalog pages, course cards, course detail pages, and formatted course listings.

Important frontend usage:

- landing page course sections
- course detail page by slug
- pricing/course selection entry points

### Dashboard

Used for enrolled-student course experience.

Important frontend usage:

- course dashboard overview
- lessons list and lesson detail
- question/discussion UI
- lesson completion state

### Demo Dashboard

Used for unauthenticated preview/demo course experiences.

Important frontend usage:

- demo lessons
- demo projects
- demo bounties
- demo quiz previews

### Blogs

Used for blog listing, blog detail, and category navigation.

### Payments

Used for student purchase initiation and Razorpay verification.

### Certificates

Used for certificate generation for enrolled students, and public verification/fetch flows.

### Projects

Used for student project lists and solution submission/update flows.

### Bounties

Used for student bounty listing, application, cancellation, submission, and reward-related flows.

### Contacts

Used for public lead capture from contact forms.

### FAQ

Used for public FAQ rendering.

### Testimonals

Used for public testimonial rendering. Keep the live path spelling as `testimonals`.

### Careers

Used for public job listing pages.

## Known Quirks / Open Questions

- V1 exists in the repo but is disabled. Ignore it completely.
- The backend base path is `/api/v2`.
- `curriculam` is the live spelling, not `curriculum`.
- `testimonals` is the live spelling, not `testimonials`.
- Bounties are mounted on both `/api/v2/course-bounties` and `/api/v2/projects`. Frontend should consistently use `/api/v2/course-bounties`.
- The backend handoff says `GET /api/v2/courses/course/:id` is public, but the actual route file shows it as admin-protected and wired oddly. Frontend should not rely on this endpoint as a public route.
- Certificate fetch is public: `/api/v2/certificate/fetch-certificate/:cid`.
- In the current frontend, [src/services/auth-service.ts](C:/Users/neela/OneDrive/Desktop/Company/skillhigh/Skillhigh/skillhigh-apps/landing/src/services/auth-service.ts) calls `/auth/auth/check`, but the implemented student route is `/api/v2/auth/check`.
- The current frontend auth store uses `/auth/check/`, which should resolve if the backend tolerates the trailing slash, but the canonical path is `/api/v2/auth/check`.
- Mentor auth uses the student dashboard JWT secret internally. That is backend behavior and does not change the frontend contract, but it is an implementation quirk.
- The `testimonals` update route appears to be missing admin protection in the route file. Frontend should assume testimonial writes are not part of normal public-app integration.

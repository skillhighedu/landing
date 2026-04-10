# Frontend Auth Flow

SkillHigh uses cookie-based JWT authentication.

- Active version: `V2`
- Base prefix: `/api/v2`
- V1 is disabled and should be ignored

## What Frontend Should Assume

- The backend authenticates users through a cookie named `token`.
- Frontend should not send Bearer tokens for normal API auth.
- Frontend must send requests with `withCredentials: true`.
- Role and access checks happen on the backend after the cookie is parsed.

The current axios client is already configured this way in [src/config/axiosConfig.ts](C:/Users/neela/OneDrive/Desktop/Company/skillhigh/Skillhigh/skillhigh-apps/landing/src/config/axiosConfig.ts).

## Role Behavior

| Role | Primary frontend surface | Notes |
| --- | --- | --- |
| `student` | purchase flow, dashboard, lessons, quizzes, projects, bounties, certificates | Main authenticated learner flow |
| `mentor` | mentor dashboard and review screens | Uses separate mentor login route |
| `admin` | admin tooling | Mostly outside this frontend app's public integration surface |
| `user` | general authenticated user state | Can pass some auth checks/profile routes |

## Core Auth Endpoints

| Method | Path | Auth | Role | Frontend usage |
| --- | --- | --- | --- | --- |
| POST | `/auth/login` | No | Public | Student login |
| POST | `/auth/create-account` | No | Public | Student signup |
| POST | `/auth/otp-verification` | No | Public | Signup OTP verification |
| POST | `/auth/forget-password` | No | Public | Start password reset |
| POST | `/auth/forget-password-verification` | No | Public | Verify reset OTP/token |
| POST | `/auth/set-new-password` | No | Public | Save new password |
| GET | `/auth/google` | No | Public | Begin Google OAuth |
| POST | `/auth/google/callback` | No | Public | Finish Google login |
| GET | `/auth/check` | Yes | `student`, `user`, `mentor` | Resolve current session |
| GET | `/auth/profile` | Yes | `student`, `user` | Get current profile |
| PUT | `/auth/update-profile` | Yes | `student`, `user` | Update current profile |
| POST | `/auth/logout` | Cookie context | Auth cookie holder | Logout |

## Standard Frontend Session Flow

### 1. Login or signup

For email/password login:

1. Call `POST /api/v2/auth/login`.
2. On success, backend sets the auth cookie.
3. Frontend stores only derived UI state, not the raw JWT.

For signup:

1. Call `POST /api/v2/auth/create-account`.
2. Verify OTP using `POST /api/v2/auth/otp-verification`.
3. After completion, continue with normal authenticated bootstrap if the backend sets the session.

### 2. Bootstrap current session

On app load or route refresh:

1. Call `GET /api/v2/auth/check`.
2. Read the returned role/user info.
3. Route the user to the correct UI.

Recommended frontend behavior:

- treat `/auth/check` as the canonical student/user/mentor session-check route
- do not rely on stale local auth state without checking the cookie-backed session

### 3. Load profile when needed

Use:

- `GET /api/v2/auth/profile`
- `PUT /api/v2/auth/update-profile`

These apply to `student` and `user`.

### 4. Logout

Use:

- `POST /api/v2/auth/logout`

Frontend should clear local auth state even if the network request fails, then redirect safely.

## Google Auth Flow

High-level flow:

1. Frontend redirects the browser to `GET /api/v2/auth/google`.
2. Google auth completes on the backend side.
3. Frontend completes callback handling against `POST /api/v2/auth/google/callback`.
4. Backend sets the auth cookie and returns role/session-related data.
5. Frontend updates local auth state and routes the user.

Important frontend note:

- The current frontend has a route at `/api/v2/auth/google/callback` for client-side callback handling, but the backend endpoint is also `/api/v2/auth/google/callback`.
- Keep that distinction clear when wiring redirects vs API calls.

## Student-Protected Flow

Student-protected routes require:

- a valid auth cookie
- the backend recognizing role `student`

Course-gated student routes also require:

- access to the specific course slug
- non-expired enrollment/access

So a user may be authenticated but still blocked from:

- dashboard
- lessons
- quizzes
- projects
- bounties
- certificate generation

Frontend should present these failures as access problems, not generic crashes.

## Mentor Flow

Mentors use a separate route group:

- login: `POST /api/v2/mentors/login`
- profile and work queues: under `/api/v2/mentors/...`

Frontend should not assume mentor auth behaves exactly like student auth just because both rely on a cookie.

## Failure Modes Frontend Should Handle

| Situation | Likely response | Frontend handling |
| --- | --- | --- |
| Missing/expired cookie | `401` or `403` | Redirect to login/signup or show auth-required state |
| Wrong role | `403` | Show role/access denied state |
| Valid auth but no course access | `403` | Show purchase/enrollment/expired-access messaging |
| Invalid form payload | `400` | Render field/form validation errors |
| Repeated login or OTP attempts | Rate-limited response | Show retry-later message |
| Offline/network failure | No response / client error | Keep local UI stable and show connection error |

## Current Frontend Notes

- [src/config/axiosConfig.ts](C:/Users/neela/OneDrive/Desktop/Company/skillhigh/Skillhigh/skillhigh-apps/landing/src/config/axiosConfig.ts) correctly enables `withCredentials: true`.
- [src/store/authStore.ts](C:/Users/neela/OneDrive/Desktop/Company/skillhigh/Skillhigh/skillhigh-apps/landing/src/store/authStore.ts) uses `/auth/check/`; the canonical backend path is `/api/v2/auth/check`.
- [src/services/auth-service.ts](C:/Users/neela/OneDrive/Desktop/Company/skillhigh/Skillhigh/skillhigh-apps/landing/src/services/auth-service.ts) uses `/auth/auth/check`, which does not match the implemented backend route and should not be used as a source of truth for docs.

## Known Quirks / Open Questions

- Mentor auth internally uses the student dashboard JWT secret on the backend. This does not change the frontend request shape, but it is a backend quirk.
- The backend has a separate admin role-check route mounted under `/api/v2/check/auth/role`, not under `/api/v2/auth/...`.
- The backend handoff mentions Google auth as `GET /google (+callback)`, while the implemented student route file shows `GET /auth/google` and `POST /auth/google/callback`. Frontend should follow the implemented route file for current integration.

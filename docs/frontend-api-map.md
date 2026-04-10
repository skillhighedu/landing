# Frontend API Map

Frontend API map for the active SkillHigh backend.

- Active version: `V2`
- Base prefix: `/api/v2`
- V1 is disabled and should be ignored

Use the route names exactly as implemented.

## Auth

Used for student auth, session checks, password recovery, profile, and Google login handoff.

| Method | Path | Auth | Role | Frontend usage |
| --- | --- | --- | --- | --- |
| POST | `/auth/login` | No | Public | Student login form |
| POST | `/auth/create-account` | No | Public | Student signup form |
| POST | `/auth/otp-verification` | No | Public | Signup OTP verification |
| POST | `/auth/forget-password` | No | Public | Start forgot-password flow |
| POST | `/auth/forget-password-verification` | No | Public | Verify reset OTP/token |
| POST | `/auth/set-new-password` | No | Public | Submit new password |
| GET | `/auth/google` | No | Public | Start Google OAuth redirect |
| POST | `/auth/google/callback` | No | Public | Complete Google login callback |
| GET | `/auth/check` | Yes | `student`, `user`, `mentor` | Resolve current authenticated session |
| GET | `/auth/profile` | Yes | `student`, `user` | Fetch logged-in student/user profile |
| PUT | `/auth/update-profile` | Yes | `student`, `user` | Update current profile |
| POST | `/auth/logout` | Cookie context | Auth cookie holder | End current session |

Notes:

- Student routes are mounted under `/api/v2/auth`.
- Admin role-check is separate: `GET /api/v2/check/auth/role`.

## Courses

Used for catalog data and course detail pages.

| Method | Path | Auth | Role | Frontend usage |
| --- | --- | --- | --- | --- |
| GET | `/courses/` | No | Public | Load course catalog / departments-based course data |
| GET | `/courses/formatted-courses` | No | Public | Load formatted course cards for landing pages |
| GET | `/courses/course/:slug` | No | Public | Course details page by slug |

Admin-only course endpoints exist, but are not normal landing-frontend integration routes.

## Dashboard

Used for enrolled student learning flows.

| Method | Path | Auth | Role | Frontend usage |
| --- | --- | --- | --- | --- |
| GET | `/dashboard/students/course-details/:slug` | Yes | `student` | Course dashboard overview |
| GET | `/dashboard/course/:slug/lessons` | Yes | `student` | Lesson list |
| GET | `/dashboard/course/:slug/course-lessons/status` | Yes | `student` | Lesson completion state |
| GET | `/dashboard/course/:slug/lessons/:lessonId` | Yes | `student` | Single lesson content |
| GET | `/dashboard/course/:slug/questions` | Yes | `student` | Discussion/question list |
| POST | `/dashboard/course/:slug/topics/:topicId/questions` | Yes | `student` | Ask a question for a topic |
| PUT | `/dashboard/course/:slug/questions/:questionId` | Yes | `student` | Edit a question |
| DELETE | `/dashboard/course/:slug/questions/:questionId` | Yes | `student` | Delete a question |
| PUT | `/dashboard/courses/:slug/lessons/:lessonId/completion` | Yes | `student` | Toggle lesson completion |

Notes:

- These routes require both student auth and course access.

## Demo Dashboard

Used for demo/public preview experiences.

| Method | Path | Auth | Role | Frontend usage |
| --- | --- | --- | --- | --- |
| GET | `/demodashboard/course/:slug/demo/course-details` | No | Public | Demo course overview |
| GET | `/demodashboard/course/:slug/demo/lessons` | No | Public | Demo lessons |
| GET | `/demodashboard/course/:slug/demo/quiz` | No | Public | Demo quiz preview |
| GET | `/demodashboard/course/:slug/demo/projects` | No | Public | Demo projects |
| GET | `/demodashboard/course/:slug/demo/bounties` | No | Public | Demo bounties |

Notes:

- These do not require student auth.
- They still depend on a valid course slug.

## Blogs

Used for blog listing/detail and category navigation.

| Method | Path | Auth | Role | Frontend usage |
| --- | --- | --- | --- | --- |
| GET | `/blogs/blog` | No | Public | Blog list page |
| GET | `/blogs/blog/:slug` | No | Public | Single blog post page |
| GET | `/blogs/category` | No | Public | Blog categories / filters |
| GET | `/blogs/category/:id` | No | Public | Category-specific blog lookup |

## Payments

Used for Razorpay purchase flow.

| Method | Path | Auth | Role | Frontend usage |
| --- | --- | --- | --- | --- |
| GET | `/purchases/config` | Yes | `student` | Load Razorpay key/config for checkout |
| POST | `/purchases/create-payment` | Yes | `student` | Create Razorpay order |
| POST | `/purchases/create-pending-payment` | Yes | `student` | Create pending payment record |
| POST | `/purchases/verify-payment` | Yes | `student` | Verify Razorpay payment and unlock access |
| POST | `/purchases/verify-pending-payment` | Yes | `student` | Verify a pending payment flow |

## Certificates

Used for certificate generation and public verification.

| Method | Path | Auth | Role | Frontend usage |
| --- | --- | --- | --- | --- |
| GET | `/certificate/generate-certificate/:slug` | Yes | `student` | Generate certificate after course completion |
| GET | `/certificate/fetch-certificate/:cid` | No | Public | Load certificate data by certificate id |
| GET | `/certificate/verify-certificate/:cid` | No | Public | Public certificate verification page |

Notes:

- `generate-certificate` is also course-access gated.

## Projects

Used for student project lists and solution submission flows.

| Method | Path | Auth | Role | Frontend usage |
| --- | --- | --- | --- | --- |
| GET | `/projects/course/:slug/projects` | Yes | `student` | List projects for an enrolled course |
| POST | `/projects/submitSolution` | Yes | `student` | Submit a project solution |
| PUT | `/projects/updateSolution` | Yes | `student` | Update an existing project solution |
| DELETE | `/projects/deleteSolution/:solutionId` | Yes | `student` | Delete a project submission |
| GET | `/projects/course/projects/:courseId` | Yes | `student` | Alternate project fetch by course id |
| POST | `/projects/projects/:projectId` | Yes | `student` | Newer project submission route by project id |
| PUT | `/projects/projects/solutions/:solutionId` | Yes | `student` | Newer project solution update route |

Notes:

- The backend contains both older and newer student submission routes.
- The frontend should standardize carefully instead of mixing both styles in new code.

## Bounties

Used for student bounty discovery, application, cancellation, submission, and reward flows.

| Method | Path | Auth | Role | Frontend usage |
| --- | --- | --- | --- | --- |
| GET | `/course-bounties/course/bounty/:slug` | Yes | `student` | List bounties for a course |
| GET | `/course-bounties/bounty-application/:id` | Yes | `student` | Get student bounty applications for a course/context |
| POST | `/course-bounties/bounty-application/:id` | Yes | `student` | Apply to a bounty |
| DELETE | `/course-bounties/cancel-application/:id` | Yes | `student` | Cancel a bounty application |
| POST | `/course-bounties/submit-bounty/:id` | Yes | `student` | Submit bounty work |
| GET | `/course-bounties/students/claim-reward` | Yes | `student` | Claim/list reward-related data |

Notes:

- The same router is also mounted under `/api/v2/projects`, but frontend should prefer `/course-bounties`.

## Contact Leads

Used for public contact/lead capture.

| Method | Path | Auth | Role | Frontend usage |
| --- | --- | --- | --- | --- |
| POST | `/contacts/leads` | No | Public | Submit contact form / lead capture |

## FAQ

Used for public FAQ content.

| Method | Path | Auth | Role | Frontend usage |
| --- | --- | --- | --- | --- |
| GET | `/faqs/faq` | No | Public | FAQ section rendering |

## Testimonals

Used for public testimonials/social proof.

| Method | Path | Auth | Role | Frontend usage |
| --- | --- | --- | --- | --- |
| GET | `/testimonals` | No | Public | Testimonials section rendering |

## Careers

Used for public job listings.

| Method | Path | Auth | Role | Frontend usage |
| --- | --- | --- | --- | --- |
| GET | `/careers/career` | No | Public | Careers page listing |

## Mentor

Included here because mentor is one of the active roles and some frontend screens already use these routes.

| Method | Path | Auth | Role | Frontend usage |
| --- | --- | --- | --- | --- |
| POST | `/mentors/login` | No | Public | Mentor login page |
| GET | `/mentors/profile` | Yes | `mentor` | Mentor profile page |
| GET | `/mentors/projects` | Yes | `mentor` | Mentor project queue |
| GET | `/mentors/projects/solutions/:projectId` | Yes | `mentor` | Review project solutions |
| GET | `/mentors/course/questions` | Yes | `mentor` | View student course questions |
| PUT | `/mentors/course/questions/:questionId/answer` | Yes | `mentor` | Answer student question |
| PUT | `/mentors/course/questions/sendAnswer/:questionId` | Yes | `mentor` | Alternate answer route used by current frontend |
| PUT | `/mentors/solutions/:solutionId/review` | Yes | `mentor` | Review a project solution |
| GET | `/mentors/courses/performance` | Yes | `mentor` | Student performance list |
| POST | `/mentors/student/update/performance` | Yes | `mentor` | Update student performance |

## Known Quirks

- V1 is disabled and should be ignored.
- `curriculam`, `testimonals`, and `demodashboard` are live names.
- The handoff doc and route files disagree on some course endpoints. Route files are safer as source of truth for implementation.
- `GET /courses/course/:id` should not be treated as a normal public endpoint.
- The current frontend's `auth-service` uses `/auth/auth/check`, which does not match the implemented student route.
- The current frontend discussion service correctly uses `POST /dashboard/course/:slug/topics/:topicId/questions`, which is more precise than the older handoff summary.

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  description: string;
  image?: string;
  content?: string;
  categories?: string[];
}
import commit from '@/assets/images/blogs/commits.png'
import status from '@/assets/images/blogs/status.png'
import varible from '@/assets/images/blogs/varible.png'
import seo from '@/assets/images/blogs/seo.png'
import profile from '@/assets/images/blogs/profile.png'





export const blogPosts: BlogPost[] = [
  {
    slug: "writing-better-git-commits",
    title: "Writing GitHub Commits the Right Way (and the Wrong Way)",
    date: "Nov 12, 2025",
    readTime: "6 min read",
    description:
      "Most developers write messy Git commits without realizing how much it hurts teamwork. Let’s see what good and bad commit messages look like — and how to write clean, useful ones.",
    image:commit,
    categories: ["Git", "Collaboration", "Best Practices"],
    content: `
When you work in a team, your **Git commit messages** become your *communication history*.  
Good commits make your code easy to understand. Bad ones make it painful.

Let's fix that.

---

## The Wrong Way

Most beginners write commits like these:

\`\`\`bash
git commit -m "fix"
git commit -m "update stuff"
git commit -m "changes done"
\`\`\`

Looks familiar?  
These say **nothing** about *what* changed or *why*.

---

## The Right Way

A good commit **tells a small, clear story**.

Use this simple structure:

\`\`\`
<type>: <short summary>
\`\`\`

### Example:
\`\`\`bash
git commit -m "fix: correct login validation logic"
git commit -m "feat: add password strength meter"
git commit -m "refactor: simplify cart total calculation"
\`\`\`

Notice how each message:
- Starts with a **verb** that describes the change  
- Explains **what** was done  
- Is short and consistent  

---

## Commit Types You Can Use

| Type | Meaning | Example |
|------|----------|---------|
| feat | New feature | \`feat: add user signup flow\` |
| fix | Bug fix | \`fix: handle empty username field\` |
| refactor | Code improvement | \`refactor: optimize API call\` |
| docs | Documentation change | \`docs: update README for setup guide\` |
| style | UI or formatting change | \`style: fix button padding\` |
| chore | Maintenance task | \`chore: update dependencies\` |

---

## Why It Matters

Good commits help you:
1. Understand your history quickly  
2. Generate clean changelogs automatically  
3. Work better in teams  
4. Look professional in open-source repos

---

## Pro Tip

Use **present tense**, keep it under **70 characters**, and explain *why*, not just *what*.

\`\`\`bash
git commit -m "fix: handle API error when user is offline"
\`\`\`

---

## Visual Example

![Good vs Bad Commits](https://i.ibb.co/CBgK8GQ/good-vs-bad-commits.png)

---

## TL;DR

Bad:
> "update stuff"  
> "final changes"

Good:
> "fix: correct total calculation"  
> "feat: add forgot password flow"

Good commits make your project organized, readable, and professional.
`,
  },

  {
    slug: "how-to-name-variables-in-code",
    title: "How to Name Variables the Right Way",
    date: "Nov 20, 2025",
    readTime: "5 min read",
    description:
      "Good variable names make your code readable. Bad ones turn it into chaos. Here's how to name variables that explain themselves and make your code easier to maintain.",
    image:varible,
    categories: ["Clean Code", "Best Practices", "JavaScript"],
    content: `
Naming variables looks simple — until you realize it's one of the hardest habits to master in programming.

---

## The Common Problem

Bad names slow down every developer who reads your code.

\`\`\`js
let x = 0;
let arr = [];
let temp = data.map(fn);
\`\`\`

These names tell you nothing. What is *x*? What’s inside *arr*?

---

## The Fix

A good variable name should:
1. Explain its purpose  
2. Match its data type  
3. Be consistent in style  

\`\`\`js
let totalUsers = 0;
let activeUsers = [];
let filteredProducts = products.filter(isAvailable);
\`\`\`

Now you can read the logic without scrolling back and forth.

---

## Guidelines for Naming

1. **Use nouns for values**  
   Example: \`userList\`, \`cartItems\`, \`loginAttempts\`
2. **Use verbs for functions**  
   Example: \`calculateTotal()\`, \`fetchUserData()\`
3. **Avoid abbreviations**  
   Example: use \`userCount\` instead of \`usrCnt\`
4. **Follow casing rules**  
   - camelCase → JS, TS  
   - snake_case → Python  
   - PascalCase → Classes / Components

---

## Wrong vs Right

| Wrong | Right |
|-------|--------|
| temp | currentUser |
| arr | productList |
| val | totalAmount |
| fn | handleLogin |

---

## Pro Tip

If a variable name needs a comment, it’s not clear enough.

Instead of:
\`\`\`js
let a = getPriceAfterTax(); // final price
\`\`\`

Just name it clearly:
\`\`\`js
let finalPrice = getPriceAfterTax();
\`\`\`

---

## TL;DR

Good names describe **what** something is.  
Bad names make you guess.  
Write code that speaks for itself.
`,
  },

  {
    slug: "understanding-api-status-codes",
    title: "Understanding API Status Codes",
    date: "Dec 2, 2025",
    readTime: "7 min read",
    description:
      "Every API response has a status code — but most developers only know 200 and 404. Here’s a breakdown of what each code actually means and when to use it.",
    image:
      status,
    categories: ["APIs", "Backend Basics", "Guides"],
    content: `
APIs communicate using **status codes** — small numbers that explain what happened during a request.

Let’s break them down simply.

---

## 1xx — Information

Rarely used in frontend work.  
Examples:
- 100 Continue  
- 101 Switching Protocols  

---

## 2xx — Success

| Code | Meaning | Example |
|------|----------|---------|
| 200 | OK | The request succeeded |
| 201 | Created | A new resource was made (e.g. new user signup) |
| 204 | No Content | Success, but no data to return (e.g. delete request) |

\`\`\`js
res.status(201).json({ message: "User created successfully" });
\`\`\`

---

## 3xx — Redirection

Used when a resource has moved.

| Code | Meaning |
|------|----------|
| 301 | Moved Permanently |
| 302 | Found (temporary redirect) |
| 304 | Not Modified |

---

## 4xx — Client Errors

| Code | Meaning | Common Use |
|------|----------|------------|
| 400 | Bad Request | Invalid input or missing field |
| 401 | Unauthorized | Missing or invalid auth token |
| 403 | Forbidden | You don’t have access |
| 404 | Not Found | Resource doesn’t exist |

\`\`\`js
res.status(404).json({ error: "User not found" });
\`\`\`

---

## 5xx — Server Errors

| Code | Meaning | Cause |
|------|----------|--------|
| 500 | Internal Server Error | Something failed on the backend |
| 502 | Bad Gateway | Server got invalid response from another server |
| 503 | Service Unavailable | API is temporarily overloaded |

---

## Quick Reference

| Category | Range | Meaning |
|-----------|--------|---------|
| Informational | 100–199 | Processing |
| Success | 200–299 | OK |
| Redirects | 300–399 | Resource moved |
| Client Errors | 400–499 | Request issue |
| Server Errors | 500–599 | Server issue |

---

## TL;DR

When debugging APIs:
- 2xx means success  
- 4xx means *your request* is wrong  
- 5xx means *the server* is wrong  

Understanding these saves hours of guesswork and makes you a better developer.
`,
  },
  {
  slug: "portfolio-vs-real-projects",
  title: "Portfolio vs Real Projects , What Recruiters Actually Look At",
  date: "Nov 13, 2025",
  readTime: "7 min read",
  categories: [ "Collaboration", "Best Practices"],
  description:
    "You spent weeks designing your portfolio — but does it really matter? Here’s what recruiters actually care about when they evaluate developers.",
  image:
    profile,
  content: `
Every developer eventually faces this question:

**“Should I spend time polishing my portfolio, or build more real projects?”**

The truth: **Recruiters don’t care how beautiful your portfolio looks.**
They care whether your work proves you can solve *real problems.*

Let's break that down.

---

## The Illusion of the Perfect Portfolio

Everyone starts with the same plan:
> “I’ll make a sleek portfolio with animations, dark mode, and a contact form.”

But here’s the problem —
a portfolio full of fake or tutorial projects tells recruiters nothing about your ability to **build, think, or debug.**

You might impress another student.
You won’t impress a hiring manager.

---

## What Recruiters Actually Check First

Recruiters spend **less than 60 seconds** looking at your profile.  
Here’s what they scan for (in order):

1. **LinkedIn or Resume Summary**  
   → They look for clarity — *what do you actually do?*

2. **GitHub Activity**  
   → Are your commits real or tutorial clones?

3. **Projects**  
   → Can they open one and instantly see your thinking?

4. **Code Quality**  
   → Variable names, folder structure, logic flow.

5. **Tech Stack Consistency**  
   → Are you mastering one ecosystem or chasing everything?

A fancy portfolio animation doesn’t pass this test — *real projects do.*

---

## What Counts as a “Real Project”

Recruiters define a “real project” as something that:

- **Solves a real-world problem** (not a random CRUD app)
- **Has users or data** — even if it's small
- **Shows decision-making** (folder structure, API logic, naming)
- **Runs in production** (deployed, stable, usable)
- **Can be explained clearly** in under 30 seconds

Example:
> A lead management system you built for a small business?  
✅ Real project.  
> Another “To-Do App”?  
❌ Practice project.

---

## How to Turn a Small Project Into a Real One

You don’t need to work at a company. You just need **context**.

Here’s the SkillHigh method to level up a side project:

1. **Pick a real user** — a friend, startup, or local business.
2. **Solve their actual pain point.**
3. **Build, deploy, and iterate** based on feedback.
4. **Write a short README** explaining decisions and challenges.
5. **Show metrics or outcomes** (e.g., “reduced manual work by 30%”).

Suddenly, your “simple project” becomes a **story of execution** — something recruiters remember.

---

## What a Great Portfolio Actually Looks Like

Your portfolio’s job isn’t to show off — it’s to **guide a recruiter’s curiosity.**

Structure it like this:

1. **Intro Section** — who you are, what you build.  
   Example: *“I’m a full-stack developer who builds real-world web apps that make workflows faster.”*

2. **Featured Projects** — 2–3 max.  
   Each with:
   - Short description (what problem it solves)
   - Stack used
   - GitHub + live demo link

3. **Blog or Documentation** — show your thought process.  
   (Even one post like this one sets you apart.)

4. **Simple, fast design** — recruiters don’t need animations.  
   They need **clarity.**

---

## The “Fake Busy” Trap

Building endless clones — Amazon, Spotify, Netflix — might *feel* like progress.  
But you’re not showing initiative, just repetition.

Recruiters can tell when your repo history looks like:
\`\`\`
todo-app/
spotify-clone/
netflix-clone/
portfolio-v2/
\`\`\`

Instead, they look for:
\`\`\`
freelance-dashboard/
client-feedback-api/
invoice-tracker/
ai-job-matcher/
\`\`\`

You don’t need *more* projects.  
You need *projects that matter.*

---

## The Real Test: Can You Explain It?

Next time you interview, and they ask:  
> “Tell me about a project you’re proud of.”

If you can explain:
- What problem it solved
- Why you made specific decisions
- What you’d improve if given more time

Then congratulations — you’ve already won 70% of the interview.

---

## TL;DR

| Portfolio | Real Projects |
|------------|----------------|
| Focuses on aesthetics | Focuses on impact |
| Often uses fake data | Built for real use |
| Shows what you learned | Shows what you solved |
| Impresses peers | Impresses recruiters |

A portfolio gets attention.  
Real projects get offers.

If you want recruiters to take you seriously —  
**build for users, not for Dribbble.**

That’s what SkillHigh stands for.
`,
},
{
  slug: "ai-powered-seo-machine-learning-search-rankings",
  title: "AI-Powered SEO: How Machine Learning Is Changing Search Rankings",
  date: "Nov 13, 2025",
  readTime: "8 min read",
  description:
    "Search engines don’t work the way they used to. Machine learning now decides what ranks, what gets ignored, and why traditional SEO tactics fail. Here's the hard truth about modern SEO.",
  image: seo,
  categories: ["SEO", "AI", "Machine Learning"],
  content: `
SEO in 2025 is not the SEO you learned from 2015 blog posts.  
Google isn't ranking pages based on keywords or backlinks alone — **machine learning models** now make most of the decisions.

If you're still doing old-school SEO, you're invisible.

Let’s break down what actually matters now.

---

## The Old SEO Strategy is Dead

People still think SEO works like this:

- Add keywords  
- Build backlinks  
- Write long articles  
- Pray Google likes it  

That formula died the day Google launched **RankBrain**, **BERT**, **MUM**, and dozens of ML-powered ranking systems.

Search engines don’t “match keywords.”  
They **understand intent** — like a mini AI inside Google judging whether your page actually helps the user.

---

## How Machine Learning Actually Ranks Your Page

### 1. **User Intent Detection**
Google now predicts what the user *really* wants, not what they typed.

Example:  
Search: “best phone under 20k”  
Google expects:
- Comparisons  
- Updated data  
- Real-world tests  
- Not affiliate garbage  
- Not keyword-stuffed blogs  

If your content doesn’t satisfy intent, you're done.

---

### 2. **Content Quality Scoring**
ML models evaluate:
- Sentence structure  
- Expertise in writing  
- Factual accuracy  
- Depth of explanation  
- Redundancy vs originality  

If your article is shallow or generic, the AI dumps it.

---

### 3. **User Behavior Signals**
ML monitors:
- How fast users bounce  
- How long they read  
- Whether they scroll  
- Whether they return  
- Whether they choose another result  

If users click back quickly, Google decides your page is trash — instantly.

---

### 4. **Semantic Understanding**
This is where ML destroys keyword SEO.

Google now understands:
- Topic relationships  
- Context  
- Synonyms  
- Subtopics within a niche  

You can't “stuff keywords” anymore — Google understands the topic better than most writers.

---

### 5. **E-E-A-T Scoring (Experience, Expertise, Authoritativeness, Trustworthiness)**

Yes, ML models are now checking:
- Are you credible?
- Do users trust your site?
- Does your content show real experience?
- Does the writer exist or are you a ghost?

Generic AI-generated content collapses instantly.

---

## What Actually Works in 2025 SEO

### 1. **Write like a practitioner, not a blogger.**
If you're explaining SEO but you’ve never ranked anything?  
Google knows. Users know. You're not ranking.

### 2. **Build topical authority, not random articles.**
Your site needs to go deep into a niche — not write about everything.

### 3. **Focus on user satisfaction, not bots.**
Google watches user behavior more than your meta tags.

### 4. **Publish information with real-world value.**
ML can detect:
- Vagueness  
- Repetition  
- Lack of depth  

Your content must *teach*, *prove*, or *solve* something.

### 5. **Improve page experience brutally.**
Slow pages get down-ranked immediately.  
Ugly layouts? Same result.

---

## The Harsh Truth About AI-Generated SEO Content

Everyone uses AI now.  
Most of them dump generic garbage online hoping it ranks.

Machine learning models detect:
- Predictable sentence structures  
- Repetitive phrasing  
- Lack of originality  
- Pattern-generated content  

If you're generating 50 low-effort AI blogs — Google wipes them.

But if you use AI to:
- Research  
- Outline  
- Enhance  
- Speed up workflow  

And then add **your actual expertise**, you’ll win.

AI + human insight = unstoppable  
AI-only = trash

---

## Where SEO is Headed (2026 and beyond)

Search engines are moving toward:
- **Topic graphs**  
- **Personalized rankings**  
- **Predictive intent**  
- **Real-time content quality scoring**  

In short:  
SEO won’t reward manipulation.  
Only **useful**, **expert-level**, **original** content survives.

---

## TL;DR

Modern SEO is driven by ML.  
If you want to rank:

- Forget keyword stuffing  
- Focus on user satisfaction  
- Build deep topical authority  
- Write with real expertise  
- Stop publishing generic AI content  
- Optimize for intent, not bots

Search engines are smarter than ever.  
If your content isn’t truly valuable — the algorithm will bury you.

That's the new reality.

`
}


];

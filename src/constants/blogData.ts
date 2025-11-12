export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  description: string;
  image?: string;
  content?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "writing-better-git-commits",
    title: "Writing GitHub Commits the Right Way (and the Wrong Way)",
    date: "Nov 12, 2025",
    readTime: "6 min read",
    description:
      "Most developers write messy Git commits without realizing how much it hurts teamwork. Let’s see what good and bad commit messages look like — and how to write clean, useful ones.",
    image:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1470&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?q=80&w=1470&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop",
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
];

# Personal Portfolio Website

A 6-page responsive portfolio built with plain HTML, CSS, and JavaScript
(no frameworks, no build step). Open `index.html` in a browser, or serve
the folder locally, to view it.

## Folder structure

```
portfolio/
├── index.html        Home page (hero, intro, quick links)
├── about.html         Background, education, goals, interests
├── skills.html         8 skills with animated proficiency bars
├── projects.html       4 projects, filterable, with an image modal
├── resume.html         Education / experience / certifications accordion
├── contact.html        Contact info + validated contact form
├── css/
│   └── style.css       All styling: variables, layout, components, responsive rules
├── js/
│   └── script.js        All behavior, organized as one function per feature
├── images/              SVG illustrations used across the site (no external image links)
├── assets/
│   └── resume.pdf        Placeholder downloadable résumé (replace with your own)
└── README.md
```

## How the pages fit together

Every page shares the same header/sidebar markup and loads the same
`css/style.css` and `js/script.js`, so there is exactly one place to
change navigation, color, or behavior for the whole site. `js/script.js`
is organized as one small function per feature (`initThemeToggle`,
`initMobileNav`, etc.); each function checks whether the elements it
needs exist before doing anything, which is why one script file works
safely across all six pages even though not every page has every
feature (for example, only `projects.html` has filter buttons).

## JavaScript features implemented

1. **Mobile navigation** — hamburger button opens/closes a full-screen drawer (`initMobileNav`)
2. **Contact form validation** — required fields, email format, minimum lengths, live error messages, character counter (`initContactForm`)
3. **Dark / light mode with `localStorage`** — remembers the visitor's choice across visits (`initThemeToggle`)
4. **Project filtering** — filter the project grid by technology tag (`initProjectFilter`)
5. **Image modal / lightbox** — click a project thumbnail to view it larger (`initImageModal`)
6. **Scroll-to-top button** — appears after scrolling, smooth-scrolls back up (`initScrollTopButton`)
7. **Typing effect** — animated role text on the home page hero (`initTypingEffect`)
8. **Skill bar animation** — bars fill in using `IntersectionObserver` when scrolled into view (`initSkillBars`)
9. **Accordion** — expandable Education / Experience / Certifications / Activities sections on the Resume page (`initAccordion`)
10. **Active navigation highlighting** — the current page's nav link is marked automatically (`initActiveNavLink`)

## Before you submit: make it actually yours

This starter is intentionally generic — replace the placeholder content
so it reflects you, and make sure you understand every part of it:

- [ ] Swap "Alex Rivera" and the bio/education/experience text for your own, in all six HTML files
- [ ] Replace `images/profile.svg` with your own photo or illustration (`.jpg`/`.png` work fine — just update the `<img src>` in `index.html`)
- [ ] Replace the four project entries in `projects.html` (and their thumbnails in `images/`) with your own work
- [ ] Update the email address and social links (GitHub, LinkedIn) everywhere they appear
- [ ] Replace `assets/resume.pdf` with your own résumé PDF, or remove the download button in `resume.html` if you don't want one
- [ ] Read through `js/script.js` function by function — be ready to explain what each one does and modify it if asked
- [ ] Double-check every internal link and image path after you rename or move files

## Deploying for free

You need a live URL and a public repository. Pick **one** of these:

### Option A — GitHub Pages
1. Create a new public repository on GitHub (e.g. `portfolio`).
2. Push this folder's contents to the repository's `main` branch:
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**, set **Source** to `main` branch, `/root`, and save.
4. Your site will be live at `https://YOUR-USERNAME.github.io/portfolio/` within a minute or two.

### Option B — Netlify
1. Push the folder to a GitHub repository (steps 1–2 above).
2. Go to [netlify.com](https://www.netlify.com), sign in, click **Add new site → Import an existing project**, and pick the repository.
3. Leave the build command blank and set the publish directory to `/` (the repo root), then deploy.

### Option C — Vercel
1. Push the folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com), sign in, click **New Project**, and import the repository.
3. Framework preset: **Other** (static site). Deploy.

After deploying, open the live URL yourself on desktop and mobile and
click through every page and every feature listed above before you
submit — this catches broken links or paths that only show up once the
site is hosted.

## Submission Format

```
Student Name:
Section:
Portfolio Title:
Live Website URL:
Repository URL:
Hosting Platform:
```

# Summit Labs - Standard Operating Procedures

**AI-Assisted Workflow for Solo Development**

IMPORTANT: Old username: 'ZenoTWV', new username: 'SummitLabDev'
---

## Core Principle

**You focus on creative work. AI handles the mechanical stuff.**

- **Claude Code (Sonnet/Opus)** - Building features, complex logic
- **Cheap AI (Haiku)** - Commit messages, issue creation, code review, deployments
- **Manual** - Final verification, client communication, design decisions

---

## 🧹 Dealing with Messy Codebase (Current Situation)

**When you have untracked files, uncommitted changes, leftover experiments:**

### Step 1: See the Mess
**Prompt (Haiku):**
```
Read SOPs/SOP-OVERVIEW.md for cleanup guidelines.

Scan codebase for cleanup:
- Unused files
- Leftover media/images not referenced in code
- Commented-out code
- Duplicate files
- Old backup files (.bak, .old, etc.)
- Empty directories
- Test files in wrong locations

Report what can be safely deleted.
```

### Step 2: Review & Decide
AI will list files. For each file, decide:
- **Delete** - Unused, safe to remove
- **Keep** - Actually needed
- **Add to .gitignore** - Generated files, temp files
- **Commit** - Should be tracked

### Step 3: Clean Up
**Delete unwanted:**
```
Delete these files: [list files you approved]
```

**Add to .gitignore:**
```
Add these patterns to .gitignore: [patterns]
```

**Commit what's needed:**
```
Add these files to git and commit: [files]
```

### Step 4: Tag Current Version
```
Tag new version. Current state is now v[X.X.X].
```

---

## The 10 SOPs

### 1. Issue Tracking

**When to create:**
- Whenever you think of something
- Client requests
- Bugs you notice
- Ideas for improvements

**Prompt (Haiku):**
```
Read @SOP-OVERVIEW.md - Create GitHub issue and assign it to me: [description]
```

---

### 2. Starting Work

**Prompt (Claude Code):**
```
I'm starting work on issue 3.
Read SOPs/SOP-OVERVIEW.md for DoD checklist and branch naming.
Read the issue, create DoD checklist, create branch, let's do this.
```

**Claude will:**
- Read SOP-OVERVIEW.md for standards
- Read issue via `gh issue view #X`
- Create feature-specific DoD (saves to `.ai/current-task.md`)
- Create branch: `feature/issue-X-description`
- Start building

**Standard DoD:**
- Mobile (375px), tablet (768px), desktop (1024px+)
- No console errors
- Chrome + Safari
- Dutch content correct
- Images optimized
- Forms work

---

### 3. Building Features

**No prompt needed** - just normal conversation with Claude.

Claude references the DoD checklist to ensure completeness.

You test in browser as you go.

---

### 4. Pre-Push Code Review

**Prompt (Haiku):**
```
Read SOPs/SOP-OVERVIEW.md for pre-push checklist.

Run pre-push code review.
```

**AI checks:**
- No `console.log()` or `debugger`
- No hardcoded API keys
- No commented-out code blocks (>5 lines)
- No TODO without issue numbers
- No unused imports
- Environment variables use `.env`
- No merge conflict markers

---

### 5. Commit Message

**Prompt (Haiku):**
```
Read SOPs/SOP-OVERVIEW.md for commit message format.

Generate commit message and commit.
```

**AI will:**
- Read conventional commit format from SOP
- Run `git diff`
- Extract issue number from branch name
- Generate commit
- Execute commit

**Format:**
```
type(scope): brief description

- Detail 1
- Detail 2

Closes #[issue-number]
```

**Types:** feat, fix, docs, style, refactor, test, chore

---

### 6. Testing

**Manual (you do this):**
```
Mobile (375px):
- [ ] Layout good
- [ ] Touch targets >44px
- [ ] No horizontal scroll

Tablet (768px):
- [ ] Layout adapts

Desktop (1024px+):
- [ ] Full layout
- [ ] Hover states work

Functionality:
- [ ] Click all buttons
- [ ] Submit all forms
- [ ] No console errors
```

**Optional AI test plan (Haiku):**
```
Generate test checklist for this feature.
```

---

### 7. Push to Feature Branch

**When:** Need Cloudflare preview (payments, env vars, client preview)

**Prompt (Haiku):**
```
Push to feature branch.
```

---

### 8. Merge to Production

**Prompt (Haiku):**
```
Read SOPs/SOP-OVERVIEW.md for merge process.

Merge to main and clean up.
```

**AI will:**
- Switch to main, pull latest
- Merge feature branch
- Push to main
- Delete local and remote branch
- Confirm deployment

**Result:**
- Cloudflare deploys (~1 min)
- Issue auto-closes
- Branch cleaned up

---

### 9. Version Tagging

**When:** At milestones only (not every commit)
- After client review rounds
- At launch
- After accumulating 2-3 significant features
- After major bug fix batches

**Versioning is SEPARATE from regular commits.** You push many commits to main during development. Only tag versions at milestones.

**Prompt (Haiku):**
```
Read SOPs/SOP-OVERVIEW.md for SemVer rules.

Tag new version. We added [changes].
```

**AI will:**
- Read SemVer rules from SOP
- Check current version
- Determine next version
- Tag and push

**Cleanup first (if needed):**
```
Clean up untracked files, then tag new version.
```

---

### 10. Documentation

**When:** After major features or every 2-3 weeks

**Prompt (Haiku):**
```
Update README.
```

---

### 11. Codebase Cleanup

**When:** Before versioning, or when things feel messy

**Prompt (Haiku):**
```
Read SOPs/SOP-OVERVIEW.md for cleanup guidelines.

Scan codebase for cleanup:
- Unused files
- Leftover media/images not referenced
- Commented-out code
- Duplicate files
- Old backup files (.bak, .old, etc.)
- Empty directories
- Test files in wrong locations

Report what can be safely deleted.
```

**AI will:**
- Scan project structure
- Check file references (imports, src attributes, etc.)
- Find unused assets
- Suggest safe deletions
- You approve before deletion

---

## Daily Workflow

### Think of Something
```
"Create GitHub issue: [description]" (Haiku)
```

### Start Work
```
"Read SOPs/SOP-OVERVIEW.md for standards.
I'm starting work on issue #23." (Claude Code)

→ Claude reads SOP, reads issue, creates DoD, creates branch, builds
→ You test in browser
```

### Before Commit
```
"Read SOPs/SOP-OVERVIEW.md for pre-push checklist.
Run pre-push review." (Haiku)

→ Fix issues

"Read SOPs/SOP-OVERVIEW.md for commit format.
Generate commit message and commit." (Haiku)
```

### Deploy
```
"Push to feature branch" (Haiku) - if need preview
→ Test on preview

"Read SOPs/SOP-OVERVIEW.md for merge process.
Merge to main and clean up." (Haiku)
```

### At Milestones
```
"Clean up untracked files, then tag new version" (Haiku)
or
"Read SOPs/SOP-OVERVIEW.md for SemVer.
Tag new version. We added [changes]." (Haiku)
```

### Weekly
```
Check Cloudflare Analytics (5 min)
"Update README" (Haiku) - if needed
```

---

## AI Model Usage

**Claude Code (Sonnet)** - Your precious resource
- Starting work (issue → DoD → branch → build)
- Building features
- Complex refactoring
- Architectural decisions

**Claude Code (Opus)** - Planning only
- Initial project planning
- Complex architecture
- Stuck on hard problems

**Cheap AI (Haiku)** - Mechanical tasks
- Issues
- Commits
- Code review checks
- Pushes/merges
- Versions
- Documentation
- Cleanup scans
- Test checklists

**Haiku cost:** $0.25/M input, $1.25/M output (20x cheaper than Sonnet)

**You** - Creative decisions
- Design
- Client communication
- Testing
- Prioritization

---

## Version Tracking

**Current version:** Git tags only (`git tag -l`)

**Don't specify version when starting work.**

Versions tagged AFTER merging to main, at milestones.

**SemVer:**
- Bug fixes only → PATCH (v1.0.1)
- New features → MINOR (v1.1.0)
- Breaking changes → MAJOR (v2.0.0)

---

## 🚀 Starting a New Project

**Use this workflow for brand new client projects.**

### Step 1: Scope the Project (Browser Claude Sonnet)

**Get clarity before planning:**

```
I have a new client project: [CLIENT_NAME] - [INDUSTRY]

Ask me 20 clarifying questions to define the scope:
- How many pages?
- What features per page?
- What integrations needed?
- Content source (client provides or I create)?
- Design vibe/references?
- Timeline expectations?
- Budget constraints?

Ask all questions at once so I can answer in one go.
```

**Answer all questions in one message.**

### Step 2: Plan the Project (Claude Opus in Plan Mode)

**Prompt:**
```
New client project: [CLIENT_NAME]

TECH STACK (DO NOT DEVIATE):
- Framework: Astro 5.x + TypeScript OR React + Vite (specify which)
- Styling: Tailwind CSS v4 (CSS-first via @theme) OR v3 (config file)
- Language: Dutch (nl) with i18n structure
- Hosting: Cloudflare Pages
- Animations: Framer Motion (if needed)

SCOPE:
[Paste answers from Step 1]

Enter plan mode. Create comprehensive plan saved to PLAN.md.

Include:
- Project structure
- Pages breakdown
- Component list
- Integration requirements
- Timeline estimate
```

**Opus will:**
- Enter plan mode
- Create PLAN.md
- Break down implementation
- Estimate timeline

**Review plan. If good, approve. If not, iterate with Opus.**

### Step 3: Initialize Project (Claude Sonnet)

**Prompt:**
```
Read PLAN.md.

Initialize new project for [CLIENT_NAME]:

1. Create project with [Astro/React + Vite]
2. Set up Tailwind CSS [v3/v4]
3. Configure i18n for Dutch
4. Set up basic folder structure per plan
5. Initialize git repo
6. Create initial README
7. First commit: "Initial project setup"
```

### Step 4: Tag Initial Version

**After basic setup is complete:**

```
Tag new version. Initial project setup complete. This is v0.1.0.
```

**v0.1.0 = Initial setup complete, ready to start building features**

### Step 5: Build Features (Claude Sonnet)

**Normal workflow from here:**
- Create issues for each feature from PLAN.md
- Work on issues one by one
- Follow regular workflow (issue → DoD → build → commit → merge)

### Step 6: Client Review Milestones

**After each major review round with client:**

```
Tag new version. Client review round [1/2/3] complete.
Implemented: [list changes]
```

**Versioning:**
- v0.1.0 = Initial setup
- v0.2.0 = First client review complete
- v0.3.0 = Second client review complete
- v0.4.0 = Final pre-launch adjustments
- **v1.0.0 = Client approved, site goes live 🎉**

### Step 7: Launch (Tag v1.0.0)

**When client approves and site goes live:**

```
Read SOPs/SOP-OVERVIEW.md for SemVer rules.

Tag new version. [CLIENT_NAME] launches today.
All features complete and approved.
This is v1.0.0 - production release.
```

**Create GitHub release:**
```
gh release create v1.0.0 \
  --title "[CLIENT_NAME] Launch 🎉" \
  --notes "Initial production release for [CLIENT_NAME].

## Features
- [List main features]

## Tech Stack
- [Framework + versions]

Live site: [URL]"
```

---

## Quick Reference: Project Lifecycle

```
New project → Scope (Sonnet browser) → Plan (Opus) → Init (Sonnet) → v0.1.0
  ↓
Build features → Test → Commit → Merge (daily work)
  ↓
Client review → Feedback → Iterate → v0.2.0
  ↓
Client review → Feedback → Iterate → v0.3.0
  ↓
Final touches → Client approval → v1.0.0 LAUNCH 🎉
  ↓
Post-launch → New features → v1.1.0
              Bug fixes → v1.0.1
```

---

*Version: 3.2 - Added New Project Workflow*
*Last Updated: 2025-12-28*

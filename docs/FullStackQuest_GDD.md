# Full-Stack Quest — Game Design Document

> A web-based, React-powered learning game that teaches full-stack web development by letting the player **ship an app through every layer of the stack**. Built as the development outline for the project: concept, user flow, systems, mini-game specs, data models, component architecture, and build roadmap.

---

## 1. Overview

| Field | Value |
|---|---|
| Working title | Full-Stack Quest |
| Platform | Web (desktop-first, responsive) |
| Tech | React + Tailwind + Framer Motion; client-side only, no backend required |
| Genre | Educational arcade / puzzle |
| Session length | 3–10 min per zone; resumable |
| Audience | Students learning the web-dev course (Topics 1–4) |
| Win condition | Complete all 5 zones + capstone; collect badges |

### Design pillars
1. **The map is the curriculum.** A request enters at the top, falls through each zone to the database, and the response climbs back up. Zones unlock in request-response order, so progression itself teaches architecture.
2. **Every concept gets a mechanic that mimics it.** No walls of multiple-choice. Blocking vs non-blocking is a juggling game; `UI = f(state)` is a literal state→render board; normalization is table-splitting.
3. **Fast feedback, visible progress.** Immediate correct/incorrect animation, XP bar, combo meter, badges.
4. **Content is data, not code.** Every question/level lives in a JSON bank, separated from logic — mirroring the course's own "separate what varies from what stays the same" principle.

### Content → zone map
| Zone | Theme | Source topic | Core mini-game |
|---|---|---|---|
| 1 · The Wire | How the web works | Topic 1 | Request Relay |
| 2 · The Frontier | Frontend / React | Topic 2 | Component Forge |
| 3 · The Engine Room | Node.js | Topic 3 | Event Loop Arcade |
| 4 · The Vault | Databases | Topic 4 (dbs + bpg) | Schema Architect |
| 5 · The Launchpad | Deployment | Topic 4 (deployment) | Ship It |
| Capstone | Full pipeline | All | Ship a Full-Stack App |
| Cross-cutting | Security, Git, REST, JSON | All | Bonus challenges |

---

## 2. Milestones & timeline

A clear breakdown of what ships in each milestone, when dependencies unlock work.

### M0 — Setup (Week 1)
**Goal:** Foundational scaffolding so all other work has a home.

| Issue | Description |
|-------|-------------|
| INF-1 | Vite + React project scaffold, folder structure |
| INF-2 | Design tokens, zone colors, Tailwind theme |
| INF-3 | Framer Motion, animation presets, reduced-motion guard |
| INF-4 | Flow machine (TITLE → ONBOARDING → OVERWORLD → ...), state routing |

**Blocks:** Everything else. Do this first.  
**Deliverable:** A launchable React app with zero content, just the flow skeleton.

---

### M1 — Core systems (Week 1–2)
**Goal:** The game logic engine: how XP, combos, lives, badges, and progress actually work.

| Issue | Description |
|-------|-------------|
| SYS-1 | Game state reducer + context + hooks |
| SYS-2 | localStorage persistence, rehydrate, export/reset |
| SYS-3 | XP calculation, level curve, level-up banner |
| SYS-4 | Combo meter, streak multiplier, "on fire" flourish |
| SYS-5 | Lives (3 per boss, non-boss rounds free) |
| SYS-6 | Scoring formula, accuracy %, stars (70/85/95%) |
| SYS-7 | Badge system (data-driven, test predicates, unlock checks) |
| SYS-8 | Review queue (push on miss, clear after 2 correct) |
| SYS-9 | Challenge data model, `buildRun()`, type → component router |

**Blocks:** UI screens, all mini-games, content.  
**Deliverable:** A complete game-state machine that can track a full playthrough (even without mini-games to run).

---

### M2 — Shell & screens (Week 2)
**Goal:** The UI frame that ties M1 into visible pages.

| Issue | Description |
|-------|-------------|
| UI-1 | Title screen (logo, continue, new game, stats) |
| UI-2 | Onboarding (3 cards, unfailable tutorial) |
| UI-3 | Overworld map (zones, unlock states, progress bar) |
| UI-4 | Zone intro card (concepts, badges available) |
| UI-5 | MiniGameShell (HUD: lives, combo, progress, pause) |
| UI-6 | Feedback moment (correct/wrong animations + explanations) |
| UI-7 | Zone results (XP, accuracy, stars, badge, weak concept) |
| UI-8 | Profile & badge shelf |
| UI-9 | Pause overlay & settings (sound, reduced motion) |

**Depends on:** M0 ✓, M1 ✓  
**Blocks:** All mini-games (they mount inside UI-5).  
**Deliverable:** All screens working with dummy data; can navigate the full flow (though no actual mini-games yet).

---

### M3 — Mini-games & Code Lab (Weeks 3–5)
**Goal:** The learning content: 5 zones × ~4–5 sub-games each, plus the Code Lab IDE.

**Zone breakdown:**

| Zone | Sub-games | Boss | Content | Total issues |
|------|-----------|------|---------|--------------|
| 1: Wire | Status Code Sorter, Method Match, Header Detective | Site Down | HTTP codes/headers | 5 |
| 2: Frontier | State→Render, Prop Drilling, V-DOM Diff, Framework Cards | Broken Render | React state/props | 6 |
| 3: Engine Room | Event Loop Arcade, Middleware Pipeline, Module Loader | The Hang | Node/async/modules | 5 |
| 4: Vault | Query Builder, Key Linker, Normalization Lab, SQL/NoSQL | Anomaly Hunt | SQL/normalization | 6 |
| 5: Launchpad | Architecture Builder, Wire Env, Trade-off Cards | Failed Deploy | Deployment/env | 5 |
| Code Lab | Core editor, token-bank validator, JS executor, sql.js, content | — | Syntax gaps per zone | 5 |

**Parallelizable:** All 5 zones + Code Lab can be built simultaneously once UI-5 is ready.  
**Deliverable:** A fully playable game with all 5 zones, each with 3–5 sub-games + a boss. Review queue feeds missed items back into practice.

---

### M4 — Meta & Capstone (Week 5)
**Goal:** The endgame: tie all zones into a final boss run + unlock review/endless modes.

| Issue | Description |
|-------|-------------|
| META-1 | Capstone gauntlet (one challenge per zone, timed, stack diagram fills) |
| META-2 | End sequence ("App Shipped" celebration, unlock Review + Endless) |
| META-3 | Review Mode (serve only review-queue items, mixed zones) |
| META-4 | Cross-cutting challenges (SQL injection, XSS, secrets, Git, REST, JSON) |
| META-5 | Endless / daily mode (random challenges, no lives) |

**Depends on:** All 5 zones + bosses ✓  
**Deliverable:** A complete game loop: play zones → unlock capstone → ship app → review mode for weak areas.

---

### M5 — Polish (Week 6)
**Goal:** Shine: animations, audio, accessibility, mobile, balance, documentation.

| Issue | Description |
|-------|-------------|
| POL-1 | Animation pass (packet travel, card flips, highlights, level-up, reduced-motion) |
| POL-2 | Audio (SFX + per-zone loop, muteable, respects system) |
| POL-3 | Accessibility (keyboard drag alts, ARIA, contrast, focus order, screen reader) |
| POL-4 | Responsive / mobile (narrow layouts, touch targets, drag alts) |
| POL-5 | Playtest & balance (tune XP curve, difficulty, star thresholds) |
| POL-6 | README & docs (setup, architecture, how to add challenges/mini-games) |

**Depends on:** Everything else ✓  
**Deliverable:** A polished, accessible, mobile-friendly game ready to ship.

---

## Timeline summary

| Milestone | Timeline | Work type |
|-----------|----------|-----------|
| M0 | Week 1 | Setup (sequential) |
| M1 | Week 1–2 | Systems (sequential, overlaps M0) |
| M2 | Week 2 | Screens (sequential, overlaps M1) |
| M3 | Weeks 3–5 | **Content (5 zones parallelizable)** |
| M4 | Week 5 | Capstone (after M3 zones complete) |
| M5 | Week 6 | Polish (final pass) |

**Estimated solo:** 6 weeks  
**Estimated with 2-person team:** 4–5 weeks (M3 parallelized)  
**Critical path:** M0 → M1 → M2 → M3 → M4 → M5 (everything blocks the next phase)

---

## 2. User flow

### 2.1 Top-level flow

```
Launch
  └─> Title screen ──> [New game] ──> Onboarding (first run only)
                       [Continue] ──> Overworld
                                          │
                          ┌───────────────┴───────────────┐
                          ▼                                ▼
                   Select unlocked zone            View profile / badges
                          │
                          ▼
                   Zone intro card (learning goals)
                          │
                          ▼
                   Mini-game rounds (3–6 challenges)  ◄──┐
                          │                              │ retry
                          ▼                              │
                   Zone boss encounter ─────── fail ─────┘
                          │ pass
                          ▼
                   Zone results (XP, badges, accuracy)
                          │
                          ▼
                   Unlock next zone ──> back to Overworld
```

After all 5 zones: the **Capstone** unlocks on the overworld. Completing it triggers the "App Shipped" end sequence and unlocks endless/review mode.

### 2.2 Screen-by-screen

1. **Title screen** — logo, New Game / Continue, settings (sound, reduced motion), stats summary.
2. **Onboarding (first run)** — 3 quick cards explaining the stack-journey metaphor, the XP/combo system, and how a single mini-game works (interactive tutorial round that can't be failed).
3. **Overworld** — the vertical zone map (see concept map). Unlocked zones are bright and clickable; locked zones are dimmed with a "complete Zone N to unlock" tooltip. Shows global XP bar, level, and stack-completion %.
4. **Zone intro card** — zone name, the real concepts it covers (e.g. "HTTP methods, status codes, client-server model"), and the badge(s) available. One tap to start.
5. **Mini-game round** — the playfield. Persistent HUD: lives, combo multiplier, round progress (e.g. 3/6), XP earned this round, pause button.
6. **Feedback moment** — after each answer: correct → green pulse + combo tick + 1-line reinforcement; incorrect → shake + correct answer + short explanation, and the item is pushed to the review queue.
7. **Boss encounter** — a single harder, multi-step "debug" scenario. 3 lives. Failure returns to a retry of the boss (not the whole zone).
8. **Zone results** — XP gained, accuracy %, new badges, "weakest concept" callout, buttons: Replay zone / Continue.
9. **Profile** — level, total XP, badge shelf, per-zone accuracy, review queue size.
10. **Capstone** — sequential one-challenge-per-zone gauntlet, timed, with a stack diagram filling in as each layer is cleared.
11. **End sequence** — celebratory "deploy" animation; unlocks Review Mode and Endless Mode.

### 2.3 State transitions (game flow machine)

States: `TITLE → ONBOARDING → OVERWORLD → ZONE_INTRO → PLAYING → BOSS → RESULTS → OVERWORLD` (loop), plus `CAPSTONE → END`. `PAUSED` and `PROFILE` are overlays that suspend the active state and return to it.

---

## 3. Core systems

### 3.1 Game state model

A single source of truth held in a reducer. Suggested shape:

```js
gameState = {
  flow: "OVERWORLD",          // current flow-machine state
  player: {
    level: 3,
    xp: 1240,                  // total lifetime XP
    xpIntoLevel: 40,           // XP toward next level
  },
  zones: {
    z1: { unlocked: true,  completed: true,  bestAccuracy: 0.92, stars: 3 },
    z2: { unlocked: true,  completed: false, bestAccuracy: 0.0,  stars: 0 },
    // ...
  },
  run: {                       // the active mini-game session, null when not playing
    zoneId: "z2",
    queue: [/* challenge ids */],
    index: 2,
    lives: 3,
    combo: 4,
    correct: 6,
    total: 8,
    xpThisRun: 180,
  },
  badges: ["normalizer", "loop_keeper"],
  reviewQueue: [/* missed challenge ids */],
  settings: { sound: true, reducedMotion: false },
}
```

### 3.2 Progression & leveling
- **XP per correct answer:** base 20, scaled by difficulty (×1 / ×1.5 / ×2 for easy/med/hard) and by current combo (see 3.4).
- **Level curve:** `xpForLevel(n) = 100 * n^1.5` (gentle, predictable). Level-up shows a banner and may unlock a cosmetic.
- **Stars per zone (0–3):** awarded on the zone results screen by accuracy thresholds (e.g. ≥70% = 1★, ≥85% = 2★, ≥95% = 3★). Drives replay motivation.
- **Stack-completion %:** zones completed / total, displayed on the overworld as the headline progress metric.

### 3.3 Lives / health
- Mini-game rounds are **forgiving**: wrong answers cost combo and XP but not a life — the goal is learning, not punishment.
- **Boss encounters** use 3 lives; losing all returns to a boss retry. This concentrates pressure at a meaningful checkpoint rather than throughout.

### 3.4 Streak / combo
- Each consecutive correct answer increments `combo`. XP multiplier = `1 + min(combo, 5) * 0.2` (caps at ×2 at combo 5).
- A wrong answer resets `combo` to 0.
- Visual: a combo meter that fills and pulses; hitting ×2 triggers a brief "on fire" flourish. This is the primary moment-to-moment reward loop.

### 3.5 Badges / achievements
Defined as data so they're easy to add:

```js
badge = {
  id: "normalizer",
  name: "Normalizer",
  desc: "Reach 3NF with no wasted moves",
  zone: "z4",
  test: (run) => run.zoneId === "z4" && run.wastedMoves === 0,
}
```

Starter set: Status Sleuth (Z1 perfect codes), Loop Keeper (Z3 no stalls), Normalizer (Z4 clean), Architect (Z5 best-fit deploy), Shipper (capstone complete), Flawless (any zone 100%), Comeback (win a boss on last life).

### 3.6 Review queue (the highest-value study feature)
- Every missed challenge id is pushed to `reviewQueue`.
- A lightweight spacing rule: a missed item must be answered correctly **twice** (not necessarily consecutively) before it leaves the queue.
- **Review Mode** (unlocked after capstone, or accessible anytime there are items) serves only queued items, mixed across zones. This converts mistakes into targeted practice.

### 3.7 Scoring summary (per round)
`roundScore = Σ(correct answers × baseXP × difficultyMult × comboMultAtTime)`. Accuracy = `correct / total`. Both feed the results screen and star calculation.

### 3.8 Persistence
- In a normal deployment, serialize `gameState` to `localStorage` on every meaningful transition (answer, zone complete) and rehydrate on load.
- If ever shipped as an in-chat artifact, `localStorage` is unavailable — keep state in memory for the session and offer an export/reset.

---

## 4. Mini-game specifications

Each mini-game shares a common interface so they're swappable and easy to extend:

```js
<MiniGame
  challenge={challengeObject}
  onAnswer={(isCorrect, meta) => {}}   // updates combo, XP, review queue
  onComplete={() => {}}                // round finished
/>
```

### Zone 1 · The Wire — "Request Relay"
**Goal:** client-server model, HTTP methods, status code classes, request vs response headers, web servers.

| Sub-game | Mechanic | Win / lose |
|---|---|---|
| Status Code Sorter | Fling scenario cards into 2xx/3xx/4xx/5xx buckets, then the exact code | Correct bucket + code = XP; wrong = explanation |
| Method Match | Tap correct HTTP method for an action under a timer | Speed-scored |
| Header Detective | Tag each header as client (request) or server (response) | All-correct bonus |

**Boss — "Site Down":** three symptoms fire; player diagnoses the broken layer (DNS / server / client) and the responsible status code.

**Challenge data example:**
```js
{ id: "z1_004", zone: "z1", type: "status_sort",
  prompt: "The page has permanently moved to a new URL.",
  answer: "301", group: "3xx",
  explain: "3xx = redirection; 301 = Moved Permanently." }
```

### Zone 2 · The Frontier — "Component Forge"
**Goal:** `UI = f(state)`, props vs state, component composition, Virtual DOM / reconciliation, framework-vs-library landscape.

| Sub-game | Mechanic | Win / lose |
|---|---|---|
| State → Render | Set state via toggles/sliders to hit a target rendered UI | Render matches target = win |
| Prop Drilling | Drag data from a parent to the exact child that needs it | Correct path renders the child |
| Virtual DOM Diff | Tap only the nodes that changed between two DOM trees | Spot all + no false taps |
| Framework Cards | Snap trait cards (JSX, opinionated, compiler-based…) onto React/Angular/Vue/Svelte | All matched |

**Boss — "Broken Render":** a component renders wrong; player identifies which state value drives the bug and corrects it.

### Zone 3 · The Engine Room — "Event Loop Arcade"
**Goal:** single-threaded event loop, blocking vs non-blocking, sync vs async + callbacks, Express middleware + `next()`, Node modules.

| Sub-game | Mechanic | Win / lose |
|---|---|---|
| Keep the Loop Unblocked | Route incoming tasks: sync → main thread (handle now), async → side lane (callback later). A long task on the main thread stalls everything | Survive the wave without stalling |
| Middleware Pipeline | Order Express middleware correctly and remember `next()` | Missing `next()` = request hangs |
| Module Loader | Match `path` / `events` / `child_process` / `process` to purpose; `require` vs `import` syntax | All-correct |

**Boss — "The Hang":** a request never resolves; player finds the missing `next()` or the blocking call.

### Zone 4 · The Vault — "Schema Architect"
**Goal:** SQL (SELECT/WHERE/GROUP BY/COUNT/INSERT/UPDATE/DELETE), PK/FK relations, normalization 1NF→3NF, functional dependencies, anomalies, SQL vs NoSQL.

| Sub-game | Mechanic | Win / lose |
|---|---|---|
| Query Builder | Drag SQL clause blocks to assemble a query; matching rows highlight live in a visible table | Result set matches target |
| Key Linker | Draw PK→FK links across two tables | Correct links join cleanly |
| Normalization Lab | Split a messy table into new tables to clear flagged anomalies, advancing 1NF→2NF→3NF | Reach 3NF; fewer moves = more stars |
| SQL vs NoSQL Triage | Route a requirement to Postgres or MongoDB | Correct store |

**Boss — "Anomaly Hunt":** a schema with an update anomaly; normalize it under a move limit.

**Normalization Lab data example:**
```js
{ id: "z4_norm_01", zone: "z4", type: "normalize",
  table: "Orders",
  columns: ["OrderID","Product","Qty","Customer","CreditCard","CardType"],
  functionalDeps: [["CreditCard","CardType"]],
  targetForm: "3NF" }
```

### Zone 5 · The Launchpad — "Ship It"
**Goal:** deployment architectures (monolith, separate tier, Next.js full-stack, serverless/JAMstack, containerized), env vars / `dotenv`, self-hosted vs managed, SQL vs NoSQL hosting.

| Sub-game | Mechanic | Win / lose |
|---|---|---|
| Architecture Builder | Pick + assemble a deploy shape to satisfy given constraints (traffic, budget, separation) | Fit score above threshold |
| Wire the Env | Drag secrets into `.env`, load via `dotenv`, never hard-code | All secrets externalized |
| Trade-off Cards | Match self-hosted vs managed pros/cons | All matched |

**Boss — "Failed Deploy":** diagnose a missing env var, a load-mismatched architecture, or an exposed secret.

---

## Code Lab (cross-cutting mini-game)

**Goal:** Syntax reinforcement through small code snippets. A mini-IDE where players fill `// TODO` gaps in real, recognizable code from the course slides.

**Core mechanic:**
- An editor opens with a snippet (≤12 lines) with one or more `// TODO` slots
- Player fills each gap by selecting from a **token palette** (drag/tap, not free text)
- A **Run tests** button lights up a console panel showing pass/fail assertions
- **Hints** reveal the gap's shape (e.g., "a function call") and cost combo

**Challenge data example:**
```js
{ id: "z3_code_03", zone: "z3", type: "code_fill", difficulty: "med",
  file: "server.js", language: "javascript",
  code: [
    "const express = require('express');",
    "const app = express();",
    "",
    "app.use(express.json());",
    "",
    "app.get('/users', (req, res) => {",
    "  // TODO: respond with status 200",
    "  res.{{0}}(200).json(users);",
    "});",
    "",
    "app.listen(3000);"
  ],
  gaps: [{ id: 0, accept: ["status"], palette: ["status","send","code","header"],
           hint: "a method that sets the response status code" }],
  tests: [
    { label: "route GET /users is defined", kind: "static" },
    { label: "responds with 200", kind: "exec", assert: "res.status called with 200" }
  ],
  explain: "res.status(code) sets the HTTP status; .json() sends the body." }
```

### Content per zone

- **Zone 1 (Wire):** HTTP basics (`res.status()`, request headers, URL routing)
- **Zone 2 (Frontier):** React (`const [n, setN] = useState(0)`, prop passing, `export function`)
- **Zone 3 (Engine Room):** Node (`require('___')`, `import path from`, `emitter.on()`, `process.env.___`)
- **Zone 4 (Vault):** SQL & ORM (`SELECT ___(col) FROM table`, `WHERE`, `INSERT VALUES`, `pool.query()`, `User.sync()`)
- **Zone 5 (Launchpad):** Env & deployment (`dotenv.config()`, `process.env.PORT`, `.env` syntax)

### Validation strategies

**CL-2: Token-bank matcher (default)**
- Each gap has a set of accepted tokens; correct selection = pass
- Lightweight, works across all languages, no execution risk
- Used for ~80% of Code Lab challenges

**CL-3: JS sandbox executor (optional, Engine Room / Frontier)**
- Run patched snippet in a sandboxed `Function` with assertions
- Real "did it work?" feedback for JavaScript
- Higher cognitive load; opt-in for confident learners

**CL-4: sql.js runner (Vault)**
- WASM SQLite seeded with the ArtWorks/Artists tables from Topic 4
- Player's SQL runs against real data; result set is diffed vs target
- Most satisfying for SQL queries; pairs naturally with Query Builder

---

## 5. Capstone

A timed gauntlet stringing one challenge per zone **in request-response order**: route the request (Z1) → render the UI (Z2) → unblock the server (Z3) → query the DB (Z4) → deploy (Z5). A stack diagram fills in layer-by-layer as each is cleared. Completion plays the "App Shipped" sequence and unlocks Review + Endless modes.

---

## 6. Cross-cutting content

Woven in as bonus challenges and boss twists rather than a separate zone, so they feel like real engineering concerns:
- **Security:** SQL injection (Query Builder), XSS (Forge), HTTPS + never-commit-secrets (Launchpad).
- **Git:** a commit/branch/merge puzzle as a between-zone interlude.
- **REST API design:** match endpoints to method + resource path (bridges Z1 and Z3).
- **JSON:** read/repair a payload.
- **Accessibility / responsive:** optional star challenges in the Forge.

---

## 7. Component architecture (React)

```
src/
├─ App.jsx                      // flow machine + providers
├─ state/
│  ├─ gameReducer.js            // all transitions
│  ├─ GameContext.jsx           // context provider + hooks
│  └─ selectors.js
├─ data/
│  ├─ challenges/               // one file per zone
│  │  ├─ zone1.js
│  │  └─ ...
│  ├─ badges.js
│  └─ zones.js                  // zone metadata + unlock order
├─ screens/
│  ├─ TitleScreen.jsx
│  ├─ Onboarding.jsx
│  ├─ Overworld.jsx             // the zone map
│  ├─ ZoneIntro.jsx
│  ├─ Results.jsx
│  ├─ Profile.jsx
│  └─ Capstone.jsx
├─ minigames/
│  ├─ MiniGameShell.jsx         // shared HUD: lives, combo, progress
│  ├─ StatusCodeSorter.jsx
│  ├─ MethodMatch.jsx
│  ├─ StateToRender.jsx
│  ├─ VirtualDomDiff.jsx
│  ├─ EventLoopArcade.jsx
│  ├─ MiddlewarePipeline.jsx
│  ├─ QueryBuilder.jsx
│  ├─ NormalizationLab.jsx
│  └─ ArchitectureBuilder.jsx
├─ components/                  // XPBar, ComboMeter, BadgeShelf, Card, Button
└─ lib/                         // scoring.js, persistence.js, rng.js
```

### State management
- `useReducer` + Context for global game state; `useState` inside mini-games for local interaction.
- Mini-games never mutate global state directly — they emit results via `onAnswer` / `onComplete`, and the reducer owns XP, combo, unlocks, and the review queue. This keeps the data flow one-directional (and is itself a teachable React pattern).

### Content loading
- All challenges import from `data/challenges/*`. A `buildRun(zoneId, { count, difficultyCurve, reviewBias })` helper assembles each round, optionally weighting in review-queue items.

---

## 8. Visual & UX design

- **Look:** clean, flat, friendly; the zone colors from the concept map (blue/purple/teal/amber/coral) used consistently per zone so the player always knows "where in the stack" they are.
- **Motion (Framer Motion):** packet travel along the relay, card flips, table rows highlighting, combo pulses, level-up banner. All wrapped in a reduced-motion guard.
- **Feedback language:** green pulse + 1-line reinforcement on correct; gentle shake + correct answer + short "why" on wrong. Never punitive.
- **HUD:** lives (boss only), combo meter, round progress, XP-this-run, pause — always in the same position.
- **Accessibility:** keyboard-operable drag alternatives, ARIA labels, sufficient contrast (esp. status-code colors paired with text, not color alone), reduced-motion setting.

### Audio (optional, low priority)
Short SFX for correct/incorrect/combo/level-up and a soft loop per zone. Always muteable; default respects system settings.

---

## 9. Content bank organization

- One file per zone under `data/challenges/`, each exporting an array of challenge objects with a shared schema: `{ id, zone, type, difficulty, prompt, answer, choices?, explain, ...typeSpecificFields }`.
- `type` selects which mini-game component renders the challenge.
- Target counts for a solid first build: ~12–16 challenges per zone across its sub-games, plus 1 boss scenario each. The Normalization Lab and Query Builder can be parameterized to generate variants from a few templates.

---

## 10. Build roadmap

| Phase | Deliverable | Proves |
|---|---|---|
| 1 | App shell + flow machine + Overworld map + XP/combo plumbing + **one** working sub-game (Status Code Sorter) end-to-end | Core loop |
| 2 | Full Zone 1 (all sub-games) + boss pattern + Results screen | Zone template |
| 3 | Zones 2–5, one at a time, reusing the mini-game interface | Content scale |
| 4 | Capstone + badges + review queue + profile | Meta systems |
| 5 | Polish: animations, audio, cross-cutting security/Git/REST challenges, persistence | Ship quality |

### Tech stack
React 18, Tailwind for styling, Framer Motion for animation, native HTML5 drag-and-drop (or a small DnD lib) for drag mechanics, `localStorage` for persistence. No backend — the lesson *is* the backend; the app stays client-side.

### Definition of done (MVP)
All 5 zones playable with bosses, XP/combo/badges working, review queue functional, progress persists, capstone completable, reduced-motion respected.

---

## 11. Stretch goals
- Daily challenge / endless mode pulling random challenges across zones.
- Per-concept mastery meters on the profile (e.g. "status codes 80%").
- Leaderboard (local) by accuracy or speed.
- Author mode: add challenges via a form that appends to the data bank.
- "Explain this" deep-dive links from any missed item back to the relevant concept.

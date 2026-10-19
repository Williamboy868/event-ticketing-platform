# Event Ticketing Platform - AI Agent Handbook

> **Notice for AI Agents:** This document is the authoritative developer and agent guideline for the **Event Ticketing Platform**. Before taking any coding action, designing modules, or running database workflows, you **MUST** read and adhere to the guidelines, MCP server integrations, and local skill runbooks detailed below.

<<<<<<< HEAD
> [!IMPORTANT]
> **MANDATORY DIRECTIVE — READ SKILLS & USE MCP SERVERS FIRST:**
> Before taking **ANY** action, creating or modifying files, or designing architecture, agents **MUST** thoroughly read their relevant domain skills in `.agents/skills/` and, when necessary, query their configured MCP servers (`better-auth`, `Prisma`, `arcjet`) to retrieve live, authoritative documentation, contracts, and best practices. Never proceed based on guesses, assumptions, or legacy syntax.
=======
## Technology Stack
- **Framework:** NestJS
- **Language:** TypeScript
- **Package Manager:** Bun
- **Database ORM:** Drizzle ORM
- **Authentication:** Better Auth
- **Security / Rate Limiting:** Arcjet
- **Testing:** Vitest
- **Linting:** oxlint
- **Formatting:** Prettier
>>>>>>> c2a9fbcc91c2f26e16a4dd6d86a129722c8b6fe8

> [!CAUTION]
> **STRICT PRIVACY POLICY — DO NOT READ `.env` FILES:**
> Agents must **NEVER** read, view, open, inspect, or output the user's `.env` file (including `.env`, `.env.local`, `test/.env`, or any `.env*` file). Refer strictly to `.env.example` for environment variable templates and configuration structure.

<<<<<<< HEAD
---
=======
- **Drizzle ORM:**
  - **Skills:** `drizzle-orm`
  - **Usage:** Use Drizzle ORM for database schema definitions, migrations, and type-safe queries instead of Prisma.
>>>>>>> c2a9fbcc91c2f26e16a4dd6d86a129722c8b6fe8

## 1. Project Overview & Architectural Mission

The **Event Ticketing Platform** is an enterprise-grade backend built with **NestJS 12**, **TypeScript 6**, and **Bun**. It manages end-to-end ticketing lifecycles including:
- Organizer event creation, tiering, and scheduling.
- High-concurrency ticket reservations and order placement.
- Better Auth-based role management (Organizers vs. Participants) and secure authentication.
- Arcjet-powered anti-scalping, rate limiting, and bot protection.
- Contract-first relational data modeling via **Prisma 8**.

<<<<<<< HEAD
---
=======
## Development Rules
1. **Tooling & Skills:** **ALWAYS read your available skills and query relevant MCP servers before taking any action or writing code.** The ecosystem changes rapidly (e.g., Drizzle ORM updates), and these resources contain the source of truth.
2. **Privacy:** **Never read the `.env` file under any circumstances.**
3. **Package Management:** Always use `bun` instead of `npm` or `yarn` for managing dependencies and running scripts. Note: On Windows PowerShell, if scripts fail due to execution policies, fallback to using `bun.cmd` or `bunx.cmd`.
4. **Architecture:** Follow standard NestJS architecture (Modules, Controllers, Services). Keep business logic in services.
5. **Testing:** Use Vitest for writing unit and e2e tests.
6. **Code Quality:** Ensure code passes `oxlint` checks and is formatted with Prettier before completing tasks.
>>>>>>> c2a9fbcc91c2f26e16a4dd6d86a129722c8b6fe8

## 2. Technology Stack & Runtime

| Component | Technology | Version / Specifics |
| :--- | :--- | :--- |
| **Runtime & Package Manager** | **Bun** | `v1.4.2` (Strictly enforced: `bun install`, `bun run`, `bun test`) |
| **Backend Framework** | **NestJS** | `v12.x` (Modular architecture, DI, Guards, Interceptors) |
| **Language** | **TypeScript** | `v6.x` (Strict ESM mode, `NodeNext`/`bundler` resolution) |
| **Database & ORM** | **Prisma 8 (Prisma Next)** | `@prisma/orm-postgres` (`v8.0.0-rc.14`), `prisma` (`v8.0.0-rc.19`) |
| **Authentication** | **Better Auth** | TypeScript-first authentication with PostgreSQL session adapter |
| **Security & Rate Limiting** | **Arcjet** | `@arcjet/nest` (`v1.14.0`) with shield, bot detection, and rate limits |
| **Testing** | **Vitest** | `v4.1.2` (Unit tests + End-to-End test suites) |
| **Linting & Formatting** | **oxlint** & **Prettier** | Fast Rust-based linting (`oxlint`, `oxlint-tsgolint`) + Prettier |

---

## 3. Configured MCP Servers (Model Context Protocol)

The following remote MCP servers are configured in `~/.gemini/config/mcp_config.json` to equip you with live, real-time documentation and tooling. **Always invoke these servers for authoritative API and implementation queries:**

### 1. Better Auth MCP (`better-auth`)
- **Server Endpoint:** `https://mcp.better-auth.com/mcp`
- **Purpose:** Up-to-date documentation retrieval for Better Auth core, NestJS integration patterns, plugins (2FA, Organization, Email/Password), session cookie management, and schema adapters.
- **When to query:** Whenever implementing auth routes, guards, session tokens, password hashing, OAuth callbacks, or organization permission checks.

### 2. Prisma MCP (`Prisma`)
- **Server Endpoint:** `https://mcp.prisma.io/mcp`
- **Purpose:** Up-to-date Prisma 8 documentation, PSL contract grammar (`contract.prisma`), typed SQL query builder syntax (`db.sql`), and migration planning.
- **When to query:** Whenever modifying database contracts, generating migrations, debugging schema relations, or running typed database queries.

### 3. Arcjet MCP (`arcjet`)
- **Server Endpoint:** `https://api.arcjet.com/mcp`
- **Purpose:** Security configuration guides, IP rate limiting rules, sliding window configurations, email verification, and bot detection strategies.
- **When to query:** When setting up route guards, defending checkout endpoints against scalp bots, or validating participant signup security.

---

## 4. Local Skills Available in Workspace

Comprehensive domain skills are installed locally inside `.agents/skills/`. **You MUST read the relevant `SKILL.md` before writing implementation code:**

### Better Auth Skill Suite
| Skill | Location | Key Capabilities |
| :--- | :--- | :--- |
| **`better-auth-best-practices`** | `.agents/skills/better-auth-best-practices/SKILL.md` | Server/client instance setup, adapter binding, session lifecycle, error handling, plugin registration. |
| **`better-auth-security-best-practices`** | `.agents/skills/better-auth-security-best-practices/SKILL.md` | CSRF defense, secure cookie flags, session invalidation, password policy enforcement, brute force protection. |
| **`create-auth`** | `.agents/skills/create-auth/SKILL.md` | Auth instance factory, configuration scaffolding, and initial schema bootstrapping. |
| **`email-and-password-best-practices`** | `.agents/skills/email-and-password-best-practices/SKILL.md` | Credential registration, password reset tokens, email verification lifecycle. |
| **`organization-best-practices`** | `.agents/skills/organization-best-practices/SKILL.md` | Multi-tenancy, Organizer teams, role-based access control (RBAC), and team member invitations. |
| **`two-factor-authentication-best-practices`**| `.agents/skills/two-factor-authentication-best-practices/SKILL.md` | TOTP enrollment, QR code generation, backup recovery codes, 2FA step-up authentication. |

### Prisma 8 Skill Suite
| Skill | Location | Key Capabilities |
| :--- | :--- | :--- |
| **`prisma-8`** | `.agents/skills/prisma-8/SKILL.md` | Authoritative Prisma 8 guide: authoring `contract.prisma`, `prisma contract emit`, `migration.ts` data transforms, `db.orm` vs `db.sql`. |
| **`prisma-composer-core-concepts`** | `.agents/skills/prisma-composer-core-concepts/SKILL.md` | Multi-module composition, relational sub-schemata, schema federation. |
| **`prisma-platform-core-concepts`** | `.agents/skills/prisma-platform-core-concepts/SKILL.md` | Connection management, pooling, Prisma Data Platform deployment best practices. |

> **Critical Note on Prisma 8:** Never apply Prisma 7 patterns (`schema.prisma` or `@prisma/client` defaults) to this project! This repository relies on contract-first architecture configured via `prisma.config.ts` and `src/prisma/contract.prisma`.

---

## 5. Database Schema & Data Modeling

The relational data model resides at [`src/prisma/contract.prisma`](file:///c:/Users/my%20pc/Practicals/project-name/event-ticketing-platform/src/prisma/contract.prisma):

- **Better Auth Models:**
  - `User`: Accounts, credentials, profile, `Role` (`PARTICIPANT` vs. `ORGANIZER`).
  - `Session`: Active user sessions with expiration and device metadata.
  - `Account`: OAuth and credential provider records.
  - `Verification`: One-time password (OTP) and email verification tokens.
- **Domain Models:**
  - `Event`: Event details, status (`DRAFT`, `PUBLISHED`, `ONGOING`, `COMPLETED`, `CANCELLED`), venue/online meeting info.
  - `TicketCategory`: Tiered tickets (VIP, General, Early Bird), inventory counts, price, sales windows.
  - `Order`: Checkout transactions, payment status (`PENDING`, `PAID`, `REFUNDED`), reservation timeout.
  - `Ticket`: Issued tickets with unique QR identifiers, check-in status (`ACTIVE`, `CHECKED_IN`, `CANCELLED`).
  - `Payment`: Audit trail of gateway payments, transaction IDs, refund statuses.

### Prisma 8 Workflow
```bash
# 1. Edit the data contract
# Path: src/prisma/contract.prisma

# 2. Emit machine-readable contract artifacts (contract.json & contract.d.ts)
bun run prisma contract emit

# 3. Plan database migrations
bun run prisma migration plan

# 4. Apply migrations to PostgreSQL
bun run prisma db migrate
```

---

## 6. Security & Rate Limiting (Arcjet)

Arcjet is integrated at the root module level (`src/app.module.ts`):
- Protect public endpoints against denial of service and ticket hoarding bots.
- Apply sliding-window rate limiting to ticket checkout routes (`/orders/checkout`).
- Enforce email validation on registration to prevent burner accounts.
- Guard organizer management routes using IP/bot security rules.

---

## 7. Developer Commands & Operational Runbook

Always run commands via **`bun`**:

```bash
# Dependency Management
bun install
bun add <package>
bun add -d <package>

# Development Server (Port 3001)
bun run start:dev

# Production Build & Execution
bun run build
bun run start:prod

# Linting & Code Quality
bun run lint            # Runs oxlint with type awareness
bun run format          # Formats code using Prettier

# Testing (Vitest)
bun run test            # Run unit tests
bun run test:watch      # Run tests in watch mode
bun run test:cov        # Run test coverage
bun run test:e2e        # Run end-to-end tests

# Prisma Skills Synchronization
bun run postinstall     # Synchronizes skills across agents
```

> **Windows PowerShell Execution:** If PowerShell execution policy blocks `.ps1` wrapper scripts, invoke via `bun.cmd` or pass `-ExecutionPolicy Bypass`.

---

## 8. Non-Negotiable Agent Rules

1. **Mandatory Skills & MCP Querying Before Any Action:** Agents **MUST read their available domain skills** (`.agents/skills/`) and, when necessary, **query configured MCP servers** (`better-auth`, `Prisma`, `arcjet`) **BEFORE taking any action or writing code**. Never guess or hallucinate API contracts, schema structures, or library behaviors.
2. **Never Read `.env` Files or Leak Secrets:** Agents must **NEVER read the user's `.env` file** (including `.env`, `.env.local`, `test/.env`, or any other active environment files). Never display, print, or leak secret keys, tokens, or connection strings (such as `DATABASE_URL`, `ARCJET_KEY`, `BETTER_AUTH_SECRET`). Always consult `.env.example` instead for required environment variable definitions and defaults.
3. **Respect Prisma 8 Architecture:** Do not revert to `schema.prisma` or attempt to run legacy `prisma generate` without the contract pipeline.
4. **Enforce Bun Runtime:** Never suggest or execute `npm`, `yarn`, or `pnpm`.
5. **Quality Gates:** Before concluding any assignment, run `bun run lint` and verify tests pass with `bun run test`.

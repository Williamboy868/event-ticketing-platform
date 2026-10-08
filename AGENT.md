# Event Ticketing Platform - Agent Guidelines

## Overview
This project is an Event Ticketing Platform backend built with **NestJS** and **TypeScript**. 
As an AI agent working on this project, please adhere to the following stack, conventions, and configurations.

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

## MCP Servers and Skills Configured
The following tools and context have been explicitly added to this workspace to enhance agent capabilities. **You should actively leverage them whenever relevant:**

- **Drizzle ORM:**
  - **Skills:** `drizzle-orm`
  - **Usage:** Use Drizzle ORM for database schema definitions, migrations, and type-safe queries instead of Prisma.

- **Better Auth:**
  - **MCP Server:** Available for authentication reference and management.
  - **Skills:** `better-auth-best-practices`, `better-auth-security-best-practices`, `create-auth`, etc.
  - **Usage:** Always utilize Better Auth for handling authentication flows (e.g. login, sign-up, sessions), avoiding custom implementations where Better Auth provides a robust built-in solution.

- **Arcjet:**
  - **MCP Server:** Available for security configurations.
  - **Skills:** Arcjet skills installed locally (`~\.agents\skills\arcjet`).
  - **Usage:** Implement Arcjet to secure critical routes (e.g., rate limiting, bot protection, email validation).

## Development Rules
1. **Tooling & Skills:** **ALWAYS read your available skills and query relevant MCP servers before taking any action or writing code.** The ecosystem changes rapidly (e.g., Drizzle ORM updates), and these resources contain the source of truth.
2. **Privacy:** **Never read the `.env` file under any circumstances.**
3. **Package Management:** Always use `bun` instead of `npm` or `yarn` for managing dependencies and running scripts. Note: On Windows PowerShell, if scripts fail due to execution policies, fallback to using `bun.cmd` or `bunx.cmd`.
4. **Architecture:** Follow standard NestJS architecture (Modules, Controllers, Services). Keep business logic in services.
5. **Testing:** Use Vitest for writing unit and e2e tests.
6. **Code Quality:** Ensure code passes `oxlint` checks and is formatted with Prettier before completing tasks.


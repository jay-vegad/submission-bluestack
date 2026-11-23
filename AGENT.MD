# AGENTS.md

# Part 1: Coding Standards & Code Quality

These standards define how code should be written, structured, maintained, and organized throughout the project. Every implementation must prioritize readability, maintainability, consistency, reusability, and reliability.

## 1. General Coding Principles

- Write clean, readable, and maintainable code.
- Follow established industry standards and best practices.
- Prefer simple and understandable solutions over unnecessary complexity.
- Avoid duplicate code and unnecessary logic.
- Follow the DRY (Don't Repeat Yourself) and KISS (Keep It Simple, Stupid) principles.
- Write code that is easy for another developer to understand and maintain.
- Avoid unnecessary abstractions, dependencies, and overengineering.
- Maintain consistency with the existing project architecture and conventions.
- Never sacrifice code quality for shorter implementation time.

## 2. File Organization & Structure

- Keep files focused on a single responsibility.
- Divide complex implementations into smaller, logically organized files.
- Never put an entire feature, component, or business logic into one unnecessarily large file.
- Separate components, hooks, utilities, types, constants, and services wherever appropriate.
- Keep related files grouped together in meaningful directories.
- Avoid deeply nested folder structures unless there is a clear architectural reason.
- Do not create unnecessary files for trivial or one-time logic.
- Every file should have a clear purpose and responsibility.

### File Naming Convention

Use consistent, descriptive, kebab-case filenames.

Examples:

```text
components/
├── file-tree.tsx
├── navigation-menu.tsx
├── user-profile.tsx
└── theme-provider.tsx

hooks/
├── use-auth.ts
└── use-mobile.ts

utils/
├── format-date.ts
└── validate-email.ts

types/
├── user.ts
└── api-response.ts

services/
├── auth-service.ts
└── user-service.ts
```

Naming rules:

- React components: `file-tree.tsx`
- Hooks: `use-auth.ts`
- Utilities: `format-date.ts`
- Types: `user.ts`
- Constants: `app-constants.ts`
- Services: `auth-service.ts`
- Configuration: Follow the naming convention required by the respective tool.

Use clear names that describe the actual responsibility of the file.

## 3. Component & Module Structure

- Keep components small, focused, and reusable.
- Separate UI presentation from business logic when appropriate.
- Extract repeated logic into reusable functions or custom hooks.
- Avoid components with too many responsibilities.
- Avoid deeply nested conditional rendering.
- Keep props clearly defined and properly typed.
- Do not introduce unnecessary component abstractions.
- Make components easy to test and maintain.

A component should contain only the logic necessary for its responsibility. Move complex or reusable logic into separate modules.

## 4. Import & Export Standards

- Use clear and consistent import/export patterns.
- Prefer named exports for reusable components, utilities, hooks, and functions.
- Use default exports only when appropriate for the framework or project convention.
- Avoid unnecessary barrel files and deeply chained re-exports.
- Group imports logically:
  1. External dependencies.
  2. Internal project modules.
  3. Relative imports.
  4. Styles and assets.
- Remove unused imports and exports.
- Avoid circular dependencies.
- Keep import paths clean and consistent.
- Do not duplicate imports from the same module unnecessarily.

Example:

```tsx
import { useState } from "react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { FileTreeProps } from "./types";
```

## 5. Functions & Logic

- Keep functions focused on one responsibility.
- Use descriptive function and variable names.
- Avoid unnecessarily long functions.
- Extract complex calculations and conditional logic into separate functions.
- Avoid deeply nested conditions and callbacks.
- Use early returns where they improve readability.
- Avoid unnecessary state, effects, and repeated computations.
- Handle expected edge cases explicitly.
- Avoid magic numbers and unexplained string literals.
- Use constants or configuration objects for values that may change.

## 6. Type Safety

- Prefer TypeScript over untyped JavaScript when the project supports it.
- Define explicit types and interfaces for important data structures.
- Avoid using `any` unless absolutely necessary.
- Use `unknown` when the type is genuinely uncertain.
- Avoid unnecessary type assertions and type suppression.
- Keep shared types in appropriate locations.
- Make function parameters and return types clear where inference is insufficient.
- Handle nullable and optional values safely.
- Do not compromise type safety just to make an implementation compile.

## 7. Comments & Documentation

Comments must provide meaningful information, not repeat what the code already explains.

- Write comments only when they add genuine value.
- Explain complex logic, important decisions, and non-obvious behavior.
- Document workarounds when their reason is not obvious.
- Remove outdated, redundant, and misleading comments.
- Avoid comments on every function, variable, or component.
- Never add random, decorative, or unnecessary comments.
- Prefer improving unclear code over adding comments to explain it.
- Keep comments short, accurate, and easy to understand.

Example:

```tsx
// Preserve the previous selection while the file tree updates.
const selectedFile = getSelectedFile(files);
```

Avoid:

```tsx
// This is a function that gets the selected file.
const selectedFile = getSelectedFile(files);
```

## 8. Code Formatting & Consistency

- Follow the project's configured formatter and linting rules.
- Maintain consistent indentation, spacing, and quotation styles.
- Use meaningful whitespace to improve readability.
- Avoid unnecessarily long expressions.
- Break complex JSX into readable sections.
- Keep formatting consistent across all files.
- Do not manually override established formatting conventions without a valid reason.

## 9. Error Handling & Reliability

- Handle errors explicitly wherever necessary.
- Never silently ignore unexpected errors.
- Avoid empty catch blocks.
- Provide meaningful error messages.
- Validate external inputs and untrusted data.
- Handle loading, success, empty, and error states where applicable.
- Avoid introducing fragile logic or assumptions.
- Ensure changes do not break existing functionality.

## 10. Code Review Before Completion

Before considering any implementation complete:

- Check that the code follows the established project structure.
- Verify that files have clear responsibilities.
- Remove unused variables, imports, and unnecessary code.
- Check for duplicated logic.
- Verify import and export consistency.
- Check TypeScript errors and linting issues.
- Ensure comments are meaningful and accurate.
- Verify that existing functionality remains intact.
- Run relevant tests and build checks when available.

**Final Principle:** Every implementation should be understandable, maintainable, scalable, and consistent with professional software engineering standards. Write code as if another developer will maintain it in the future.
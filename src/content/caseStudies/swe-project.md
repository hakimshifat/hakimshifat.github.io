---
title: SWE-Project
description: Secure Information Hiding System Using Steganography, a full-stack application for embedding and extracting protected text or files inside PNG and BMP images.
eyebrow: FULL-STACK SECURITY / INFORMATION HIDING
repo: https://github.com/hakimshifat/SWE-Project
category: Full-stack security
role: Full-stack engineer · application architecture and security flows
year: 2024–2025
problem: A steganography demo is easy to fake with a single image transform; a usable system also needs sessions, password protection, file handling, persistence, authorization, and tests for the failure paths.
outcome: A React and Express application that carries a secret payload from upload to embedding to extraction, with PostgreSQL-backed sessions, authenticated administration, and explicit wrong-input coverage.
visual: web
stack:
  - React + Vite
  - Express + TypeScript
  - PostgreSQL + Prisma
  - Argon2id sessions
  - AES-256-GCM
  - Vitest + Supertest
metrics:
  - label: Cover formats
    value: PNG + BMP
    detail: Lossless input formats are validated before embedding.
  - label: Payload protection
    value: AES-256-GCM
    detail: PBKDF2-SHA256 derives the password-based encryption key.
  - label: Runtime surfaces
    value: 4 layers
    detail: Client, server, shared types, and Prisma persistence stay explicit.
featured: true
draft: false
---

## The feature is a data flow, not a button

“Hide a message in an image” sounds like one function. The actual product surface is a chain of decisions: who is allowed to use it, which image types are accepted, how a text or file payload is encoded, how an optional password protects it, where generated files live, and what happens when extraction receives the wrong password or a normal image.

SWE-Project was built for **CSE 3206 — Software Engineering Lab** as a complete application rather than a cryptography-only exercise. The result is a small system with a visible client, an Express API, shared TypeScript contracts, Prisma models, and tests that exercise both successful and rejected flows.

> [!NOTE]
> The application hides payloads in lossless PNG/BMP images and emits a PNG stego file. The payload is not stored separately as raw secret content in the database.

## Architecture at a glance

```text
React + Vite client
        │  auth / upload / embed / extract
        ▼
Express + TypeScript API
   ┌────┼──────────────┐
   ▼    ▼              ▼
Auth  Stego service  Operation logs
   │    │              │
   └────┼──────────────┘
        ▼
PostgreSQL via Prisma ──► local generated-file storage
```

The repository keeps `client`, `server`, `shared`, `prisma`, and `tests` as separate surfaces. That makes the security-sensitive behavior discoverable: route handlers do not need to contain all the image and crypto logic, and the frontend does not invent its own request shape.

## The embed / extract pipeline

The core workflow has two symmetrical paths:

| Stage | Embed | Extract |
| --- | --- | --- |
| 1 | Validate PNG/BMP cover and payload | Validate uploaded stego image |
| 2 | Build the payload envelope | Read the embedded envelope |
| 3 | Optionally encrypt with AES-256-GCM | Derive the key from the supplied password |
| 4 | Write bits into image channels | Recover bytes and validate integrity |
| 5 | Save generated PNG and log operation | Reject wrong password or invalid image |

The steganography service uses least-significant-bit encoding. Password-protected payloads use AES-256-GCM with PBKDF2-HMAC-SHA256 key derivation. The important application-level decision is that encryption is optional in the workflow but never confused with hiding: steganography provides concealment; authenticated encryption protects the payload when a password is supplied.

## Security boundaries I had to make explicit

### Sessions are persistent, not a front-end illusion

Registration and login use cookie-backed sessions stored in PostgreSQL. Passwords are hashed with Argon2id. The same session boundary is then used for protected embed/extract actions and administrative routes.

### Uploads are a threat surface

Multer handles the upload path, but the application still validates supported media and payload capacity. Generated files are stored under the configured data directory rather than quietly placed into the database as opaque blobs.

### Admin actions are observable

The system records registration, login, embed, extract, and admin updates. That gives the application an audit trail for security-relevant events instead of treating logging as a later operational detail.

## Evidence map

- `server/src/services/steganography.ts` implements embedding, extraction, payload validation, and password handling.
- `server/src/services/logging.ts` records security-relevant operations.
- `server/src/scripts/seedAdmin.ts` creates an administrative account with Argon2id.
- `prisma/schema.prisma` defines persistent users, sessions, files, and logs.
- `shared/src/types.ts` provides shared client/API contracts.
- `tests/steganography.test.ts` covers round trips, wrong passwords, capacity, unsupported media, and invalid images.
- `tests/api.test.ts` covers authentication, embed/extract flows, and admin authorization.

## Verification beats a screenshot

The tests cover both the happy path and the moments where a security-sensitive application should say no: wrong-password extraction, capacity overflow, unsupported images, non-steganographic inputs, and unauthorized admin actions. That is the difference between a UI that appears to work and a system whose failure modes have been named.

The local development path is also reproducible:

```bash
npm install
npm run db:migrate
npm run seed:admin -- --username admin --email admin@example.com --password AdminPass123!
npm run dev
```

## Limits and honest framing

This is a course project and expects local PostgreSQL plus local generated-file storage. It should receive a production security review before handling sensitive real-world secrets or public untrusted uploads. The application demonstrates a complete secure workflow; it is not a claim that the implementation has been hardened for every deployment environment.

## Repository

[View the source repository →](https://github.com/hakimshifat/SWE-Project)

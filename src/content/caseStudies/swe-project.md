---
title: SWE-Project
description: Secure Information Hiding System Using Steganography, a full-stack application for embedding and extracting protected text or files inside PNG and BMP images.
repo: https://github.com/hakimshifat/SWE-Project
category: Full-Stack Security
stack:
  - React
  - TypeScript
  - Express
  - PostgreSQL
  - Prisma
  - Steganography
featured: true
draft: false
---

## What it is

SWE-Project is a course software-engineering project that implements a secure information-hiding workflow. Users can register, upload a lossless PNG or BMP cover image, embed a secret text or file, optionally protect the payload with a password, download the generated stego image, and later extract the hidden content.

## What I built

The project is divided into `client`, `server`, `shared`, `prisma`, and `tests`. The frontend uses React, Vite, React Router, and TypeScript. The backend uses Express and TypeScript, with Prisma and PostgreSQL for persistence.

The steganography service embeds payloads using least-significant-bit image encoding. Password-protected payloads use AES-256-GCM with PBKDF2-HMAC-SHA256 key derivation. Authentication uses cookie-backed sessions stored in PostgreSQL, and passwords are hashed with Argon2id. Multer handles uploaded images and generated files, while operation logs record registration, authentication, embed, extract, and administrative actions.

The application also includes role-based administration for user management and log access. The API tests verify registration, embedding, downloading, extraction, wrong-password handling, and admin authorization boundaries.

## Engineering decisions

The project separates shared types from frontend and backend code so the client and API share a stable contract. The service layer keeps steganography and cryptographic operations out of route handlers, making the core behavior independently testable.

The tests cover successful text and file round trips, password-required extraction, invalid-password rejection, capacity limits, unsupported media, and non-steganographic images. This gives the project stronger evidence than a UI-only demonstration.

## Why it matters

This project demonstrates secure full-stack development across authentication, file handling, cryptography, image processing, database persistence, authorization, and automated testing. It is a useful case study for showing how I move from a course requirement to a complete security-sensitive application.

## Evidence

- `server/src/services/steganography.ts` implements image embedding, extraction, password handling, and payload validation.
- `server/src/services/logging.ts` records security-relevant operations.
- `server/src/scripts/seedAdmin.ts` creates an administrative account using Argon2id.
- `prisma/` defines persistent users, sessions, files, and logs.
- `tests/steganography.test.ts` covers round trips, wrong passwords, capacity, and invalid images.
- `tests/api.test.ts` covers authentication, embed/extract flows, and admin authorization.

## Limitations

The application expects a local PostgreSQL database and local generated-file storage. It is a course project and should receive a production security review before handling sensitive real-world secrets or untrusted public uploads.

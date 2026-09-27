# AMI STYLE

> **Active development:** this project is under active development. Features,
> content models, and deployment details may change before production release.

AMI STYLE is a bilingual website and content-management system for a personal
styling business. It presents styling services and editorial content, collects
contact requests, and sells PDF catalogues through a manual bank-transfer
payment flow.

The application combines a Next.js frontend with Payload CMS so site editors
can manage pages, services, catalogues, navigation, translations, and payment
settings from the admin panel.

## About

The public website is available in English and Czech. It includes a visual page
builder, configurable styling-service sections, a contact form, and a
catalogue-purchase journey for CZK and EUR payments.

Catalogue payments are reviewed by an administrator. When a payment is marked
as received, the customer receives an email containing a private, time-limited
download link for the purchased PDF.

## Features

- Payload CMS admin panel for pages, posts, media, categories, services,
  catalogues, payments, navigation, and site-wide settings
- English and Czech localization
- Flexible content blocks for hero, media, services, questions, calls to
  action, advertising, carousels, and catalogue listings
- Configurable contact form with email notifications
- PDF catalogue uploads, availability control, CZK/EUR prices, and one active
  catalogue at a time
- Manual bank-transfer checkout with Czech and SEPA account support
- Payment review workflow, transactional emails, and expiring private
  catalogue downloads
- SEO, redirects, search, nested categories, forms, draft content, and live
  preview through Payload plugins

## Technology

- Next.js 16, React 19, TypeScript, and Tailwind CSS
- Payload CMS 3 with the PostgreSQL adapter
- PostgreSQL 16
- Nodemailer for payment and contact-form notifications
- Docker Compose for local application and database services

## Quick Start

### Prerequisites

- Node.js `20.9` or newer
- pnpm 9, 10, or 11
- Docker Desktop (recommended for the local PostgreSQL database)

Verify Docker before continuing:

```powershell
docker --version
docker compose version
```

### Run the complete stack with Docker

From the project root, create your local environment file if it does not
already exist:

```powershell
Copy-Item .env.example .env
```

Set `DATABASE_URL` in `.env` to a PostgreSQL connection string. For the local
Docker setup, use:

```env
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/styling-web
```

Start the application and database:

```powershell
docker compose up --build
```

After the containers have started, open:

- Website: `http://localhost:3000`
- Payload admin: `http://localhost:3000/admin`
- PostgreSQL: `localhost:5432`

Create the first Payload administrator account from the admin page.

Stop the stack with:

```powershell
docker compose down
```

To remove the local PostgreSQL data as well, run:

```powershell
docker compose down -v
```

`docker compose down -v` permanently removes the local database volume. Use it
only when you want a clean development database.

### Run the app locally with Docker Postgres

Use this workflow when you want Next.js to run directly on your machine while
Docker provides only the database:

```powershell
docker compose up -d postgres
pnpm install
pnpm dev
```

The database must be ready before starting the application. Confirm that Docker
has exposed PostgreSQL on port `5432` with:

```powershell
Test-NetConnection 127.0.0.1 -Port 5432
```

The command should report `TcpTestSucceeded : True`.

Do not run `pnpm dev` at the same time as the Compose `payload` service; both
attempt to use port `3000`.

## First-Time CMS Configuration

After creating an administrator account, configure the following sections in
Payload Admin:

1. **Globals → Header and Footer** — navigation, Instagram URL, footer message,
   and contact email.
2. **Globals → Payment settings** — Czech bank account details, optional SEPA
   account details, download-link validity, and payment-email templates.
3. **Globals → Contact form notifications** — select the contact form and set
   the recipient email and notification templates.
4. **Catalogues** — upload the PDF, provide localized content and prices, then
   mark one catalogue as active.
5. **Style services** — add the styling services displayed by the content
   blocks.

The payment settings deliberately contain no default Czech bank-account values.
Bank-transfer instructions remain unavailable until an administrator enters
valid account details.

## Project Structure

```text
.
|-- src/
|   |-- app/                 # Next.js frontend, Payload admin, and API routes
|   |-- blocks/              # Configurable page and styling-service blocks
|   |-- collections/         # Payload collections, including catalogues/payments
|   |-- globals/             # Site-wide payment and translation settings
|   |-- Header/ and Footer/  # Configurable site navigation and footer
|   |-- migrations/          # PostgreSQL migration files
|   |-- services/            # Email and payment client services
|   |-- utilities/           # Catalogue storage, URLs, and helper functions
|   `-- payload.config.ts    # Payload, PostgreSQL, localization, and plugins
|-- public/                  # Static assets
|-- storage/catalogues/      # Local PDF catalogue storage
|-- tests/                   # Integration and end-to-end tests
|-- docker-compose.yml       # Local Payload and PostgreSQL stack
|-- .env.example             # Environment-variable template
`-- package.json             # Scripts and dependencies
```

## Content and Payment Workflow

1. An editor uploads a PDF catalogue and activates it.
2. A visitor selects CZK or EUR, enters their name and email, and receives
   bank-transfer instructions.
3. The visitor confirms that the transfer was sent.
4. An administrator reviews the transfer in **Payments** and marks it as
   received or not received.
5. When approved, the application emails an expiring private download link to
   the customer.

CZK transfers use the configured Czech account. EUR transfers require the
optional SEPA account details (account owner, IBAN, and, when applicable, BIC).

## Environment Variables

Copy `.env.example` to `.env` and keep real credentials out of version control.

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string used by Payload. |
| `PAYLOAD_SECRET` | Secret used to encrypt Payload authentication tokens. Use a long random value. |
| `NEXT_PUBLIC_SERVER_URL` | Public site URL, used for CORS and generated links. Do not include a trailing slash. |
| `CRON_SECRET` | Bearer token used to authorize scheduled Payload jobs. |
| `PREVIEW_SECRET` | Secret used to validate preview requests. |
| `EMAIL_FROM_ADDRESS` | Sender address for contact and payment emails. |
| `EMAIL_FROM_NAME` | Sender name for emails. |
| `SMTP_HOST` | SMTP host. Leave empty to use Payload's Ethereal test inbox. |
| `SMTP_PORT` | SMTP port; defaults to `587`. |
| `SMTP_SECURE` | Set to `true` for implicit TLS SMTP connections. |
| `SMTP_USER` | SMTP username, when authentication is required. |
| `SMTP_PASSWORD` | SMTP password or API key. |

The Compose configuration supplies its own internal database hostname for the
`payload` container. A locally run development server should use
`127.0.0.1:5432` in `DATABASE_URL`.

## Development Commands

Run commands from the project root.

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Starts the Next.js and Payload development server. |
| `pnpm build` | Creates a production build. |
| `pnpm start` | Starts the production server after a build. |
| `pnpm lint` | Runs ESLint. |
| `pnpm test:int` | Runs integration tests. |
| `pnpm test:e2e` | Runs Playwright end-to-end tests. |
| `pnpm generate:types` | Regenerates `src/payload-types.ts` after Payload schema changes. |
| `pnpm generate:importmap` | Regenerates the Payload admin import map after custom admin-component changes. |

## Database Migrations

For local development, Payload's PostgreSQL adapter can synchronize schema
changes automatically. Before deploying to a production database, create and
run migrations:

```powershell
pnpm payload migrate:create
pnpm payload migrate
```

Review migrations before applying them to production, especially where schema
changes could affect existing catalogue, payment, or user data.

## License

This project is declared as MIT-licensed in `package.json`.

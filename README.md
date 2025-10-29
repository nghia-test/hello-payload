# 📰 Conference CMS

...

---

## 🚀 Features

- 🧩 **Payload CMS Core**
  - Full TypeScript support
  - Secure admin dashboard
  - REST and GraphQL APIs out of the box

- 📝 **Meeting System**
  - Post categories, tags, and authors
  - Rich-text editor with media upload
  - Automatic slug generation and published date
  - SEO fields (title, description, Open Graph image)

- 👥 **User Management**
  - Authentication via Payload built-in auth
  - Role-based access control (Admin, User)

- 🗂️ **Media Library**
  - Upload, optimize, and reuse images or videos
  - Cloud storage integration (e.g. S3, Cloudflare R2, GCS)

- 🌐 **API Ready**
  - Access your content via REST or GraphQL
  - Perfect for Next.js / React frontend integration

---

## 🧱 Tech Stack

- **Backend:** [Payload CMS](https://payloadcms.com)
- **Database:** MongoDB or PostgreSQL
- **Frontend (optional):** Next.js or any client that consumes the API
- **Auth:** Built-in Payload Auth
- **Storage:** Local, Cloudflare R2, AWS S3, or GCP Storage

---

## 📦 Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/payload-blog.git
cd payload-blog
```

### 2️⃣ Install dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Configure environment variables

Create a .env file at the root with:

```bash
# Database connection string
DATABASE_URI=mongodb://127.0.0.1/your-database-name

# Or use a PG connection string
#DATABASE_URI=postgresql://127.0.0.1:5432/your-database-name

# Used to encrypt JWT tokens
PAYLOAD_SECRET=YOUR_SECRET_HERE

# Used to configure CORS, format links and more. No trailing slash
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Secret used to authenticate cron jobs
CRON_SECRET=YOUR_CRON_SECRET_HERE

# Used to validate preview requests
PREVIEW_SECRET=YOUR_SECRET_HERE
```

### 4️⃣ Run the development server

```bash
npm run dev
# or
yarn dev
```

## 📦 Deployment

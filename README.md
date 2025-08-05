Here’s your updated README.md content in professional Markdown format, tailored for a deployed and complete project:

⸻


# FrameGenie 🎬 – AI-Powered Movie Poster Generator

FrameGenie is a modern, full-stack SaaS application that allows users to generate AI-powered movie posters with prompts. Built using **Next.js 14 (App Router)**, **Tailwind CSS**, **Prisma**, **PostgreSQL**, **Clerk Auth**, and **Cloudinary**.

Live Demo: [https://framegenie.vercel.app](https://framegenie.vercel.app)

---

## 🚀 Tech Stack

- **Frontend:** React, Tailwind CSS, Next.js App Router
- **Authentication:** Clerk (OAuth + Email Sign-In)
- **Database:** PostgreSQL (Neon) via Prisma ORM
- **Image Storage:** Cloudinary
- **Deployment:** Vercel
- **Other:** Responsive design, Server Actions, Middleware, Edge Functions

---

## 📸 Features

- 🎭 Generate stunning movie posters with a single prompt
- 🔐 Secure user authentication (Clerk)
- 🗃️ Save, view, and delete your generated posters
- 🖼️ Upload custom poster images with Cloudinary
- 🧠 AI-powered backend logic (OpenAI integration-ready)
- 🎨 Beautiful and responsive UI

---

## 📂 Folder Structure

app/
│
├── (auth)           # Clerk authentication routes
├── (dashboard)      # User dashboard
├── api/             # Server actions & API routes
├── lib/             # DB setup, utils
├── components/      # Reusable UI components
├── prisma/          # Prisma schema & client
└── public/          # Static assets

---

## 🛠️ Getting Started

### 1. Clone the repository:

```bash
git clone https://github.com/your-username/framegenie.git
cd framegenie

2. Install dependencies:

npm install
# or
yarn install

3. Setup environment variables:

Create a .env file in the root directory and add:

DATABASE_URL="your_postgres_url"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

4. Generate Prisma Client:

npx prisma generate

5. Run Development Server:

npm run dev

Visit http://localhost:3000 in your browser.

⸻

🚢 Deployment

This project is deployed on Vercel.

To deploy your own version:
	•	Push to GitHub
	•	Connect the repo to Vercel
	•	Add the environment variables in Vercel Dashboard
	•	Deploy 🎉

⸻

🙏 Acknowledgements
	•	Next.js
	•	Clerk
	•	Prisma
	•	Neon DB
	•	Cloudinary

⸻

📄 License

MIT License. © 2025 Amit Kukreja
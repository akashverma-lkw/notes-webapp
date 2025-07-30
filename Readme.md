<!-- Thumbnail Banner -->
<p align="center">
  <img src="https://res.cloudinary.com/dsqr9jkvq/image/upload/v1753859365/ChatGPT_Image_Jul_30_2025_at_12_39_05_PM_jd3zvq.png" alt="Notes App Banner" style="max-width: 100%;" />
</p>

<h1 align="center">📝 Notes Create App</h1>

<p align="center">
  A secure full-stack notes management application with Google Authentication, built using <strong>React.js (TypeScript)</strong> + <strong>Tailwind CSS</strong> in frontend and <strong>Node.js</strong> + <strong>Express.js</strong> + <strong>MongoDB</strong> in backend. 
</p>

---

## 🛠️ Tech Stack

### ⚛️ Frontend
- React.js
- TypeScript
- Tailwind CSS
- React Router
- JWT Authentication

### 🧩 Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Passport.js (Google OAuth2)
- JWT
- dotenv

---

## 📁 Project Structure

notes-app/
├── backend/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── config/
│ └── server.ts
│
├── frontend/
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ └── App.tsx


---

## 🔐 Features

- 🔐 Google OAuth Login
- ✍️ Create & Manage Notes (title-only)
- 🧾 View User Notes on Dashboard
- 🗑️ Delete Notes Securely
- 🔄 Real-Time Sync with MongoDB
- 🎨 Elegant & Responsive UI

---

## 💻 How to Run Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/akashverma-lkw/notes-webapp.git
cd notes-create-app
```
## Set Up the Backend
- cd backend
- npm install

## Create a .env File with the Following:
- PORT=your_port_number
- MONGO_URI=your_mongodb_uri
- GOOGLE_CLIENT_ID=your_google_client_id
- GOOGLE_CLIENT_SECRET=your_google_client_secret
- GOOGLE_CALLBACK_URL=your_google_callback
- JWT_SECRET=your_jwt_secret

## Set Up the Frontend
- cd ../frontend
- npm install
- npm run dev

## 🌐 Deployment Guide
### 🛠 Platforms You Can Use
- Frontend: Vercel or Netlify
- Backend: Render or Railway

## Build Commands Summary
### Backend 
cd backend >
npm install >
npm run dev

### Frontend
cd frontend >
npm install >
npm run dev

## 📄 License
- This project is licensed under the MIT License.

## ✨ Crafted with Passion by Akash Verma
 
> ✅ Make sure to replace:
> - `your_mongodb_uri`
> - `your_google_client_id`, `secret`
> - GitHub repo link
> - Deployment backend URL in `VITE_BACKEND_BASE_URL`

Let me know if you want a `LICENSE.md` file or want to automate deployment with CI/CD setup too.

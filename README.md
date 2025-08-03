# ⚔️ **HACKFORGE – THE ULTIMATE CODING ARENA**


Welcome to HackForge – A full-stack coding contest platform built for developers, students, and competitive programmers. 🧠🚀

🌐 Live Project: hackforge.dev
📦 Repo: (https://github.com/raj2201641540078/HackForge-Coding-Platform)

📚 Features at a Glance
Feature 🔧	Description 📃
🔐 Login/Register	Secure signup/login with JWT-based auth
🧑‍💻 Dashboard	Personalized dashboard showing solved problems, submissions
📄 Problems	Browse, filter, and solve algorithmic problems
🏆 Contests	Create, join, and compete in live contests
📈 Leaderboards	Track performance and rankings in real time
🛠️ Admin Panel	Full CRUD access to problems, contests, users

🚀 Getting Started
bash
Copy
Edit
git clone https://github.com/your-username/hackforge.git
cd hackforge
npm install
npm run dev
Visit http://localhost:3000 to run locally.

⚙️ Tech Stack
Layer	Tech
🎨 Frontend	React / Tailwind CSS / CodeMirror or Monaco Editor
🧠 Backend	Node.js / Express.js / REST API
🛢️ Database	MongoDB / Mongoose
🔐 Auth	JWT / bcrypt / Middleware Guards
🔧 Dev Tools	Axios / ESLint / Vite / Postman / GitHub Actions
☁️ Hosting	Vercel / Render / MongoDB Atlas


📁 /src
 ┣ 📁 /auth          → Login, Signup, JWT logic
 ┣ 📁 /dashboard     → User's personal dashboard
 ┣ 📁 /problems      → Browse & solve challenges
 ┣ 📁 /contests      → Create, join, participate
 ┣ 📁 /leaderboard   → Real-time rankings
 ┣ 📁 /admin         → Admin tools & analytics
 ┣ 📁 /components    → Shared UI components
 ┣ 📁 /services      → Axios API clients
 ┗ 📁 /utils         → Common functions

🧩 Feature Breakdown by Page
🔐 Login & Register
Email/password-based authentication

Role-based redirect (User / Admin)

Protected routes using JWT

Forgot/reset password flow

<img width="1907" height="964" alt="Screenshot 2025-08-03 154312" src="https://github.com/user-attachments/assets/8d97c114-9066-43ef-b5d9-093e0b19d071" />

<img width="1897" height="914" alt="Screenshot 2025-08-03 154356" src="https://github.com/user-attachments/assets/ea1111ee-4790-4352-9be3-2ac0600d7899" />


🧑‍💻 User Dashboard
Overview:

✔️ Solved Problems

🕒 Ongoing Contests

📝 Past Submissions

🔧 Option to update profile


<img width="1775" height="894" alt="Screenshot 2025-08-03 154445" src="https://github.com/user-attachments/assets/8cec2288-660a-4aeb-b186-306c0e68c261" />

📄 Problems Page
🗂️ List all problems by tag & difficulty

🔍 Search + Filter (easy / medium / hard)

🧪 Sample input/output

🖊️ Code editor with language selection

✅ Instant verdict with feedback

<img width="1904" height="899" alt="Screenshot 2025-08-03 163025" src="https://github.com/user-attachments/assets/bccc58f3-4e88-4574-806e-9e507a5730ce" />

<img width="1860" height="909" alt="Screenshot 2025-08-03 163120" src="https://github.com/user-attachments/assets/ce389ea6-0ce2-4375-bc76-1a2ba211d488" />





🏆 Contests Page
View upcoming, live, or past contests

⏱️ Join contests with countdown timers

🔒 Locked problems during contests

📊 Live scoreboard and rankings


<img width="1823" height="905" alt="Screenshot 2025-08-03 154518" src="https://github.com/user-attachments/assets/b3adee2c-fb16-4ed4-b853-4701a2f1ee69" />



📈 Leaderboards
👥 Global and contest-specific rankings

🥇 Sort by points, speed, or language

🧮 Updates in real time after submissions

<img width="1850" height="870" alt="Screenshot 2025-08-03 154656" src="https://github.com/user-attachments/assets/d6c783bf-0b95-46f4-98f5-0befb668c7c2" />

🛠️ Admin Panel
CRUD operations for:

🔧 Problems

🏁 Contests

👥 Users

📊 View analytics and submissions


<img width="1880" height="872" alt="Screenshot 2025-08-03 155138" src="https://github.com/user-attachments/assets/8b45cb6d-b86d-40ce-a904-3991fe38da1c" />


<img width="1200" height="767" alt="Screenshot 2025-08-03 155153" src="https://github.com/user-attachments/assets/3677f982-3453-4bce-a877-c5ce628c0342" />


🛡️ Environment Variables
Create a .env file in the root of your project and add the following configuration:

 Backend API URLs 
VITE_API_URL=http://localhost:5000/api
VITE_BACKEND_ORIGIN=http://localhost:3000

Auth & Security 
JWT_SECRET=your_secret_key

 Database Connection 
MONGO_URI=your_mongodb_uri

 OAuth Providers 

GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:5000/api/auth/github/callback

Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback


 Made with ❤️ by **Raaj**







AI Persona Chat - Frontend
This is the frontend for the AI Persona Chat application, a beautifully designed and animated web interface built with React. It provides a seamless user experience for interacting with different AI-powered mentors.

Live Demo: [Link to your deployed Vercel URL]

✨ Features
Immersive Landing Page: A unique, scroll-driven landing page animated with GSAP and Lenis for an exceptionally smooth experience.

Thematic UI: A sophisticated matte black/gray theme with subtle grain textures and accent glows that carry through the entire application.

Interactive Chat Interface: A modern, responsive chat window with real-time, streaming responses from the AI.

Persistent Chat History: Conversations with each mentor are automatically saved to your browser's localStorage, so you can pick up where you left off.

Seamless Mentor Switching: A sleek modal allows you to switch between different AI personas directly from the chat window.

Dynamic Animations: Smooth, performant animations using GSAP for all major UI transitions, including message appearance.

🛠️ Tech Stack
Framework: React (with Vite)

Routing: React Router

Styling: Tailwind CSS

Animation: GSAP (GreenSock Animation Platform)

Smooth Scrolling: Lenis

Icons: React Icons

🚀 Getting Started
To run this project locally, follow these steps:

1. Clone the Repository
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name/frontend

2. Install Dependencies
npm install

3. Set Up Environment Variables
Create a new file named .env in the /frontend directory and add the following variable. This tells your frontend where to find the backend API.

VITE_API_URL=http://localhost:3000

(Replace 3000 with your backend's port if it's different.)

4. Run the Development Server
npm run dev

The application should now be running on http://localhost:5173.

☁️ Deployment
This React application is optimized for deployment on static hosting platforms. We recommend Vercel for its ease of use and excellent performance.

Push to GitHub: Ensure your latest code is pushed to a GitHub repository.

Import to Vercel: Sign up for Vercel, connect your GitHub account, and import the repository.

Configure Project:

Set the Root Directory to frontend. Vercel should automatically detect the framework and settings.

Add your backend's live URL as an environment variable:

Key: VITE_API_URL

Value: https://your-backend-url.onrender.com

Deploy: Click "Deploy". Vercel will handle the rest!

Crafted with ❤️ in Surat, India.
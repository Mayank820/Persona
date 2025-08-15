AI Persona Chat - Backend
This is the backend server for the AI Persona Chat application. It's a lightweight Node.js and Express server responsible for handling API requests, communicating with the Gemini AI, and streaming responses back to the client.

Live API Endpoint: [Link to your deployed Render URL]

✨ Features
Robust API: A simple and efficient API built with Express.js.

Real-time Streaming: Streams responses from the Gemini API token-by-token for a real-time chat experience.

Persona Management: Manages different AI personas with unique contexts and chat histories.

Stateful History: Includes an endpoint to reset a persona's chat history on the server, allowing for clean, new chat sessions.

Secure Configuration: Uses dotenv to manage environment variables like API keys.

CORS Enabled: Properly configured CORS to allow requests from the deployed frontend.

🛠️ Tech Stack
Runtime: Node.js

Framework: Express.js

AI Integration: Google Gemini SDK

Middleware: CORS

Environment Variables: Dotenv

🚀 Getting Started
To run this project locally, follow these steps:

1. Clone the Repository
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name/backend

2. Install Dependencies
npm install

3. Set Up Environment Variables
Create a new file named .env in the /backend directory and add the following variables:

# The port for the server to run on
PORT=3000

# Your API key from Google AI Studio
GEMINI_API_KEY=your_gemini_api_key_here

4. Run the Development Server
npm run dev

(Or node src/index.js if you don't have a dev script.)

The server should now be running and listening on http://localhost:3000.

📝 API Endpoints
POST /api/chat/stream
This is the main endpoint for handling chat messages.

Request Body:

{
  "message": "Your message to the AI",
  "persona": "hitesh"
}

Response: A text/event-stream that sends JSON objects with a token property.

POST /api/chat/reset
This endpoint clears the server-side chat history for a specific persona.

Request Body:

{
  "persona": "hitesh"
}

Response: A JSON object confirming the reset.

☁️ Deployment
This Node.js server is perfect for deployment on platforms like Render.

Push to GitHub: Ensure your code is on a GitHub repository.

Create a New "Web Service" on Render: Connect your GitHub account and select the repository.

Configure Project:

Root Directory: backend

Runtime: Node

Build Command: npm install

Start Command: node src/index.js

Add Environment Variables: In the Render dashboard, add your GEMINI_API_KEY.

Update CORS: Crucially, you must update the cors configuration in src/app.js to include your live Vercel frontend URL.

Deploy: Click "Create Web Service". Render will deploy your API.

Crafted with ❤️ in Surat, India.
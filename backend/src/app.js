import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.routes.js";

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://persona-drab-tau.vercel.app",
  "https://persona-git-main-mayank820s-projects.vercel.app",
  "https://persona-piifwrqv2-mayank820s-projects.vercel.app"
];

// 2. Create the CORS options with a function
const corsOptions = {
  origin: function (origin, callback) {
    // Check if the incoming origin is in our allowed list
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // If it is, allow the request
      callback(null, true);
    } else {
      // If it's not, reject the request
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// 3. Use the new options in the cors middleware
app.use(cors(corsOptions))
app.use(express.json());

app.use("/api/chat", chatRoutes);

export default app;

import { Router } from "express";
import {
  hiteshHistory,
  hiteshAgentStream,
} from "../persona-agent/hitesh.agent.js";
import {
  piyushHistory,
  piyushAgentStream,
} from "../persona-agent/piyush.agent.js";

const router = Router();

// NEW: Add a route to reset chat history
router.post("/reset", (req, res) => {
  const { persona } = req.body;
  if (!persona) {
    return res.status(400).json({ error: "Missing persona" });
  }

  console.log(`Resetting history for ${persona}...`);

  if (persona.toLowerCase() === "hitesh") {
    // Keep the first system message, clear the rest
    hiteshHistory.splice(1);
  } else if (persona.toLowerCase() === "piyush") {
    piyushHistory.splice(1);
  }

  res.status(200).json({ message: "History reset successfully" });
});

router.post("/stream", async (req, res) => {
  try {
    const { message, persona } = req.body;

    if (!persona || !message) {
      return res.status(400).json({
        error: "Missing persona or message",
      });
    }

    let reply;
    if (persona.toLowerCase() === "hitesh") {
      reply = await hiteshAgentStream(message, res);
    } else if (persona.toLowerCase() === "piyush") {
      reply = await piyushAgentStream(message, res);
    } else {
      return res.status(400).json({ error: "Unknown persona" });
    }

    res.json({
      persona,
      message,
      reply,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;

// ChatWindow.jsx
import { gsap } from "gsap";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FiSend, FiArrowLeft, FiUsers, FiX } from "react-icons/fi";

const personas = {
  hitesh: {
    name: "Hitesh Choudhary",
    image: "https://avatars.githubusercontent.com/u/11613311?v=4",
    accent: "from-cyan-400 to-cyan-600",
    accentGlow: "rgba(0, 255, 255, 0.5)",
  },
  piyush: {
    name: "Piyush Garg",
    image: "https://avatars.githubusercontent.com/u/44976328?v=4",
    accent: "from-rose-400 to-rose-600",
    accentGlow: "rgba(255, 22, 84, 0.5)",
  },
};

const SwitchMentorModal = ({ isOpen, onClose, currentPersonaId, onSelect }) => {
  const modalRef = useRef(null);
  const otherMentors = Object.keys(personas)
    .filter((id) => id !== currentPersonaId)
    .map((id) => ({ id, ...personas[id] }));

  useEffect(() => {
    if (isOpen) {
      gsap.to(modalRef.current, { autoAlpha: 1, duration: 0.3 });
      gsap.from(".mentor-option", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(modalRef.current, { autoAlpha: 0, duration: 0.3 });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50 invisible"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900/80 ring-1 ring-white/10 p-8 rounded-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-zinc-100">Switch Mentor</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-700 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>
        <div className="space-y-4">
          {otherMentors.map((mentor) => (
            <div
              key={mentor.id}
              onClick={() => onSelect(mentor.id)}
              className="mentor-option bg-zinc-800 p-4 rounded-lg flex items-center gap-4 cursor-pointer hover:ring-2 hover:ring-cyan-500 transition-all"
            >
              <img
                src={mentor.image}
                alt={mentor.name}
                className="w-12 h-12 rounded-full"
              />
              <span className="text-lg font-semibold text-zinc-200">
                {mentor.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TypingIndicator = ({ mentorImage, mentorName }) => (
  <div className="message-item flex items-end gap-3">
    {mentorImage && (
      <img
        src={mentorImage}
        alt={mentorName}
        className="w-8 h-8 rounded-full shadow-md"
      />
    )}
    <div className="bg-zinc-700 text-zinc-200 rounded-t-2xl rounded-br-2xl p-4 flex items-center justify-center space-x-1.5">
      <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"></span>
      <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-75"></span>
      <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-150"></span>
    </div>
  </div>
);

export default function ChatWindow() {
  const { persona } = useParams();
  const navigate = useNavigate();
  const mentor = personas[persona] || {
    name: persona,
    image: "",
    accent: "from-zinc-500 to-zinc-600",
    accentGlow: "rgba(160, 160, 160, 0.5)",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [messages, setMessages] = useState(() => {
    try {
      const savedMessages = localStorage.getItem(`chatHistory_${persona}`);
      return savedMessages
        ? JSON.parse(savedMessages)
        : [
            {
              sender: persona,
              text: `Hello! I'm ${mentor.name}. How can I help you today?`,
            },
          ];
    } catch (error) {
      console.error("Failed to parse messages from localStorage", error);
      return [
        {
          sender: persona,
          text: `Hello! I'm ${mentor.name}. How can I help you today?`,
        },
      ];
    }
  });

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const main = useRef(null);
  const messageContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(`chatHistory_${persona}`, JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save messages to localStorage", error);
    }
  }, [messages, persona]);

  useEffect(() => {
    if (messages.length <= 1) {
      const resetChatHistory = async () => {
        try {
          await fetch("http://localhost:3000/api/chat/reset", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ persona }),
          });
        } catch (error) {
          console.error("Failed to reset chat history:", error);
        }
      };
      resetChatHistory();
    }
  }, [persona, messages.length]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".chat-header", {
        y: -50,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".chat-input", {
        y: 50,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
      });
      const initialMessage = messageContainerRef.current?.children[0];
      if (initialMessage && !initialMessage.hasAttribute("data-animated")) {
        gsap.from(initialMessage, {
          delay: 0.5,
          y: 30,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          onComplete: () =>
            initialMessage.setAttribute("data-animated", "true"),
        });
      }
    }, main);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    const q = gsap.utils.selector(messageContainerRef);
    const lastMessage = q(".message-item:last-child");

    if (lastMessage[0] && !lastMessage[0].hasAttribute("data-animated")) {
      gsap.from(lastMessage, {
        y: 30,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
        onComplete: () => {
          lastMessage[0].setAttribute("data-animated", "true");
        },
      });
    }
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (!(input || "").trim()) return;
    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, persona }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aiText = "";
      let firstChunkReceived = false;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (!firstChunkReceived) {
          setIsLoading(false);
          setMessages((prev) => [...prev, { sender: persona, text: "" }]);
          firstChunkReceived = true;
        }
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const jsonStr = line.slice(6);
            try {
              const parsed = JSON.parse(jsonStr);

              // THE FIX: Check the token's content. If it's "[DONE]", skip this iteration.
              if (parsed.token && parsed.token === "[DONE]") {
                continue;
              }

              if (parsed.token) {
                aiText += parsed.token;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1].text = aiText;
                  return updated;
                });
              }
            } catch (error) {}
          }
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: persona,
          text: "Sorry, I encountered an error connecting to the server. Please try again later.",
        },
      ]);
      setIsLoading(false);
    }
  };

  const handleSelectMentor = (newPersonaId) => {
    setIsModalOpen(false);
    gsap.to(main.current, {
      opacity: 0,
      duration: 0.4,
      onComplete: () => navigate(`/chat/${newPersonaId}`),
    });
  };

  return (
    <>
      <SwitchMentorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentPersonaId={persona}
        onSelect={handleSelectMentor}
      />
      <div
        ref={main}
        className="min-h-screen flex flex-col text-zinc-200 antialiased"
      >
        <header
          className="chat-header bg-zinc-900/50 backdrop-blur-lg p-4 flex items-center gap-4 sticky top-0 z-10 border-b border-zinc-800"
          style={{ "--accent-glow-color": mentor.accentGlow }}
        >
          <Link
            to="/"
            className="p-2 rounded-full hover:bg-zinc-700 transition-colors"
          >
            <FiArrowLeft size={20} />
          </Link>
          {mentor.image && (
            <div className="relative">
              <img
                src={mentor.image}
                alt={mentor.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="absolute -inset-1 rounded-full animate-[subtle-pulse_4s_ease-in-out_infinite]"></div>
            </div>
          )}
          <h1 className="text-xl font-bold text-zinc-100 capitalize">
            {mentor.name}
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-auto p-2 rounded-full hover:bg-zinc-700 transition-colors"
            title="Switch Mentor"
          >
            <FiUsers size={20} />
          </button>
        </header>

        <div
          ref={messageContainerRef}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`message-item flex items-end gap-3 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender !== "user" && mentor.image && (
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-8 h-8 rounded-full shadow-md"
                />
              )}
              <div
                className={`max-w-[70%] p-4 shadow-lg ${
                  msg.sender === "user"
                    ? `bg-gradient-to-br ${mentor.accent} text-white rounded-t-2xl rounded-bl-2xl`
                    : "bg-zinc-800 text-zinc-200 rounded-t-2xl rounded-br-2xl"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <TypingIndicator
              mentorImage={mentor.image}
              mentorName={mentor.name}
            />
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input p-4 bg-zinc-900/50 backdrop-blur-lg flex items-center gap-4 sticky bottom-0 border-t border-zinc-800">
          <input
            type="text"
            value={input}
            placeholder="Ask your mentor anything..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              !e.shiftKey &&
              (e.preventDefault(), sendMessage())
            }
            className="flex-1 bg-zinc-800 text-zinc-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all w-full border border-transparent focus:border-cyan-500"
          />
          <button
            onClick={sendMessage}
            className={`p-3 rounded-full transition-all duration-200 ${
              (input || "").trim()
                ? `bg-gradient-to-br ${mentor.accent} text-white scale-100`
                : "bg-zinc-800 text-zinc-500 scale-90"
            }`}
            disabled={!(input || "").trim()}
          >
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </>
  );
}

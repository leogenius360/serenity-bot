"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";

interface Conversation {
  from: "chat" | "user";
  text: string;
}

interface QnA {
  conversations: Conversation[];
  askQuestion: (question: string) => Promise<void>;
}

const QnAContext = createContext<QnA | undefined>(undefined);

export const QnAProvider = ({ children }: { children: ReactNode }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [welcomeMessage, setWelcomeMessage] = useState<string | null>(null);

  // Fetch the welcome message on first load, but only once
  useEffect(() => {
    const welcomeUser = async () => {
      if (!welcomeMessage) {
        try {
          const response = await fetch(
            "https://serenity-backend.onrender.com/predict/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ text: "hi" }),
            },
          );

          if (!response.ok) {
            throw new Error("Failed to get an answer");
          }

          const answerData = await response.json();
          const bestAnswer = answerData.response; // Assuming the response contains the answer

          setWelcomeMessage(bestAnswer);
        } catch (error) {
          console.error("Error processing question:", error);
          addConversation("chat", "Sorry, something went wrong.");
        }
      }
    };

    welcomeUser();
  }, []); // This effect runs only once on component mount

  // Add the welcome message to the conversation when it's set, but only once
  useEffect(() => {
    if (welcomeMessage) {
      addConversation("chat", welcomeMessage);
    }
  }, [welcomeMessage]);

  const addConversation = (from: "chat" | "user", text: string) => {
    setConversations((prev) => [...prev, { from, text }]);
  };

  const askQuestion = async (question: string) => {
    // Add the user's question to the conversation
    addConversation("user", question);

    try {
      const response = await fetch(
        "https://serenity-backend.onrender.com/predict/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: question }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to get an answer");
      }

      const answerData = await response.json();
      const bestAnswer = answerData.response;

      // Add the best answer to the conversation
      addConversation("chat", bestAnswer);
    } catch (error) {
      console.error("Error processing question:", error);
      addConversation(
        "chat",
        "Sorry, something went wrong, There was an error processing question.",
      );
    }
  };

  return (
    <QnAContext.Provider value={{ conversations, askQuestion }}>
      {children}
    </QnAContext.Provider>
  );
};

export const useQnA = (): QnA => {
  const context = useContext(QnAContext);

  if (context === undefined) {
    throw new Error("useQnA must be used within a QnAProvider");
  }

  return context;
};

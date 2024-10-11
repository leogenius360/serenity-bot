"use client";

import { Button } from "@nextui-org/react";
import { VscRobot } from "react-icons/vsc";

import ChatTextarea, { Message } from "./forms/chat-input";

import { useAuth } from "@/auth/provider";
import { useQnA } from "@/bot/provider";
import { useEffect, useRef } from "react";


export const ChatBotConversations = () => {
  const { conversations } = useQnA();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversations]); // Trigger scroll whenever conversations change

  return (
    <div className="flex flex-col space-y-2 pb-4">
      {conversations.map((conv, index) =>
        conv.from === "chat" ? (
          <div key={index} className="w-11/12 max-w-[39rem] me-auto">
            <Message
              msg={conv.text}
              className="max-h-40 overflow-y-auto custom-scrollbar"
            />
          </div>
        ) : (
          <div key={index} className="w-11/12 max-w-[39rem] ms-auto">
            <Message
              msg={conv.text}
              className="max-h-40 overflow-y-auto custom-scrollbar"
            />
          </div>
        ),
      )}
      {/* Invisible div to maintain scroll position */}
      <div ref={messagesEndRef} />
    </div>
  );
};


const ChatOffcanvas = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="sticky flex bottom-6 right-0 z-50 mb-3 me-3">
        <Button
          isIconOnly
          radius="none"
          color="primary"
          variant="solid"
          data-bs-toggle="offcanvas"
          data-bs-target="#chatOffcanvas"
          aria-controls="chatOffcanvas"
          className="rounded-md ms-auto"
        >
          <VscRobot size={26} />
        </Button>
      </div>
      <div
        className="offcanvas offcanvas-end min-w-full border-primary md:min-w-80"
        data-bs-scroll="false"
        // data-bs-backdrop="static"
        tabIndex={-1}
        id="chatOffcanvas"
        aria-labelledby="chatOffcanvasLabel"
      >
        <div className="offcanvas-header bg-default-50 drop-shadow-md">
          <h6 className="offcanvas-title font-bold" id="chatOffcanvasLabel">
            {user?.displayName || user?.email}
          </h6>
          <button
            className="btn-close"
            type="button"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
          <hr />
        </div>
        <div className="offcanvas-body flex flex-col gap-4 custom-scrollbar">
          <ChatBotConversations />
        </div>
        <div className="offcanvas-footer bg-default-50 shadow-inner px-3 py-1">
          <ChatTextarea />
        </div>
      </div>
    </>
  );
};

export default ChatOffcanvas;

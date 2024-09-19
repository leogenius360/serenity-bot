"use client";

import { Button } from "@nextui-org/react";
import { VscRobot } from "react-icons/vsc";

import ChatTextarea, { Message } from "./forms/chat-input";

import { useAuth } from "@/auth/provider";

const chatWelcome =
  "I can offer advice on anxiety and depression, answer mental health questions, and engage in supportive conversations. However, I am not a replacement for professional mental healthcare. If you need further assistance, I recommend seeking help from a qualified therapist or counselor.";

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
          <div className="w-11/12 me-auto ">
            <Message
              msg={chatWelcome}
              className="max-h-40 overflow-y-auto custom-scrollbar"
            />
          </div>
          <div className="w-11/12 ms-auto ">
            <Message
              msg={chatWelcome}
              className="max-h-40 overflow-y-auto custom-scrollbar"
            />
          </div>
        </div>
        <div className="offcanvas-footer bg-default-50 shadow-inner px-3 py-1">
          <ChatTextarea />
        </div>
      </div>
    </>
  );
};

export default ChatOffcanvas;

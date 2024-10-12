/* eslint-disable no-console */
"use client";

import { Button, Textarea } from "@nextui-org/react";
import { IoSend } from "react-icons/io5";
import { useState, ChangeEvent, useEffect } from "react";
import { useRecorder } from "react-microphone-recorder";
import { TypeAnimation } from "react-type-animation";
import { twMerge } from "tailwind-merge";

import { VoiceRecorder } from "../recorder";
import { useQnA } from "@/bot/provider";

export function Message({
  msg,
  className,
}: {
  msg: string;
  className?: string;
}) {
  const messages = [msg, 12000];

  return (
    <div
      className={twMerge(
        "text-sm rounded-md px-3 md:px-4 border-1 border-emerald-600 card shadow-md bg-transparent",
        className,
      )}
    >
      <p className="font-medium py-2">
        <TypeAnimation
          cursor={false}
          sequence={messages}
          speed={{ type: "keyStrokeDelayInMs", value: 30 }}
          omitDeletionAnimation={true}
          repeat={0}
          // repeat={Infinity}
        />
      </p>
    </div>
  );
}

const ChatTextarea = () => {
  const { askQuestion } = useQnA();
  const [text, setText] = useState<string>("");

  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleAskQuestion = async () => {
    if (text.trim()) {
      await askQuestion(text);
      setText(""); // Clear the text input after submitting
    }
  };

  // Handle key press to distinguish between Enter and Shift+Enter
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default Enter behavior (new line)
      handleAskQuestion(); // Trigger form submission
    }
  };

  return (
    <form method="post" className="py-2" onSubmit={(e) => e.preventDefault()}>
      <Textarea
        value={text}
        maxRows={1}
        placeholder="Start your conversation ..."
        radius="sm"
        color="primary"
        variant="bordered"
        endContent={
          <Button
            size="sm"
            type="submit"
            title="Send"
            radius="sm"
            isIconOnly
            color="primary"
            variant="light"
            onPress={handleAskQuestion}
          >
            <IoSend size={20} />
          </Button>
        }
        className="w-full"
        classNames={{
          inputWrapper: "border-emerald-700 hover:border-emerald-800",
        }}
        onChange={(e) =>
          onTextChange(e as unknown as ChangeEvent<HTMLTextAreaElement>)
        }
        onKeyDown={(e) =>
          handleKeyPress(
            e as unknown as React.KeyboardEvent<HTMLTextAreaElement>,
          )
        } // Attach the key press handler
      />
    </form>
  );
};

export default ChatTextarea;

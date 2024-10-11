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
  const { stopRecording, audioURL, audioFile } = useRecorder();

  const [text, setText] = useState<string>("");
  // const [textareaRows, setTextareaRows] = useState<number>(1);
  const [audio, setAudio] = useState<File | undefined>(undefined);

  // const handleAudioSave = async () => {
  //   stopRecording();
  //   audioFile && setAudio(audioFile);
  //   console.log(audio);
  //   console.log(audioFile);
  //   console.log(audioURL);
  //   console.log(audioFile?.size);
  //   const audioText = await audio?.text();

  //   text && audioText
  //     ? setText(`${text} ${audioText}`)
  //     : audioText
  //       ? setText(audioText)
  //       : null;
  // };

  // const textAreaAdjust = (event: ChangeEvent<HTMLTextAreaElement>) => {
  //   // event.preventDefault(); // Prevents the default action of adding a new line
  //   const rows = event.target.value.split(/\r*\n/).length;

  //   setTextareaRows(rows);
  // };

  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    // textAreaAdjust(e);
  };

  const handleAskQuestion = async () => {
    await askQuestion(text);
    setText("");
  };

  return (
    <form method="post" className="py-2" onSubmit={(e) => e.preventDefault()}>
      <Textarea
        // rows={textareaRows}
        maxRows={1}
        value={text}
        placeholder="Start your conversation ..."
        radius="sm"
        color="primary"
        variant="bordered"
        endContent={
          <Button
            type="submit"
            title="Send"
            radius="sm"
            isIconOnly
            color="primary"
            variant="light"
            onPress={handleAskQuestion}
          >
            <IoSend size={22} />
          </Button>
        }
        className="w-full"
        classNames={{
          inputWrapper: "border-emerald-400 hover:border-emerald-500",
        }}
        onChange={(e) =>
          onTextChange(e as unknown as ChangeEvent<HTMLTextAreaElement>)
        }
      />
    </form>
  );
};

export default ChatTextarea;

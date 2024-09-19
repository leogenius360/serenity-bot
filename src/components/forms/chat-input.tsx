/* eslint-disable no-console */
"use client";

import { Button } from "@nextui-org/react";
import { IoSend } from "react-icons/io5";
import { useState, ChangeEvent } from "react";
import { useRecorder } from "react-microphone-recorder";
import { TypeAnimation } from "react-type-animation";
import { twMerge } from "tailwind-merge";

import { VoiceRecorder } from "../recorder";

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
  const [text, setText] = useState<string>("");
  const [textareaRows, setTextareaRows] = useState<number>(1);
  const [audio, setAudio] = useState<File | undefined>(undefined);
  const { stopRecording, audioURL, audioFile } = useRecorder();

  const handleAudioSave = async () => {
    stopRecording();
    audioFile && setAudio(audioFile);
    console.log(audio);
    console.log(audioFile);
    console.log(audioURL);
    console.log(audioFile?.size);
    const audioText = await audio?.text();

    text && audioText
      ? setText(`${text} ${audioText}`)
      : audioText
        ? setText(audioText)
        : null;
  };

  const textAreaAdjust = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // event.preventDefault(); // Prevents the default action of adding a new line
    const rows = event.target.value.split(/\r*\n/).length;

    setTextareaRows(rows);
  };

  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    textAreaAdjust(e);
  };

  return (
    <form method="post" className="py-2" onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-nowrap items-end w-full rounded-md border-1 border-emerald-400 hover:border-emerald-500">
        <span title="Record" className="p-1">
          <VoiceRecorder save={handleAudioSave} />
        </span>
        <textarea
          rows={textareaRows}
          value={text}
          placeholder="Start your conversation ..."
          className="w-full h-full min-h-11 border-primary outline-none bg-transparent max-h-48 overflow-y-auto scrollbar-hide py-2 px-3"
          onChange={onTextChange}
        />
        <Button
          type="submit"
          title="Send"
          radius="none"
          // isIconOnly
          color="primary"
          variant="light"
          className="rounded-md min-w-12 px-2 m-1"
        >
          <IoSend size={22} />
        </Button>
      </div>
    </form>
  );
};

export default ChatTextarea;

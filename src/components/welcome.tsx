"use client";

import { useAuth } from "@/app/auth_provider";
import { TypeAnimation } from "react-type-animation";
import { IoSend } from "react-icons/io5";
import { VoiceRecorder } from "./recorder";
import { ChangeEvent, useState } from "react";
import { useRecorder } from "react-microphone-recorder";

export function WelcomePanel() {
  const { user } = useAuth();
  const [text, setText] = useState<string>("");
  const [textareaRows, setTextareaRows] = useState<number>(1);
  const [audio, setAudio] = useState<File | undefined>(undefined);
  const { stopRecording, audioURL, audioFile } = useRecorder();

  const handleAudioSave = async () => {
    stopRecording();
    audioFile && setAudio(audioFile);
    console.log(audio)
    console.log(audioFile);
    console.log(audioURL);
    console.log(audioFile?.size);
    const audioText = await audio?.text()
    text && audioText
      ? setText(`${text} ${audioText}`)
      : audioText
        ? setText(audioText)
        : null;
  };

  const textAreaAdjust = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // if (event.key === "Enter") {
    // event.preventDefault(); // Prevents the default action of adding a new line
    const rows = event.target.value.split(/\r*\n/).length;
    setTextareaRows(rows)
  };

  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    textAreaAdjust(e)
  };


  const msgs =
    "welcomeMsg rounded-md px-4 md:px-6 outline-double outline-4 outline-offset-2 outline-emerald-600 max-h-[70vh] overflow-y-auto custom-scrollbar";

  const messages = [msgs, 6000];

  return (
    <section className="flex flex-col rounded-md px-4 md:px-6 outline-double outline-4 outline-offset-2 outline-emerald-600 h-[70vh] overflow-y-auto custom-scrollbar">
      <h6 className="text-sm font-medium underline underline-offset-4 py-3">
        Hello,{" "}
        <span className="capitalize">
          {user ? user.displayName?.toLowerCase() : "..."}
        </span>
        ! How have you been today?
      </h6>

      <p className="font-medium py-3">
        <TypeAnimation
          cursor={false}
          sequence={messages}
          speed={{ type: "keyStrokeDelayInMs", value: 30 }}
          omitDeletionAnimation={true}
          repeat={0}
          // repeat={Infinity}
        />
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        method="post"
        className="py-3 mt-auto"
      >
        <div className="mt-2">
          <div className="flex flex-nowrap items-end w-full rounded-md border-1 border-emerald-400 hover:border-emerald-500">
            <span title="Record" className="p-1">
              <VoiceRecorder save={handleAudioSave} />
            </span>
            <textarea
              rows={textareaRows}
              value={text}
              onChange={onTextChange}
              placeholder="type here"
              className="w-full h-full min-h-11 border-primary outline-none bg-transparent max-h-52 overflow-y-auto scrollbar-hide py-2 px-3"
            ></textarea>
            <button type="submit" title="Send" className="px-6 py-2">
              <IoSend size={22} />
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

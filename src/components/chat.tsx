"use client";

import { Button } from "@nextui-org/react";
import { VscRobot } from "react-icons/vsc";
import { IoSend } from "react-icons/io5";
import { VoiceRecorder } from "./recorder";
import { useState, ChangeEvent } from "react";
import { useRecorder } from "react-microphone-recorder";
import { TypeAnimation } from "react-type-animation";
import { useAuth } from "@/app/auth_provider";

const ChatOffcanvas = () => {
  const { user } = useAuth();
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

  const msgs =
    "WelcomeMsg rounded-md px-4 md:px-6 outline-double outline-4 outline-offset-2 outline-emerald-600 max-h-[70vh] overflow-y-auto custom-scrollbar";

  const messages = [msgs, 6000];

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
            Chat
          </h6>
          <button
            className="btn-close"
            type="button"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
          <hr />
        </div>
        <div className="offcanvas-body flex flex-col gap-4 custom-scrollbar">
          <div className="rounded-md w-10/12 px-3 md:px-4 border-1 border-emerald-600 max-h-32 overflow-y-auto custom-scrollbar card shadow-md bg-transparent">
            <p className="text-sm font-medium py-2 ">
              Hello,{" "}
              <span className="capitalize">
                {user ? user.displayName?.toLowerCase() : "..."}
              </span>
              ! How have you been today?
            </p>
          </div>
          <div className="rounded-md w-11/12 ms-auto px-3 md:px-4 border-1 border-emerald-600 max-h-32 overflow-y-auto custom-scrollbar card shadow-md bg-transparent">
            <p className="text-sm font-medium py-2">
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
        </div>
        <div className="offcanvas-footer px-2">
          <form
            onSubmit={(e) => e.preventDefault()}
            method="post"
            className="py-2"
          >
            <div className="flex flex-nowrap items-end w-full rounded-md border-1 border-emerald-400 hover:border-emerald-500">
              <span title="Record" className="p-1">
                <VoiceRecorder save={handleAudioSave} />
              </span>
              <textarea
                rows={textareaRows}
                value={text}
                onChange={onTextChange}
                placeholder="Start your conversation ..."
                className="w-full h-full min-h-11 border-primary outline-none bg-transparent max-h-48 overflow-y-auto scrollbar-hide py-2 px-3"
              ></textarea>
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
        </div>
      </div>
    </>
  );
};

export default ChatOffcanvas;

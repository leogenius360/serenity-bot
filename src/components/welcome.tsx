"use client";

import { useAuth } from "@/app/auth_provider";
import { useEffect, FormEvent } from "react";
import { TypeAnimation } from "react-type-animation";
import { IoSend } from "react-icons/io5";

export function WelcomePanel() {
  const { user } = useAuth();

  const msgs = ["welcomeMsg", "welcomeMsg2", "welcomeMsg3"];

  const messages = msgs.flatMap((message) => [message, 6000]);

  function textAreaAdjust(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter") {
      // event.preventDefault(); // Prevents the default action of adding a new line
      const target = event.target as HTMLTextAreaElement;
      target.style.height = `${25 + target.scrollHeight}px`; // Set the height to fit the new content
    }
  }

  return (
    <section className="rounded-md px-4 md:px-6 outline-double outline-4 outline-offset-2 outline-emerald-600 max-h-[70vh] overflow-y-auto custom-scrollbar">
      <h6 className="text-sm font-medium underline underline-offset-4 py-3">
        Hello, {user ? user.displayName : "..."}! How have you been today?
      </h6>
      <p className="font-medium py-3">
        <TypeAnimation
          sequence={messages}
          speed={{ type: "keyStrokeDelayInMs", value: 30 }}
          omitDeletionAnimation={true}
          repeat={Infinity}
        />
      </p>

      <form action="" method="post" className="py-3">
        {/* <div className="flex flex-nowrap items-center h-12 w-full px-3 py-1 rounded border-1 border-emerald-400 hover:border-emerald-500">
          <input
            type="text"
            name=""
            id=""
            placeholder="type here"
            className="w-full h-full border-none outline-none bg-transparent"
          />
          <button type="submit" title="Send" className="px-2 py-3">
            <IoSend size={22} />
          </button>
        </div> */}
        <div className="mt-2">
          <div className="flex flex-nowrap items-center w-full rounded-md border-1 border-emerald-400 hover:border-emerald-500">
            <textarea
              onKeyDown={textAreaAdjust} // Attach the function to the onKeyDown event
              rows={1}
              name=""
              id=""
              placeholder="type here"
              className="w-full h-full border-none outline-none bg-transparent max-h-52 overflow-y-auto scrollbar-hide ps-6 py-3"
            ></textarea>
            <button type="submit" title="Send" className="px-8 py-3">
              <IoSend size={22} />
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

"use client";

import { useEffect } from "react";
import { TypeAnimation } from "react-type-animation";

interface WelcomeProps {
  user?: string;
  messages: any[];
}

const TextField = (
  <div className="sm:col-span-4">
    <label
      htmlFor="username"
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      Username
    </label>
    <div className="mt-2">
      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
          workcation.com/
        </span>
        <input
          type="text"
          name="username"
          id="username"
          autoComplete="username"
          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="janesmith"
        />
      </div>
    </div>
  </div>
);

const TextArea = (
  <div className="col-span-full">
    <label
      htmlFor="about"
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      About
    </label>
    <div className="mt-2">
      <textarea
        id="about"
        name="about"
        rows={3}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        defaultValue={""}
      />
    </div>
    <p className="mt-3 text-sm leading-6 text-gray-600">
      Write a few sentences about yourself.
    </p>
  </div>
);

export function WelcomePanel({ user, messages }: WelcomeProps) {
  messages = messages.flatMap((message) => [message, 6000]);
  // console.log(messages);

  return (
    <section className="rounded-md px-4 md:px-6 outline-double outline-4 outline-offset-2 outline-emerald-600">
      {user ? (
        <h6 className="text-xs font-bold underline underline-offset-4 py-3">
          Hey {user} !
        </h6>
      ) : null}
      <TypeAnimation
        className="text-sm font-medium"
        // splitter={(str) => str.split(/(?= )/)}
        sequence={messages}
        speed={{ type: "keyStrokeDelayInMs", value: 30 }}
        omitDeletionAnimation={true}
        repeat={Infinity}
      />

      <form action="" method="post" className="py-3">
        {/* {TextField} */}
      </form>
    </section>
  );
}

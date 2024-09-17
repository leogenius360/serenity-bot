"use client";

import { TypeAnimation } from "react-type-animation";

export const LoadingState = () => {
  const messages = [
    "Empowering mental wellness through chat-based support",
    6000,
    "You mental support chat bot",
    6000,
  ];

  return (
    <div className="">
      <h6 className="font-bold text-sm text-uppercase">Serenity Bot</h6>
      <TypeAnimation
        cursor={false}
        sequence={messages}
        speed={{ type: "keyStrokeDelayInMs", value: 30 }}
        // omitDeletionAnimation={true}
        repeat={0}
        // repeat={Infinity}
      />
    </div>
  );
};

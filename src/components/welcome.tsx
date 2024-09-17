"use client";

import { TypeAnimation } from "react-type-animation";

export function WelcomePanel() {
  const messages = [
    "I am serenity bot. Yeah but never mind, you can choose to give me a very name, ",
    12000,
    "I can offer advice on anxiety and depression, answer mental health questions, and engage in supportive conversations. However, I am not a replacement for professional mental healthcare. If you need further assistance, I recommend seeking help from a qualified therapist or counselor.",
    6000,
  ];

  return (
    <section className="flex flex-col rounded-md px-2 md:px-3 border-1 text-justify border-emerald-600">
      <p className="text-lg font-medium py-3">
        <TypeAnimation
          cursor={false}
          sequence={messages}
          speed={{ type: "keyStrokeDelayInMs", value: 90 }}
          omitDeletionAnimation={true}
          repeat={0}
          // repeat={Infinity}
        />
      </p>
    </section>
  );
}

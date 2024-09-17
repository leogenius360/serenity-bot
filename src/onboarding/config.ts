
// typeof onboardingFlow

const chatWelcome = `
  I am serenity bot. Yeah but never mind, you can choose to give me a very name.
  I can offer advice on anxiety and depression, answer mental health questions,
  and engage in supportive conversations. However, I am not a replacement for
  professional mental healthcare. If you need further assistance,
  I recommend seeking help from a qualified therapist or counselor.
`;

export const onboardingFlow = {
    init: {
        heading: "Hi, welcome ${user}",
        messages: [chatWelcome, chatWelcome.slice(0, 175) ],
        component: "@/components/chat",
    },
    auth: {
        heading: "Create an account",
        messages: ["Please create an account to continue."],
        component: "@/components/auth", // Authentication form component
    },
    profile: {
        heading: "Complete your profile",
        messages: ["Tell us a bit about yourself."],
        component: "@/components/profile", // Profile form component
    },
};

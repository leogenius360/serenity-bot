export type SiteConfig = typeof siteConfig;

export const internalUrls = {
    // Base URL
    home: "/",

    // Auth URLs
    auth: "/auth",
    login: "/auth/login",
    signUp: "/auth/signup",

    // Navigation URLs
    playgorund: "/playgorund",
    resources: "/resources",
    chat: "/chat",
    docs: "/docs",
    support: "/support",
};

export const siteConfig = {
    name: "Mental Health Support System",
    shortName: "Serenity-bot",
    keywords: "Serenity-bot - Mental Health Support System",
    description: "A mental health support system designed to ...",
    navItems: [
        {
            label: "Playgorund",
            href: internalUrls.playgorund,
        },
        {
            label: "Resources",
            href: internalUrls.resources,
        },
        {
            label: "Chat",
            href: internalUrls.chat,
        },
        {
            label: "Docs",
            href: internalUrls.docs,
        },
    ],
};

export const siteFooter = {
    termsAndConditions: [
        {
            label: "© 2024 Brainbox Research Institute",
            href: internalUrls.home,
        },
        {
            label: "Terms",
            href: internalUrls.home,
        },
        {
            label: "Privacy",
            href: internalUrls.home,
        },
    ],

    socialLinks: [
        {
            label: "Youtube",
            icon: "© 2024 Brainbox Research Institute",
            href: internalUrls.home,
        },
        {
            label: "LinkedIn",
            icon: "© 2024 Brainbox Research Institute",
            href: internalUrls.home,
        },
        {
            label: "Google Scholar",
            icon: "© 2024 Brainbox Research Institute",
            href: internalUrls.home,
        },
        {
            label: "Twitter | X",
            icon: "© 2024 Brainbox Research Institute",
            href: internalUrls.home,
        },
        {
            label: "Facebook",
            icon: "© 2024 Brainbox Research Institute",
            href: internalUrls.home,
        },
        {
            label: "Whatsapp",
            icon: "© 2024 Brainbox Research Institute",
            href: internalUrls.home,
        },
    ],

    developer: {
        label: "Design & maintained by Genius Tech Space",
        href: internalUrls.home,
    },
};

export const colors = {
    primary: "#f97316",
    primary500: "#f59e0b",
};

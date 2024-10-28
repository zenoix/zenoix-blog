import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
    website: "https://www.zenoix.com",
    author: "Jeff Wang",
    profile: "https://www.zenoix.com",
    desc: "A little blog where I post about topics I'm not an expert in ... yet",
    title: "Zenoix's Blog",
    ogImage: "og-image.jpg",
    lightAndDarkMode: true,
    postPerIndex: 4,
    postPerPage: 6,
    scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
    showArchives: true,
    editPost: {
        url: "https://github.com/zenoix/zenoix-blog/edit/main/src/content/blog",
        text: "Suggest Changes",
        appendFilePath: true,
    },
};

export const LOCALE = {
    lang: "en", // html lang code. Set this empty and default will be "en"
    langTag: ["en-NZ"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
    enable: false,
    svg: true,
    width: 216,
    height: 46,
};

export const SOCIALS: SocialObjects = [
    {
        name: "Github",
        href: "https://github.com/zenoix",
        linkTitle: `Find ${SITE.author.split(" ")[0]} on Github`,
        active: true,
    },
    {
        name: "Facebook",
        href: "",
        linkTitle: `Find ${SITE.author.split(" ")[0]} on Facebook`,
        active: false,
    },
    {
        name: "Instagram",
        href: "",
        linkTitle: `Find ${SITE.author.split(" ")[0]} on Instagram`,
        active: false,
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/jeffwangnz/",
        linkTitle: `Find ${SITE.author.split(" ")[0]} on LinkedIn`,
        active: true,
    },
    {
        name: "Mail",
        href: "mailto:jeff@zenoix.com",
        linkTitle: `Send ${SITE.author.split(" ")[0]} an email`,
        active: true,
    },
    {
        name: "Twitter",
        href: "",
        linkTitle: `Find ${SITE.author.split(" ")[0]} on Twitter`,
        active: false,
    },
    {
        name: "Twitch",
        href: "",
        linkTitle: `Find ${SITE.author.split(" ")[0]} on Twitch`,
        active: false,
    },
    {
        name: "YouTube",
        href: "",
        linkTitle: `Find ${SITE.author.split(" ")[0]} on YouTube`,
        active: false,
    },
    {
        name: "WhatsApp",
        href: "",
        linkTitle: `Find ${SITE.author.split(" ")[0]} on WhatsApp`,
        active: false,
    },
    {
        name: "Snapchat",
        href: "",
        linkTitle: `Find ${SITE.author.split(" ")[0]} on Snapchat`,
        active: false,
    },
    {
        name: "Pinterest",
        href: "",
        linkTitle: `Find ${SITE.author.split(" ")[0]} on Pinterest`,
        active: false,
    },
    {
        name: "TikTok",
        href: "",
        linkTitle: `Find ${SITE.author.split(" ")[0]} on TikTok`,
        active: false,
    },
    {
        name: "CodePen",
        href: "",
        linkTitle: `Find ${SITE.author.split(" ")[0]} on CodePen`,
        active: false,
    },
    {
        name: "Discord",
        href: "",
        linkTitle: `Find ${SITE.author.split(" ")[0]} on Discord`,
        active: false,
    },
    {
        name: "GitLab",
        href: "",
        linkTitle: `Find ${SITE.author.split(" ")[0]} on GitLab`,
        active: false,
    },
    {
        name: "Reddit",
        href: "",
        linkTitle: `Find ${SITE.author.split(" ")[0]} on Reddit`,
        active: false,
    },
    {
        name: "Skype",
        href: "",
        linkTitle: `Find ${SITE.author.split(" ")[0]} on Skype`,
        active: false,
    },
    {
        name: "Steam",
        href: "",
        linkTitle: `Find ${SITE.author.split(" ")[0]} on Steam`,
        active: false,
    },
    {
        name: "Telegram",
        href: "",
        linkTitle: `Find ${SITE.author.split(" ")[0]} on Telegram`,
        active: false,
    },
    {
        name: "Mastodon",
        href: "",
        linkTitle: `Find ${SITE.author.split(" ")[0]} on Mastodon`,
        active: false,
    },
];

export default {
  title: "CrossCopy",
  description: "CrossCopy Documentation",
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/CrossCopy/crosscopy-doc/edit/main/docs/:path'
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/CrossCopy/crosscopy-doc" },
      { icon: "twitter", link: "https://twitter.com/crosscopyio" },
    ],
    sidebar: {
      "/introduction/": [
        {
          text: "Introduction",
          items: [
            { text: "Introduction", link: "/introduction/index" },
            { text: "Getting Started", link: "/introduction/getting-started" },
          ],
        },
      ],
    },
  },
};

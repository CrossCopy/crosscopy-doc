export default {
  title: "CrossCopy",
  description: "CrossCopy Documentation",
  themeConfig: {
    editLink: {
      pattern:
        "https://github.com/CrossCopy/crosscopy-doc/edit/develop/docs/:path",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/CrossCopy/crosscopy-doc" },
      { icon: "twitter", link: "https://twitter.com/crosscopyio" },
    ],
    nav: [
      { text: 'Our Team', link: '/team' },
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
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2022-present Huakun Shen",
    },
  },
};

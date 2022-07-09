// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const math = require("remark-math");
const katex = require("rehype-katex");
const mathjax = require("rehype-mathjax");
const sectionPrefix = require("./src/remark/section-prefix");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "CrossCopy",
  tagline: "Cross-platform clipboard manager",
  url: "https://crosscopy.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon_package/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "CrossCopy", // Usually your GitHub org/user name.
  projectName: "CrossCopy", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      // /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/CrossCopy/crosscopy-doc/edit/develop/",
          remarkPlugins: [require("mdx-mermaid"), math, sectionPrefix],
          rehypePlugins: [katex],
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/CrossCopy/crosscopy-doc/edit/develop/",
          remarkPlugins: [require("mdx-mermaid"), math],
          rehypePlugins: [katex],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      announcementBar: {
        id: "pre-alpha-warning",
        content:
          "CrossCopy is still in pre-alpha stage and is not ready to be used. Documentation is still under development. You can read the docs to get an idea of what CrossCopy is and what it's capable of.",
        isCloseable: true,
      },
      metadata: [
        {
          name: "keywords",
          content:
            "crosscopy, clipboard, cloud, cross-platform, sync, realtime, open source, free",
        },
      ],
      navbar: {
        title: "CrossCopy",
        logo: {
          alt: "My Site Logo",
          src: "img/CrossCopy-Logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Docs",
          },
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/CrossCopy/crosscopy-doc",
            position: "right",
            className: "header-github-link",
            "aria-label": "GitHub repository",
          },
          {
            href: "https://twitter.com/crosscopyio",
            className: "header-twitter-link",
            position: "right",
          },
          {
            href: "https://discord.gg/HRW99gex9z",
            className: "header-discord-link",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Intro",
                to: "/docs/intro",
              },
              {
                label: "Blog",
                to: "/blog",
              },
            ],
          },
          {
            title: "Community",
            items: [
              // {
              //   label: 'Stack Overflow',
              //   href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              // },
              {
                label: "Discord",
                href: "https://discord.gg/HRW99gex9z",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/crosscopyio",
              },
              {
                label: "GitHub",
                href: "https://github.com/CrossCopy/crosscopy-doc",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Author",
                href: "https://huakunshen.com",
              },
              {
                label: "Contact Author",
                href: "mailto:huakun.shen@crosscopy.io",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Huakun Shen. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;

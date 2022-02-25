const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '傑部落',
  tagline: '紀錄、分享技術和心得。',
  url: 'https://www.jablog.site',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.svg',
  organizationName: 'jason71708', // Usually your GitHub org/user name.
  projectName: 'development-notes', // Usually your repo name.
  trailingSlash: false,
  i18n: {
    defaultLocale: 'zh-TW',
    locales: ['zh-TW'],
  },
  plugins: [
    // [
    //   require.resolve("@easyops-cn/docusaurus-search-local"),
    //   {
    //     // ... Your options.
    //     // `hashed` is recommended as long-term-cache of index file is possible.
    //     hashed: true,
    //     // For Docs using Chinese, The `language` is recommended to set to:
    //     language: ['zh'],
    //     // When applying `zh` in language, please install `nodejieba` in your project.
    //   },
    // ],
    // 'plugin-image-zoom'
  ],

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          // editUrl:
          //   'https://www.jablog.site/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5
        },
        gtag: {
          trackingID: 'G-R80F90M72F',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {name: 'keywords', content: 'frontend, blog, web'},
        {name: 'author', content: 'Jason Zhuang'},
        {name: 'copyright', content: 'Jason Zhuang'}
      ],
      image: 'img/logo.svg',
      navbar: {
        title: '傑部落',
        logo: {
          alt: 'Jablog Logo',
          src: 'img/logo.svg',
        },
        hideOnScroll: true,
        items: [
          {
            to: '/blog',
            label: 'Blog',
            position: 'left'
          },
          {
            type: 'doc',
            docId: 'threejs/fundamentals',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/jason71708',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      zoomSelector: '.markdown img',
      // announcementBar: {
      //   id: 'new-site',
      //   content: '✨傑部落搬新家囉✨',
      //   backgroundColor: '#188038',
      //   textColor: '#fff',
      //   isCloseable: true,
      // },
      algolia: {
        appId: '5Y7RBYHWUC',
  
        // Public API key: it is safe to commit it
        // apiKey: 'ebcde44f23da657aac7b7571352b61fd', // From Algolia backstage
        apiKey: '259e93d9ede6e9762612fec6a40cc8fe', // From email
  
        indexName: 'jablog',
  
        // Optional: see doc section below
        contextualSearch: true,
  
        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        // externalUrlRegex: 'external\\.com|domain\\.com',
  
        // Optional: Algolia search parameters
        // searchParameters: {},
  
        //... other Algolia params
      },
      footer: {
        style: 'dark',
        links: [
          // {
          //   title: 'Docs',
          //   items: [
          //     {
          //       label: 'Tutorial',
          //       to: '/docs',
          //     },
          //   ],
          // },
          // {
          //   title: 'Community',
          //   items: [
          //     {
          //       label: 'Discord',
          //       href: 'https://discordapp.com/invite/docusaurus',
          //     },
          //     {
          //       label: 'Twitter',
          //       href: 'https://twitter.com/docusaurus',
          //     },
          //   ],
          // },
          // {
          //   title: 'More',
          //   items: [
          //     {
          //       label: 'Blog',
          //       to: '/blog',
          //     },
          //     {
          //       label: 'GitHub',
          //       href: 'https://github.com/jason71708',
          //     },
          //   ],
          // },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 傑部落 Jablog, Inc. Built with Docusaurus.`,
      },
      colorMode: {
        defaultMode: 'dark',
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;

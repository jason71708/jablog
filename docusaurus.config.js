const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const isDev = process.env.NODE_ENV === 'development';
const baseUrl = process.env.BASE_URL ?? '/';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '傑部落',
  tagline: '紀錄、分享開發、技術和心得。',
  organizationName: 'jason71708', // Usually your GitHub org/user name.
  projectName: 'development-notes', // Usually your repo name.
  baseUrl,
  baseUrlIssueBanner: true,
  url: 'https://www.jablog.site',
  trailingSlash: true,
  i18n: {
    defaultLocale: 'zh-TW',
    locales: ['zh-TW'],
  },
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.png',
  customFields: {
    isDev,
    description: '從 Vue.js 、 React.js 、 Three.js 等前端開發至後端、 DevOps 、 AWS 雲端建置的開發技術累積與心得',
  },
  staticDirectories: [
    'static',
  ],
  themes: [
    // 'live-codeblock',
  ],
  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        // For Docs using Chinese, The `language` is recommended to set to:
        language: ['zh'],
        // When applying `zh` in language, please install `nodejieba` in your project.
      },
    ],
    'plugin-image-zoom',
    [
      'pwa',
      {
        debug: isDev,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        swCustom: require.resolve('./src/sw.js'),
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: 'img/logo.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: 'manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: 'rgb(37, 194, 160)',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#000',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-icon',
            href: 'img/logo.png',
          },
          {
            tagName: 'link',
            rel: 'mask-icon',
            href: 'img/logo.png',
            color: 'rgb(255, 255, 255)',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileImage',
            content: 'img/logo.png',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileColor',
            content: '#000',
          },
        ],
      },
    ],
    /*
     * It might be use in some day.
     * https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-ideal-image
     */
    // [
    //   '@docusaurus/plugin-ideal-image',
    //   {
    //     quality: 70,
    //     max: 1030, // max resized image's size.
    //     min: 640, // min resized image's size. if original is lower, use that size.
    //     steps: 2, // the max number of images generated between min and max (inclusive)
    //     disableInDev: false,
    //   },
    // ],
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateTime: true,
          /*
           * It might be use in some day.
           * This plugin can also be use in blog and page.
           * https://www.npmjs.com/package/@docusaurus/remark-plugin-npm2yarn
           */
          // remarkPlugins: [
          //   [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
          // ],
        },
        blog: {
          showReadingTime: true,
          postsPerPage: 5,
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} Jablog, Inc.`,
          },
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: !isDev
          ? {
            trackingID: 'G-R80F90M72F',
          }
          : undefined,
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5
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
      image: 'img/logo.png',
      navbar: {
        title: '傑部落',
        logo: {
          alt: 'Jablog Logo',
          src: 'img/logo.png',
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

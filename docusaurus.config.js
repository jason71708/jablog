const isDev = process.env.NODE_ENV === 'development';
const baseUrl = process.env.BASE_URL ?? '/';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '傑部落 Jablog',
  tagline: '紀錄、分享開發、技術和心得。',
  organizationName: 'jason71708', // Usually your GitHub org/user name.
  projectName: 'jablog', // Usually your repo name.
  baseUrl,
  baseUrlIssueBanner: true,
  url: 'https://blog.jasonzhuang.com',
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
    'live-codeblock',
  ],
  customFields: {
    giscus: {
      id: 'comments',
      repo: 'jason71708/jablog',
      repoId: 'R_kgDOHuA6TA',
      category: "Announcements",
      categoryId: "DIC_kwDOHuA6TM4CQcHo",
      mapping: "title",
      // term: "Welcome to @giscus/react component!",
      strict: "0",
      reactionsEnabled: "1",
      emitMetadata: "0",
      inputPosition: "top",
      theme: "preferred_color_scheme",
      lang: "en",
      loading: "lazy",
      crossOrigin: "anonymous",
    },
  },
  plugins: [
    [
      require.resolve('docusaurus-lunr-search'),
      {
        language: ['zh'],
      },
    ],
    require.resolve('docusaurus-plugin-image-zoom'),
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
          postsPerPage: 10,
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
          priority: 0.5,
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      liveCodeBlock: {
        playgroundPosition: 'bottom',
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      announcementBar: {
        id: 'new-site',
        content: '✨傑部落換網址囉✨ https://blog.jasonzhuang.com',
        textColor: '#000000',
        isCloseable: true,
      },
      prism: {
        // magicComments: [
        //   {
        //     className: 'theme-code-block-highlighted-line',
        //     line: 'highlight-next-line',
        //     block: {start: 'highlight-start', end: 'highlight-end'},
        //   },
        //   {
        //     className: 'code-block-error-line',
        //     line: 'This will error',
        //   },
        // ],
      },
      zoom: {
        selector: '.markdown :not(em) > img',
        background: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(50, 50, 50)'
        },
        // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
        config: {}
      },
      image: 'img/logo.png',
      metadata: [
        {name: 'keywords', content: 'frontend, blog, web, developer'},
        {name: 'author', content: 'Jason Zhuang'},
        {name: 'copyright', content: '傑部落 Jablog'}
      ],
      navbar: {
        hideOnScroll: true,
        title: '傑部落 Jablog',
        logo: {
          alt: 'Jablog Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            to: '/blog',
            label: 'Blog',
            position: 'left'
          },
          {
            type: 'doc',
            docId: 'algorithms/bigO-notation',
            position: 'left',
            label: 'Docs',
          },
          // {
          //   type: 'localeDropdown',
          //   position: 'right',
          // },
          {
            href: 'https://github.com/jason71708',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub Profile',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [],
        copyright: `Copyright © ${new Date().getFullYear()} 傑部落 Jablog, Inc. Built with Docusaurus.`,
      },
    }),
};

// module.exports = config;

async function createConfig() {
  const lightTheme = (await import('./src/utils/prismLight.mjs')).default;
  const darkTheme = (await import('./src/utils/prismDark.mjs')).default;
  config.themeConfig.prism.theme = lightTheme;
  config.themeConfig.prism.darkTheme = darkTheme;
  return config;
}

module.exports = createConfig;
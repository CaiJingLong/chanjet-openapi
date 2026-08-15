import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'chanjet-openapi',
  description: '畅捷通开放平台 TypeScript SDK',
  base: '/chanjet-openapi/',
  repo: 'https://github.com/CaiJingLong/chanjet-openapi',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'Core', link: '/core/' },
      { text: 'Accounting', link: '/accounting/' },
      { text: 'AI 参考', link: '/llms' },
    ],

    sidebar: {
      '/core/': [
        {
          text: 'Core',
          items: [
            { text: '概览', link: '/core/' },
            { text: 'ChanjetClient', link: '/core/classes/ChanjetClient' },
            { text: 'ChanjetApiError', link: '/core/classes/ChanjetApiError' },
            { text: 'PLATFORM_ERROR_CODES', link: '/core/variables/PLATFORM_ERROR_CODES' },
            { text: 'isPlatformError', link: '/core/functions/isPlatformError' },
          ],
        },
        {
          text: '接口',
          items: [
            { text: 'ApiEnvelope', link: '/core/interfaces/ApiEnvelope' },
            { text: 'ChanjetClientConfig', link: '/core/interfaces/ChanjetClientConfig' },
            { text: 'RequestOptions', link: '/core/interfaces/RequestOptions' },
            { text: 'TokenProvider', link: '/core/interfaces/TokenProvider' },
            { text: 'ChanjetApiErrorOptions', link: '/core/interfaces/ChanjetApiErrorOptions' },
          ],
        },
        {
          text: '鉴权',
          link: '/core/auth/',
        },
      ],
      '/accounting/': [
        {
          text: 'Accounting',
          items: [{ text: '概览', link: '/accounting/' }],
        },
        {
          text: 'API 模块',
          items: [
            { text: 'bb 报表', link: '/accounting/bb/' },
            { text: 'cwxg 财务相关', link: '/accounting/cwxg/' },
            { text: 'hkjMenu 菜单', link: '/accounting/hkjMenu/' },
            { text: 'hkjRoleManager 角色管理', link: '/accounting/hkjRoleManager/' },
            { text: 'hkjcssz 财务设置', link: '/accounting/hkjcssz/' },
            { text: 'hkjgdzc 固定资产', link: '/accounting/hkjgdzc/' },
            { text: 'hkjgz 工资', link: '/accounting/hkjgz/' },
            { text: 'hkjjz 结账', link: '/accounting/hkjjjz/' },
            { text: 'hkjkchs 库存核算', link: '/accounting/hkjkchs/' },
            { text: 'jcda 基础档案', link: '/accounting/jcda/' },
            { text: 'km 科目', link: '/accounting/km/' },
            { text: 'pjgl 票据管理', link: '/accounting/pjgl/' },
            { text: 'sz 收付', link: '/accounting/sz/' },
            { text: 'zb 账表', link: '/accounting/zb/' },
            { text: 'zjgl 资金管理', link: '/accounting/zjgl/' },
            { text: 'zt 账套', link: '/accounting/zt/' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/CaiJingLong/chanjet-openapi' },
      { icon: 'npm', link: 'https://www.npmjs.com/org/chanjet-openapi' },
    ],

    footer: {
      message: '基于 MIT 协议发布',
    },
  },
});
